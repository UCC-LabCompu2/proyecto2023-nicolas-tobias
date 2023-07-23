// Arreglo de objetos Audio
var audio = [
  new Audio('Aud/AudGuitar.mp3'),
  new Audio('Aud/AudBass.mp3'),
  new Audio('Aud/AudFiddle.mp3'),
  new Audio('Aud/AudPiano.mp3'),
  new Audio('Aud/AudTrumpet.mp3'),
  new Audio('Aud/AudDrums.mp3'),
  new Audio('Aud/AudOrgan.mp3'),
  new Audio('Aud/AudSynth.mp3')
];

// Arreglo de colores asociados a cada botón
var coloresBotones = [
  "#FF0000", // Color para el botón 0 (Guitar)
  "#00FF00", // Color para el botón 1 (Guitar Bass)
  "#0000FF", // Color para el botón 2 (Fiddle)
  "#FFFF00", // Color para el botón 3 (Piano)
  "#FF00FF", // Color para el botón 4 (Trumpet)
  "#00FFFF", // Color para el botón 5 (Drums)
  "#FFA500", // Color para el botón 6 (Organ)
  "#FF0090", // Color para el botón 7 (Synth)
];

// Variables para controlar el estado de reproducción de cada audio
var reproduciendo = [false, false, false, false, false, false, false, false];

// Variable para controlar el cooldown
let cooldown = false;

// Obtener el elemento canvas y su contexto
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

/**
 * Función para dibujar puntos aleatorios y mezclar los colores cuando varios audios se reproducen al mismo tiempo
 * @method drawRandomPoints de la función
 */
function drawRandomPoints() {
  // Si no hay reproducción en curso, detener el dibujo del lienzo
  if (!reproduciendo.includes(true)) {
    return;
  }

  // Limpiar el lienzo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Variable para almacenar el color resultante de la mezcla
  var mixedColor = { r: 0, g: 0, b: 0 };

  // Obtener la cantidad de audios en reproducción
  var activeAudioCount = 0;

  // Calcular la suma de los componentes RGB de los colores de los audios en reproducción
  for (var i = 0; i < audio.length; i++) {
    if (reproduciendo[i]) {
      var buttonIndex = i;
      var color = coloresBotones[buttonIndex];
      var rgb = hexToRgb(color);
      mixedColor.r += rgb.r;
      mixedColor.g += rgb.g;
      mixedColor.b += rgb.b;
      activeAudioCount++;
    }
  }

  // Calcular el color promedio para obtener el color resultante de la mezcla
  if (activeAudioCount > 0) {
    mixedColor.r = Math.floor(mixedColor.r / activeAudioCount);
    mixedColor.g = Math.floor(mixedColor.g / activeAudioCount);
    mixedColor.b = Math.floor(mixedColor.b / activeAudioCount);
  }

  // Dibujar los puntos con el color resultante de la mezcla
  for (var i = 0; i < 100; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    ctx.fillStyle = `rgb(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b})`;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Solicitar el siguiente ciclo de repintado solo si hay reproducción en curso
  requestAnimationFrame(drawRandomPoints);
}

/**
 * Función para convertir un color en formato hexadecimal a RGB
 * @method hexToRgb de la función
 * @param {string} hex - Color en formato hexadecimal
 * @returns {object} - Objeto con las componentes RGB del color
 */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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
 * Función para controlar la reproducción de un audio
 * @method toggleAudio de la función
 * @param {number} index - Índice del audio en el arreglo "audio"
 * @param {string} buttonId - Id del botón que controla el audio
 */
function toggleAudio(index, buttonId) {
  if(index >= 0 && index < audio.length) {
      if (!cooldown) {
        if (!reproduciendo[index]) {
          audio[index].play();
          audio[index].loop = true;
          reproduciendo[index] = true;
          document.getElementById(buttonId).textContent = 'Detener';

          // Iniciar el dibujo del lienzo solo cuando se inicia la reproducción del audio
          drawRandomPoints();
          
        } else {
          audio[index].pause();
          audio[index].loop = false;
          reproduciendo[index] = false;
          audio[index].currentTime = 0;
          document.getElementById(buttonId).textContent = getAudioName(index);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    
        mostrarBarra();
    
        // Activar el cooldown por 3 segundos para mantener el ritmo
        cooldown = true;
        setTimeout(() => {
          cooldown = false;
        }, 3000);
      }
  } else {
      console.error("Indice de audio fuera del rango del arreglo.");
  }
}

/**
 * Función para obtener el nombre del audio basado en su índice
 * @method getAudioName de la función
 * @param {number} index - Índice del audio en el arreglo "audio"
 * @returns {string} - Nombre del audio
 */
function getAudioName(index) {
  var nombres = ['Guitar', 'Guitar Bass', 'Fiddle', 'Piano', 'Trumpet', 'Drums', 'Organ', 'Synth'];
  return nombres[index];
}

// Asignar eventos a los botones
for (let i = 0; i < 8; i++) {
  document.getElementById('sonido' + i).addEventListener('click', function () {
    toggleAudio(i, 'sonido' + i);
  });
}