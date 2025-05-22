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
                // Ensure targetId starts with # and has more characters
                if (targetId && targetId.length > 1) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } else if (targetId === '#') {
                    // Handle case where href is just "#" (scroll to top)
                    window.scrollTo({
                        top: 0,
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
        if (!element || !element.getAttribute('data-target')) {
            console.warn('animateCounter called with invalid element or missing data-target', element);
            return;
        }
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


    // Desktop navigation scroll effect
const desktopNav = document.querySelector('.desktop-nav');

if (desktopNav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            desktopNav.classList.add('scrolled');
        } else {
            desktopNav.classList.remove('scrolled');
        }
    });
}

// Prevent logo movement on click
document.querySelector('.site-logo').addEventListener('click', function(e) {
    // Only prevent default if it's an internal anchor
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      // Smooth scroll to the section instead
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });

  // Fix for logo movement on mobile
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.site-logo');
    
    if (logo) {
      // Add styles to prevent tap highlight
      logo.style.webkitTapHighlightColor = 'transparent';
      logo.style.outline = 'none';
      logo.style.userSelect = 'none';
      logo.style.webkitTouchCallout = 'none';
      logo.style.touchAction = 'manipulation';
      
      // Prevent default action on touchstart (for mobile)
      logo.addEventListener('touchstart', function(e) {
        // Prevent any transform from happening
        this.style.transform = 'none';
      }, { passive: true });
      
      // Handle touch end event
      logo.addEventListener('touchend', function(e) {
        // Prevent the default behavior which can cause movement
        e.preventDefault();
        
        // Get the href attribute
        const href = this.getAttribute('href');
        
        // If it's an anchor link, handle smooth scrolling
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    }
  });


// Add simple scroll behavior for the arrow
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow a');
    
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.getElementById(targetId.substring(1));
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});


// --- Handle Formspree Contact Form Submission ---
const contactForm = document.getElementById('secure-contact-form');
const formStatus = document.getElementById('form-status');

async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission
  const form = event.target;
  const data = new FormData(form);
  
  if (formStatus) {
      formStatus.textContent = 'Envoi en cours...';
      formStatus.style.color = 'orange';
  }

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json' // Request JSON response from Formspree
      }
    });

    if (response.ok) {
      if (formStatus) {
          formStatus.textContent = "Merci ! Votre message a été envoyé.";
          formStatus.style.color = 'lightgreen';
      }
      form.reset(); // Clear the form fields
    } else {
      // Try to parse error response from Formspree
      response.json().then(data => {
        if (formStatus) {
            if (Object.hasOwn(data, 'errors')) {
              formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
              formStatus.textContent = "Oops! Une erreur s'est produite lors de l'envoi.";
            }
            formStatus.style.color = 'red';
        }
      }).catch(error => {
          // Fallback error message if JSON parsing fails
          if (formStatus) {
              formStatus.textContent = "Oops! Une erreur s'est produite lors de l'envoi.";
              formStatus.style.color = 'red';
          }
      });
    }
  } catch (error) {
    // Network or other fetch errors
    if (formStatus) {
        formStatus.textContent = "Oops! Erreur de connexion.";
        formStatus.style.color = 'red';
    }
    console.error("Form submission error:", error);
  }
}

// Add event listener only if the form exists
if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
}


// --- Cookie Consent Banner Logic ---
const cookieConsentBanner = document.getElementById('cookie-consent-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const rejectCookiesBtn = document.getElementById('reject-cookies');
const consentKey = 'cookie_consent_given_zozosecurite'; // Use a specific key

function loadGoogleAnalytics() {
    // Check if GA script already loaded (e.g., by mistake or previous consent)
    if (typeof gtag === 'function') {
        console.log('Google Analytics already loaded or loading.');
        return;
    }
    console.log('Consent given. Loading Google Analytics...');

    // Dynamically create and append the GA script tags
    // Ensure your actual Tracking ID is used here
    const gaTrackingId = 'G-DERWVMJ868'; 
    
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
    script1.id = 'google-analytics-script-1'; // Add ID for potential removal on rejection

    const script2 = document.createElement('script');
    script2.id = 'google-analytics-script-2'; // Add ID for potential removal on rejection
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}');
    `;

    document.head.appendChild(script1);
    document.head.appendChild(script2);
}

function removeGoogleAnalytics() {
    console.log('Consent rejected or withdrawn. Removing Google Analytics scripts if present.');
    const script1 = document.getElementById('google-analytics-script-1');
    const script2 = document.getElementById('google-analytics-script-2');
    if (script1) script1.remove();
    if (script2) script2.remove();
    // You might also want to delete GA cookies, though this is more complex
}

function checkCookieConsent() {
    const consentGiven = localStorage.getItem(consentKey);

    if (consentGiven === 'true') {
        // User has already accepted
        console.log('Previous consent found: true');
        loadGoogleAnalytics();
        if (cookieConsentBanner) cookieConsentBanner.style.display = 'none';
    } else if (consentGiven === 'false') {
        // User has already rejected
        console.log('Previous consent found: false');
        if (cookieConsentBanner) cookieConsentBanner.style.display = 'none';
        // Ensure GA is not loaded
        removeGoogleAnalytics(); 
    } else {
        // No consent decision recorded, show the banner
        console.log('No previous consent found. Displaying banner.');
        if (cookieConsentBanner) cookieConsentBanner.style.display = 'flex'; // Use flex or block based on your CSS
    }
}

if (cookieConsentBanner && acceptCookiesBtn && rejectCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        console.log('Consent accepted.');
        localStorage.setItem(consentKey, 'true');
        cookieConsentBanner.style.display = 'none';
        loadGoogleAnalytics();
    });

    rejectCookiesBtn.addEventListener('click', () => {
        console.log('Consent rejected.');
        localStorage.setItem(consentKey, 'false');
        cookieConsentBanner.style.display = 'none';
        removeGoogleAnalytics(); // Attempt to remove GA if it was loaded
    });

    // Check consent status once the DOM is fully loaded
    checkCookieConsent();
} else {
    console.warn('Cookie consent banner elements not found. Consent check skipped.');
    // If banner elements aren't found, maybe load GA by default? Or do nothing.
    // Decide based on compliance needs. Safest is to NOT load GA if banner fails.
} // <-- Added missing closing brace
// --- End Cookie Consent Banner Logic ---