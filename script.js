document.addEventListener('DOMContentLoaded', () => {
    // Basic Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a progress bar container, animate the bars
                if (entry.target.querySelector('.progress-animate')) {
                    const bars = entry.target.querySelectorAll('.progress-animate');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300); // slight delay after card fades in
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .roadmap-card').forEach(el => {
        // give roadmap cards the class if they don't have it explicitly mapped in HTML
        if (!el.classList.contains('animate-on-scroll')) {
             el.classList.add('animate-on-scroll');
        }
        observer.observe(el);
    });

    // Navbar blur on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Theme toggle logic
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('neetcode-theme', isLight ? 'light' : 'dark');
        });

        // Initialize preferred theme
        if (localStorage.getItem('neetcode-theme') === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    // Reset progress bars initially so they can animate
    document.querySelectorAll('.progress-animate').forEach(bar => {
        bar.style.width = '0%';
    });
});
