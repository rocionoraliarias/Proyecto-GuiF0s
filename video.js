const apiKey = 'GK3de4JTDbHEnFIhuAAaUIcudEmjYQGL'
let windowGuifos = document.getElementById('guifos-window')
var cancelar = document.getElementById('cancelar')
var aceptar = document.getElementById('comenzar')
var containerButtons = document.getElementById('botones-guifos')
var containerChild = document.getElementById('child')
let heading = document.getElementById('heading')
let videoGif = document.getElementById('video-gif')
let closeButton = document.getElementById('closebutton')
let recordButtons = document.getElementById('button-record')
let recordingButtons = document.getElementById('button-recording')
let recording = document.getElementById('comenzar')
let contentText = document.getElementById('content-text')
let timer = document.getElementById('timer')
let video = document.querySelector('video')
let imgGIF = document.getElementById('imgGIF')
let preview = document.getElementById('preview')
let btnUpload = document.getElementById('subir-guifo')
let repetirRecord = document.getElementById('repetir')
let uploadGif = document.getElementById('upload-guifo')
let cancelUpload = document.getElementById('cancelar-upload')
let newGuifo = document.getElementById('newGuifo')
let buttonUrl = document.getElementById('buttonUrl')
let buttonDownload = document.getElementById('buttonDownload')
let btnToStart = document.getElementById('btnToStart')
let cntenedorNeWguifo = document.getElementById('cntenedorNeWguifo')
let recorder;
let idAdded = false;



if (sessionStorage.getItem('theme') === 'css/stylesw.css') {

} else {
    cambiarArchivo()
}

function cambiarArchivo() {
    document.getElementById('stylesheet').href = 'css/noche.css'

}

//
windowGuifos.classList.remove("fondo-camara")
cancelar.addEventListener("click", function() {
    location.href = 'index.html';
});

//start recording gif

aceptar.addEventListener("click", ev => {
    windowGuifos.classList.add("fondo-camara")
    heading.textContent = 'Un Chequeo Antes de Empezar'
    closeButton.classList.remove("hidden")
    contentText.classList.add("hidden")
    containerButtons.classList.add("hidden")
    recordButtons.classList.remove("hidden")
    videoGif.classList.remove("hidden")
    recordGuifo()
})



//get stream and record gif


function recordGuifo() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            recorder = new GifRecorder(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                timeSlice: 1000,
            });
            //funcion x, cerrar ventana
            closeButton.addEventListener("click", () => {
                console.log('empezo')
                windowGuifos.classList.add("hidden");
                video.pause();
                stream.stop();
            });
            //funcion de capturar, empieza a grabar
            recordButtons.addEventListener("click", () => {
                recorder.record();
                let dateStarted = new Date().getTime();
                recordButtons.classList.add("hidden");
                heading.textContent = "Capturando Tu Guifo";
                recordingButtons.classList.remove("hidden")
                recorder.stream = stream;

            });
        })
        .catch(error => {
            if (error.name === "ConstraintNotSatisfiedError") {
                alert("Error: Su dispositivo no tiene la resolución requerida");
            } else if (error.name === "PermissionDeniedError") {
                alert(
                    "Error: No se ha dado permiso para usar la cámara, permita el acceso para poder usar esta funcionalidad."
                );
            } else {
                alert("Error.");
            }
        });
}

