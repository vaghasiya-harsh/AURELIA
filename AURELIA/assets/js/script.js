/**
 * AURELIA — Haute Horlogerie Genève (Est. 1904)
 * Core Interactive Architecture & Dynamic Client Logic
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. WATCH DATA REPOSITORY (For Dynamic Quick View & Filters)
  // --------------------------------------------------------------------------
  const WATCH_CATALOG = {
    'obsidian': {
      name: 'The Obsidian',
      category: 'titanium',
      price: '$12,400',
      image: 'assets/img/product-outer-1.png',
      calibre: 'Calibre AO-01 Automatic',
      powerReserve: '72 Hours',
      caseMaterial: 'Grade 5 Recycled Titanium',
      diameter: '40.5 mm',
      waterResistance: '100 Metres (10 ATM)',
      frequency: '28,800 vph (4 Hz)',
      jewels: '31 Jewels',
      description: 'Forged from aerospace-grade titanium with an ultra-deep obsidian dial. Hand-finished Geneva striping and mirror-polished bevels visible through the sapphire exhibition caseback.'
    },
    'celestial': {
      name: 'The Celestial',
      category: 'tourbillon',
      price: '$18,900',
      image: 'assets/img/product-outer-2.png',
      calibre: 'Calibre AC-09 Flying Tourbillon',
      powerReserve: '96 Hours',
      caseMaterial: '18k Fairmined Rose Gold',
      diameter: '41.0 mm',
      waterResistance: '50 Metres (5 ATM)',
      frequency: '21,600 vph (3 Hz)',
      jewels: '37 Jewels',
      description: 'Featuring a one-minute flying tourbillon cage and an aventurine glass celestial star chart dial calibrated to the night sky above Geneva.'
    },
    'verdant': {
      name: 'The Verdant',
      category: 'chronometer',
      price: '$24,500',
      image: 'assets/img/product-outer-3.png',
      calibre: 'Calibre AV-04 Chronomètre',
      powerReserve: '80 Hours',
      caseMaterial: '950 Platinum & Emerald Guilloché',
      diameter: '39.5 mm',
      waterResistance: '100 Metres (10 ATM)',
      frequency: '36,000 vph (5 Hz)',
      jewels: '35 Jewels',
      description: 'COSC-certified high-frequency chronometer featuring an emerald enamel guilloché dial hand-turned on an authentic 1912 rose engine in our Saint-Gervais atelier.'
    }
  };

  // --------------------------------------------------------------------------
  // 2. LIVE GENEVA OBSERVATORY CLOCK
  // --------------------------------------------------------------------------
  function initGenevaClock() {
    const clockElements = document.querySelectorAll('.geneva-clock-time');
    if (!clockElements.length) return;

    function update() {
      const now = new Date();
      try {
        const genevaTimeStr = now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        clockElements.forEach(el => {
          el.textContent = `GENÈVE ${genevaTimeStr} CET`;
        });
      } catch (e) {
        const hours = String(now.getUTCHours() + 1).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        clockElements.forEach(el => {
          el.textContent = `GENÈVE ${hours}:${minutes}:${seconds} CET`;
        });
      }
    }

    update();
    setInterval(update, 1000);
  }

  // --------------------------------------------------------------------------
  // 3. THEME MANAGEMENT (DARK / LIGHT)
  // --------------------------------------------------------------------------
  function initTheme() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-btn');
    const storedTheme = localStorage.getItem('aurelia_theme') || 'dark';

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('aurelia_theme', theme);

      themeToggleBtns.forEach(btn => {
        btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        const img = btn.querySelector('img') || document.querySelector('#theme-img');
        if (img) {
          img.src = theme === 'dark' ? 'right-wrapper.svg' : 'theme-sun.png';
          img.alt = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }
      });
    }

    applyTheme(storedTheme);

    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
      // Keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. HEADER ELEVATION & NAVIGATION
  // --------------------------------------------------------------------------
  function initHeaderAndNav() {
    const header = document.querySelector('.header-main');
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const navLinks = document.querySelectorAll('.mid-wrapper a, .desktop-nav a, .mobile-nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('is-scrolled');
      } else {
        header?.classList.remove('is-scrolled');
      }
    }, { passive: true });

    function toggleMobileMenu(forceClose = false) {
      if (!menuToggle || !mobileDrawer) return;
      const isOpen = forceClose ? false : !mobileDrawer.classList.contains('is-open');
      mobileDrawer.classList.toggle('is-open', isOpen);
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuToggle?.addEventListener('click', () => toggleMobileMenu());

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(true);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    });

    // Scroll spy
    if (sections.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else if (href && href.startsWith('#')) {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });

      sections.forEach(sec => observer.observe(sec));
    }
  }

  // --------------------------------------------------------------------------
  // 5. COLLECTION SLIDER CONTROLS
  // --------------------------------------------------------------------------
  function initCollectionInteractions() {
    const prevBtn = document.getElementById('prevWatchBtn');
    const nextBtn = document.getElementById('nextWatchBtn');
    const productOuter = document.querySelector('.product-outer');

    if (productOuter && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        productOuter.scrollBy({ left: -320, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        productOuter.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. QUICK VIEW & VIP RESERVATION MODALS
  // --------------------------------------------------------------------------
  function initModals() {
    const quickViewModal = document.getElementById('quickViewModal');
    const reserveModal = document.getElementById('reserveModal');
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    const reserveBtns = document.querySelectorAll('.btn-reserve-trigger, .Reserve-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

    function openModal(modal) {
      if (!modal) return;
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input, select, button');
      firstInput?.focus();
    }

    function closeModal() {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('is-active'));
      document.body.style.overflow = '';
    }

    // Quick View
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const watchKey = btn.getAttribute('data-watch');
        const data = WATCH_CATALOG[watchKey];
        if (!data || !quickViewModal) return;

        const imgEl = quickViewModal.querySelector('#modalWatchImg');
        const titleEl = quickViewModal.querySelector('#modalWatchTitle');
        const priceEl = quickViewModal.querySelector('#modalWatchPrice');
        const descEl = quickViewModal.querySelector('#modalWatchDesc');
        const calEl = quickViewModal.querySelector('#modalCalibre');
        const reserveEl = quickViewModal.querySelector('#modalPowerReserve');
        const matEl = quickViewModal.querySelector('#modalMaterial');
        const diamEl = quickViewModal.querySelector('#modalDiameter');
        const wrEl = quickViewModal.querySelector('#modalWaterResistance');
        const modalReserveBtn = quickViewModal.querySelector('#modalReserveAction');

        if (imgEl) { imgEl.src = data.image; imgEl.alt = data.name; }
        if (titleEl) titleEl.textContent = data.name;
        if (priceEl) priceEl.textContent = data.price;
        if (descEl) descEl.textContent = data.description;
        if (calEl) calEl.textContent = data.calibre;
        if (reserveEl) reserveEl.textContent = data.powerReserve;
        if (matEl) matEl.textContent = data.caseMaterial;
        if (diamEl) diamEl.textContent = data.diameter;
        if (wrEl) wrEl.textContent = data.waterResistance;

        if (modalReserveBtn) {
          modalReserveBtn.onclick = () => {
            closeModal();
            openReservationModal(data.name);
          };
        }

        openModal(quickViewModal);
      });
    });

    // VIP Reservation Modal
    function openReservationModal(preferredWatch = '') {
      if (!reserveModal) return;
      const selectEl = reserveModal.querySelector('#reserveWatchSelect');
      if (selectEl && preferredWatch) {
        selectEl.value = preferredWatch;
      }
      openModal(reserveModal);
    }

    reserveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const watchName = btn.getAttribute('data-preferred') || 'The Obsidian';
        openReservationModal(watchName);
      });
      // Keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target === btn || btn.classList.contains('modal-close-btn')) {
          closeModal();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = reservationForm.querySelector('#clientName')?.value || 'Distinguished Guest';
        closeModal();
        reservationForm.reset();
        showToast(`Thank you, ${clientName}. Your Aurelia Geneva Concierge will contact you within 24 hours.`);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE ACCORDION (ENQUIRIES FAQ)
  // --------------------------------------------------------------------------
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.Accordi-outer-box, .accordion-item');

    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger, p');
      item.addEventListener('click', (e) => {
        const isActive = item.classList.contains('is-active');

        accordionItems.forEach(other => {
          if (other !== item) other.classList.remove('is-active');
        });

        item.classList.toggle('is-active', !isActive);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. NEWSLETTER VALIDATION & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  function showToast(message) {
    let toast = document.getElementById('aureliaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aureliaToast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <span class="toast-icon">✧</span>
      <span class="toast-text">${message}</span>
    `;

    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4500);
  }

  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('userEmail');
    const emailField = document.querySelector('.email-field, .Newsletter-form-input');
    const emailMessage = document.getElementById('emailMessage');
    const submitBtn = document.getElementById('newsletterBtn') || form?.querySelector('.Newsletter-btn');
    const btnText = submitBtn?.querySelector('.btn-text');

    if (!form || !emailInput) return;

    function validateEmail(email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
    }

    function clearValidationState() {
      emailField?.classList.remove('is-valid', 'is-invalid', 'is-checking', 'shake');
      if (emailMessage) {
        emailMessage.textContent = '';
        emailMessage.className = 'email-message';
      }
    }

    // Dynamic real-time validation on user typing
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();

      if (!email) {
        clearValidationState();
        return;
      }

      if (emailField?.classList.contains('is-invalid')) {
        emailField.classList.remove('is-invalid');
        if (emailMessage) {
          emailMessage.textContent = '';
          emailMessage.className = 'email-message';
        }
      }

      if (validateEmail(email)) {
        emailField?.classList.add('is-valid');
        emailField?.classList.remove('is-invalid');
        if (emailMessage) {
          emailMessage.textContent = 'Format recognized.';
          emailMessage.className = 'email-message show-success';
        }
      } else {
        emailField?.classList.remove('is-valid');
      }
    });

    // Validation on blur
    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      if (!email) {
        clearValidationState();
        return;
      }

      if (!validateEmail(email)) {
        emailField?.classList.remove('is-valid');
        emailField?.classList.add('is-invalid');
        if (emailMessage) {
          emailMessage.textContent = 'Please enter a valid email address.';
          emailMessage.className = 'email-message show-error';
        }
      }
    });

    // Form submission with dynamic button animation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        emailField?.classList.remove('is-valid');
        emailField?.classList.remove('shake');
        void emailField?.offsetWidth; // Trigger DOM reflow for CSS animation restart
        emailField?.classList.add('shake', 'is-invalid');

        if (emailMessage) {
          emailMessage.textContent = 'Please enter a valid email address.';
          emailMessage.className = 'email-message show-error';
        }
        emailInput.focus();
        return;
      }

      // Enter dynamic loading state
      clearValidationState();
      emailField?.classList.add('is-checking');
      emailInput.disabled = true;

      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        if (btnText) btnText.textContent = 'CONFIRMING...';
      }

      // Simulate verification & privilege granting
      setTimeout(() => {
        emailField?.classList.remove('is-checking');
        emailField?.classList.add('is-valid');

        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.classList.add('is-success');
          if (btnText) btnText.textContent = 'PRIVILEGE CONFIRMED';
        }

        if (emailMessage) {
          emailMessage.textContent = 'Privilege granted. Welcome to the Aurelia Journal.';
          emailMessage.className = 'email-message show-success';
        }

        showToast("You are on the list. Welcome to Aurelia Geneva.");

        // Graceful reset after 4.5 seconds
        setTimeout(() => {
          emailInput.disabled = false;
          emailInput.value = '';
          clearValidationState();
          if (submitBtn) {
            submitBtn.classList.remove('is-success');
            if (btnText) btnText.textContent = 'SUBSCRIBE';
          }
        }, 4500);
      }, 650);
    });
  }

  // --------------------------------------------------------------------------
  // 9. ANIMATED NUMBER COUNTERS ON SCROLL
  // --------------------------------------------------------------------------
  function initCounters() {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length || !('IntersectionObserver' in window)) return;

    let hasRun = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counterElements.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            const suffix = counter.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();

            function step(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = target * easeOut;

              counter.textContent = isDecimal 
                ? currentVal.toFixed(2) + suffix 
                : Math.floor(currentVal).toLocaleString() + suffix;

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.textContent = isDecimal 
                  ? target.toFixed(2) + suffix 
                  : target.toLocaleString() + suffix;
              }
            }

            requestAnimationFrame(step);
          });
        }
      });
    }, { threshold: 0.3 });

    const statusSection = document.querySelector('.status-content');
    if (statusSection) observer.observe(statusSection);
  }

  // --------------------------------------------------------------------------
  // 10. SCROLL REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // --------------------------------------------------------------------------
  // 11. LUXURY CUSTOM CURSOR
  // --------------------------------------------------------------------------
  function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorText = document.querySelector('.cursor-text');

    if (!cursorDot || !cursorOutline) return;
    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderCursor() {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .luxury-btn, .Reserve-btn, #theme-btn');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });

    const viewTargets = document.querySelectorAll('.cursor-image, .outer-info, .Geneva-inner-img, .wrapper-img');
    viewTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-view');
        if (cursorText) cursorText.textContent = 'INSPECT';
      });
      target.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-view');
        if (cursorText) cursorText.textContent = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. SMOOTH SCROLL & BACK TO TOP
  // --------------------------------------------------------------------------
  function initSmoothScroll() {
    const backToTop = document.querySelectorAll('#backToTop, .foot-bot-sec-box');
    backToTop.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // DOM READY
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initGenevaClock();
    initHeaderAndNav();
    initCollectionInteractions();
    initModals();
    initAccordion();
    initNewsletter();
    initCounters();
    initScrollReveal();
    initCustomCursor();
    initSmoothScroll();
  });

})();
