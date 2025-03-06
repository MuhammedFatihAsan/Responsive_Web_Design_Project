// Navigasyon barını ekle
document.addEventListener("DOMContentLoaded", function () {
    const navbarHTML = `
        <nav>
            <ul>
                <li><a href="index.html" data-key="home">Home</a></li>
                <li><a href="about.html" data-key="about">About Us</a></li>
                <li><a href="tutorial.html" data-key="features">Tutorial</a></li>
                <li><a href="contact.html" data-key="contact">Contact</a></li>
                <li><button id="language-switcher" data-key="change_lg">🇹🇷 Use Turkish</button></li>
            </ul>
        </nav>
    `;

    // Sayfadaki navbar div'ini bul ve içine navigasyon barını ekle
    document.getElementById("navigation_bar").innerHTML = navbarHTML;

    // Buton event listener'ı ekle (navigation bar eklendikten sonra)
    document.getElementById("language-switcher").addEventListener("click", function () {
        // translate_script içindeki fonksiyonları çağırmak için
        if (typeof changeLanguage === "function") {
            changeLanguage();
        }
    });
});
