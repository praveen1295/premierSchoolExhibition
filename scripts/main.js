document.addEventListener("DOMContentLoaded", () => {
  // --- Highlights Slider Navigation ---
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

  // --- Hero Auto-Play Logic (Simulated) ---
  // Note: Since only 1 slide content was provided in screenshots,
  // this logic prepares for multiple slides by toggling classes.
  const heroSlides = document.querySelectorAll(".hero__slide");
  let currentSlide = 0;

  function nextHeroSlide() {
    if (heroSlides.length > 1) {
      heroSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add("active");
    }
  }

  // Auto-play every 5 seconds
  let heroInterval = setInterval(nextHeroSlide, 5000);

  // Pause on Hover
  const heroSection = document.querySelector(".hero");
  heroSection.addEventListener("mouseenter", () => clearInterval(heroInterval));
  heroSection.addEventListener("mouseleave", () => {
    heroInterval = setInterval(nextHeroSlide, 5000);
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload

    // 1. Get Elements
    const btn = document.getElementById("submitBtn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");
    const statusMsg = document.getElementById("formStatus");

    // 2. Show Loader & Disable Button
    btn.disabled = true;
    btnText.textContent = "Sending...";
    loader.style.display = "inline-block";
    statusMsg.textContent = "";

    // 3. Send Email via EmailJS
    // Replace these with your actual IDs from emailjs.com
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        // SUCCESS
        btnText.textContent = "Sent!";
        loader.style.display = "none";
        statusMsg.style.color = "green";
        statusMsg.textContent = "Message sent successfully!";

        // Reset form
        document.getElementById("contactForm").reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          btn.disabled = false;
          btnText.textContent = "Submit ↗";
        }, 3000);
      },
      (err) => {
        // ERROR
        btn.disabled = false;
        btnText.textContent = "Submit ↗";
        loader.style.display = "none";
        statusMsg.style.color = "red";
        statusMsg.textContent = "Failed to send. Please try again.";
        console.error("EmailJS Error:", err);
      }
    );
  });
