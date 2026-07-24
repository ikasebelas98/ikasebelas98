console.log("navbar.js loaded");
const navItems = document.querySelectorAll(".nav-item");

console.log(navItems);

const navItem = document.querySelector("#tentang-kita");
const tentangKita = document.querySelector("#tentang-kita");
const alumni = document.querySelector("#alumni-center");
const media = document.querySelector("#media-center");
const community = document.querySelector("#community-hub");
const donasi = document.querySelector("#donasi");
const login = document.querySelector("#login");

if (tentangKita) {

    console.log("Tentang Kita ditemukan");
    console.log(alumni);
    console.log(media);
    console.log(community);
    console.log(donasi);
    console.log(login);

    tentangKita.addEventListener("mouseenter", () => {

        console.log("OPEN");

        document.body.classList.add("mega-open");

    });

    tentangKita.addEventListener("mouseleave", () => {

        console.log("CLOSE");

        document.body.classList.remove("mega-open");

    });

} else {

    console.log("ERROR: #tentang-kita tidak ditemukan");

}