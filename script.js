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

        /* ===== CONTACT FORM JS ===== */
        const contactForm = document.querySelector(".contact-form");

        if (contactForm) {
          contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop default submission
    
            const formData = new FormData(contactForm);
    
            const data = {
              name: formData.get("name"),
              email: formData.get("email"),
              topic: formData.get("topic"),
              message: formData.get("message"),
              page: window.location.pathname
            };
    
            console.log("Contact form data:", data);
    
            // Temporary alert (before PHP/MySQL connection)
            alert("Your message has been submitted! (Currently in JS test mode)");
    
            contactForm.reset();
          });
        }

    /* ===== RANDOM TMI POPUP ===== */
    const tmiTrigger = document.getElementById('tmiTrigger');
    const tmiModal = document.getElementById('tmiModal');
    const tmiText = document.getElementById('tmiText');
    const tmiClose = document.querySelector('.tmi-close');

    // HXH TMI
    const tmiMessages = [
    '키메라 엔트 편에서 네테로의 나이는 약 120살이며, 메르엠은 생후 40일이었다.',
    '작가 토가시는 TV를 틀거나 사전을 폈을 때 나오는 단어로 캐릭터들의 이름을 만들었다.',
    '환영여단 내의 팔씨름 랭킹이 존재한다,',
    '히소카가 말할 때 나타나는 트럼프 기호는 본인이 선택하는 것이다.',
    '작가 토가시는 헌터헌터 세계관 지도를 별도로 그려둘 정도로 세계 설정에 집착하는 편이다.',
    'HunterXHunter는 점프 코믹스 역사상 최초로 연재 기간보다 휴재 기간이 길다.',
    '크라피카의 과거를 그린 공식 외전 \'크라피카의 추억편\'이 존재한다.',
    '만화 도쿄 구울 작가 이시다 스이가 히소카의 과거를 그린 단편 만화 \'히소카의 과거\'가 존재한다.'
    ];

    if (tmiTrigger && tmiModal && tmiText) {
    // 광대 이미지 클릭
    tmiTrigger.addEventListener('click', () => {
        const random = tmiMessages[Math.floor(Math.random() * tmiMessages.length)];
        typeWriterEffect(random, tmiText, 35); // speed=35ms → 원하는 속도로 조절 가능
        tmiModal.classList.add('open');
    });

    // 검은 배경 클릭 → 닫기
    tmiModal.addEventListener('click', (e) => {
        if (e.target === tmiModal) {
        tmiModal.classList.remove('open');
        }
    });
    }

    /* RANDOM TMI BUTTONS */
    const tmiRetry = document.getElementById('tmiRetry');
    const tmiExit = document.getElementById('tmiExit');

    // 다시하기
    tmiRetry.addEventListener('click', () => {
        const random = tmiMessages[Math.floor(Math.random() * tmiMessages.length)];
        typeWriterEffect(random, tmiText, 35);
      });      

    // 닫기
    tmiExit.addEventListener('click', () => {
    tmiModal.classList.remove('open');
    });

    /* TYPEWRITER EFFECT */
    function typeWriterEffect(text, targetElement, speed = 35) {
        targetElement.textContent = "";
        let i = 0;
    
        function typing() {
        if (i < text.length) {
            targetElement.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
        }
        typing();
    }
  

    
    
    
  });
  