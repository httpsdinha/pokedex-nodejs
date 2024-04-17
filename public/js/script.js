// Buscas HTML
const searchTerm = document.querySelector('.input__search');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const form = document.querySelector('form');

let searchPokemon = 1;

const renderPokemon = async (searchTerm) => {

    try {
        const response = await fetch(`/pokemon/${encodeURIComponent(searchTerm)}`);

        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const data = await response.json();

        pokemonNumber.textContent = `#${data.id}`;
        pokemonName.textContent = data.name;

        searchPokemon = data.id;

        // Geração do pokemon:
        const pokemonId = data.id;
       
        // Pokemons de id 1 a 649 [GIF]
        if (pokemonId >= 1 && pokemonId <=649){
            const gifUrl = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            pokemonImage.src = gifUrl;
        }    
        // Pokemons de id 650 a 1025 [img static]
        else if (pokemonId >= 650 && pokemonId <= 1025){
            const gifUrl = data.sprites.front_default;
            pokemonImage.src = gifUrl;
        }

        // Redefinição do input
        searchTerm.value = '';

    } catch (error) {
        console.error('Error when fetching Pokemon data:', error);
        alert('Pokemon not found. Try Again');

    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const term = searchTerm.value.trim().toLowerCase();
    if (term === '') {
        alert('Please, enter the name or number of a Pokemon');
        return;
    }
    await renderPokemon(term);
    searchTerm.value = '';
});

buttonPrev.addEventListener('click', async () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        await renderPokemon(searchPokemon);
    }
    else{
        searchPokemon = 1025;
        await renderPokemon(searchPokemon);
    }
    searchTerm.value = '';
});

buttonNext.addEventListener('click', async () => {
    if(searchPokemon < 1 ){
        searchPokemon = 1;
        await renderPokemon(searchPokemon);
    }
    else if (searchPokemon < 1025 ){
        searchPokemon += 1;
        await renderPokemon(searchPokemon);
    }
    else if (searchPokemon >=1025) {
        searchPokemon = 1;
        await renderPokemon(searchPokemon);
    }
    searchTerm.value = '';
});

renderPokemon(searchPokemon);
