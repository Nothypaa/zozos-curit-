/**
 * CSS Loader - Ensures CSS loads properly across www and non-www domains
 * Handles cross-domain caching issues and font loading problems
 */

(function() {
    'use strict';

    /**
     * Check if CSS is loaded properly by examining computed styles
     */
    function checkCSSLoaded() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) {
            setTimeout(checkCSSLoaded, 100);
            return;
        }

        const styles = window.getComputedStyle(aboutSection);
        const background = styles.getPropertyValue('background');
        const padding = styles.getPropertyValue('padding');
        
        // Check if the background and padding are set properly
        const hasBackground = background && background !== 'initial' && background !== 'transparent' && background.includes('gradient');
        const hasPadding = padding && padding !== '0px' && padding !== 'initial';
        
        if (!hasBackground || !hasPadding) {
            forceReloadCSS();
        }
    }

    /**
     * Force reload CSS files with cache-busting
     */
    function forceReloadCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href*="css/"]');
        let reloadCount = 0;
        
        cssLinks.forEach(link => {
            const originalHref = link.href.split('?')[0];
            const newHref = originalHref + '?v=' + Date.now() + '&cb=' + Math.random();
            
            // Create new link element
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.href = newHref;
            
            // Add load event listener
            newLink.onload = function() {
                reloadCount++;
                
                // Remove old link after new one loads
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                
                // Check if all CSS files have been reloaded
                if (reloadCount === cssLinks.length) {
                    setTimeout(verifyCSS, 500);
                }
            };
            
            newLink.onerror = function() {
                console.error('CSS Loader: Failed to reload', originalHref);
            };
            
            // Insert new link before the old one
            link.parentNode.insertBefore(newLink, link.nextSibling);
        });
    }

    /**
     * Verify CSS after reload attempt
     */
    function verifyCSS() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const styles = window.getComputedStyle(aboutSection);
            const background = styles.getPropertyValue('background');
            
            if (background && background.includes('gradient')) {
                // CSS verification successful
            } else {
                console.error('CSS Loader: CSS verification failed');
                // Try one more time with a different approach
                setTimeout(fallbackCSS, 1000);
            }
        }
    }

    /**
     * Fallback CSS injection for critical styles
     */
    function fallbackCSS() {
        
        const fallbackStyles = `
            <style id="css-loader-fallback">
                .about-section {
                    padding: 100px 0 !important;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%) !important;
                    position: relative !important;
                }
                .about-content {
                    display: grid !important;
                    grid-template-columns: 2fr 1fr !important;
                    gap: 80px !important;
                    align-items: start !important;
                }
                .about-item {
                    display: flex !important;
                    gap: 20px !important;
                    margin-bottom: 2.5rem !important;
                    padding: 25px !important;
                    background: rgba(255, 255, 255, 0.02) !important;
                    border-radius: 12px !important;
                    border: 1px solid rgba(255, 255, 255, 0.05) !important;
                }
                .about-icon {
                    flex-shrink: 0 !important;
                    width: 80px !important;
                    height: 80px !important;
                    border-radius: 20px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: linear-gradient(135deg, rgba(255, 51, 51, 0.2), rgba(255, 215, 0, 0.2)) !important;
                }
                * {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
                }
            </style>
        `;
        
        // Remove existing fallback if any
        const existingFallback = document.getElementById('css-loader-fallback');
        if (existingFallback) {
            existingFallback.remove();
        }
        
        // Insert fallback styles
        document.head.insertAdjacentHTML('beforeend', fallbackStyles);
    }

    /**
     * Check font loading
     */
    function checkFontLoading() {
        if ('fonts' in document) {
            document.fonts.ready.then(function() {
                // Fonts loaded successfully
            }).catch(function() {
                // Font loading failed, using fallback
            });
        }
    }

    /**
     * Initialize CSS loader
     */
    function init() {
        
        // Check fonts
        checkFontLoading();
        
        // Check CSS loading after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(checkCSSLoaded, 100);
            });
        } else {
            setTimeout(checkCSSLoaded, 100);
        }
        
        // Also check on window load as a backup
        if (document.readyState !== 'complete') {
            window.addEventListener('load', function() {
                setTimeout(checkCSSLoaded, 200);
            });
        }
    }

    // Start the CSS loader
    init();

})();
