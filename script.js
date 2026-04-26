const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const year = document.querySelector("#current-year");
const demoVideos = document.querySelectorAll(".demo-video");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 420);

  const fromTop = window.scrollY + 120;
  navItems.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) {
      return;
    }

    const isActive = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle("active", isActive);
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

demoVideos.forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.controls = false;
  video.loop = false;

  video.addEventListener("click", () => {
    video.muted = true;
    video.volume = 0;

    if (video.ended) {
      video.currentTime = 0;
    }

    if (video.paused) {
      video.play();
      return;
    }

    video.pause();
  });

  video.addEventListener("volumechange", () => {
    if (!video.muted || video.volume !== 0) {
      video.muted = true;
      video.volume = 0;
    }
  });

  video.addEventListener("ended", () => {
    video.pause();
  });
});
