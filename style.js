document.addEventListener("DOMContentLoaded", () => {
  // Select the hamburger button
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  // Select the navigation menu
  const primaryNav = document.querySelector("#primary-navigation");

  // Check if both elements exist in the DOM
  if (mobileNavToggle && primaryNav) {
    // Add a click event listener to the hamburger button
    mobileNavToggle.addEventListener("click", () => {
      // Check if the navigation is currently visible by looking for the 'nav-active' class
      const isVisible = primaryNav.classList.contains("nav-active");

      // Toggle the 'nav-active' class on the navigation menu
      primaryNav.classList.toggle("nav-active");

      // Update the 'aria-expanded' attribute on the button for accessibility
      mobileNavToggle.setAttribute("aria-expanded", !isVisible);

      // Optional: Prevent body scrolling when the navigation menu is open
      if (!isVisible) {
        // If the menu was not visible and is now being opened
        document.body.style.overflow = "hidden";
      } else {
        // If the menu was visible and is now being closed
        document.body.style.overflow = ""; // Allow body scrolling again
      }
    });

    // Optional: Close the mobile menu if a link inside it is clicked
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

    // Optional: Close the mobile menu when clicking outside of it
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
