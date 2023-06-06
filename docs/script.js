// Arreglo de objetos Audio
var audio = [
  new Audio('Aud/AudGuitar.mp3'),
  new Audio('Aud/AudPiano.mp3'),
  new Audio('Aud/AudBass.mp3'),
  new Audio('Aud/AudSynth.mp3'),
  new Audio('Aud/AudOrgan.mp3'),
  new Audio('Aud/AudTrumpet.mp3'),
  new Audio('Aud/AudFiddle.mp3'),
  new Audio('Aud/AudDrums.mp3')
];

// Variables para controlar el estado de reproducción de cada audio
var reproduciendo1 = false;
var reproduciendo2 = false;
var reproduciendo3 = false;
var reproduciendo4 = false;
var reproduciendo5 = false;
var reproduciendo6 = false;
var reproduciendo7 = false;
var reproduciendo8 = false;

// Variable para controlar el cooldown
let cooldown = false;

// Obtener el elemento canvas y su contexto
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

/**
 * Función para generar un color aleatorio en formato RGB
 * @method getRandomColor de la función
 * return color
 */
function getRandomColor() {
  // Variables para generar colores aleatorios
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Función para dibujar puntos aleatorios de diferentes colores
 * @method drawRandomPoints de la función
 */
function drawRandomPoints() {
  // Limpiar el lienzo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Generar puntos aleatorios y dibujarlos
  for (var i = 0; i < 100; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var color = getRandomColor();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
  }
}

/**
 * Muestra la progressBar y realiza una animación de entrada y salida
 * @method mostrarBarra de la función
 */

function mostrarBarra() {
  var barra = document.getElementById("barra");
  // Mostrar la barra y eliminar la clase "ocultar" si estaba aplicada anteriormente
  barra.style.display = "block";
  barra.classList.remove("ocultar");

  // Forzar un nuevo ciclo de renderizado para reiniciar la transición
  void barra.offsetWidth;

  // Agregar clase "mostrar" para animar la entrada de la barra
  barra.classList.add("mostrar");

  // Después de 3 segundos, remover la clase "mostrar" para animar la salida de la barra
  setTimeout(function () {
    barra.classList.remove("mostrar");
    barra.classList.add("ocultar");

    // Restablecer la barra después de que desaparezca
    setTimeout(function () {
      barra.style.display = "none";
      barra.classList.remove("ocultar");
    }, 500); // Tiempo de transición
  }, 3000);
}

/**
 * Controla la reproducción y pausa del primer audio
 * @method funcion1 de la función
 */
function funcion1() {
  if (!cooldown) {
    if (!reproduciendo1) {
      // Reproducir el primer audio en loop
      audio[0].play();
      audio[0].loop = true;
      reproduciendo1 = true;
      document.getElementById('sonido1').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      // Activar el cooldown por 3 segundos para mantener el ritmo
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      // Detener la reproducción del primer audio
      audio[0].pause();
      audio[0].loop = false;
      reproduciendo1 = false;
      audio[0].currentTime = 0;
      document.getElementById('sonido1').textContent = 'Guitar';
    }
  }
}

/**
 * Función para controlar el segundo audio
 * @method funcion2 de la función
 */
function funcion2() {
  if (!cooldown) {
    if (!reproduciendo2) {
      audio[2].play();
      audio[2].loop = true;
      reproduciendo2 = true;
      document.getElementById('sonido2').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[2].pause();
      audio[2].loop = false;
      reproduciendo2 = false;
      audio[2].currentTime = 0;
      document.getElementById('sonido2').textContent = 'Guitar Bass';
    }
  }
}

// Las funciones funcion3(), funcion4(), ..., funcion8() siguen un patrón similar a funcion2()
// Controlan la reproducción y pausa de los audios restantes (3-8) y actualizan el texto del botón correspondiente.

/**
 * Función para controlar el tercer audio
 * @method funcion3 de la función
 */
function funcion3() {
  if (!cooldown) {
    if (!reproduciendo3) {
      audio[6].play();
      audio[6].loop = true;
      reproduciendo3 = true;
      document.getElementById('sonido3').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[6].pause();
      audio[6].loop = false;
      reproduciendo3 = false;
      audio[6].currentTime = 0;
      document.getElementById('sonido3').textContent = 'Fiddle';
    }
  }
}

// Las funciones funcion4(), funcion5(), ..., funcion8() siguen un patrón similar a funcion3()
// Controlan la reproducción y pausa de los audios restantes (4-8) y actualizan el texto del botón correspondiente.

/**
 * Función para controlar el cuarto audio
 * @method funcion4 de la función
 */
function funcion4() {
  if (!cooldown) {
    if (!reproduciendo4) {
      audio[1].play();
      audio[1].loop = true;
      reproduciendo4 = true;
      document.getElementById('sonido4').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[1].pause();
      audio[1].loop = false;
      reproduciendo4 = false;
      audio[1].currentTime = 0;
      document.getElementById('sonido4').textContent = 'Piano';
    }
  }
}

/**
 * Función para controlar el quinto audio
 * @method funcion5 de la función
 */
function funcion5() {
  if (!cooldown) {
    if (!reproduciendo5) {
      audio[5].play();
      audio[5].loop = true;
      reproduciendo5 = true;
      document.getElementById('sonido5').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[5].pause();
      audio[5].loop = false;
      reproduciendo5 = false;
      audio[5].currentTime = 0;
      document.getElementById('sonido5').textContent = 'Trumpet';
    }
  }
}

/**
 * Función para controlar el sexto audio
 * @method funcion6 de la función
 */
function funcion6() {
  if (!cooldown) {
    if (!reproduciendo6) {
      audio[7].play();
      audio[7].loop = true;
      reproduciendo6 = true;
      document.getElementById('sonido6').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[7].pause();
      audio[7].loop = false;
      reproduciendo6 = false;
      audio[7].currentTime = 0;
      document.getElementById('sonido6').textContent = 'Drums';
    }
  }
}

/**
 * Función para controlar el séptimo audio
 * @method funcion7 de la función
 */
function funcion7() {
  if (!cooldown) {
    if (!reproduciendo7) {
      audio[3].play();
      audio[3].loop = true;
      reproduciendo7 = true;
      document.getElementById('sonido7').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[3].pause();
      audio[3].loop = false;
      reproduciendo7 = false;
      audio[3].currentTime = 0;
      document.getElementById('sonido7').textContent = 'Synth';
    }
  }
}

/**
 * Función para controlar el octavo audio
 * @method funcion8 de la función
 */
function funcion8() {
  if (!cooldown) {
    if (!reproduciendo8) {
      audio[4].play();
      audio[4].loop = true;
      reproduciendo8 = true;
      document.getElementById('sonido8').textContent = 'Detener';

      mostrarBarra();
      drawRandomPoints();

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 3000);
    } else {
      audio[4].pause();
      audio[4].loop = false;
      reproduciendo8 = false;
      audio[4].currentTime = 0;
      document.getElementById('sonido8').textContent = 'Organ';
    }
  }
}