//se deja de grabar el gif y se muestra la vista previa
let recordHr;
let recordMin;
let recordSec;
let totalTime;
let slotTime;
recordingButtons.addEventListener("click", ev => {
    recordingButtons.classList.add("hidden")
    preview.classList.remove("hidden")
    recorder.stop(blob => {
        blob = blob;
        heading.textContent = "Vista Previa";
        video.srcObject = null;
        video.classList.add("hidden");
        imgGIF.classList.remove("hidden");
        let blobURL = URL.createObjectURL(blob);
        imgGIF.src = blobURL;




        //subir gif a giphy
        btnUpload.addEventListener("click", () => {
            imgGIF.classList.add("hidden");
            heading.textContent = "Subiendo Guifo";
            let slotNumber = -1;
            videoGif.classList.add("hidden");
            preview.classList.add("hidden");
            uploadGif.classList.remove("hidden");
            const controller = new AbortController();
            const signal = controller.signal;
            //boton para cancelar la subida
            cancelUpload.addEventListener("click", () => {
                controller.abort();
            });
            if (blobURL !== null) {
                let form = new FormData();
                form.append("file", recorder.blob, "miGuifo.gif");
                fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
                        signal,
                        method: "POST",
                        body: form
                    })
                    .then(res => res.json())
                    .then(response => {
                        let misGuifosActual;
                        let newId = response.data.id;
                        if (localStorage.getItem("misGuifos") === null) {
                            let misGuifosActual = [newId];
                            localStorage.setItem(
                                "misGuifos",
                                JSON.stringify(misGuifosActual)
                            );

                        } else {
                            misGuifosActual = JSON.parse(localStorage.misGuifos);
                            misGuifosActual.push(newId);
                            localStorage.setItem(
                                "misGuifos",
                                JSON.stringify(misGuifosActual)
                            );
                        }
                        idAdded = true;
                        generateMisGuifos(newId);
                        return response.data.id;
                    })
                    .then(response => {
                        uploadGif.classList.add("hidden");
                        async function generateMyGuifo(response) {
                            let url =
                                "https://api.giphy.com/v1/gifs/" +
                                response +
                                "?api_key=" +
                                apiKey;
                            const resp = await fetch(url);
                            const data = await resp.json();
                            return data;
                        }
                        data = generateMyGuifo(response);
                        data.then(response => {
                            heading.textContent = "Guifo Subido Con Éxito";
                            newGuifo.style.background =
                                "url(" +
                                response.data.images.fixed_width.url +
                                ") center center";
                            newGuifo.style.backgroundSize = "100% auto";
                            let miGuifoUrl = response.data.url;
                            windowGuifos.classList.remove("fondo-camara")
                                //Copia del link del gif
                            buttonUrl.addEventListener("click", () => {
                                let dummy = document.createElement("input");
                                document.body.appendChild(dummy);
                                dummy.value = miGuifoUrl;
                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                            });
                            //Descarga del gif
                            buttonDownload.addEventListener("click", () => {
                                invokeSaveAsDialog(blob, 'miGuifo.gif');
                            });
                            //Boton para ir al comienzo otra vez
                            btnToStart.addEventListener("click", () => {
                                heading.textContent = "Crear Guifos";
                                cntenedorNeWguifo.classList.add("hidden");
                                closeButton.classList.add("hidden");
                                contentText.classList.remove("hidden");
                                aceptar.classList.remove("hidden");
                                cancelar.classList.remove("hidden")
                                containerButtons.classList.remove("hidden");
                                windowGuifos.classList.remove("fondo-camara")
                                blobURL = URL.revokeObjectURL(blobURL);
                                blobURL = null;
                                blob = null;
                                recorder = null;
                            });
                            cntenedorNeWguifo.classList.remove("hidden");
                        });
                    })
                    .catch(error => {
                        console.error("Error al ejecutar el Fetch: ", error);
                        alert("Se canceló el upload");
                        blobURL = URL.revokeObjectURL(blobURL);
                        blobURL = null;
                        blob = null;
                        recorder = null;
                        heading.textContent = "Crear Guifos";
                        contentText.classList.remove("hidden");
                        closeButton.classList.add("hidden");
                        uploadGif.classList.add("hidden");
                        aceptar.classList.remove("hidden");
                        cancelar.classList.remove("hidden")
                        containerButtons.classList.remove("hidden");
                        windowGuifos.classList.remove("fondo-camara")
                    });
            }
        });




        //repetir captura sin subir
        repetirRecord.addEventListener("click", ev => {
            blobURL = URL.revokeObjectURL(blobURL);
            blobURL = null;
            blob = null;
            recorder = null;
            imgGIF.classList.add("hidden");
            recordingButtons.classList.remove("hidden")
            heading.textContent = "Un Chequeo Antes de Empezar";
            preview.classList.add("hidden");
            video.classList.remove("hidden");
            recording.classList.remove("hidden");
            recordGuifo();
        })
    })

})



//Otra Funcion
function calculateTimeDuration(secs) {
    hr = Math.floor(secs / 3600);
    min = Math.floor((secs - hr * 3600) / 60);
    sec = Math.floor(secs - hr * 3600 - min * 60);
    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return "00:" + hr + ":" + min + ":" + sec;
}


//Guifos creados
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
        "<p class='error'>OOPS! No has creado ningún Guifo aún. </p>";
}

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
        /*img.style.backgroundSize = "auto 100%";*/
        img.addEventListener("click", function() {
            window.open(response.data.url, "_blank");
        });
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg)
        if (idAdded !== true) {
            ctnMisGuifos.appendChild(ctnTotal);
        } else {
            ctnMisGuifos.insertBefore(ctnTotal, ctnMisGuifos.firstChild);
            idAdded === false;
        }
    });
}