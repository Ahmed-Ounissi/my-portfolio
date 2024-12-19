/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

emailjs.init("aknDs3jAzDlkvygrv");

// Form submission handling
cconst form = document.getElementById('contact-form');
const submitButton = form.querySelector('.contact__button');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  console.log('Form submitted');
});

// Add an event listener for form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

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

// Function to validate the form fields
function validateForm() {
  const name = form.querySelector('input[name="from_name"]').value.trim();
  const email = form.querySelector('input[name="from_email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  // Basic validation for empty fields and email format
  if (!name || !email || !message) return false;

  if (!validateEmail(email)) return false;

  return true;
}

// Helper function to validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)



/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
