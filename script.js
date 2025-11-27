document.addEventListener("DOMContentLoaded", () => {
    /* ===== 1. NAVIGATION ACTIVE HIGHLIGHT ===== */
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");
  
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
  
      if (path.endsWith("/") && href === "index.html") {
        link.classList.add("active");
      }
  
      if (path.includes(href)) {
        link.classList.add("active");
      }
    });
  
  
    /* ===== 2. SCROLL TO TOP BUTTON ===== */
    const scrollBtn = document.getElementById("scrollTopBtn");
  
    if (scrollBtn) {
      window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
      });
  
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  
  
    /* ===== 3. EPISODE 전용 SNAP SCROLL ===== */
    const snapContainers = document.querySelectorAll(".snap-container");
  
    snapContainers.forEach(container => {
      let isScrolling;
  
      container.addEventListener("scroll", () => {
        clearTimeout(isScrolling);
  
        isScrolling = setTimeout(() => {
          const items = Array.from(container.querySelectorAll("img"));
          const containerCenter = container.scrollLeft + container.offsetWidth / 2;
  
          let closest = null;
          let closestDistance = Infinity;
  
          items.forEach(img => {
            const imgCenter = img.offsetLeft + img.offsetWidth / 2;
            const distance = Math.abs(containerCenter - imgCenter);
  
            if (distance < closestDistance) {
              closestDistance = distance;
              closest = img;
            }
          });
  
          if (closest) {
            container.scrollTo({
              left:
                closest.offsetLeft -
                container.offsetWidth / 2 +
                closest.offsetWidth / 2,
              behavior: "smooth"
            });
          }
        }, 120);
      });
    });
  });
  