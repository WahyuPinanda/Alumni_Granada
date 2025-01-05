// Main Application Module
const App = {
  init() {
      this.initializeComponents();
      this.bindGlobalEvents();
  },

  initializeComponents() {
      // Initialize DataTables if on alumni page
      if (document.getElementById('example')) {
          this.initDataTable();
      }

      // Initialize Gallery if on gallery page
      if (document.querySelector('.gallery')) {
          this.initGallery();
      }

      // Initialize Contact Form if on contact page
      if (document.querySelector('form')) {
          this.initContactForm();
      }
  },

  bindGlobalEvents() {
      document.addEventListener('DOMContentLoaded', () => {
          // Navbar active state
          this.handleNavbarActiveState();
          
          // Smooth scroll
          this.initSmoothScroll();
      });
  },

  // Initialize DataTable for Alumni Page
  initDataTable() {
      $('#example').DataTable({
          responsive: true,
          language: {
              search: "Cari:",
              lengthMenu: "Tampilkan _MENU_ data per halaman",
              zeroRecords: "Data tidak ditemukan",
              info: "Menampilkan halaman _PAGE_ dari _PAGES_",
              infoEmpty: "Tidak ada data tersedia",
              infoFiltered: "(difilter dari _MAX_ total data)",
              paginate: {
                  first: "Pertama",
                  last: "Terakhir",
                  next: "Selanjutnya",
                  previous: "Sebelumnya"
              }
          }
      });
  },

  // Initialize Gallery Modal and Events
  initGallery() {
      document.addEventListener('click', (e) => {
          if (e.target.classList.contains('gallery-item')) {
              const src = e.target.getAttribute('src');
              document.querySelector('.modal-img').src = src;
              const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
              myModal.show();
          }
      });
  },

  // Initialize Contact Form Validation and Submission
  initContactForm() {
      const form = document.querySelector('form');
      const inputs = document.querySelectorAll('.input');

      // Input focus effects
      inputs.forEach(input => {
          input.addEventListener('focus', this.handleInputFocus);
          input.addEventListener('blur', this.handleInputBlur);
      });

      // Form submission
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleFormSubmit(form);
      });
  },

  // Handle input focus event
  handleInputFocus() {
      const parent = this.parentNode;
      parent.classList.add('focus');
  },

  // Handle input blur event
  handleInputBlur() {
      const parent = this.parentNode;
      if (this.value === '') {
          parent.classList.remove('focus');
      }
  },

  // Handle form submission
  handleFormSubmit(form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!this.validateForm(data)) {
          return;
      }

      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Reset form
      form.reset();
      
      // Show success message
      this.showMessage('Pesan berhasil dikirim!', 'success');
  },

  // Validate form data
  validateForm(data) {
      if (!data.name || !data.email || !data.message) {
          this.showMessage('Mohon lengkapi semua field', 'error');
          return false;
      }

      if (!this.isValidEmail(data.email)) {
          this.showMessage('Format email tidak valid', 'error');
          return false;
      }

      return true;
  },

  // Validate email format
  isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  },

  // Show message to user
  showMessage(message, type = 'info') {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
      alertDiv.textContent = message;

      const form = document.querySelector('form');
      form.parentNode.insertBefore(alertDiv, form.nextSibling);

      setTimeout(() => {
          alertDiv.remove();
      }, 3000);
  },

  // Handle navbar active state
  handleNavbarActiveState() {
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
          if (link.getAttribute('href') === currentPath) {
              link.classList.add('active');
          }
      });
  },

  // Initialize smooth scroll
  initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth'
                  });
              }
          });
      });
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});