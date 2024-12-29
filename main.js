const pokemonsOl = document.querySelector('.pokemons')
const loadMoreButton = document.getElementById('loadmore')
const limit = 200
const maxRecords = 400 
let offset = 151


function convertPokemonToHtml(pokemon) {
    return `
    <li class="${pokemon.type}">
                <div>
                    <p class="name">${pokemon.name}</p>
                    ${pokemon.types.map((type) => `<p class='status ${type}'>${type}</p>`).join('')}
                    
                </div>
                <p class="id">#${String(pokemon.number).padStart(3,'0')}</p>
                <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokes">
            </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {    
        const newHtml = pokemonList.map((pokemon) => `
    <li class="${pokemon.type}">
                <div>
                    <p class="name">${pokemon.name}</p>
                    ${pokemon.types.map((type) => `<p class='status ${type}'>${type}</p>`).join('')}
                    
                </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokes">
                <p class="id">#${String(pokemon.number).padStart(3,'0')}</p>
                
            </li>`
    ).join('')

    pokemonsOl.innerHTML += newHtml
        
        })
        .finally(() => console.log('Requisiçao concluída!'))
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
}) 