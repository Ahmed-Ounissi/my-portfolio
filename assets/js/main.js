document.addEventListener('DOMContentLoaded', function () {
    /*===== MENU SHOW =====*/ 
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    };
    showMenu('nav-toggle', 'nav-menu');

    /*===== INITIALIZE EMAILJS =====*/
    emailjs.init("aknDs3jAzDlkvygrv");

    /*===== FORM SUBMISSION HANDLING =====*/
    const form = document.getElementById('contact-form');
    if (form) {
        const submitButton = form.querySelector('.contact__button');

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            console.log('Form submitted'); // Debugging

            // Validate the form fields
            if (!validateForm()) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            // Update the button to show sending status
            submitButton.value = 'Sending...';

            // Send the email using EmailJS
            emailjs
                .sendForm('service_z42zp7v', 'template_nnr11ry', form)
                .then(() => {
                    // Show success feedback
                    alert('Message sent successfully!');
                    form.reset(); // Clear the form fields
                    submitButton.value = 'Send Email'; // Reset the button text
                })
                .catch((error) => {
                    // Show error feedback
                    console.error('Failed to send email:', error);
                    alert('Failed to send the message. Please try again later.');
                    submitButton.value = 'Send Email'; // Reset the button text
                });
        });

        // Form validation
        function validateForm() {
            const name = form.querySelector('input[name="from_name"]').value.trim();
            const email = form.querySelector('input[name="from_email"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) return false;
            if (!validateEmail(email)) return false;
            return true;
        }

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    } else {
        console.error('Form with id "contact-form" not found.');
    }

    /*===== REMOVE MENU MOBILE =====*/
    const navLink = document.querySelectorAll('.nav__link');

    function linkAction() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    /*===== SCROLL SECTIONS ACTIVE LINK =====*/
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollDown = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    /*===== SCROLL REVEAL ANIMATION =====*/
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
    sr.reveal('.home__social-icon', { interval: 200 });
    sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });
});
