const express = require("express"); // Importa o módulo express
const router = express.Router(); // Cria um objeto de roteador express
const axios = require("axios");
const config = require("../config/config");
const { sortCountries } = require("../utils/countriesUtils");

router.get("/", async (req, res) => { 
  try {
    const countries = await sortCountries(); // ordena os países na view inicial
    res.render("templates/index", { countries });
  } catch (error) {
    console.error("Erro ao buscar dados dos países:", error.message);
    res.status(500).send("Erro ao buscar dados dos países");
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchCountry = req.query["search-country"];
    let response;

    if (!searchCountry) {
      const countries = await sortCountries(); // ordena os países se a busca é nula
      res.render("templates/index", { countries });
    } else {
      response = await axios.get(`${config.apiUrl}name/${searchCountry}`);
      const countries = response.data;
      res.render("templates/index", { countries });
    }
  } catch (error) {
    messageError = "Nada encontrado :("
    res.render("templates/404", { messageError });
  }
});

// Rota informações sobre país selecionado
router.get("/countries/:countryName", async (req, res) => {
  try {
    const countryName = req.params.countryName;
    const response = await axios.get(
      `${config.apiUrl}name/${countryName}?fullText=true`
    );
    const countryData = response.data[0];
    countryData.population = countryData.population.toLocaleString("pt-BR");
    countryData.area = countryData.area.toLocaleString("pt-BR");
    res.render("templates/country-details", { country: countryData });
  } catch (error) {
    console.error("Erro ao buscar dados do país:", error.message);
    res.status(500).send("Erro ao buscar dados do país");
  }
});

module.exports = router;
