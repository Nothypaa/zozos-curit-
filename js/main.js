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

    // Enhanced Gallery Slider functionality
    const modernSlider = document.querySelector('.modern-slider');
    const enhancedSlides = document.querySelectorAll('.enhanced-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    const progressFill = document.querySelector('.progress-fill');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const zoomBtns = document.querySelectorAll('.zoom-btn');

    let currentSlide = 0;
    let isAnimating = false;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let filteredSlides = Array.from(enhancedSlides);

    // Initialize gallery
    function initGallery() {
        if (enhancedSlides.length === 0) return;
        
        updateSlideCounter();
        updateSlider();
        startAutoPlay();
        
        // Set first slide and thumbnail as active
        enhancedSlides[0]?.classList.add('active');
        thumbnailItems[0]?.classList.add('active');
    }

    // Update slider position and states
    function updateSlider() {
        if (isAnimating || !modernSlider) return;
        isAnimating = true;

        // Remove active class from all slides and thumbnails
        enhancedSlides.forEach(slide => slide.classList.remove('active'));
        thumbnailItems.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current slide and thumbnail
        const currentFilteredSlide = filteredSlides[currentSlide];
        const slideIndex = Array.from(enhancedSlides).indexOf(currentFilteredSlide);
        
        if (currentFilteredSlide) {
            currentFilteredSlide.classList.add('active');
            thumbnailItems[slideIndex]?.classList.add('active');
        }
        
        // Move slider
        modernSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update progress bar
        updateProgressBar();
        
        // Update slide counter
        updateSlideCounter();
        
        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }

    // Update progress bar
    function updateProgressBar() {
        const progressPercent = ((currentSlide + 1) / filteredSlides.length) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
    }

    // Update slide counter
    function updateSlideCounter() {
        if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;
        if (totalSlidesSpan) totalSlidesSpan.textContent = filteredSlides.length;
    }

    // Navigate to next slide
    function nextSlide() {
        if (isAnimating || filteredSlides.length === 0) return;
        currentSlide = (currentSlide + 1) % filteredSlides.length;
        updateSlider();
    }

    // Navigate to previous slide
    function prevSlide() {
        if (isAnimating || filteredSlides.length === 0) return;
        currentSlide = (currentSlide - 1 + filteredSlides.length) % filteredSlides.length;
        updateSlider();
    }

    // Go to specific slide
    function goToSlide(index) {
        if (isAnimating || index === currentSlide || filteredSlides.length === 0) return;
        currentSlide = Math.max(0, Math.min(index, filteredSlides.length - 1));
        updateSlider();
    }

    // Auto-play functionality
    function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
    }

    // Filter functionality
    function filterSlides(category) {
        if (category === 'all') {
            filteredSlides = Array.from(enhancedSlides);
            enhancedSlides.forEach(slide => {
                slide.classList.remove('filtered-out');
                slide.style.display = 'flex';
            });
        } else {
            filteredSlides = Array.from(enhancedSlides).filter(slide => 
                slide.getAttribute('data-category') === category
            );
            enhancedSlides.forEach(slide => {
                if (slide.getAttribute('data-category') === category) {
                    slide.classList.remove('filtered-out');
                    slide.style.display = 'flex';
                } else {
                    slide.classList.add('filtered-out');
                    slide.style.display = 'none';
                }
            });
        }

        // Reset to first filtered slide
        currentSlide = 0;
        updateSlider();
        updateSlideCounter();
    }

    // Lightbox functionality
    function openLightbox(slideIndex) {
        const slide = enhancedSlides[slideIndex];
        if (!slide || !lightboxModal) return;

        const img = slide.querySelector('img');
        const title = slide.querySelector('h3');
        const description = slide.querySelector('p');

        if (lightboxImage && img) lightboxImage.src = img.src;
        if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
        if (lightboxDescription && description) lightboxDescription.textContent = description.textContent;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Touch/swipe handling
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

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Thumbnail navigation
    thumbnailItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            const originalIndex = Array.from(thumbnailItems).indexOf(thumb);
            const filteredIndex = filteredSlides.findIndex(slide => 
                Array.from(enhancedSlides).indexOf(slide) === originalIndex
            );
            if (filteredIndex !== -1) {
                goToSlide(filteredIndex);
            }
        });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter slides
            const category = btn.getAttribute('data-category');
            filterSlides(category);
        });
    });

    // Zoom buttons (lightbox)
    zoomBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
        const currentIndex = Array.from(enhancedSlides).findIndex(slide => 
            slide.querySelector('img').src === lightboxImage.src
        );
        const prevIndex = (currentIndex - 1 + enhancedSlides.length) % enhancedSlides.length;
        openLightbox(prevIndex);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', () => {
        const currentIndex = Array.from(enhancedSlides).findIndex(slide => 
            slide.querySelector('img').src === lightboxImage.src
        );
        const nextIndex = (currentIndex + 1) % enhancedSlides.length;
        openLightbox(nextIndex);
    });

    // Close lightbox on background click
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    lightboxPrev?.click();
                    break;
                case 'ArrowRight':
                    lightboxNext?.click();
                    break;
            }
        } else {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        }
    });

    // Touch/swipe support
    if (modernSlider) {
        modernSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        modernSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        // Pause auto-play on hover/interaction
        modernSlider.addEventListener('mouseenter', stopAutoPlay);
        modernSlider.addEventListener('mouseleave', startAutoPlay);
    }

    // Initialize the gallery
    initGallery();



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
      // Redirect to thank-you.html on successful submission
      window.location.href = '/thank-you.html';
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

