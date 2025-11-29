// Devis Alarme - Interactive Form Handler

// Get all choice cards from question 1
const question1Cards = document.querySelectorAll('#question-1 .choice-card');
const question2Section = document.getElementById('question-2');
const question3Section = document.getElementById('question-3');
const progressFill = document.querySelector('.progress-fill');
const progressCircle = document.querySelector('.progress-circle');
const progressLabels = document.querySelectorAll('.progress-label');

// Store user selections
let userSelections = {
    propertyType: null,
    habitationType: null,
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
            } else {
                // If "entreprise" is selected, skip to next section or handle differently
                // For now, just update progress
                progressFill.style.width = '33%';
                progressCircle.textContent = '33%';
                progressLabels[0].classList.remove('active');
                progressLabels[1].classList.add('active');

                // Hide question 2 if it was previously shown
                question2Section.style.display = 'none';

                // Clear question 2 selection
                question2Cards.forEach(c => c.classList.remove('selected'));
                userSelections.habitationType = null;

                // Hide question 3
                question3Section.style.display = 'none';

                // Clear question 3 selection
                question3Cards.forEach(c => c.classList.remove('selected'));
                userSelections.exteriorProtection = null;

                // Hide postal code section
                postalCodeSection.style.display = 'none';
                postalCodeInput.value = '';
                userSelections.postalCode = null;
            }
        }
    });
});

// Get all choice cards from question 2
const question2Cards = document.querySelectorAll('#question-2 .choice-card');

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

            // Hide question 3
            question3Section.style.display = 'none';

            // Clear question 3 selection
            question3Cards.forEach(c => c.classList.remove('selected'));
            userSelections.exteriorProtection = null;

            // Hide question 4
            question4Section.style.display = 'none';
            question4Cards.forEach(c => c.classList.remove('selected'));
            userSelections.telesurveillance = null;

            // POSTAL CODE SECTION TEMPORARILY REMOVED
            // postalCodeSection.style.display = 'none';
            // postalCodeInput.value = '';
            // userSelections.postalCode = null;
        } else {
            // Remove selected class from all cards in question 2
            question2Cards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selection
            userSelections.habitationType = choice;

            // Only show question 3 if "maison" is selected
            if (choice === 'maison') {
                // Show question 3 with smooth transition
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
                // If "appartement" is selected, skip question 3 and show question 4
                question3Section.style.display = 'none';

                // Clear question 3 selection
                question3Cards.forEach(c => c.classList.remove('selected'));
                userSelections.exteriorProtection = null;

                // Show question 4 (telesurveillance) directly
                question4Section.style.display = 'block';
                setTimeout(() => {
                    question4Section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                // Hide postal code section
                postalCodeSection.style.display = 'none';
                postalCodeInput.value = '';
                userSelections.postalCode = null;

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

// POSTAL CODE SECTION TEMPORARILY REMOVED
// const postalCodeSection = document.getElementById('postal-code-section');
// const postalCodeInput = document.getElementById('postal-code-input');
// const postalCodeButton = document.getElementById('postal-code-button');

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

            // POSTAL CODE SECTION TEMPORARILY REMOVED
            // postalCodeSection.style.display = 'none';
            // postalCodeInput.value = '';
            // userSelections.postalCode = null;
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

// POSTAL CODE HANDLERS TEMPORARILY REMOVED - WILL RE-ADD LATER
/*
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
*/

// Handle question 4 selections (telesurveillance)
question4Cards.forEach(card => {
    card.addEventListener('click', () => {
        const choice = card.getAttribute('data-choice');
        const isAlreadySelected = card.classList.contains('selected');

        // If clicking the same card, deselect it
        if (isAlreadySelected) {
            card.classList.remove('selected');
            userSelections.telesurveillance = null;

            // POSTAL CODE SECTION TEMPORARILY REMOVED
            // postalCodeSection.style.display = 'none';
            // postalCodeInput.value = '';
            // userSelections.postalCode = null;

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

            // Update progress bar to 100%
            progressFill.style.width = '100%';
            progressCircle.textContent = '100%';

            // Turn endpoint circle red
            progressEndpoint.style.background = '#FF3333';

            // FINAL QUESTION - Show completion message
            setTimeout(() => {
                alert('Merci ! Votre devis est prêt.');
            }, 300);
        }
    });
});
