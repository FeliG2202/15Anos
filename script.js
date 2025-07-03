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
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xpOOvJ0Fflm8PEEqqNPqp3JZmgnN6i.png",
  "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop&crop=center",
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

function toggleMusic() {
  const button = document.getElementById("musicToggle")

  if (!audio) {
    // Aquí puedes poner la URL de tu música favorita
    audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
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
      console.log("No se pudo reproducir la música automáticamente")
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
