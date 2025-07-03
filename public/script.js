// Fecha del evento - 26 de Julio 2025
const eventDate = new Date("2025-07-26T18:00:00").getTime()

// Función para actualizar el contador regresivo
function updateCountdown() {
  const now = new Date().getTime()
  const distance = eventDate - now

  if (distance < 0) {
    document.querySelector(".countdown-container").innerHTML = `
      <div class="countdown-card celebration">
        <div class="countdown-number">¡Hoy!</div>
        <div class="countdown-label">Es el gran día</div>
      </div>
    `
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  // Actualizar los números con animación
  animateNumber("days", days)
  animateNumber("hours", hours)
  animateNumber("minutes", minutes)
  animateNumber("seconds", seconds)
}

// Función para animar los números del contador
function animateNumber(elementId, newValue) {
  const element = document.getElementById(elementId)
  if (element && element.textContent !== newValue.toString().padStart(2, "0")) {
    element.style.transform = "scale(1.2)"
    element.textContent = newValue.toString().padStart(2, "0")
    setTimeout(() => {
      element.style.transform = "scale(1)"
    }, 200)
  }
}

// Actualizar contador cada segundo
setInterval(updateCountdown, 1000)
updateCountdown()

// Galería modal mejorada
let currentImageIndex = 0
const galleryImages = [
  "./src/img/portada.jpg",
  "./src/img/3.jpg",
  "./src/img/4.jpg",
  "./src/img/5.jpg",
  "./src/img/6.jpg",
  "./src/img/7.jpg"
]

function openModal(index) {
  currentImageIndex = index
  const modal = document.getElementById("galleryModal")
  const modalImage = document.getElementById("modalImage")

  modal.style.display = "block"
  modalImage.src = galleryImages[index]

  // Animación de entrada suave
  requestAnimationFrame(() => {
    modal.style.opacity = "1"
    modal.querySelector(".modal-content").style.transform = "translateY(-50%) scale(1)"
  })

  // Prevenir scroll del body
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("galleryModal")
  modal.style.opacity = "0"
  modal.querySelector(".modal-content").style.transform = "translateY(-50%) scale(0.9)"

  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length
  const modalImage = document.getElementById("modalImage")

  // Animación de transición
  modalImage.style.opacity = "0"
  setTimeout(() => {
    modalImage.src = galleryImages[currentImageIndex]
    modalImage.style.opacity = "1"
  }, 150)
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
  const modalImage = document.getElementById("modalImage")

  // Animación de transición
  modalImage.style.opacity = "0"
  setTimeout(() => {
    modalImage.src = galleryImages[currentImageIndex]
    modalImage.style.opacity = "1"
  }, 150)
}

// Eventos de teclado para el modal
document.addEventListener("keydown", (event) => {
  const modal = document.getElementById("galleryModal")
  if (modal.style.display === "block") {
    switch (event.key) {
      case "Escape":
        closeModal()
        break
      case "ArrowRight":
        nextImage()
        break
      case "ArrowLeft":
        prevImage()
        break
    }
  }
})

// Función para abrir Google Maps
function openMap() {
  const address = encodeURIComponent("Salón de Eventos Los Jardines, Av. Principal #123")
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`
  window.open(googleMapsUrl, "_blank")
}

// Confirmación de asistencia mejorada
function confirmAttendance(attending) {
  const messages = {
    true: {
      title: "¡Gracias por confirmar! 💕",
      text: "Tu presencia hará este día aún más especial.\n\nNos vemos el 26 de Julio de 2025.\n\n¡No puedo esperar a celebrar contigo!",
      icon: "🎉",
    },
    false: {
      title: "Gracias por avisar 💔",
      text: "Aunque no puedas acompañarme físicamente, sé que estarás conmigo en pensamiento.\n\nTe extrañaré en esta fecha tan especial.",
      icon: "😢",
    },
  }

  const message = messages[attending]

  // Crear modal personalizado para la confirmación
  showCustomAlert(message.title, message.text, message.icon)

  // Aquí podrías enviar la confirmación a un servidor
  // sendRSVP(attending);
}

function showCustomAlert(title, text, icon) {
  // Crear elementos del modal
  const overlay = document.createElement("div")
  overlay.className = "custom-alert-overlay"

  const alertBox = document.createElement("div")
  alertBox.className = "custom-alert-box"

  alertBox.innerHTML = `
    <div class="alert-icon">${icon}</div>
    <h3 class="alert-title">${title}</h3>
    <p class="alert-text">${text}</p>
    <button class="alert-button" onclick="closeCustomAlert()">Entendido</button>
  `

  overlay.appendChild(alertBox)
  document.body.appendChild(overlay)

  // Mostrar con animación
  requestAnimationFrame(() => {
    overlay.style.opacity = "1"
    alertBox.style.transform = "scale(1)"
  })
}

function closeCustomAlert() {
  const overlay = document.querySelector(".custom-alert-overlay")
  if (overlay) {
    overlay.style.opacity = "0"
    overlay.querySelector(".custom-alert-box").style.transform = "scale(0.9)"
    setTimeout(() => {
      document.body.removeChild(overlay)
    }, 300)
  }
}

// Control de música mejorado
let isPlaying = false
let audio = null

function playMusic() {
  if (!audio) {
    audio = new Audio("../public/music.mp3")
    audio.loop = true
    audio.volume = 0.3
  }
  audio.play().then(() => {
    isPlaying = true
    const button = document.getElementById("musicToggle")
    if (button) {
      button.classList.add("playing")
      button.innerHTML = '<i class="fas fa-pause"></i>'
      button.title = "Pausar música"
    }
  }).catch((e) => {
    // Si el navegador bloquea la reproducción automática, no hacer nada
    // El usuario podrá activarla manualmente
  })
}

function toggleMusic() {
  const button = document.getElementById("musicToggle")

  if (!audio) {
    audio = new Audio("../public/music.mp3")
    audio.loop = true
    audio.volume = 0.3
  }

  if (isPlaying) {
    audio.pause()
    button.classList.remove("playing")
    button.innerHTML = '<i class="fas fa-music"></i>'
    button.title = "Reproducir música"
    isPlaying = false
  } else {
    audio.play().catch((e) => {
      showMusicError()
    })
    button.classList.add("playing")
    button.innerHTML = '<i class="fas fa-pause"></i>'
    button.title = "Pausar música"
    isPlaying = true
  }
}

function showMusicError() {
  const button = document.getElementById("musicToggle")
  button.style.background = "var(--text-muted)"
  button.title = "Música no disponible"
  setTimeout(() => {
    button.style.background = "var(--gradient-accent)"
    button.title = "Reproducir música"
  }, 2000)
}

// Animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

// Observar elementos para animaciones
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    ".countdown-card, .event-main-card, .dress-code-container, .gallery-item, .location-card, .rsvp-card",
  )

  elementsToAnimate.forEach((el) => {
    observer.observe(el)
  })
}

// Smooth scrolling mejorado
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Agregar estilos CSS para las animaciones personalizadas
  const style = document.createElement("style")
  style.textContent = `
    .custom-alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .custom-alert-box {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      text-align: center;
      max-width: 400px;
      margin: 1rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }
    
    .alert-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .alert-title {
      font-family: "Playfair Display", serif;
      font-size: 1.5rem;
      color: var(--accent-pink);
      margin-bottom: 1rem;
    }
    
    .alert-text {
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 2rem;
      white-space: pre-line;
    }
    
    .alert-button {
      background: var(--gradient-accent);
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .alert-button:hover {
      transform: translateY(-2px);
    }
    
    .animate-in {
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .modal-content {
      transform: translateY(-50%) scale(0.9);
      transition: transform 0.3s ease;
    }
  `
  document.head.appendChild(style)

  // Inicializar todas las funcionalidades
  initScrollAnimations()
  initSmoothScrolling()

  // Agregar clase de carga completada
  document.body.classList.add("loaded")

  // Precargar imágenes de la galería
  galleryImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  // Reproducir música automáticamente al cargar la página
  playMusic()

  function tryPlayMusicOnInteraction() {
    if (!isPlaying) {
      playMusic();
      // Solo intenta una vez
      window.removeEventListener('click', tryPlayMusicOnInteraction);
      window.removeEventListener('keydown', tryPlayMusicOnInteraction);
      window.removeEventListener('touchstart', tryPlayMusicOnInteraction);
    }
  }

  window.addEventListener('click', tryPlayMusicOnInteraction);
  window.addEventListener('keydown', tryPlayMusicOnInteraction);
  window.addEventListener('touchstart', tryPlayMusicOnInteraction);

  // Simular una interacción de usuario después de un pequeño retraso
  setTimeout(() => {
    if (!isPlaying) {
      const event = new Event('click');
      document.body.dispatchEvent(event);
    }
  }, 500);

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var iframeAudio = document.getElementById('iframeAudio');
  var playAudio = document.getElementById('playAudio');
  if (!isChrome){
      if (iframeAudio) iframeAudio.parentNode.removeChild(iframeAudio);
  } else {
      if (playAudio) playAudio.parentNode.removeChild(playAudio);
  }

  // Mostrar/ocultar input de cantidad de acompañantes
  const acompanantesSelect = document.getElementById('acompanantes');
  if (acompanantesSelect) {
    acompanantesSelect.addEventListener('change', function() {
      const div = document.getElementById('cantidadAcompanantesDiv');
      if (this.value === 'Sí') {
        div.style.display = 'block';
        document.getElementById('cantidadAcompanantes').required = true;
      } else {
        div.style.display = 'none';
        document.getElementById('cantidadAcompanantes').required = false;
      }
    });
  }

  // Mostrar formulario al hacer clic en el botón
  const abrirFormularioBtn = document.getElementById('abrirFormularioBtn');
  const confirmacionForm = document.getElementById('confirmacionForm');
  if (abrirFormularioBtn && confirmacionForm) {
    abrirFormularioBtn.addEventListener('click', function() {
      abrirFormularioBtn.style.display = 'none';
      confirmacionForm.style.display = 'block';
    });
  }

  // Mostrar/ocultar campos según confirmación
  const confirmacionSelect = document.getElementById('confirmacion');
  const acompanantesDiv = document.getElementById('acompanantesDiv');
  const cantidadAcompanantesDiv = document.getElementById('cantidadAcompanantesDiv');

  if (confirmacionSelect) {
    confirmacionSelect.addEventListener('change', function() {
      if (this.value === 'Sí') {
        acompanantesDiv.style.display = '';
        acompanantesSelect.required = true;
        // Solo mostrar cantidad si ya estaba seleccionado 'Sí' en acompañantes
        if (acompanantesSelect.value === 'Sí') {
          cantidadAcompanantesDiv.style.display = '';
          document.getElementById('cantidadAcompanantes').required = true;
        } else {
          cantidadAcompanantesDiv.style.display = 'none';
          document.getElementById('cantidadAcompanantes').required = false;
        }
      } else {
        acompanantesDiv.style.display = 'none';
        cantidadAcompanantesDiv.style.display = 'none';
        acompanantesSelect.required = false;
        document.getElementById('cantidadAcompanantes').required = false;
      }
    });
  }

  // Enviar formulario al backend y mostrar modal según respuesta
  if (confirmacionForm) {
    confirmacionForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const nombres = document.getElementById('nombre').value;
      const confirmacion = document.getElementById('confirmacion').value; // 'Sí' o 'No'
      let acompanante = '';
      let total = 1;
      if (confirmacion === 'Sí') {
        acompanante = document.getElementById('acompanantes').value;
        if (acompanante === 'Sí') {
          const cantidad = parseInt(document.getElementById('cantidadAcompanantes').value, 10);
          total += isNaN(cantidad) ? 0 : cantidad;
        }
      }

      // Si no asiste, mostrar modal y no enviar acompañantes/total
      if (confirmacion === 'No') {
        confirmacionForm.reset();
        confirmacionForm.style.display = 'none';
        abrirFormularioBtn.style.display = 'block';
        showCustomAlert('Gracias por avisar 💔', 'Aunque no puedas acompañarme físicamente, sé que estarás conmigo en pensamiento.\n\nTe extrañaré en esta fecha tan especial.', '😢');
        await fetch('/api/confirmacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombres, confirmacion, acompanante: null, total: null })
        });
        return;
      }

      const respuesta = await fetch('/api/confirmacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombres, confirmacion, acompanante, total })
      });

      const mensaje = document.getElementById('mensajeConfirmacion');
      if (respuesta.ok) {
        mensaje.textContent = '';
        confirmacionForm.reset();
        document.getElementById('cantidadAcompanantesDiv').style.display = 'none';
        confirmacionForm.style.display = 'none';
        abrirFormularioBtn.style.display = 'block';
        // Mostrar modal personalizado según respuesta
        if (confirmacion === 'Sí') {
          showCustomAlert('¡Gracias por confirmar! 💕', 'Tu presencia hará este día aún más especial.\n\nNos vemos el 26 de Julio de 2025.\n\n¡No puedo esperar a celebrar contigo!', '🎉');
        }
      } else {
        mensaje.textContent = 'Ocurrió un error. Intenta de nuevo.';
      }
    });
  }

  // --- MODAL DE CONFIRMADOS ---
  function openConfirmadosModal() {
    const modal = document.getElementById('confirmadosModal');
    const lista = document.getElementById('listaConfirmados');
    lista.innerHTML = '<span style="color:var(--text-muted)">Cargando...</span>';
    modal.style.display = 'block';
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.querySelector('.modal-content').style.transform = 'translateY(-50%) scale(1)';
    });
    document.body.style.overflow = 'hidden';
    fetch('/api/confirmados')
      .then(r => r.json())
      .then(data => {
        if (!data.length) {
          lista.innerHTML = '<span style="color:var(--text-muted)">Aún no hay confirmaciones.</span>';
          return;
        }
        lista.innerHTML = `
          <div style=\"overflow-x:auto;\">
            <table class=\"confirmados-table\" style=\"width:100%; border-collapse:collapse; font-size:1rem;\">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acompañantes</th>
                  <th>Confirmación</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(c => `
                  <tr>
                    <td>${c.nombres}</td>
                    <td style=\"text-align:center;\">${c.total && c.total > 1 ? (c.total-1) : '-'}</td>
                    <td style=\"text-align:center;\"><span style=\"font-weight:bold; color:${c.confirmacion==='Sí'?'#43a047':'#e53935'};\">${c.confirmacion==='Sí' ? '¡Sí va!' : 'No va'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      })
      .catch(() => {
        lista.innerHTML = '<span style="color:red">Error al cargar confirmados.</span>';
      });
  }
  function closeConfirmadosModal() {
    const modal = document.getElementById('confirmadosModal');
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  const verConfirmadosBtn = document.getElementById('verConfirmadosBtn');
  if (verConfirmadosBtn) {
    verConfirmadosBtn.addEventListener('click', openConfirmadosModal);
  }
})

// Función para enviar RSVP (placeholder para integración futura)
function sendRSVP(attending) {
  // Aquí podrías integrar con un servicio como Formspree, Netlify Forms, etc.
  const data = {
    attending: attending,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }

  console.log("RSVP Data:", data)

  // Ejemplo de integración:
  // fetch('/api/rsvp', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
}

// Detectar dispositivo móvil para optimizaciones
function isMobile() {
  return window.innerWidth <= 768
}

// Optimizaciones para móvil
if (isMobile()) {
  // Reducir efectos de parallax en móvil
  document.addEventListener("DOMContentLoaded", () => {
    const heroImage = document.querySelector(".hero-image")
    if (heroImage) {
      heroImage.style.transform = "scale(1.05)"
    }
  })
}

// Manejo de errores de carga de imágenes
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.background = "var(--gradient-primary)"
      this.style.display = "flex"
      this.style.alignItems = "center"
      this.style.justifyContent = "center"
      this.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; color: var(--accent-pink);"></i>'
    })
  })
})
