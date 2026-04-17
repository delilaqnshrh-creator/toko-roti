/* ==========================================
   Tokorotiku — Main Script
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Elemen DOM
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navLinks = document.querySelectorAll('.sidebar__nav a');
  const sections = document.querySelectorAll('main section[id]');
  const revealElements = document.querySelectorAll('.reveal');

  // ==========================================
  // Fungsi Toggle Sidebar (Mobile)
  // ==========================================
  function toggleSidebar() {
    const isOpen = sidebar.classList.contains('is-open');
    
    if (isOpen) {
      sidebar.classList.remove('is-open');
      sidebarOverlay.classList.remove('is-visible');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Kembalikan scroll body
    } else {
      sidebar.classList.add('is-open');
      sidebarOverlay.classList.add('is-visible');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Kunci scroll body saat sidebar terbuka
    }
  }

  // Event listener untuk tombol hamburger dan overlay
  if (hamburger && sidebar && sidebarOverlay) {
    hamburger.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }

  // ==========================================
  // Auto-close Sidebar saat klik menu (Mobile)
  // ==========================================
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar.classList.contains('is-open')) {
        toggleSidebar();
      }
    });
  });

  // ==========================================
  // Scroll Spy (Navigasi Aktif saat Scroll)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Elemen dianggap terlihat jika 20% bagiannya muncul
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Hapus kelas 'active' dari semua tautan navigasi
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke tautan yang sesuai dengan section yang terlihat
        const activeLink = document.querySelector(`.sidebar__nav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observasi semua section yang memiliki ID
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // ==========================================
  // Animasi Reveal saat Scroll
  // ==========================================
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Berhenti mengobservasi setelah animasi dijalankan untuk hemat memori
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  // Observasi semua elemen yang memiliki kelas .reveal
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // Smooth Scrolling Polyfill (Opsional)
  // CSS sudah menangani scroll-behavior: smooth,
  // tapi ini backup untuk browser lama saat klik anchor link
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
