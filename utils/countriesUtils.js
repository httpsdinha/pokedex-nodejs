const axios = require("axios");
const config = require("../config/config");

// Função para ordenar países de forma alfabética caso o valor da busca seja nulo
async function sortCountries(searchCountry = null) {
  const response = await axios.get(`${config.apiUrl}all`);
  let countries = response.data;

  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  return countries;
}

module.exports = { sortCountries };
