document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#items-grid .card');

  if (filterBtns.length > 0 && cards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
          card.classList.remove('visible');
          
          setTimeout(() => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.classList.remove('hidden');
              setTimeout(() => card.classList.add('visible'), 50);
            } else {
              card.classList.add('hidden');
            }
          }, 300);
        });
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          group.classList.add('invalid');
          isValid = false;
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            group.classList.add('invalid');
            isValid = false;
          } else {
            group.classList.remove('invalid');
          }
        } else {
          group.classList.remove('invalid');
        }
      });

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.loader');
        const successMsg = document.getElementById('formSuccess');

        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        submitBtn.disabled = true;

        setTimeout(() => {
          btnText.classList.remove('hidden');
          loader.classList.add('hidden');
          submitBtn.disabled = false;
          
          contactForm.reset();
          successMsg.classList.remove('hidden');
          
          setTimeout(() => {
            successMsg.classList.add('hidden');
          }, 5000);
        }, 1500);
      }
    });

    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('invalid');
      });
    });
  }
});