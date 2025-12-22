/**
 * ALARM PAGE JAVASCRIPT
 * Installation Alarme Montpellier
 */

document.addEventListener('DOMContentLoaded', function() {

    // Phone form submission handler with Formspree
    const phoneForm = document.querySelector('.banner-phone-form');

    if (phoneForm) {
        phoneForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const phoneInput = this.querySelector('.banner-phone-input');
            const submitBtn = this.querySelector('.banner-phone-submit');
            const phoneNumber = phoneInput.value.trim();

            // Validate phone number (10 digits)
            if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
                alert('Veuillez entrer un numéro de téléphone valide (10 chiffres)');
                return;
            }

            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = '...';

            try {
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    alert('✓ Merci ! Nous vous contacterons bientôt au ' + phoneNumber);
                    phoneInput.value = '';
                } else {
                    // Error from Formspree
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                alert('Une erreur est survenue. Veuillez réessayer ou nous appeler au 07 67 56 39 26');
                console.error('Form submission error:', error);
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'OK';
            }
        });
    }

    // Smooth scroll behavior for anchor links (if needed later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Seamless infinite logo carousel animation
    const logoCarousel = document.querySelector('.logo-carousel');
    const logoTrack = document.querySelector('.logo-track');

    if (logoCarousel && logoTrack) {
        let currentPosition = 0;
        let targetSpeed = 1;
        let currentSpeed = 1;
        let isRunning = true;

        // Calculate the total width to scroll (7 logos + gaps)
        const logoWidth = 120; // Width of each logo
        const gap = 64; // 4rem = 64px (gap between logos)
        const totalWidth = (logoWidth + gap) * 7; // 7 logos (first set)

        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        const baseSpeed = isMobile ? 1.2 : 0.5; // Faster on mobile

        function animate() {
            if (!isRunning) return;

            // Smooth speed interpolation
            const speedDiff = targetSpeed - currentSpeed;
            currentSpeed += speedDiff * 0.08; // Smooth transition

            // Move the carousel
            currentPosition -= baseSpeed * currentSpeed;

            // Reset position when we've scrolled through the first set
            if (Math.abs(currentPosition) >= totalWidth) {
                currentPosition = 0;
            }

            // Apply transform
            logoTrack.style.transform = `translateX(${currentPosition}px)`;

            requestAnimationFrame(animate);
        }

        // Start the animation
        animate();

        // Hover controls (only on desktop with mouse)
        if (!isMobile) {
            logoCarousel.addEventListener('mouseenter', () => {
                targetSpeed = 0.25; // Slow down to 25% speed
            });

            logoCarousel.addEventListener('mouseleave', () => {
                targetSpeed = 1; // Return to normal speed
            });
        }
    }

    // Testimonials Carousel
    const track = document.querySelector('.testimonials-track');
    const cards = Array.from(track.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    let currentIndex = 0;
    const cardsPerView = 3;
    const totalPages = Math.ceil(cards.length / cardsPerView);

    // Create dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
    }

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // 1.5rem gap
        const offset = currentIndex * cardsPerView * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalPages - 1;
    }

    function goToPage(pageIndex) {
        currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Update on resize
    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // Sticky CTA button functionality
    const stickyCTA = document.getElementById('stickyCTA');
    const heroSection = document.querySelector('.hero-section');
    const footer = document.querySelector('.alarm-footer');

    window.addEventListener('scroll', function() {
        if (heroSection && footer) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const footerTop = footer.offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

            // Show CTA after hero, but hide when reaching footer
            if (window.scrollY > heroBottom && scrollPosition < footerTop + 100) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Statistics Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, duration / steps);
    }

    // Intersection Observer for triggering animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    animateCounter(statNumber);
                });
                statsObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

});
