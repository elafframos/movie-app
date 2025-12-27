/* script.js */
const resultMain = document.querySelector(".content"); /* Div de resultados */
const searchButton = document.getElementById("searchButton");  /* Botão de busca */
const API_KEY = 'fb90ebb8c15af78d51859ea56046d33c'; /* Chave da API TMDB */

/* Carrega os filmes em alta ao carregar a página */
window.addEventListener('load', function() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=pt-BR&page=1`;   /* URL da API para filmes em alta */
    const resultHero = document.getElementById("hero"); /* Div de destaque do filme */

    fetch(url)
    .then(response => response.json())  /* Converte a resposta para JSON */
    .then(data => {
        resultHero.innerHTML = `<h1>${data.results[0].title}</h1> <br>
                                <img src="https://image.tmdb.org/t/p/w1280${data.results[0].backdrop_path}" id="hero-image" alt="${data.results[0].title}">
                                `;   /* Limpa resultados anteriores */
    })
    .catch(error => {
        resultDiv.innerHTML = "Ocorreu um erro ao carregar filme.";   /* Mensagem de erro */
    });
});

/* Função para carregar fileiras de filmes */
async function carregarFileira(tipoOuId, containerId) {
    let url; /* Variável para armazenar a URL da API */

    // Se o que passamos for um NÚMERO, ele busca por Gênero
    if (typeof tipoOuId === 'number') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${tipoOuId}&language=pt-BR`; /* URL da API para filmes por gênero */
    } 
    // Se for um TEXTO (como 'popular'), ele usa o endpoint de populares
    else {
        url = `https://api.themoviedb.org/3/movie/${tipoOuId}?api_key=${API_KEY}&language=pt-BR`; /* URL da API para filmes populares */
    }

    try {
        const response = await fetch(url); /* Faz a requisição à API */
        const data = await response.json(); /* Converte a resposta para JSON */
        const container = document.getElementById(containerId); /* Container onde os filmes serão exibidos */
        
        container.innerHTML = "";
        data.results.forEach(filme => {
            container.innerHTML += `
                <div id="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" id="posters" alt="${filme.title}">
                    <h4>${filme.title}</h4>
                </div>
            `; /* Adiciona cada filme ao container correspondente */
        });
    } catch (err) {
        console.error("Erro ao carregar:", err);
    }
}

/* Carrega as fileiras de filmes ao iniciar */
carregarFileira('popular', 'popular'); // Categoria Especial
carregarFileira(28, 'track-acao');
carregarFileira(27, 'track-terror');
carregarFileira(35, 'track-comedia');


/* Evento de clique no botão de busca */
searchButton.addEventListener("click", function() {
    const searchInput = document.getElementById("searchInput");   /* Input de busca */
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.value}&language=pt-BR`;   /* URL da API com o termo de busca */

    fetch(url)
    .then(response => response.json())  /* Converte a resposta para JSON */
    .then(data => {
        resultMain.innerHTML = "";   /* Limpa resultados anteriores */
        resultMain.innerHTML += `<button onclick="regarregar()" id="back-button">Voltar</button>`; 

        data.results.forEach(film => {
            resultMain.innerHTML += `
                                    <div id=results>
                                    <h2>${film.title}</h2> 
                                    <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" id="poster-result" alt="${film.title} Poster"/>    
                                    <p>Lançamento: ${film.release_date}</p>
                                    <p>${film.overview}</p>
                                    <hr/>
                                    </div>`; /* Adiciona cada filme aos resultados */
        });
    })
    .catch(error => {
        resultDiv.innerHTML = "Ocorreu um erro ao buscar os filmes.";   /* Mensagem de erro */
    });
});

function regarregar(){
    const backButton = document.getElementById('back-button')

    backButton.addEventListener('click', function(){
        location.reload()
    })

}