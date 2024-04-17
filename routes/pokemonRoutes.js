const express = require('express');
const axios = require('axios');
const router = express.Router();
const path = require('path');


router.get('/pokemon/:idOrName', async (req, res) => {
    const { idOrName } = req.params;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        const pokemon = response.data;

        res.json({
            id: pokemon.id,
            name: pokemon.name,
            sprites: pokemon.sprites,
        });

        

    } catch (error) {
            res.status(404).json({ error: 'Pokemon not found' });
    }
});

module.exports = router;
