let AOS, gsap, ScrollTrigger;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, initializing components...");
  initThemeToggle();
  initMobileMenu();
  initParticles();
  initCustomTypingAnimation(); // Substituir initTyped por animação personalizada
  initAOS();
  initGSAP();
  initTestimonialSlider();
  initContactForm();
  initNavbarScroll();
});

function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add("dark-theme");
    }
  
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll(".nav-link");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });
  });
}

function initParticles() {
  const particlesContainer = document.getElementById("particles-js");
  if (particlesContainer && typeof window.particlesJS !== "undefined") {
    try {
      console.log("Initializing particles.js");
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#3b82f6",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#8b5cf6",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    } catch (error) {
      console.error("Error initializing particles.js:", error);
      createFallbackParticles(particlesContainer);
    }
  } else {
    console.error("Particles.js not loaded or container not found");
    if (particlesContainer) {
      createFallbackParticles(particlesContainer);
    }
  }
}

function createFallbackParticles(container) {
  const canvas = document.createElement("canvas");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: "#3b82f6",
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
  window.addEventListener("resize", () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
}

function initCustomTypingAnimation() {
  const typedElement = document.getElementById("typed-text");
  if (!typedElement) {
    console.error("Element #typed-text not found in DOM");
    return;
  }

  console.log("Found #typed-text element:", typedElement);

  const strings = [
    "Full Stack Developer",
    "PHP Developer",
    "React Developer",
    "Node.js Developer",
    "Laravel Developer",
    "AWS Certified",
  ];
  let currentStringIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typeSpeed = 50; // Velocidade de digitação (ms por caractere)
  const backSpeed = 30; // Velocidade de retrocesso (ms por caractere)
  const backDelay = 1500; // Pausa antes de começar a apagar (ms)
  const startDelay = 500; // Pausa antes de começar a digitar a próxima string (ms)

  function type() {
    const currentString = strings[currentStringIndex];
    if (!isDeleting) {
      // Digitação
      if (currentCharIndex < currentString.length) {
        typedElement.textContent = currentString.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(type, typeSpeed);
      } else {
        // Pausa antes de começar a apagar
        setTimeout(() => {
          isDeleting = true;
          type();
        }, backDelay);
      }
    } else {
      // Retrocesso
      if (currentCharIndex > 0) {
        typedElement.textContent = currentString.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(type, backSpeed);
      } else {
        // Passar para a próxima string
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % strings.length;
        setTimeout(type, startDelay);
      }
    }
  }

  // Iniciar a animação
  typedElement.textContent = "";
  setTimeout(type, 500);
  console.log("Custom typing animation initialized successfully");
}

function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
    console.log("AOS initialized successfully");
  } else {
    console.error("AOS not loaded");
  }
}

function initGSAP() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#project-1", {
      scrollTrigger: {
        trigger: "#project-1",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from("#project-2", {
      scrollTrigger: {
        trigger: "#project-2",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: "#skills",
        start: "top 70%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }
}

function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".testimonial-dot");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  let slideInterval = setInterval(nextSlide, 5000);
  const testimonialSlider = document.getElementById("testimonial-slider");
  if (testimonialSlider) {
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });
    testimonialSlider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
}

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="32" stroke-dashoffset="16"></circle>
        </svg>
        Enviando...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        formStatus.textContent = "Mensagem enviada com sucesso!";
        formStatus.className = "form-status success";
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Enviar Mensagem
        `;
        submitBtn.disabled = false;
        setTimeout(() => {
          formStatus.textContent = "";
          formStatus.className = "form-status";
        }, 3000);
      }, 1500);
    });
  }
}

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  console.log("DOM already loaded, initializing components...");
  initThemeToggle();
  initMobileMenu();
  initParticles();
  initCustomTypingAnimation();
  initAOS();
  initGSAP();
  initTestimonialSlider();
  initContactForm();
  initNavbarScroll();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, initializing components...");
    initThemeToggle();
    initMobileMenu();
    initParticles();
    initCustomTypingAnimation();
    initAOS();
    initGSAP();
    initTestimonialSlider();
    initContactForm();
    initNavbarScroll();
  });
}
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuLinks = mobileMenu.querySelectorAll(".nav-link");
  
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      if (mobileMenu.classList.contains("active")) {
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });
  
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      });
    });
  }