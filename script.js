/* =========================================================
   UP College of Medicine – Henry Sy Sr. Hall (HSS-MSB)
   Main Script
   ========================================================= */

/* =========================================
   FLOOR SELECTOR
   ========================================= */
function openFloorSelector() {
  document.getElementById("floorModal").style.display = "flex";
}

function closeFloorSelector() {
  document.getElementById("floorModal").style.display = "none";
}

/* Mobile menu auto-close when a link is clicked */
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("menu").classList.remove("active");
  });
});

/* =========================================
   GENERIC FLOOR MODAL HELPERS
   ========================================= */
function openFloor(modalId) {
  closeFloorSelector();
  loadModalImages(modalId); // lazy-load images only when opened
  document.getElementById(modalId).style.display = "flex";
}

function closeFloor(modalId) {
  document.getElementById(modalId).style.display = "none";
}

/* Ground Floor */
function openGroundFloor() { openFloor("groundFloorModal"); }
function closeGroundFloor() { closeFloor("groundFloorModal"); }

/* 2nd Floor */
function openSecondFloor() { openFloor("secondFloorModal"); }
function closeSecondFloor() { closeFloor("secondFloorModal"); }

/* 3rd Floor */
function openThirdFloor() { openFloor("thirdFloorModal"); }
function closeThirdFloor() { closeFloor("thirdFloorModal"); }

/* 4th Floor */
function openFourthFloor() { openFloor("fourthFloorModal"); }
function closeFourthFloor() { closeFloor("fourthFloorModal"); }

/* 5th Floor */
function openFifthFloor() { openFloor("fifthFloorModal"); }
function closeFifthFloor() { closeFloor("fifthFloorModal"); }

/* 6th Floor */
function openSixthFloor() { openFloor("sixthFloorModal"); }
function closeSixthFloor() { closeFloor("sixthFloorModal"); }

/* 7th Floor */
function openSeventhFloor() { openFloor("seventhFloorModal"); }
function closeSeventhFloor() { closeFloor("seventhFloorModal"); }

/* 8th Floor */
function openEighthFloor() { openFloor("eighthFloorModal"); }
function closeEighthFloor() { closeFloor("eighthFloorModal"); }

/* 9th Floor */
function openNinthFloor() { openFloor("ninthFloorModal"); }
function closeNinthFloor() { closeFloor("ninthFloorModal"); }

/* 10th Floor */
function openTenthFloor() { openFloor("tenthFloorModal"); }
function closeTenthFloor() { closeFloor("tenthFloorModal"); }

/* 11th Floor */
function openEleventhFloor() { openFloor("eleventhFloorModal"); }
function closeEleventhFloor() { closeFloor("eleventhFloorModal"); }

/* AED Modal */
function openAedModal() {
  loadModalImages("aedModal");
  document.getElementById("aedModal").style.display = "flex";
}
function closeAedModal() {
  document.getElementById("aedModal").style.display = "none";
}

/* Flowchart Modal (was referenced in HTML but previously undefined) */
function openFlowchartModal() {
  document.getElementById("flowchartModal").style.display = "flex";
}
function closeFlowchartModal() {
  document.getElementById("flowchartModal").style.display = "none";
}

/* QR Modal */
function openQrModal(e) {
  if (e) e.preventDefault();
  document.getElementById("qrCodeModal").style.display = "flex";
}
function closeQrModal() {
  document.getElementById("qrCodeModal").style.display = "none";
}

/* =========================================
   GLOBAL IMAGE VIEWER (click to enlarge)
   ========================================= */
function openImageViewer(src) {
  if (!src) return;
  document.getElementById("imageViewerContent").src = src;
  document.getElementById("imageViewerModal").style.display = "flex";
}

function closeImageViewer() {
  document.getElementById("imageViewerModal").style.display = "none";
}

/* Event delegation: enlarge any room/event-card image on click */
document.addEventListener("click", function (e) {
  if (e.target.matches('.event-card img')) {
    openImageViewer(e.target.currentSrc || e.target.src || e.target.dataset.src);
  }
});

/* Close any open modal with the Escape key */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll('.flowchart-modal-overlay, .qr-modal-overlay').forEach(m => {
      m.style.display = "none";
    });
  }
});

/* =========================================
   LAZY-LOAD MODAL IMAGES
   ========================================= */
const modalImageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;

      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.loading = "lazy";
        img.decoding = "async";
        img.removeAttribute("data-src");
      }

      modalImageObserver.unobserve(img);
    }
  });
});

function loadModalImages(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.querySelectorAll("img[data-src]").forEach(img => {
    modalImageObserver.observe(img);
  });
}

/* =========================================
   BROKEN IMAGE HANDLING
   Marks images that fail to load so they don't
   show the default broken-image icon.
   ========================================= */
document.addEventListener("error", function (e) {
  const el = e.target;
  if (el && el.tagName === "IMG") {
    el.classList.add("img-error");
    el.alt = el.alt || "Image not available";
  }
}, true);

/* =========================================
   HERO SLIDESHOW
   ========================================= */
const heroSection = document.getElementById('hero');
const heroImages = [
  "./image/artwork.png",
  "./image/lobby_1.png",
  "./image/lobby_2.png",
  "./image/lobby_3.png",
  "./image/lobby_4.jpg"
];
let currentImageIndex = 0;

function changeHeroBackground() {
  if (!heroSection) return;
  heroSection.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImages.length;
}
setInterval(changeHeroBackground, 5000);
changeHeroBackground(); // Initial load

/* =========================================
   SCROLL BEHAVIOUR: nav, progress bar, buttons
   ========================================= */
const backToTopBtn = document.getElementById('back-to-top');
const upArrow = document.querySelector('.up-arrow');
const downArrow = document.querySelector('.down-arrow');
const navBar = document.querySelector('nav');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  /* Nav background on scroll */
  if (navBar) navBar.classList.toggle('scrolled', scrollPos > 50);

  /* Scroll progress bar */
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  }

  /* Back-to-top + scroll indicator arrows */
  if (scrollPos > 400) {
    if (backToTopBtn) backToTopBtn.classList.add('show');
    if (upArrow) upArrow.style.display = 'flex';
    if (downArrow) downArrow.style.display = 'none';
  } else {
    if (backToTopBtn) backToTopBtn.classList.remove('show');
    if (upArrow) upArrow.style.display = 'none';
    if (downArrow) downArrow.style.display = 'flex';
  }
});

/* =========================================
   SECTION FADE-IN ON SCROLL
   ========================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(sec => observer.observe(sec));

/* =========================================
   UI: MENU + TABS
   ========================================= */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

function openTab(tabName, btn, tabClass, btnClass) {
  document.querySelectorAll('.' + tabClass).forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.' + btnClass).forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  btn.classList.add('active');
}

/* Wrapper functions for specific sections */
window.openCalendarTab = (name, btn) => openTab(name, btn, 'calendar-tab-content', 'calendar-tab-btn');
window.openDrrmTab = (name, btn) => openTab(name, btn, 'drrm-tab-content', 'drrm-tab-btn');

/* =========================================
   FOOTER YEAR
   ========================================= */
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
