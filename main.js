var menuSugestion = document.getElementById('barra-desplegable')
var searchImput = document.getElementById('search')
var btnBusqueda = document.getElementById('btn')
const contBotones = document.getElementById('contenedor-botones')
const btnDark = document.getElementById('sailor-night')
const btnDay = document.getElementById('sailor-day')
const themeDark = 'css/noche.css'
const themeDay = 'css/stylesw.css'



//change Theme
//dropdown button
document.getElementById("menu").addEventListener("click", openMenu);

function openMenu() {
    document.getElementById("dropdown").classList.toggle("active");
}

//change Theme Button

if (sessionStorage.getItem('theme') === null) {
    stylesheet.href = sessionStorage.setItem('theme', themeDay);
}

btnDark.addEventListener("click", () => {
    stylesheet.href = themeDark;
    sessionStorage.setItem('theme', themeDark)
})

btnDay.addEventListener("click", () => {
    stylesheet.href = themeDay;
    sessionStorage.setItem('theme', themeDay)
})

stylesheet.href = sessionStorage.getItem('theme');

//functions Search


document.getElementById('btn').addEventListener("click", function() {


    var keyword = document.getElementById('search').value;
    main(keyword).then(element => element)


    sessionStorage.setItem("busquedas", keyword)
    var boton = document.createElement('button')

    boton.textContent = keyword;
    boton.setAttribute('onClick', 'main(this.textContent)')
    boton.className = 'boton-azul'
    contBotones.append(boton)

    var replace = document.getElementById('content-search')
    replace.innerHTML = " ";

    esconderMenu()



})


//deployable menu 

//hidden Menu

const esconderMenu = () => {
    menuSugestion.style.display = 'none'
}



searchImput.addEventListener('keyup', ev => {
    if (ev.target.value == ' ') {
        menuSugestion.setAttribute('style', 'display:none;')

    } else {
        if (sessionStorage.getItem('theme') === themeDark) {
            btnBusqueda.style.backgroundColor = '#EE3EFE'
            btnBusqueda.style.color = '#FFFFFF'
            btnBusqueda.style.backgroundImage = 'url(./img/lupa_light.svg)'
            btnBusqueda.style.backgroundRepeat = 'no-repeat'
            btnBusqueda.style.backgroundPosition = '5px'
        } else {
            btnBusqueda.style.backgroundColor = '#F7C9F3'
            btnBusqueda.style.color = '#000000'
            btnBusqueda.style.backgroundImage = 'url(./img/lupa.svg)'
            btnBusqueda.style.backgroundRepeat = 'no-repeat'
            btnBusqueda.style.backgroundPosition = '5px'
        }
        menuSugestion.setAttribute('style', 'display:grid;')
        let url = 'https://api.giphy.com/v1/gifs/search/tags?api_key=' + apiKey + '&q=' + ev.target.value;
        let botones = document.getElementsByClassName('resultados');
        fetch(url)
            .then(response => response.json())
            .then(content => {

                for (i = 0; i < 3; i++) {
                    botones[i].setAttribute('onClick', 'main(this.textContent)');
                    botones[i].textContent = content.data[i].name;
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

})