// Devis Alarme - Interactive Form Handler

// Get all choice cards from question 1
const question1Cards = document.querySelectorAll('#question-1 .choice-card');
const question2Section = document.getElementById('question-2');
const question2bSection = document.getElementById('question-2b');
const question3Section = document.getElementById('question-3');
const progressFill = document.querySelector('.progress-fill');
const progressCircle = document.querySelector('.progress-circle');
const progressLabels = document.querySelectorAll('.progress-label');

// Store user selections
let userSelections = {
    propertyType: null,
    habitationType: null,
    businessType: null,
    entryPoints: null,
    exteriorProtection: null,
    postalCode: null,
    phoneNumber: null,
    telesurveillance: null
};

// Handle question 1 selections
question1Cards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.propertyType = null;

            // Reset progress
            progressFill.style.width = '0%';
            progressCircle.textContent = '0%';
            progressLabels[0].classList.add('active');
            progressLabels[1].classList.remove('active');

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 2
            question2Section.style.display = 'none';

            // Clear question 2 selection
            question2Cards.forEach(c => c.classList.remove('selected'));
            userSelections.habitationType = null;

            // Hide question 3
            question3Section.style.display = 'none';

            // Clear question 3 selection
            question3Cards.forEach(c => c.classList.remove('selected'));
            userSelections.exteriorProtection = null;

            // POSTAL CODE SECTION TEMPORARILY REMOVED
            // postalCodeSection.style.display = 'none';
            // postalCodeInput.value = '';
            // userSelections.postalCode = null;
        } else {
            // Remove selected class from all cards in question 1
            question1Cards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.propertyType = choice;

            // Only show question 2 if "habitation" is selected
            if (choice === 'habitation') {
                // Show question 2 with smooth transition
                question2Section.style.display = 'block';
                setTimeout(() => {
                    question2Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                // Update progress bar to 14% (1/7 steps for habitation)
                progressFill.style.width = '14%';
                progressCircle.textContent = '14%';

                // Update progress labels
                progressLabels[0].classList.remove('active');
                progressLabels[1].classList.add('active');
            } else if (choice === 'entreprise') {
                // If "entreprise" is selected, show question 2b (business type)
                // Hide question 2 (habitation type)
                question2Section.style.display = 'none';

                // Show question 2b with smooth transition
                question2bSection.style.display = 'block';
                setTimeout(() => {
                    question2bSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                // Update progress bar to 17% (1/6 steps for entreprise)
                progressFill.style.width = '17%';
                progressCircle.textContent = '17%';
                progressLabels[0].classList.remove('active');
                progressLabels[1].classList.add('active');

                // Clear question 2 selection
                question2Cards.forEach(c => c.classList.remove('selected'));
                userSelections.habitationType = null;

                // Hide question 3
                question3Section.style.display = 'none';

                // Clear question 3 selection
                question3Cards.forEach(c => c.classList.remove('selected'));
                userSelections.exteriorProtection = null;
            }
        }
    });
});

// Get all choice cards from question 2
const question2Cards = document.querySelectorAll('#question-2 .choice-card');

// Get all choice cards from question 2b (business type)
const question2bCards = document.querySelectorAll('#question-2b .choice-card');

// Get question 2c elements (entry points for business)
const question2cSection = document.getElementById('question-2c');
const question2cCards = document.querySelectorAll('#question-2c .choice-card');

// Get question 2d elements (entry points for habitation)
const question2dSection = document.getElementById('question-2d');
const question2dCards = document.querySelectorAll('#question-2d .choice-card');

// Handle question 2 selections
question2Cards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.habitationType = null;

            // Reset progress to 14% (back to step 1/7 for habitation)
            progressFill.style.width = '14%';
            progressCircle.textContent = '14%';
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 2d
            question2dSection.style.display = 'none';
            question2dCards.forEach(c => c.classList.remove('selected'));
            userSelections.entryPoints = null;

            // Hide question 3
            question3Section.style.display = 'none';

            // Clear question 3 selection
            question3Cards.forEach(c => c.classList.remove('selected'));
            userSelections.exteriorProtection = null;

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;

            // Hide postal code section
            postalCodeSection.style.display = 'none';
            postalCodeInput.value = '';
            userSelections.postalCode = null;
        } else {
            // Remove selected class from all cards in question 2
            question2Cards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.habitationType = choice;

            // Show question 2d (entry points) for both appartement and maison
            question2dSection.style.display = 'block';
            setTimeout(() => {
                question2dSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Update progress bar to 29% (2/7 steps for habitation)
            progressFill.style.width = '29%';
            progressCircle.textContent = '29%';

            // Keep progress labels the same (still on PROTECTION)
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');
        }

        console.log('User selections:', userSelections);
    });
});

