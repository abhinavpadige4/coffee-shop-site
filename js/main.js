document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
      navList.classList.remove('active');
    }
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  
  const updateHeader = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50 && !header.classList.contains('scrolled')) {
      header.classList.add('scrolled');
    } else if (scrollY <= 50 && header.classList.contains('scrolled')) {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };
  
  window.addEventListener('scroll', updateHeader);
  // Initial call in case page loads mid-scroll
  updateHeader();
  
  // Form validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');
  
  const showError = (input, errorElement, message) => {
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  };
  
  const clearError = (input, errorElement) => {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  };
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);
    formSuccess.style.display = 'none';
    formSuccess.textContent = '';
    
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
      showError(nameInput, nameError, 'Please enter your name');
      isValid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
      showError(emailInput, emailError, 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email');
      isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
      showError(messageInput, messageError, 'Please enter a message');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate form submission (in real app, you would send to server)
      formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
      formSuccess.style.display = 'block';
      form.reset();
      
      // Optionally, you could log the data or send via fetch
      console.log('Form submitted:', {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      });
    }
  });
  
  // Optional: Add smooth scroll behavior for Safari (CSS already handles modern browsers)
  // If needed, we could add a polyfill, but we'll rely on CSS scroll-behavior.
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };
  
  window.addEventListener('scroll', toggleBackToTop);
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});