// Появление блоков при прокрутке
const sections = document.querySelectorAll("section");
function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// Подсветка активного пункта меню
const navLinks = document.querySelectorAll("nav a");
function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove("active"));
  navLinks[index]?.classList.add("active");
}
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Модальное окно
const modal = document.getElementById("modalForm");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => {
  modal.classList.add("show");
  document.body.classList.add("modal-open");
};
closeBtn.onclick = () => {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
};
window.onclick = (e) => { 
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
};

// Отправка формы AJAX
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const data = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      status.textContent = "Спасибо! Мы свяжемся с вами.";
      status.className = "success";
      status.style.display = "block";
      form.reset();
    } else {
      status.textContent = "Ошибка при отправке. Попробуйте позже.";
      status.className = "error";
      status.style.display = "block";
    }
  } catch (error) {
    status.textContent = "Ошибка сети. Попробуйте позже.";
    status.className = "error";
    status.style.display = "block";
  }
});

// Кнопка "Наверх"
const toTopBtn = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTopBtn.style.display = "flex";
  } else {
    toTopBtn.style.display = "none";
  }
});
toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Гамбургер-меню
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("show");
});
