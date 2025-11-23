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

});
