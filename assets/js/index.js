// Mobile Navigation
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            if (navBackdrop) {
                navBackdrop.classList.toggle('active');
            }
        });
    }

    // Helper function to close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        if (navBackdrop) {
            navBackdrop.classList.remove('active');
        }
    }

    // Close menu when clicking backdrop
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Theme Switcher
    initThemeSwitcher();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Animate elements on scroll
    initScrollAnimations();

    // Navbar scroll effect
    initNavbarScroll();
});

// Theme Switcher Functionality
function initThemeSwitcher() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const showcase = document.getElementById('theme-showcase');

    themeOptions.forEach(option => {
        option.addEventListener('click', function () {
            const theme = this.dataset.theme;

            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Apply theme to showcase
            if (showcase) {
                showcase.dataset.theme = theme;

                // Update showcase colors based on theme
                updateShowcaseTheme(theme);
            }
        });
    });
}

function updateShowcaseTheme(theme) {
    const showcase = document.getElementById('theme-showcase');
    if (!showcase) return;

    // Define theme colors
    const themes = {
        'default-light': {
            primary: '#ffffff',
            secondary: '#f8f9fa',
            accent: '#d6ad60',
            text: '#212529',
            textSecondary: '#6c757d',
            border: '#dee2e6'
        },
        'ocean-light': {
            primary: '#f0f8ff',
            secondary: '#e6f3ff',
            accent: '#1e90ff',
            text: '#1a365d',
            textSecondary: '#2d5a87',
            border: '#b3d9ff'
        },
        'violet-light': {
            primary: '#faf5ff',
            secondary: '#e9d8fd',
            accent: '#8a2be2',
            text: '#44337a',
            textSecondary: '#805ad5',
            border: '#d6bcfa'
        },
        'mediumsea-light': {
            primary: '#f0fff4',
            secondary: '#c6f6d5',
            accent: '#3cb371',
            text: '#22543d',
            textSecondary: '#38a169',
            border: '#9ae6b4'
        },
        'sunshine-light': {
            primary: '#fffef7',
            secondary: '#fef9c3',
            accent: '#fff700',
            text: '#713f12',
            textSecondary: '#a16207',
            border: '#fde047'
        }
    };

    const themeColors = themes[theme] || themes['default-light'];

    // Apply colors to showcase elements
    const showcaseWindow = showcase.querySelector('.showcase-window');
    const windowHeader = showcase.querySelector('.window-header');
    const windowContent = showcase.querySelector('.window-content');
    const previewTasks = showcase.querySelectorAll('.preview-task');
    const taskChecks = showcase.querySelectorAll('.task-check');

    if (showcaseWindow) {
        showcaseWindow.style.background = themeColors.primary;
        showcaseWindow.style.borderColor = themeColors.border;
    }

    if (windowHeader) {
        windowHeader.style.background = themeColors.secondary;
        windowHeader.style.borderBottomColor = themeColors.border;
    }

    if (windowContent) {
        windowContent.style.color = themeColors.text;
    }

    // Update preview task colors
    previewTasks.forEach(task => {
        task.style.borderBottomColor = themeColors.border;
        task.style.color = themeColors.text;
    });

    // Update completed task checkboxes
    taskChecks.forEach(check => {
        if (check.parentElement.classList.contains('completed')) {
            check.style.background = themeColors.accent;
            check.style.borderColor = themeColors.accent;
        } else {
            check.style.borderColor = themeColors.border;
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .community-card, .step');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScrollY = currentScrollY;
    });
}

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code');

    if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
            button.textContent = '✅';
            setTimeout(() => {
                button.textContent = '📋';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = code.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.textContent = '✅';
            setTimeout(() => {
                button.textContent = '📋';
            }, 2000);
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }

    if (konamiCode.length === konamiSequence.length &&
        konamiCode.every((code, index) => code === konamiSequence[index])) {

        // Apply rainbow theme
        document.body.style.background = 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbow 5s ease infinite';

        // Add confetti effect
        createConfetti();

        setTimeout(() => {
            location.reload();
        }, 5000);
    }
});

function createConfetti() {
    const confettiCount = 100;
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        confetti.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'linear'
        }).onfinish = () => confetti.remove();
    }
}

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);