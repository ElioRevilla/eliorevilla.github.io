/**
 * Portfolio - Elio Revilla
 * Modern vanilla JavaScript implementation
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const CONFIG = {
        typingTexts: {
            en: ['AI Engineer', 'Data Scientist', 'Electronic Engineer'],
            es: ['Ingeniero de IA', 'Cientifico de Datos', 'Ingeniero Electronico']
        },
        typingSpeed: 100,
        deletingSpeed: 50,
        pauseTime: 2000,
        scrollOffset: 80
    };

    // ==========================================
    // Language System
    // ==========================================
    const LanguageSystem = {
        currentLang: 'en',

        init() {
            // Check localStorage for saved preference
            const savedLang = localStorage.getItem('portfolio-lang');
            if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
                this.currentLang = savedLang;
            } else {
                // Detect browser language
                const browserLang = navigator.language.slice(0, 2);
                this.currentLang = browserLang === 'es' ? 'es' : 'en';
            }
            this.setLanguage(this.currentLang);
        },

        setLanguage(lang) {
            this.currentLang = lang;
            localStorage.setItem('portfolio-lang', lang);

            // Update HTML attribute
            document.documentElement.setAttribute('data-lang', lang);
            document.documentElement.setAttribute('lang', lang);

            // Update toggle buttons
            const enBtn = document.getElementById('lang-en');
            const esBtn = document.getElementById('lang-es');

            if (enBtn && esBtn) {
                enBtn.classList.toggle('active', lang === 'en');
                esBtn.classList.toggle('active', lang === 'es');
            }

            // Restart typing animation with new language
            TypingAnimation.restart();
        }
    };

    // Global function for onclick handlers
    window.setLanguage = function(lang) {
        LanguageSystem.setLanguage(lang);
    };

    // ==========================================
    // Typing Animation
    // ==========================================
    const TypingAnimation = {
        element: null,
        texts: [],
        textIndex: 0,
        charIndex: 0,
        isDeleting: false,
        timeoutId: null,

        init() {
            this.element = document.getElementById('typing-text');
            if (!this.element) return;
            this.updateTexts();
            this.type();
        },

        updateTexts() {
            this.texts = CONFIG.typingTexts[LanguageSystem.currentLang] || CONFIG.typingTexts.en;
        },

        restart() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.updateTexts();
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            if (this.element) {
                this.element.textContent = '';
                this.type();
            }
        },

        type() {
            const currentText = this.texts[this.textIndex];

            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = CONFIG.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }

            this.timeoutId = setTimeout(() => this.type(), typeSpeed);
        }
    };

    // ==========================================
    // Scroll Animations
    // ==========================================
    const ScrollAnimations = {
        observer: null,

        init() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: unobserve after animation
                        // this.observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Observe all animated elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                this.observer.observe(el);
            });
        }
    };

    // ==========================================
    // Active Section Indicator
    // ==========================================
    const ActiveSection = {
        sections: [],
        navLinks: [],

        init() {
            this.sections = document.querySelectorAll('section[id]');
            this.navLinks = document.querySelectorAll('.nav-link[data-section]');

            const options = {
                root: null,
                rootMargin: '-20% 0px -80% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('id');
                        this.setActive(sectionId);
                    }
                });
            }, options);

            this.sections.forEach(section => observer.observe(section));
        },

        setActive(sectionId) {
            this.navLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                link.classList.toggle('active', linkSection === sectionId);
            });
        }
    };

    // ==========================================
    // Mobile Menu
    // ==========================================
    const MobileMenu = {
        btn: null,
        menu: null,
        isOpen: false,

        init() {
            this.btn = document.getElementById('mobile-menu-btn');
            this.menu = document.getElementById('mobile-menu');

            if (!this.btn || !this.menu) return;

            this.btn.addEventListener('click', () => this.toggle());

            // Close menu when clicking a link
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.menu.contains(e.target) && !this.btn.contains(e.target)) {
                    this.close();
                }
            });
        },

        toggle() {
            this.isOpen = !this.isOpen;
            this.menu.classList.toggle('hidden', !this.isOpen);

            // Update button icon
            const icon = this.btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !this.isOpen);
                icon.classList.toggle('fa-times', this.isOpen);
            }
        },

        close() {
            this.isOpen = false;
            this.menu.classList.add('hidden');

            const icon = this.btn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    };

    // ==========================================
    // Back to Top Button
    // ==========================================
    const BackToTop = {
        btn: null,

        init() {
            this.btn = document.getElementById('back-to-top');
            if (!this.btn) return;

            // Show/hide button on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    this.btn.classList.add('visible');
                } else {
                    this.btn.classList.remove('visible');
                }
            });

            // Scroll to top on click
            this.btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const NavbarEffect = {
        navbar: null,
        lastScroll: 0,

        init() {
            this.navbar = document.getElementById('navbar');
            if (!this.navbar) return;

            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;

                // Add shadow when scrolled
                if (currentScroll > 50) {
                    this.navbar.classList.add('shadow-lg');
                } else {
                    this.navbar.classList.remove('shadow-lg');
                }

                this.lastScroll = currentScroll;
            });
        }
    };

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ==========================================
    // Current Year in Footer
    // ==========================================
    const FooterYear = {
        init() {
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    };

    // ==========================================
    // Initialize Everything
    // ==========================================
    function init() {
        LanguageSystem.init();
        TypingAnimation.init();
        ScrollAnimations.init();
        ActiveSection.init();
        MobileMenu.init();
        BackToTop.init();
        NavbarEffect.init();
        SmoothScroll.init();
        FooterYear.init();

        // Make first section visible immediately
        document.querySelectorAll('#home .animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
