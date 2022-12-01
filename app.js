const API_KEY = '3a25bd42a16f47cba1c61cafe8a2b29a';

function cardJogoResumido(game) {
    let platforms = '';
    for ([i, plat] of game.platforms.entries()) {
      platforms += `${plat.platform.name}${i < (game.platforms.length - 1) ? ", " : ""}`
    }

    return `
      <div class="my-card" onclick="location.href = 'detalhes.html?id=${game.id}';">
        <div class="my-card-inner">
          <img src="${game.background_image}" class="my-card-img">
          <div class="my-card-side">
            <h3 style="margin: 0; margin-bottom: 20px;">${game.name}</h3>
            <span><b>Released</b>: ${game.released}</span><br>
            <span><b>Metacritic</b>: ${game.metacritic}</span><br>
            <span><b>Platforms</b>: ${platforms}</span><br>
          </div>
        </div>
      </div>
    `;
}

function cardJogoDetalhado(game) {
    let platforms = '';
    for ([i, plat] of game.platforms.entries()) {
        platforms += `${plat.platform.name}${i < (game.platforms.length - 1) ? ", " : ""}`
    }

    return `
      <div class="my-card">
        <div class="my-card-inner-details">
            <a href="#" onclick="history.back();">Go back</a>
            <h1 style="margin: 0; margin-bottom: 20px;margin-top: 10px;">${game.name}</h1>
            <img src="${game.background_image}" class="my-card-img-banner">
            <div class="my-card-side-details">
                <span><b>Released</b>: ${game.released}</span><br>
                <span><b>Metacritic</b>: ${game.metacritic}</span><br>
                <span><b>Platforms</b>: ${platforms}</span><br>
                <span><b>Website</b>: <a href="${game.website}">${game.website}</a></span><br>
                <span><b>Reddit</b>: <a href="${game.reddit_url}">${game.reddit_url}</a></span><br>
                <br><span><b>Description</b>: ${game.description}</span><br>
            </div>
        </div>
      </div>
    `;
}

function carregarListaJogos() {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
            let html = "";
            for (game of json.results) {
                html += cardJogoResumido(game);
                console.log(game);
            }
            document.getElementById("lista-jogos").innerHTML = html;
        });
}

function exibeDetalhamentoJogo() {
    let id = (new URLSearchParams(window.location.search)).get('id');
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            document.getElementById("lista-jogos").innerHTML = cardJogoDetalhado(json);
        });
}

function pesquisaJogo() {
    let query = document.getElementById("query").value;
    location.href = `pesquisa.html?query=${query}`;
}

function paginaPesquisa() {
    let query = (new URLSearchParams(window.location.search)).get('query');
    fetch(`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
            let html = "";
            for (game of json.results) {
                html += cardJogoResumido(game);
                console.log(game);
            }
            document.getElementById("lista-jogos").innerHTML = html;
        });
}