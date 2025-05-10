
document.addEventListener('DOMContentLoaded', () => {

    const animatedElements = document.querySelectorAll('.scroll-animate');

    if (animatedElements.length) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    const header = document.querySelector('header');
    if (header) {
        const scrollThreshold = 50; 

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        if (window.scrollY > scrollThreshold) {
             header.classList.add('scrolled');
        }
    }

});