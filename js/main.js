// i want every js code to be stored here









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

    // Google Reviews - Toggle Read More/Less functionality
    window.toggleReviewText = function(button) {
        const reviewText = button.parentElement;
        const fullText = reviewText.getAttribute('data-full-text');
        const isExpanded = reviewText.classList.contains('expanded');
        
        // Clear the content safely
        reviewText.textContent = '';
        
        if (isExpanded) {
            // Collapse the text
            const truncatedText = document.createTextNode(fullText.substring(0, 100) + '...');
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Lire plus';
            readMoreBtn.onclick = () => toggleReviewText(readMoreBtn);
            
            reviewText.appendChild(truncatedText);
            reviewText.appendChild(readMoreBtn);
            reviewText.classList.remove('expanded');
        } else {
            // Expand the text
            const fullTextNode = document.createTextNode(fullText);
            const readLessBtn = document.createElement('button');
            readLessBtn.className = 'read-more-btn';
            readLessBtn.textContent = 'Lire moins';
            readLessBtn.onclick = () => toggleReviewText(readLessBtn);
            
            reviewText.appendChild(fullTextNode);
            reviewText.appendChild(readLessBtn);
            reviewText.classList.add('expanded');
        }
    };



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

// Enhanced image interaction effects
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const floatingBadge = document.querySelector('.floating-badge');
    
    if (imageContainer) {
        // Add 3D tilt effect on mouse move
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = imageContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = deltaY * -10; // Tilt up/down
            const rotateY = deltaX * 10;  // Tilt left/right
            
            imageContainer.style.transform = `
                translateY(-5px) 
                scale(1.02) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
        
        // Reset transform on mouse leave
        imageContainer.addEventListener('mouseleave', function() {
            imageContainer.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
        
        // Add click ripple effect
        imageContainer.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                transform: translate(-50%, -50%) scale(0);
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            imageContainer.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add parallax effect to floating badge
        if (floatingBadge) {
            imageContainer.addEventListener('mousemove', function(e) {
                const rect = imageContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);
                
                floatingBadge.style.transform = `translate(${deltaX * 5}px, ${deltaY * 5}px)`;
            });
            
            imageContainer.addEventListener('mouseleave', function() {
                floatingBadge.style.transform = 'translate(0px, 0px)';
            });
        }
        
        // Add scroll-based animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imageContainer.style.animation = 'slideInScale 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
                }
            });
        }, observerOptions);
        
        imageObserver.observe(imageContainer);
    }
});

// Add CSS keyframes for ripple and slide animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInScale {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Smooth logo carousel animation control with manual transform
const logoCarousel = document.querySelector('.logo-carousel');
const logoTrack = document.querySelector('.logo-track');

if (logoCarousel && logoTrack) {
    let currentPosition = 0;
    let targetSpeed = 1; // Normal speed multiplier
    let currentSpeed = 1;
    let isRunning = true;
    
    // Calculate the total width to scroll (7 logos + gaps)
    const logoWidth = 225; // Width of each logo
    const gap = 64; // 4rem = 64px
    const totalWidth = (logoWidth + gap) * 7; // 7 logos (first set)
    
    function animate() {
        if (!isRunning) return;
        
        // Smooth speed interpolation
        const speedDiff = targetSpeed - currentSpeed;
        currentSpeed += speedDiff * 0.08; // Smooth transition
        
        // Move the carousel
        currentPosition -= 0.5 * currentSpeed; // Base speed
        
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
    
    // Hover controls
    logoCarousel.addEventListener('mouseenter', () => {
        targetSpeed = 0.25; // Slow down to 25% speed
    });
    
    logoCarousel.addEventListener('mouseleave', () => {
        targetSpeed = 1; // Return to normal speed
    });
}





// Google Maps loading functionality
function hideMapLoading() {
    const loadingState = document.getElementById('mapLoadingState');
    if (loadingState) {
        loadingState.classList.add('hidden');
        setTimeout(() => {
            loadingState.style.display = 'none';
        }, 300);
    }
}

// Make function globally available for iframe onload
window.hideMapLoading = hideMapLoading;

// ===============================
// DISCOUNT POP-UP FUNCTIONALITY
// ===============================

function initDiscountPopup() {
    const popup = document.getElementById('discountPopup');
    const closeBtn = popup.querySelector('.popup-close');
    const ctaBtn = popup.querySelector('.popup-cta-btn');
    
    // Check if popup has been shown this session
    const popupShown = sessionStorage.getItem('discountPopupShown');
    
    if (!popupShown) {
        // Show popup after 2 seconds
        setTimeout(() => {
            showPopup();
        }, 2000);
    }
    
    function showPopup() {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        sessionStorage.setItem('discountPopupShown', 'true');
        startCountdown();
    }
    
    function hidePopup() {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function navigateToContact() {
        hidePopup();
        
        // Check if we're on contact page or need to navigate
        if (window.location.pathname.includes('contact.html')) {
            // Already on contact page, scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // Navigate to contact page
            if (window.location.pathname.includes('/services/')) {
                window.location.href = '../contact.html#contact';
            } else {
                window.location.href = 'contact.html#contact';
            }
        }
    }
    
    // Event listeners
    closeBtn.addEventListener('click', hidePopup);
    
    // Close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            hidePopup();
        }
    });
    
    // CTA Button - main action
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToContact();
        });
    }
    

}

function startCountdown() {
    // Set end date to 30 days from now at 23:59:59
    const now = new Date();
    const endDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    endDate.setHours(23, 59, 59, 999); // Set to end of day
    const endDateTime = endDate.getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDateTime - now;
        
        if (distance < 0) {
            // Timer expired - hide popup
            const popup = document.getElementById('discountPopup');
            popup.classList.remove('show');
            document.body.style.overflow = '';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display with leading zeros
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Store interval reference to clear it if needed
    window.countdownInterval = countdownInterval;
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if popup exists on the page
    const popup = document.getElementById('discountPopup');
    if (popup) {
        initDiscountPopup();
    }
});

// Progressive disclosure functionality for contact form - show multiple fields after email
document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.getElementById('email');
    const conditionalFields = document.querySelectorAll('.conditional-field');
    const conditionalRow = document.querySelector('.form-row.conditional-fields');
    
    if (emailField && conditionalFields.length > 0) {
        emailField.addEventListener('input', function() {
            const hasEmailContent = this.value.trim().length > 5;
            
            // Show/hide all conditional fields together
            conditionalFields.forEach(field => {
                if (hasEmailContent) {
                    field.classList.add('show');
                } else {
                    field.classList.remove('show');
                }
            });
            
            // Also handle the conditional form row
            if (conditionalRow) {
                if (hasEmailContent) {
                    conditionalRow.classList.add('show');
                } else {
                    conditionalRow.classList.remove('show');
                }
            }
        });
    }
});

// Legacy budget field functionality removed - now handled by progressive disclosure above