document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
    <nav>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="tutorial.html">Tutorial</a></li>
        <li><a href="contact.html">Contact</a></li>

        <li class="dropdown">
          <a href="#">Prep Zone ▾</a>
          <ul class="dropdown-content">
            <li><a href="prep_html.html">Prep to "HTML"</a></li>
            <li><a href="prep_javascript.html">Prep to ".JavaScript"</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#">Challenge Arena ▾</a>
          <ul class="dropdown-content">
            <li><a href="quizz_game.html">Quizz Game</a></li>
            <li><a href="sequence_game.html">Sequence Game</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  `;

  document.getElementById("navigation_bar").innerHTML = navbarHTML;

  const langButton = document.getElementById("language-switcher");
  if (langButton) {
    langButton.addEventListener("click", function () {
      if (typeof changeLanguage === "function") {
        changeLanguage();
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
      link.classList.add("active");
    }
  });
});
