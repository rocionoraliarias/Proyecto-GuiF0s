const apiKey = 'GK3de4JTDbHEnFIhuAAaUIcudEmjYQGL'


/*----------Creacion de Gifs en Mis Guifos----------*/

function generateMisGuifos(id) {
    async function generateMyGuifo(id) {
        let url = "https://api.giphy.com/v1/gifs/" + id + "?api_key=" + apiKey;
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }
    data = generateMyGuifo(id);
    data.then(response => {
        let ctnTotal = document.createElement("div");
        ctnTotal.setAttribute("class", "ctnTotal");
        let ctnImg = document.createElement("div");
        ctnImg.setAttribute("class", "ctnImg");
        let img = document.createElement("div");
        img.setAttribute("class", "img");
        img.style.background =
            "url(" + response.data.images.fixed_height.url + ") center center";
        img.style.backgroundSize = "auto 100%";
        img.addEventListener("click", () => {
            window.open(response.data.url, "_blank");
        });
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnMisGuifos.appendChild(ctnTotal);
    });
}
let ctnMisGuifos = document.getElementById("ctnMisGuifos");
if (localStorage.getItem("misGuifos") !== null) {
    let storageMisGuifosActual = JSON.parse(localStorage.misGuifos);
    if (storageMisGuifosActual.length === 0) {
        ctnMisGuifos.innerHTML =
            "<p class='error'>OOPS! No has creado ningún Guifo aún. </p>";
    } else {
        for (let i = storageMisGuifosActual.length - 1; i >= 0; i--) {
            generateMisGuifos(storageMisGuifosActual[i]);
        }
    }
} else {
    ctnMisGuifos.innerHTML =
        "<p class='error'>OOPS! No has creado ningún Guifo aún. Para crear uno haga <a href= 'recording.html'>click aquí. </a></p>";
}