// --- FAQ Page Enhanced Interactions ---
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        // Add enhanced interactions for FAQ items
        faqItems.forEach((item, index) => {
            const summary = item.querySelector('summary');
            const content = item.querySelector('.faq-content');
            
            if (summary && content) {
                // Add smooth toggle with enhanced animation
                summary.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close other open items for accordion behavior
                    faqItems.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index && otherItem.hasAttribute('open')) {
                            otherItem.removeAttribute('open');
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    if (item.hasAttribute('open')) {
                        item.removeAttribute('open');
                        item.classList.remove('active');
                    } else {
                        item.setAttribute('open', '');
                        item.classList.add('active');
                        
                        // Scroll to item if it's not fully visible
                        setTimeout(() => {
                            const rect = item.getBoundingClientRect();
                            if (rect.top < 100) {
                                item.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }, 300);
                    }
                });
                
                // Add hover sound effect (visual feedback)
                summary.addEventListener('mouseenter', function() {
                    if (!item.hasAttribute('open')) {
                        item.style.transform = 'translateY(-2px) scale(1.002)';
                    }
                });
                
                summary.addEventListener('mouseleave', function() {
                    if (!item.hasAttribute('open')) {
                        item.style.transform = 'translateY(0) scale(1)';
                    }
                });
            }
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'SUMMARY') {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });
        
        // Add search functionality (if needed in future)
        const searchInput = document.querySelector('.faq-search');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                
                faqItems.forEach(item => {
                    const summary = item.querySelector('summary');
                    const content = item.querySelector('.faq-content p');
                    
                    if (summary && content) {
                        const summaryText = summary.textContent.toLowerCase();
                        const contentText = content.textContent.toLowerCase();
                        
                        if (summaryText.includes(searchTerm) || contentText.includes(searchTerm)) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.display = 'none';
                            item.style.opacity = '0';
                        }
                    }
                });
            });
        }
    }
    
    // Add intersection observer for FAQ items animation
    const faqSection = document.querySelector('.faq-accordion-section');
    if (faqSection) {
        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.faq-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.2
        });
        
        faqObserver.observe(faqSection);
    }
    
    // Add parallax effect to hero section (if on FAQ page)
    const heroSmall = document.querySelector('.hero-small');
    if (heroSmall) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSmall.querySelector('.hero-title')) {
                heroSmall.querySelector('.hero-title').style.transform = `translateY(${rate}px)`;
            }
        });
    }
});
// --- End FAQ Page Enhanced Interactions ---