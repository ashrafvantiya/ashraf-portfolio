"use strict";


// ==================================
// MOBILE NAVIGATION
// ==================================

const menuButton =
  document.getElementById("menuButton");

const navigationMenu =
  document.getElementById("navigationMenu");

if (menuButton && navigationMenu) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      navigationMenu.classList.toggle("open");

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

        navigationMenu.classList.remove(
          "open"
        );

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

      navigationMenu.classList.remove(
        "open"
      );

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


// ==================================
// AUTOMATIC FOOTER YEAR
// ==================================

const currentYear =
  document.getElementById("currentYear");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


// ==================================
// SCROLL REVEAL ANIMATION
// ==================================

const revealElements =
  document.querySelectorAll(
    `
    section,
    .service-card,
    .project-card,
    .skill-card,
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


revealElements.forEach(
  (element, index) => {

    element.classList.add("reveal");

    /*
    Small delay creates
    smooth one-by-one animation
    */

    element.style.transitionDelay =
      `${Math.min(index * 0.05, 0.3)}s`;

  }
);


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "active"
            );

            entry.target.classList.add(
              "visible"
            );

            /*
            Animation only happens once.
            */

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {

        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"

      }

    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "active"
      );

      element.classList.add(
        "visible"
      );

    }
  );

}


// ==================================
// ANIMATED SKILL PROGRESS BARS
// ==================================

const progressBars =
  document.querySelectorAll(
    ".progress-fill"
  );


if ("IntersectionObserver" in window) {

  const progressObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

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

          }
        );

      },

      {

        threshold: 0.4

      }

    );


  progressBars.forEach(
    (bar) => {

      progressObserver.observe(
        bar
      );

    }
  );

} else {

  progressBars.forEach(
    (bar) => {

      bar.style.width =
        `${bar.dataset.progress || 0}%`;

    }
  );

}


// ==================================
// CONTACT MESSAGE COUNTER
// ==================================

const messageInput =
  document.getElementById(
    "message"
  );


const messageCharacters =
  document.getElementById(
    "messageCharacters"
  );


if (
  messageInput &&
  messageCharacters
) {

  const updateCharacterCounter =
    () => {

      messageCharacters.textContent =
        messageInput.value.length;

    };


  messageInput.addEventListener(

    "input",

    updateCharacterCounter

  );


  updateCharacterCounter();

}


// ==================================
// CONTACT FORM SUBMIT
// ==================================

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

      if (
        !contactForm.checkValidity()
      ) {

        return;

      }


      submitButton.disabled =
        true;


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


// ==================================
// REMOVE CONTACT URL STATUS
// ==================================

if (

  window.location.pathname ===
  "/contact"

) {

  const url =

    new URL(

      window.location.href

    );


  if (

    url.searchParams.has(
      "success"
    )

    ||

    url.searchParams.has(
      "error"
    )

  ) {

    window.history.replaceState(

      {},

      document.title,

      "/contact"

    );

  }

}


// ==================================
// WEBSITE OPENING LOADER
// ONLY ONCE PER BROWSER TAB
// ==================================

document.addEventListener(

  "DOMContentLoaded",

  () => {

    const loader =

      document.getElementById(
        "page-loader"
      );


    if (!loader) {

      return;

    }


    /*
    Check if loader was
    already shown.
    */

    const loaderShown =

      sessionStorage.getItem(

        "avLoaderShown"

      );


    /*
    Home → About → Experience
    par loader dobara nahi aayega.
    */

    if (loaderShown) {

      loader.style.display =
        "none";

      document.body.classList.remove(
        "loading"
      );

      return;

    }


    /*
    Website first open.
    */

    document.body.classList.add(
      "loading"
    );


    window.addEventListener(

      "load",

      () => {


        setTimeout(

          () => {


            loader.classList.add(

              "loader-hidden"

            );


            document.body.classList.remove(

              "loading"

            );


            /*
            Remember loader.
            */

            sessionStorage.setItem(

              "avLoaderShown",

              "true"

            );


            setTimeout(

              () => {

                loader.style.display =
                  "none";

              },

              700

            );


          },

          900

        );


      }

    );

  }

);