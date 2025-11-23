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

});
