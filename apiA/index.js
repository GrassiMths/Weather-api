const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const PORT = 3000;
const REDIS_PORT = 6379;
const REDIS_HOST = "redis"; // nome do container Redis na rede Docker

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.connect();

app.get("/recommendation/:city", async (req, res) => {
  const city = req.params.city;

  try {
    // Verifica se está no cache
    const cached = await redisClient.get(city.toLowerCase());

    if (cached) {
      console.log(`[CACHE] Resultado de ${city} vindo do Redis.`);
      const result = JSON.parse(cached);
      result.fromCache = true;
      return res.json(result);
    }

    // Se não estiver no cache, busca na API B
    console.log(`[API B] Buscando dados de ${city}...`);
    const response = await axios.get(`http://api-b:3001/weather/${city}`);
    const { temp, unit } = response.data;

    let recommendation = "";
    if (temp > 30) {
      recommendation = "Recomendamos se hidratar e usar protetor solar!";
    } else if (temp > 15) {
      recommendation = "O clima está agradável!";
    } else {
      recommendation = "Recomendamos usar um casaco!";
    }

    const result = {
      city,
      temp,
      unit,
      recommendation,
      fromCache: false,
    };

    // Salva no Redis com TTL de 60 segundos
    await redisClient.set(city.toLowerCase(), JSON.stringify(result), {
      EX: 60,
    });

    res.json(result);
  } catch (error) {
    console.error(`[ERRO] Falha ao buscar dados para ${city}:`, error.message);
    res.status(500).json({ error: "Erro ao buscar dados da cidade." });
  }
});

app.listen(PORT, () => {
  console.log(`API A (Recomendações) rodando na porta ${PORT}`);
});