// Handle question 2b selections (business type)
question2bCards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.businessType = null;

            // Reset progress to 17% (back to step 1/6 for entreprise)
            progressFill.style.width = '17%';
            progressCircle.textContent = '17%';
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 2c
            question2cSection.style.display = 'none';
            question2cCards.forEach(c => c.classList.remove('selected'));
            userSelections.entryPoints = null;

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;
        } else {
            // Remove selected class from all cards in question 2b
            question2bCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.businessType = choice;

            // Show question 2c (entry points) for entreprise
            question2cSection.style.display = 'block';
            setTimeout(() => {
                question2cSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Update progress bar to 33% (2/6 steps for entreprise)
            progressFill.style.width = '33%';
            progressCircle.textContent = '33%';

            // Keep progress labels the same (still on PROTECTION)
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');
        }

        console.log('User selections:', userSelections);
    });
});

// Handle question 2c selections (entry points for business)
question2cCards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.entryPoints = null;

            // Reset progress to 33% (back to step 2/6 for entreprise)
            progressFill.style.width = '33%';
            progressCircle.textContent = '33%';
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;
        } else {
            // Remove selected class from all cards in question 2c
            question2cCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.entryPoints = choice;

            // Show question 4 (telesurveillance)
            question4Section.style.display = 'block';
            setTimeout(() => {
                question4Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Update progress bar to 50% (3/6 steps for entreprise)
            progressFill.style.width = '50%';
            progressCircle.textContent = '50%';

            // Update progress labels
            progressLabels[1].classList.remove('active');
            progressLabels[2].classList.add('active');
        }

        console.log('User selections:', userSelections);
    });
});

// Handle question 2d selections (entry points for habitation)
question2dCards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.entryPoints = null;

            // Reset progress to 29% (back to step 2 for habitation)
            progressFill.style.width = '29%';
            progressCircle.textContent = '29%';
            progressLabels[1].classList.add('active');
            progressLabels[2].classList.remove('active');

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 3
            question3Section.style.display = 'none';
            question3Cards.forEach(c => c.classList.remove('selected'));
            userSelections.exteriorProtection = null;

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;
        } else {
            // Remove selected class from all cards in question 2d
            question2dCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.entryPoints = choice;

            // Check if user selected "maison" to show question 3, or "appartement" to skip to question 4
            if (userSelections.habitationType === 'maison') {
                // Show question 3 (exterior protection) for maison
                question3Section.style.display = 'block';
                setTimeout(() => {
                    question3Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                // Update progress bar to 43% (3/7 steps for maison)
                progressFill.style.width = '43%';
                progressCircle.textContent = '43%';

                // Update progress labels
                progressLabels[1].classList.remove('active');
                progressLabels[2].classList.add('active');
            } else {
                // For appartement, skip question 3 and go directly to question 4
                question3Section.style.display = 'none';
                question3Cards.forEach(c => c.classList.remove('selected'));
                userSelections.exteriorProtection = null;

                // Show question 4 (telesurveillance)
                question4Section.style.display = 'block';
                setTimeout(() => {
                    question4Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                // Update progress bar to 50% (3/6 steps for appartement)
                progressFill.style.width = '50%';
                progressCircle.textContent = '50%';

                // Update progress labels
                progressLabels[1].classList.remove('active');
                progressLabels[2].classList.add('active');
            }
        }

        console.log('User selections:', userSelections);
    });
});

// Get all choice cards from question 3
const question3Cards = document.querySelectorAll('#question-3 .choice-card');
const progressEndpoint = document.querySelector('.progress-endpoint');

// Get question 4 elements
const question4Section = document.getElementById('question-4');
const question4Cards = document.querySelectorAll('#question-4 .choice-card');

// Get postal code elements
const postalCodeSection = document.getElementById('postal-code-section');
const postalCodeInput = document.getElementById('postal-code-input');
const postalCodeButton = document.getElementById('postal-code-button');

// Handle question 3 selections
question3Cards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.exteriorProtection = null;

            // Reset progress to 43% (back to step 3/7 for maison)
            progressFill.style.width = '43%';
            progressCircle.textContent = '43%';

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;

            // Hide postal code section
            postalCodeSection.style.display = 'none';
            postalCodeInput.value = '';
            userSelections.postalCode = null;
        } else {
            // Remove selected class from all cards in question 3
            question3Cards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.exteriorProtection = choice;

            // Show question 4 (telesurveillance)
            question4Section.style.display = 'block';
            setTimeout(() => {
                question4Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Update progress bar to 57% (4/7 steps for maison)
            progressFill.style.width = '57%';
            progressCircle.textContent = '57%';
        }

        console.log('User selections:', userSelections);
    });
});

// Get phone section elements
const phoneSection = document.getElementById('phone-section');
const phoneInput = document.getElementById('phone-input');
const phoneButton = document.getElementById('phone-button');

// Handle postal code submission
postalCodeButton.addEventListener('click', () => {
    const postalCode = postalCodeInput.value.trim();

    // Validate postal code (5 digits)
    if (postalCode.length === 5 && /^[0-9]{5}$/.test(postalCode)) {
        userSelections.postalCode = postalCode;
        console.log('User selections:', userSelections);

        // Show phone section
        phoneSection.style.display = 'block';
        setTimeout(() => {
            phoneSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

        // Update progress based on path
        if (userSelections.habitationType === 'maison') {
            progressFill.style.width = '86%'; // 6/7 steps for maison
            progressCircle.textContent = '86%';
        } else if (userSelections.habitationType === 'appartement') {
            progressFill.style.width = '83%'; // 5/6 steps for appartement
            progressCircle.textContent = '83%';
        } else {
            progressFill.style.width = '83%'; // 5/6 steps for entreprise
            progressCircle.textContent = '83%';
        }
    } else {
        alert('Veuillez entrer un code postal valide (5 chiffres)');
    }
});

// Allow Enter key to submit postal code
postalCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        postalCodeButton.click();
    }
});

