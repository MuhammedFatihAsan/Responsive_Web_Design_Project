// İngilizce ve Türkçe çeviri
const translations = {
    en: {
        // HOMEPAGE CONTENTS
        home: "Home",
        about: "About Us",
        features: "Tutorial",
        contact: "Contact",
        change_lg: "🇹🇷 Use Turkish",

        preparation_H: "Prep Zone",
        prp_1: "Preparation 1",
        prp_2: "Preparation 2",

        challenge_H: "Challenge Arena",
        chl_1: "Challenge 1",
        chl_2: "Challenge 2",

        footer: "© 2025 Interactive Learning Platform. All rights reserved by Muhammed Fatih Asan & Talha Ubeydullah Gamga."
    },
    tr: {
        // Anasayfanın içindekiler
        home: "Ana Sayfa",
        about: "Hakkımızda",
        features: "Öğretici",
        contact: "İletişim",
        change_lg: "🇬🇧 İngilizce Kullan",

        preparation_H: "Hazırlık Bölgesi",
        prp_1: "Hazırlık 1",
        prp_2: "Hazırlık 2",

        challenge_H: "Meydan Okuma Arenası",
        chl_1: "Meydan Okuma 1",
        chl_2: "Meydan Okuma 2",

        footer: "© 2025 İnteraktif Öğrenme Platformu. Tüm hakları Muhammed Fatih Asan & Talha Ubeydullah Gamga'ya aittir."
    }
};

// Varsayılan dil
let currentLanguage = sessionStorage.getItem("selectedLanguage") || "en";

// Sayfa yüklendiğinde dili uygula
document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLanguage);
});

// Dil değiştirme fonksiyonu
function changeLanguage() {
    currentLanguage = (currentLanguage === "en") ? "tr" : "en";
    sessionStorage.setItem("selectedLanguage", currentLanguage);
    applyLanguage(currentLanguage);
}

// Sayfadaki tüm öğeleri güncelleyerek dili uygula
function applyLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
