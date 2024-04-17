const express = require('express');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = 3000;

// Express serve arquivo estáticos
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
