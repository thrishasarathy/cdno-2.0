document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");


  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  // Cursor
  const cursor = document.querySelector(".cursor");
  if (cursor && window.innerWidth > 820) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }


  // Reveal animation
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });


  reveals.forEach(el => revealObserver.observe(el));


  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();


      if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
      }


      if (typeof saveContact === "function") {
        saveContact(name, email, message);
      }


      alert("Message submitted successfully.");
      contactForm.reset();
    });
  }
});