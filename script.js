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
  
  document.addEventListener("DOMContentLoaded", () => {

    /* ===== EPISODE IMAGE MODAL + SLIDER ===== */
    const images = document.querySelectorAll(".arc-covers img");
    if (images.length > 0) {
      
      // 이미지 목록 배열
      const imgArray = Array.from(images).map(img => img.src);
      let currentIndex = 0;
  
      // 모달 DOM 생성
      const modal = document.createElement("div");
      modal.id = "imgModal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="modal-arrow left">◀</span>
          <img id="modalImg" src="">
          <span class="modal-arrow right">▶</span>
          <span class="modal-close">×</span>
        </div>
      `;
      document.body.appendChild(modal);
  
      const modalImg = document.getElementById("modalImg");
      const closeBtn = document.querySelector(".modal-close");
      const leftArrow = document.querySelector(".modal-arrow.left");
      const rightArrow = document.querySelector(".modal-arrow.right");
  
      // 모달 열기
      const openModal = (index) => {
        currentIndex = index;
        modalImg.src = imgArray[currentIndex];
        modal.classList.add("open");
      };
  
      // 모달 닫기
      const closeModal = () => modal.classList.remove("open");
  
      // 클릭한 이미지 → 모달 열기
      images.forEach((img, i) => {
        img.addEventListener("click", () => openModal(i));
      });
  
      // 좌우로 이동
      const showNext = () => {
        currentIndex = (currentIndex + 1) % imgArray.length;
        modalImg.src = imgArray[currentIndex];
      };
  
      const showPrev = () => {
        currentIndex = (currentIndex - 1 + imgArray.length) % imgArray.length;
        modalImg.src = imgArray[currentIndex];
      };
  
      rightArrow.addEventListener("click", showNext);
      leftArrow.addEventListener("click", showPrev);
  
      // ESC로 닫기 + ← → 키보드 이동
      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("open")) return;
  
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
      });
  
      // 배경 클릭 시 닫기
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
  
      closeBtn.addEventListener("click", closeModal);
    }
  });
  