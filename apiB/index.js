const express = require("express");
const app = express();
const PORT = 3001;

const weatherData = {
  curitiba: { temp: 10, unit: "Celsius" },
  saopaulo: { temp: 25, unit: "Celsius" },
  rio: { temp: 35, unit: "Celsius" },
  belohorizonte: { temp: 15, unit: "Celsius" },
};

app.get("/weather/:city", (req, res) => {
  const city = req.params.city.toLowerCase().replace(/\s/g, "");
  const data = weatherData[city];
  if (data) {
    res.json({ city, ...data });
  } else {
    res.status(404).json({ error: "Cidade não encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`API B rodando na porta ${PORT}`);
});
