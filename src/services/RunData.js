import axios from 'axios'
import bsv from 'bsv'
//import fs from 'fs'
//import path from 'path'



export function useFetchOrders(){
    //const getDirName = path.dirname;
    const API_URL = `https://api.mornin.run`;
    const time = parseInt(10000000);
    var bsvPrice, txids = [];

    // const writeFile = (path, contents) => {
    //     fs.mkdir(getDirName(path), { recursive: true }, err => {
    //       if (err) return console.log(err);
    //       contents.pipe(fs.createWriteStream(path))
    //     });
    // }
    const exchrate = async() => {
        const res = await axios.get(`https://api.whatsonchain.com/v1/bsv/main/exchangerate`);
        bsvPrice = res.data.rate;
        return bsvPrice;
    }
    const prevTime = ms => { return parseInt((Date.now() - ms) / 1000) }
    //const formatNumber = num => { return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }
    const getOrderPrice = async(location, time, store, jigName) => {
        let orderFound = false;
        const jig = await axios.get(`${API_URL}/jig/${location}`);
        const contract = jig.data.props;
        console.log(`Fetching open orders for ${contract?.metadata?.name || contract?.symbol || contract?.metadata?.symbol}...`);
        let { data } = await axios.get(`${API_URL}/getOpenOrders/${location}/${time}`);
        if (!data?.length) {
            console.log('No new Listed Sales.');
        }
        // if (fs.existsSync(`./${location}_openOrdersCache.json`)) {
        //     txids = JSON.parse(fs.readFileSync(`./${location}_openOrdersCache.json`).toString());
        // } else {
        //     const txs = data.map(o => bsv.Transaction(o.hex).hash);
        //     fs.writeFileSync(`./${location}_openOrdersCache.json`, JSON.stringify(txs));
        // }
        let orders = [];
        for (let order of data) {
            const bsvtx = bsv.Transaction(order.hex);
            const state = JSON.parse(order.state);
            //const sender = state.props.sender;
            //console.log(`TXID:`,bsvtx.hash)
            //console.log(`From:`, sender)
            const sats = state.props.owner.$arb.satoshis;
            //const origin = useOrigin ? location : state.props.origin;
            const bsvAmount = parseFloat(sats / 100000000);
            const usdAmount = parseFloat(bsvAmount * bsvPrice);
            const purchase = `${jigName} #${state.props.no} listed for sale for ${bsvAmount} BSV / $${usdAmount.toFixed(2)}`;
            console.log(purchase);
            
            if (txids.find(t => t === bsvtx.id)) { console.log('already posted.') }
            else {
                // const response = await axios({
                //     method: 'GET',
                //     url: `https://mornin.run/${origin}/img.png`,
                //     responseType: 'stream'
                // })
                // writeFile(`images/${origin}/img.png`, response.data);
                // await sendMsg(purchase,
                //     `https://mornin.run/${origin}/img.png`,
                //     `Buy it here: https://relayx.com/market/GOP`);
                txids.push(bsvtx.hash);
                orders.push({id: state.props.no, price: bsvAmount, price_usd: usdAmount})
                //fs.writeFileSync(`./${location}_openOrdersCache.json`, JSON.stringify(txids));
            }
        }
        if (!orderFound) { console.log('No new Open Orders found.') }
        store.commit('setLastOffers', orders);
        store.commit('setLastOfferLastChecked', new Date());
        return orders;
    }
    const sleep = timeout => { return new Promise(resolve => setTimeout(resolve, timeout)) }
    const getOpenOrders = async(store) => {
        console.log('Searching since', new Date(prevTime(time)*1000).toISOString())
        await exchrate();
        await getOrderPrice('1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2', prevTime(time), store, 'Gopnik');
        // await getOrderPrice(process.env.RUGS_CONTRACT_ID, prevTime(time), true, 'Rug');
        // await getOrderPrice(process.env.GENESIS_CONTRACT_ID, prevTime(time), false, 'Genesis Gopnik');
        await sleep(time);
    }

    return{getOpenOrders}

}