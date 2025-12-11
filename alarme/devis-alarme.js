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

                // Update progress bar to 33%
                progressFill.style.width = '33%';
                progressCircle.textContent = '33%';

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

                // Update progress bar to 33%
                progressFill.style.width = '33%';
                progressCircle.textContent = '33%';
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

            // Reset progress to 33%
            progressFill.style.width = '33%';
            progressCircle.textContent = '33%';
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

            // Update progress bar to 50%
            progressFill.style.width = '50%';
            progressCircle.textContent = '50%';

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

            // Reset progress to 33%
            progressFill.style.width = '33%';
            progressCircle.textContent = '33%';
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

            // Update progress bar to 50%
            progressFill.style.width = '50%';
            progressCircle.textContent = '50%';

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

            // Reset progress to 50%
            progressFill.style.width = '50%';
            progressCircle.textContent = '50%';
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

            // Update progress bar to 66%
            progressFill.style.width = '66%';
            progressCircle.textContent = '66%';

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

            // Reset progress to 50%
            progressFill.style.width = '50%';
            progressCircle.textContent = '50%';
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

                // Update progress bar to 66%
                progressFill.style.width = '66%';
                progressCircle.textContent = '66%';

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

                // Update progress bar to 66%
                progressFill.style.width = '66%';
                progressCircle.textContent = '66%';

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

            // Reset progress to 66%
            progressFill.style.width = '66%';
            progressCircle.textContent = '66%';

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
        }

        console.log('User selections:', userSelections);
    });
});

// Handle postal code submission
postalCodeButton.addEventListener('click', () => {
    const postalCode = postalCodeInput.value.trim();

    // Validate postal code (5 digits)
    if (postalCode.length === 5 && /^[0-9]{5}$/.test(postalCode)) {
        userSelections.postalCode = postalCode;
        console.log('Final selections:', userSelections);

        // Here you can add logic to submit the form or redirect to next page
        setTimeout(() => {
            alert('Merci ! Votre devis est prêt.');
        }, 300);
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

            // Reset endpoint to grey
            progressEndpoint.style.background = '#E0E0E0';

            // Reset progress to 66%
            progressFill.style.width = '66%';
            progressCircle.textContent = '66%';
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

            // Update progress bar to 100%
            progressFill.style.width = '100%';
            progressCircle.textContent = '100%';

            // Turn endpoint circle red
            progressEndpoint.style.background = '#FF3333';
        }
    });
});
