// ==========================================
// 1. HIGHLIGHTS SLIDER
// ==========================================
const track = document.getElementById("highlightsTrack");
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");

if (track && prevBtn && nextBtn) {
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 300, behavior: "smooth" });
  });
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -300, behavior: "smooth" });
  });
}

// ==========================================
// 2. HERO SLIDER (AUTO-PLAY)
// ==========================================
const heroSlides = document.querySelectorAll(".hero__slide");
const heroSection = document.querySelector(".hero");

if (heroSlides.length > 0 && heroSection) {
  let currentSlide = 0;

  function nextHeroSlide() {
    // Only run if we actually have multiple slides
    if (heroSlides.length > 1) {
      heroSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add("active");
    }
  }

  let heroInterval = setInterval(nextHeroSlide, 5000);

  // Pause on Hover
  heroSection.addEventListener("mouseenter", () => clearInterval(heroInterval));
  heroSection.addEventListener("mouseleave", () => {
    heroInterval = setInterval(nextHeroSlide, 5000);
  });
}

// ==========================================
// 3. CONTACT FORM (EMAIL JS)
// ==========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("submitBtn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");
    const statusMsg = document.getElementById("formStatus");

    // UI: Loading State
    btn.disabled = true;
    btnText.textContent = "Sending...";
    if (loader) loader.style.display = "inline-block";
    if (statusMsg) statusMsg.textContent = "";

    // EMAILJS CONFIG (Update these!)
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        // Success
        btnText.textContent = "Sent!";
        if (loader) loader.style.display = "none";
        if (statusMsg) {
          statusMsg.style.color = "green";
          statusMsg.textContent = "Message sent successfully!";
        }
        contactForm.reset();

        setTimeout(() => {
          btn.disabled = false;
          btnText.textContent = "Submit ↗";
        }, 3000);
      },
      (err) => {
        // Error
        btn.disabled = false;
        btnText.textContent = "Submit ↗";
        if (loader) loader.style.display = "none";
        if (statusMsg) {
          statusMsg.style.color = "red";
          statusMsg.textContent = "Failed to send.";
        }
        console.error("EmailJS Error:", err);
      }
    );
  });
}

// ==========================================
// 4. REGISTRATION MODAL (UPDATED FOR EXTERNAL FILE)
// ==========================================
const modal = document.getElementById("registerModal");
const closeBtn = document.getElementById("closeModalBtn");
const modalForm = document.getElementById("modalForm");
const modalStatus = document.getElementById("modalStatus");

// SELECT ALL BUTTONS with class 'js-open-modal'
// (You need to add this class to your HTML button)
const openBtns = document.querySelectorAll(".js-open-modal");

// Debugging: Check if script is running
console.log("JS File Loaded. Found " + openBtns.length + " open buttons.");

// Function to Close Modal
const closeModal = () => {
  if (modal) {
    modal.classList.remove("is-open");
    document.body.style.overflow = ""; // Restore scroll
  }
};

// OPEN Modal (Attach listener to ALL matching buttons)
if (openBtns.length > 0 && modal) {
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Button clicked!"); // See if this prints
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });
} else {
  console.error(
    "Error: No buttons found with class 'js-open-modal' OR Modal missing."
  );
}

// CLOSE Modal (X Button)
if (closeBtn) closeBtn.addEventListener("click", closeModal);

// CLOSE Modal (Click Outside)
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// CLOSE Modal (Escape Key)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

// SUBMIT Modal Form
if (modalForm) {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = modalForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Processing...";

    // Fake API Delay
    setTimeout(() => {
      submitBtn.innerHTML = "Success!";
      submitBtn.style.backgroundColor = "green";
      if (modalStatus) {
        modalStatus.textContent = "Registration successful!";
        modalStatus.style.color = "green";
      }

      setTimeout(() => {
        closeModal();
        modalForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = "";
        if (modalStatus) modalStatus.textContent = "";
      }, 2000);
    }, 1500);
  });
}
