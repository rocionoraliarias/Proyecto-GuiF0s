const resultado = document.getElementById('result')
const apiKey = 'GK3de4JTDbHEnFIhuAAaUIcudEmjYQGL'
const divCuadrado = document.getElementById('sugerencias')
const divResult = document.getElementById('content-search')
const listSugerencia = document.getElementById('barra-desplegable')
var limit = 8

//buscador 
function getSearchResults(search) {
    const found = fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey + '&limit=' + limit)

    .then(response => {
            return response.json();
        })
        .then(dat => {
            return dat
        })
        .catch(error => {
            return error;
        });
    return found;
}
async function main(search) {
    const result = await getSearchResults(search);
    for (let index = 0; index < result.data.length; index++) {
        var element = result.data[index].images.original.url
        var divBackground = document.createElement('div')
        let span = document.createElement('span')
        let imagen = document.createElement('img')
        let divTitulo = document.createElement('div')
        imagen.setAttribute('src', `${ element }`)
        imagen.className = 'div-imagen'
        divBackground.className = 'background-div'
        var title = result.data[index].title
        let palabrasTitle = title.split(' ')[1]
        let palabraTitle = title.split(' ')[2]
        span.textContent = '#' + ` ${palabrasTitle}` + ' ' + '#' + ` ${palabraTitle}`
        span.className = 'span-background';
        divTitulo.className = 'div-titulo'
        divTitulo.append(span)
        divBackground.append(imagen)
        divBackground.append(divTitulo)
        divResult.append(divBackground)


    }
}
//pedido Api trending
function getTopicResult() {
    const limit = 4

    const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&rating=G`)

    .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(error => {
            return error
        })
    return found
}

//impresion sugerencias
async function Impress() {
    const resultado = await getTopicResult(4)
    console.log(resultado)
    for (let index = 0; index < resultado.data.length; index++) {
        var element = resultado.data[index].images.original.url
        let divTendency = document.createElement('div')
        let divtitulo = document.createElement('div')
        let divImagen = document.createElement('div')
        let span = document.createElement('span')
        let imagen = document.createElement('img')
        let boton = document.createElement('button')
        var title = resultado.data[index].title
        let palabrasTitle = title.split(' ')[1]
        let palabraTitle = title.split(' ')[2]
        span.textContent = '#' + ` ${palabrasTitle}` + ' ' + '#' + ` ${palabraTitle}`
        imagen.setAttribute('src', ` ${element}`)
        boton.className = 'ver-mas'
        boton.textContent = 'Ver Mas'
        boton.setAttribute('onClick', 'main(this.palabrasTitle)')
        imagen.className = 'width'
        divTendency.className = 'cuadrado-gris'
        divImagen.className = 'show'
        divtitulo.className = 'barra-cuadrado'
        span.className = 'span-barra-cuadrado'
        divtitulo.append(span)
        divTendency.append(divtitulo)
        divTendency.append(boton)
        divTendency.append(imagen)
        divCuadrado.append(divTendency)


    }
}
Impress().then(result => result)
    //impresion hoy te sugerimos

function getsurgerencias() {
    const limit = 12

    const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&rating=G`)

    .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(error => {
            return error
        })
    return found
}
async function recommended() {
    const result = await getsurgerencias()

    for (let index = 0; index < result.data.length; index++) {
        var element = result.data[index].images.original.url
        let divBackground = document.createElement('div')
        let Imagen = document.createElement('img')
        let spanTitle = document.createElement('div')
        spanTitle.textContext = result.data[index].title
        Imagen.className = 'div-imagen'
        divBackground.className = 'background-grey'
        spanTitle.className = 'span-title';
        var title = result.data[index].title
        let palabrasTitle = title.split(' ')[1]
        let palabraTitle = title.split(' ')[2]
        spanTitle.textContent = '#' + ` ${palabrasTitle}` + ' ' + '#' + ` ${palabraTitle}`
        Imagen.setAttribute('src', `${element}`)
        divBackground.append(Imagen)
        divBackground.append(spanTitle)

        resultado.append(divBackground)


    }
}
recommended().then(listo => listo)