// Handle question 4 selections (telesurveillance)
question4Cards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.telesurveillance = null;

            // Hide postal code section
            postalCodeSection.style.display = 'none';
            postalCodeInput.value = '';
            userSelections.postalCode = null;

            // Hide phone section
            phoneSection.style.display = 'none';
            phoneInput.value = '';
            userSelections.phoneNumber = null;

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Reset progress based on path
            if (userSelections.habitationType === 'maison') {
                progressFill.style.width = '57%'; // Back to step 4/7
                progressCircle.textContent = '57%';
            } else if (userSelections.habitationType === 'appartement') {
                progressFill.style.width = '50%'; // Back to step 3/6
                progressCircle.textContent = '50%';
            } else {
                progressFill.style.width = '50%'; // Back to step 3/6 for entreprise
                progressCircle.textContent = '50%';
            }
        } else {
            // Remove selected class from all cards in question 4
            question4Cards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.telesurveillance = choice;

            console.log('User selections:', userSelections);

            // Show postal code section
            postalCodeSection.style.display = 'block';
            setTimeout(() => {
                postalCodeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Update progress based on path
            if (userSelections.habitationType === 'maison') {
                progressFill.style.width = '71%'; // 5/7 steps for maison
                progressCircle.textContent = '71%';
            } else if (userSelections.habitationType === 'appartement') {
                progressFill.style.width = '67%'; // 4/6 steps for appartement
                progressCircle.textContent = '67%';
            } else {
                progressFill.style.width = '67%'; // 4/6 steps for entreprise
                progressCircle.textContent = '67%';
            }

            // Turn endpoint circle red
            progressEndpoint.style.background = '#FF3333';
        }
    });
});

// Format phone number as user types
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    // Format as XX XX XX XX XX
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 2 === 0) {
            formatted += ' ';
        }
        formatted += value[i];
    }

    e.target.value = formatted;
});

// Handle phone number submission
phoneButton.addEventListener('click', async () => {
    const phoneNumber = phoneInput.value.replace(/\s/g, ''); // Remove spaces

    // Validate phone number (10 digits, starting with 0)
    if (phoneNumber.length === 10 && /^0[1-9][0-9]{8}$/.test(phoneNumber)) {
        userSelections.phoneNumber = phoneNumber;
        console.log('Final selections:', userSelections);

        // Disable button to prevent double submission
        phoneButton.disabled = true;
        phoneButton.textContent = 'Envoi en cours...';

        try {
            // Prepare form data for Formspree
            const formData = new FormData();
            formData.append('Type de propriété', userSelections.propertyType === 'habitation' ? 'Habitation' : 'Entreprise');

            if (userSelections.habitationType) {
                formData.append('Type d\'habitation', userSelections.habitationType === 'appartement' ? 'Appartement' : 'Maison');
            }

            if (userSelections.businessType) {
                const businessTypes = {
                    'commerce': 'Commerce',
                    'bar-restaurant': 'Bar ou restaurant',
                    'cabinet-medical': 'Bureau ou cabinet médical',
                    'atelier-entrepot': 'Atelier ou entrepôt',
                    'local-administratif': 'Local administratif, sportif ou éducatif',
                    'autre': 'Autre'
                };
                formData.append('Type d\'entreprise', businessTypes[userSelections.businessType] || userSelections.businessType);
            }

            if (userSelections.entryPoints) {
                formData.append('Points d\'accès', userSelections.entryPoints);
            }

            if (userSelections.exteriorProtection) {
                formData.append('Protection extérieure', userSelections.exteriorProtection === 'oui' ? 'Oui' : 'Non');
            }

            if (userSelections.telesurveillance) {
                formData.append('Télésurveillance', userSelections.telesurveillance === 'oui' ? 'Oui' : 'Non');
            }

            formData.append('Code postal', userSelections.postalCode);
            formData.append('Téléphone', phoneInput.value);
            formData.append('source', 'devis-alarme');

            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/mzzwonvk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Update progress to 100% on successful submission
                progressFill.style.width = '100%';
                progressCircle.textContent = '100%';

                alert('Merci ! Votre demande de devis a été envoyée. Nous vous contacterons bientôt au ' + phoneInput.value);
                // Optionally redirect to thank you page
                // window.location.href = '/thank-you.html';
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement.');

            // Re-enable button
            phoneButton.disabled = false;
            phoneButton.innerHTML = 'Obtenir mon devis <svg class="button-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8l4 4-4 4"/></svg>';
        }
    } else {
        alert('Veuillez entrer un numéro de téléphone valide (10 chiffres)');
    }
});

// Allow Enter key to submit phone number
phoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        phoneButton.click();
    }
});
