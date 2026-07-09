"use strict";

// Mobile navigation
const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationMenu.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  });

  navigationMenu
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        navigationMenu.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );
      });
    });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navigationMenu.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );
    }
  });
}


// Automatic footer year
const currentYear =
  document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


// Scroll reveal animations
const revealElements =
  document.querySelectorAll(
    `
    .service-card,
    .project-card,
    .skill-category,
    .certificate-card,
    .education-card,
    .learning-card,
    .interest-card,
    .experience-card,
    .contact-details article,
    .process-grid article,
    .soft-skills-grid article,
    .about-statistics article
    `
  );

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// Animated skill progress bars
const progressBars =
  document.querySelectorAll(
    ".progress-fill"
  );

if ("IntersectionObserver" in window) {
  const progressObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const progress =
            entry.target.dataset.progress;

          const safeProgress =
            Math.min(
              Math.max(
                Number(progress) || 0,
                0
              ),
              100
            );

          entry.target.style.width =
            `${safeProgress}%`;

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.4,
      }
    );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
} else {
  progressBars.forEach((bar) => {
    bar.style.width =
      `${bar.dataset.progress || 0}%`;
  });
}


// Contact message character counter
const messageInput =
  document.getElementById("message");

const messageCharacters =
  document.getElementById(
    "messageCharacters"
  );

if (
  messageInput &&
  messageCharacters
) {
  const updateCharacterCounter = () => {
    messageCharacters.textContent =
      messageInput.value.length;
  };

  messageInput.addEventListener(
    "input",
    updateCharacterCounter
  );

  updateCharacterCounter();
}


// Contact form submit state
const contactForm =
  document.getElementById(
    "contactForm"
  );

const submitButton =
  document.getElementById(
    "submitButton"
  );

if (
  contactForm &&
  submitButton
) {
  contactForm.addEventListener(
    "submit",
    () => {
      if (!contactForm.checkValidity()) {
        return;
      }

      submitButton.disabled = true;

      const buttonText =
        submitButton.querySelector(
          ".button-text"
        );

      if (buttonText) {
        buttonText.textContent =
          "Sending...";
      }
    }
  );
}


// Remove contact status query
// after success/error message appears
if (
  window.location.pathname ===
  "/contact"
) {
  const url =
    new URL(
      window.location.href
    );

  if (
    url.searchParams.has("success") ||
    url.searchParams.has("error")
  ) {
    window.history.replaceState(
      {},
      document.title,
      "/contact"
    );
  }
}