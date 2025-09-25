const axios = require('axios');

const POLYGON_CONTRACT = '0x25a2db8659707766b3452ab38bCeA593C7E6B559';

async function getWSNSPrice() {
  // Try OKX
  try {
    const okxResp = await axios.get(
      'https://www.okx.com/api/v5/market/ticker?instId=WSNS-USDT'
    );
    if (okxResp.data && okxResp.data.data.length > 0) {
      return {
        price: okxResp.data.data[0].last,
        source: 'okx',
        change: okxResp.data.data[0].change24h,
      };
    }
  } catch {}

  // Fallback: CoinGecko
  try {
    const cgResp = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${POLYGON_CONTRACT}&vs_currencies=usd,eth`
    );
    const price = cgResp.data[POLYGON_CONTRACT.toLowerCase()];
    if (price) {
      return { price: price.usd, eth: price.eth, source: 'coingecko' };
    }
  } catch {}

  return { error: "Couldn't fetch price" };
}

module.exports = { getWSNSPrice };