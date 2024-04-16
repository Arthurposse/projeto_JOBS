let currentSlide = 1; // Começar do segundo slide
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(slideIndex) {
  const slidesContainer = document.querySelector('.slides');
  const slideWidth = slides[0].clientWidth;
  slidesContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add('current-slide');
    } else {
      slide.classList.remove('current-slide');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

showSlide(currentSlide);
