const express = require('express');
const cors = require('cors');
const wsnsService = require('./services/wsns');

const app = express();
app.use(cors());

app.get('/wsns/price', async (req, res) => {
  try {
    const priceData = await wsnsService.getWSNSPrice();
    res.json(priceData);
  } catch (err) {
    res.status(500).json({ error: "Couldn't fetch wSNS price" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`wSNS API server running on http://localhost:${PORT}`));
