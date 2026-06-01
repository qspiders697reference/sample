document.addEventListener('DOMContentLoaded', () => {
    
    // --- Responsive Mobile Navigation Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuLinks = document.querySelectorAll('.nav-item');

    // Toggle menu state
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Collapse navigation overlay on tracking selection
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });


    // --- Highlight Navigation Selection on Window Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- Testimonial Carousel Structural Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlideIndex = 0;

    // Generate indicator dots dynamically
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => jumpToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarouselLayout() {
        const container = document.querySelector('.carousel-container');
        container.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarouselLayout();
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarouselLayout();
    }

    function jumpToSlide(index) {
        currentSlideIndex = index;
        updateCarouselLayout();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto loop cycle for slide execution every 6 seconds
    let autoScrollInterval = setInterval(nextSlide, 6000);

    // Clear interval tracking on interaction wrapper
    document.querySelector('.carousel-wrapper').addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(nextSlide, 6000);
    });
});