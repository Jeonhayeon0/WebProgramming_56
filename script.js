/* ====== 1. NAVIGATION ACTIVE HIGHLIGHT ===== */
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");

        // index.html은 "/"에도 대응
        if (path.endsWith("/") && href === "index.html") {
            link.classList.add("active");
        }

        // URL에 해당 href가 포함되면 active 부여
        if (path.includes(href)) {
            link.classList.add("active");
        }
    });
});


/* ===== 2. SCROLL TO TOP BUTTON ===== */
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
