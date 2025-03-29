    // i want every js code to be stored here



    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot) {
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
    }





    // Add smooth section transitions
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
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

        sections.forEach(section => {
            section.classList.add('section-transition');
            sectionObserver.observe(section);
        });
    }

    // Smooth scroll handling
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors.length > 0) {
        anchors.forEach(anchor => {
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
    }

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

    if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
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
}



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




    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
    
        // Validation patterns
        const patterns = {
            name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            phone: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: /^[\s\S]{10,1000}$/
        };
    
        // Error messages
        const errorMessages = {
            name: 'Veuillez entrer un nom valide (2-50 caractères)',
            email: 'Veuillez entrer une adresse email valide',
            phone: 'Veuillez entrer un numéro de téléphone valide (format français)',
            message: 'Votre message doit contenir entre 10 et 1000 caractères',
            recaptcha: 'Veuillez cocher la case reCAPTCHA'
        };
    
        // Validate single field
        function validateField(field, pattern) {
            const parent = field.parentElement;
            const errorElement = document.getElementById(`${field.id}Error`);
            
            if (field.value === '' && field.required) {
                parent.classList.add('error');
                errorElement.textContent = 'Ce champ est requis';
                return false;
            }
            
            if (field.value !== '' && !pattern.test(field.value)) {
                parent.classList.add('error');
                errorElement.textContent = errorMessages[field.id];
                return false;
            }
            
            parent.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    
        // Real-time validation
        const inputs = [nameInput, emailInput, phoneInput, messageInput];
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value !== '' || input.required) {
                    validateField(input, patterns[input.id]);
                }
            });
    
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    validateField(input, patterns[input.id]);
                }
            });
        });
    
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (input.value !== '' || input.required) {
                    if (!validateField(input, patterns[input.id])) {
                        isValid = false;
                    }
                }
            });
    
            // Validate reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            const recaptchaError = document.getElementById('recaptchaError');
            
            if (!recaptchaResponse) {
                recaptchaError.style.display = 'block';
                recaptchaError.textContent = errorMessages.recaptcha;
                isValid = false;
            } else {
                recaptchaError.style.display = 'none';
            }
    
            // If all valid, submit form
            if (isValid) {
                // Show loading state
                const submitButton = form.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="loading"></span> Envoi...';
                submitButton.disabled = true;
    
                // Submit form
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        form.reset();
                        grecaptcha.reset();
                        alert('Message envoyé avec succès!');
                    } else {
                        throw new Error('Erreur lors de l\'envoi');
                    }
                })
                .catch(error => {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                })
                .finally(() => {
                    // Restore button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
            }
        });
    });
    

    