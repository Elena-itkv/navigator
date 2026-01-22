
document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times'); // Change to 'x' icon
        });

        // Close nav when a link is clicked (for mobile UX)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.querySelector('i').classList.add('fa-bars');
                    navToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }

    // --- Full-screen Slider ---
    const slides = document.querySelectorAll('.slide');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        updateDots(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function createDots() {
        if (sliderDotsContainer) {
            sliderDotsContainer.innerHTML = ''; // Clear existing dots
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentSlide = i;
                    showSlide(currentSlide);
                    resetSlideInterval();
                });
                sliderDotsContainer.appendChild(dot);
            });
        }
    }

    function updateDots(index) {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    if (slides.length > 0) { // Only run slider script if slides exist on the page
        createDots();
        showSlide(currentSlide);
        if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => { nextSlide(); resetSlideInterval(); });
        if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => { prevSlide(); resetSlideInterval(); });
        startSlideInterval();
    }


    // --- Card Animation & Modal ---
    const cardDetailModal = document.getElementById('card-detail-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButtons = document.querySelectorAll('.modal .close-button'); // Select all close buttons within modals

    function openModal(modalElement) {
        modalElement.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeModal(modalElement) {
        modalElement.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            if (cardDetailModal && modalImage && modalTitle && modalDescription) {
                modalImage.src = card.dataset.image || '';
                modalTitle.textContent = card.dataset.title || 'Подробная информация';
                modalDescription.textContent = card.dataset.content || 'Дополнительная информация отсутствует.';
                openModal(cardDetailModal);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal'));
        });
    });

    // Close modal if click outside content
    window.addEventListener('click', (event) => {
        if (event.target === cardDetailModal) {
            closeModal(cardDetailModal);
        }
        const registrationModal = document.getElementById('registration-modal');
        if (registrationModal && event.target === registrationModal) {
            closeModal(registrationModal);
        }
    });


    // --- Registration Modal ("Личный кабинет") ---
    const personalAccountLink = document.getElementById('personal-account-link');
    const registrationModal = document.getElementById('registration-modal');
    const registrationForm = document.getElementById('registration-form');

    if (personalAccountLink && registrationModal) {
        personalAccountLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(registrationModal);
        });
    }
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            if (name && email && password) {
                alert(`Пользователь ${name} (Email: ${email}) успешно зарегистрирован!`);
                closeModal(registrationModal);
                registrationForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }


    // --- Feedback Form ---
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('feedback-name').value;
            const email = document.getElementById('feedback-email').value;
            const message = document.getElementById('feedback-message').value;

            if (name && email && message) {
                alert('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
                feedbackForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля формы обратной связи.');
            }
        });
    }

    // --- Suggest News Form (on news.html) ---
    const suggestNewsForm = document.getElementById('suggest-news-form');
    if (suggestNewsForm) {
        suggestNewsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newsTitle = document.getElementById('news-title').value;
            const newsContent = document.getElementById('news-content').value;
            const yourName = document.getElementById('your-name').value;

            if (newsTitle && newsContent) {
                alert(`Спасибо за предложенную новость '${newsTitle}' от ${yourName || 'Анонима'}! Мы рассмотрим её.`);
                suggestNewsForm.reset();
            } else {
                alert('Пожалуйста, заполните заголовок и текст новости.');
            }
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            accordionItem.classList.toggle('active');
        });
    });

    // --- Scroll to Top Button ---
   // Получаем кнопку
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Функция, которая будет проверять прокрутку и показывать/скрывать кнопку
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // Например, показать после 200px прокрутки
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Обработчик клика для плавного скролла
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
});

    // Скрипт запускается только после полной загрузки страницы
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target'); // Число из атрибута
                const current = +counter.innerText; // Текущее число
                
                // Скорость: чем больше делитель, тем медленнее бежит счетчик
                const increment = target / 80; 

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 30); // Задержка обновления (мс)
                } else {
                    counter.innerText = target; // Если дошли до цели, ставим ровное число
                }
            };
            
            updateCounter();
        });
    });
