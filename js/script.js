document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const botToken = '8032211561:AAEH86izjI5_bvtcX-JbnZw2WVrwoDL6JTI'; // Replace with your bot token
            const chatId = '7181820663';     // Replace with your Telegram user ID

            const text = `
📩 *New Contact Form Submission*:
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📝 *Message:* ${message}
            `;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => {
                if (response.ok) {
                    alert(`Thank you, ${name}! Your message has been sent.`);
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Telegram API Error:', error);
                alert('Failed to send message.');
            });
        });
    }    
    // Add animation to elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-image img, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .about-image img, .contact-info, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});

// Theme switcher functionality
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update button state
  updateThemeButton(newTheme);
});

// Update button based on theme
function updateThemeButton(theme) {
  const moonIcon = themeToggle.querySelector('.fa-moon');
  const sunIcon = themeToggle.querySelector('.fa-sun');
  
  if (theme === 'dark') {
    moonIcon.style.opacity = '0';
    moonIcon.style.transform = 'rotate(90deg)';
    sunIcon.style.opacity = '1';
    sunIcon.style.transform = 'rotate(0deg)';
  } else {
    moonIcon.style.opacity = '1';
    moonIcon.style.transform = 'rotate(0deg)';
    sunIcon.style.opacity = '0';
    sunIcon.style.transform = 'rotate(90deg)';
  }
}

// Initialize button state
updateThemeButton(currentTheme);
