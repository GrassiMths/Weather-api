const express = require("express");
const app = express();
const PORT = 3001;

const weatherData = {
  SãoPaulo: { temp: 25, unit: "Celsius" },
  Rio: { temp: 35, unit: "Celsius" },
  Curitiba: { temp: 10, unit: "Celsius" },
  BeloHorizonte: { temp: 15, unit: "Celsius" },
  PortoAlegre: { temp: 30, unit: "Celsius" },
  Florianopolis: { temp: 20, unit: "Celsius" },
  Vitoria: { temp: 22, unit: "Celsius" },
  Salvador: { temp: 18, unit: "Celsius" },
  Goiania: { temp: 12, unit: "Celsius" },
  CampoGrande: { temp: 19, unit: "Celsius" },
};

app.get("/weather/:city", (req, res) => {
  const city = req.params.city;
  if (weatherData[city]) {
    res.json({ city, ...weatherData[city] });
  } else {
    res.status(404).json({ error: "Cidade não encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`API B (Clima) rodando na porta ${PORT}`);
});
