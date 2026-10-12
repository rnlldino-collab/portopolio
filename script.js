// ===== 1. Menu mobile =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const terbuka = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", terbuka);
});

// Tutup menu setelah salah satu link diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== 2. Kata yang berganti di bagian beranda =====
const rotator = document.getElementById("rotator");
const kataKata = ["futsal", "ngoding", "belajar hal baru"];
let urutan = 0;

setInterval(() => {
  rotator.classList.add("fade");
  setTimeout(() => {
    urutan = (urutan + 1) % kataKata.length;
    rotator.textContent = kataKata[urutan];
    rotator.classList.remove("fade");
  }, 300);
}, 2600);

// ===== 3. Klik kotak warna: salin kode & ubah kartu identitas =====
const toast = document.getElementById("toast");
const chipColor = document.getElementById("chipColor");
const chipHex = document.getElementById("chipHex");
let timerToast;

function tampilkanToast(pesan) {
  toast.textContent = pesan;
  toast.classList.add("show");
  clearTimeout(timerToast);
  timerToast = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", async () => {
    const hex = swatch.dataset.hex;

    // Ubah warna kartu identitas di beranda
    chipColor.style.background = hex;
    chipHex.textContent = hex;

    // Salin ke clipboard (jika didukung browser)
    try {
      await navigator.clipboard.writeText(hex);
      tampilkanToast("Kode " + hex + " disalin");
    } catch (error) {
      tampilkanToast("Warna " + hex + " dipilih");
    }
  });
});

// ===== 4. Tandai menu yang sedang aktif saat scroll =====
const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav__menu a");

const pengamat = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => pengamat.observe(section));

// ===== 5. Tahun otomatis di footer =====
document.getElementById("year").textContent = new Date().getFullYear();