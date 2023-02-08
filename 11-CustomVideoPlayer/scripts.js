const video = document.querySelector('video');
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]'); // Se seleccionan los que tienen la propiedad data-skip
const ranges = document.querySelectorAll('.player__slider');


function togglePlay() {
    // paused es una propiedad para saber si el video actualmente está pausado
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    // paused es una propiedad para saber si el video actualmente está pausado
    const icon = this.paused ? '►' : '❚ ❚';
    // textContent establece el texto del elemento
    toggle.textContent = icon;
}

function skip() {
    // currentTime contiene el tiempo actual de reproducción
    // Se puede establecer con esta propiedad
    // this es el elemento que está disparando el evento
    // El data set son las propiedades de la etiqueta html que tienen el data- 
    video.currentTime += Number(this.dataset.skip); 
}

function handleRangeUpdate(){
    // establece la propiedad de volumen o playbackRate
    // depende del elemento que llame la función
    // por ejemplo si la llama el elemento con el name="volume"
    // Lo que se va a establecer es el video["volume"], es decir, se establece un nuevo valor de volumen
    video[this.name] = this.value;
}

function handleProgress() {
    // currentTime tiene el tiempo actual del video
    // duration tiene el tiempo total de duración del video
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    // offsetX tiene el punto en el eje x donde se hizo clic, respecto al tamaño del elemento. (en pixeles)
    // offsetWidth nos da el tamaño total del elemento. (en pixeles)
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); // Se dispara cuando el video pasa a estado play
video.addEventListener('pause', updateButton); // Se dispara cuando el video pasa a estado pause
video.addEventListener('timeupdate', handleProgress); // Se dispara cuando el video tiene una actualización en el tiempo actual. Cada que se actualiza el currentTime del video

skipButtons.forEach( skipButton => skipButton.addEventListener('click', skip));
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // Se ejecuta la función scrub cuando el mousedown = true, es decir, cuando el usuario está presionando el clic izquierdo
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);