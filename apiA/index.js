const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

const API_B_URL = "http://api-b:3001/weather";

function getRecommendation(temp) {
  if (temp > 30) return "Recomenda-se hidratação e protetor solar.";
  if (temp >= 15) return "O clima está agradável!";
  return "Recomenda-se usar um casaco.";
}

app.get("/recommendation/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`${API_B_URL}/${city}`);
    const { temp, unit } = response.data;
    const recommendation = getRecommendation(temp);

    res.json({ city, temp, unit, recommendation });
  } catch (error) {
    res.status(404).json({ error: "Erro ao buscar dados da cidade." });
  }
});

app.listen(PORT, () => {
  console.log(`API A (Recomendações) rodando na porta ${PORT}`);
});
