    // i want every js code to be stored here



    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform += ' scale(0.8)';
        cursorDot.style.transform += ' scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
        cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.8)', '');
    });




    // Add smooth section transitions
    const observerOptions = {
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-transition');
        sectionObserver.observe(section);
    });

    // Smooth scroll handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let isAnimating = false;

    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        
        // Move slider
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match this with CSS transition duration
    }

    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Initialize first slide
    slides[0].classList.add('active');

    // Event listeners
    prevButton?.addEventListener('click', prevSlide);
    nextButton?.addEventListener('click', nextSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 3000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));

    // Initialize swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }



    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

    // Toggle mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });




    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-target').includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 50; // Adjust for animation speed
        const duration = 2000; // 2 seconds
        const stepTime = duration / (target / increment);

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    // Observe all counter elements
    document.querySelectorAll('.exp-number').forEach(counter => {
        counterObserver.observe(counter);
    });


    

    