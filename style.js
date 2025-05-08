document.addEventListener("DOMContentLoaded", () => {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");

  const primaryNav = document.querySelector("#primary-navigation");

  if (mobileNavToggle && primaryNav) {
    mobileNavToggle.addEventListener("click", () => {
      const isVisible = primaryNav.classList.contains("nav-active");

      primaryNav.classList.toggle("nav-active");

      mobileNavToggle.setAttribute("aria-expanded", !isVisible);

      if (!isVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const isSamePageAnchor =
          link.getAttribute("href").startsWith("#") && link.hash !== "";
        if (primaryNav.classList.contains("nav-active")) {
          if (link.getAttribute("href") !== "#" || isSamePageAnchor) {
            primaryNav.classList.remove("nav-active");
            mobileNavToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
          }
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (
        primaryNav.classList.contains("nav-active") &&
        !primaryNav.contains(event.target) &&
        !mobileNavToggle.contains(event.target)
      ) {
        primaryNav.classList.remove("nav-active");
        mobileNavToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
});
