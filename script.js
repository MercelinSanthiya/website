const contactsData = [
  {
    id: 1,
    name: "Andre Allison",
    email: "andre-allison@allison.hn",
    role: "Investor Implementation Analyst, Harvey Inc",
    mobile: "303-570-0941",
    home: "543-769-0002",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Allion Murphy",
    email: "allion-murphy@aool.com",
    role: "Senior Account Executive",
    mobile: "415-555-2671",
    home: "415-555-9832",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Ann Skinner",
    email: "ann-skinner@shotmail.com",
    role: "Product Manager",
    mobile: "206-555-0192",
    home: "",
    color: "#f59e0b"
  },
  {
    id: 4,
    name: "Brandon Leonard",
    email: "brandon-leonard@yahoo.com",
    role: "Data Engineer",
    mobile: "617-555-0143",
    home: "617-555-0185",
    color: "#10b981"
  },
  {
    id: 5,
    name: "Boris Ramirez",
    email: "boris-ramiraz@aahoo.com",
    role: "DevOps Consultant",
    mobile: "512-555-9012",
    home: "",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Carmen Erickson",
    email: "carmen-erickson@aool.com",
    role: "Operations Coordinator",
    mobile: "702-555-3810",
    home: "702-555-7721",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Carroll Hunt",
    email: "carroll-hunt@hunt.hn",
    role: "UX/UI Designer",
    mobile: "212-555-8943",
    home: "",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop"
  }
];

function renderContactsList() {
  const contactsListContainer = document.getElementById('contactsList');
  if (!contactsListContainer) return;
  
  contactsListContainer.innerHTML = '';
  
  contactsData.forEach((contact, index) => {
    const card = document.createElement('div');
    card.classList.add('contact-card');
    if (index === 0) card.classList.add('selected');

    let avatarHTML = '';
    if (contact.img) {
      avatarHTML = `<img src="${contact.img}" alt="${contact.name}" class="contact-avatar">`;
    } else {
      const initial = contact.name.charAt(0);
      avatarHTML = `<div class="contact-avatar-placeholder" style="background-color: ${contact.color || '#3b82f6'}">${initial}</div>`;
    }

    card.innerHTML = `
      ${avatarHTML}
      <div class="contact-info">
        <span class="contact-name">${contact.name}</span>
        <span class="contact-email">${contact.email}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.contact-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      renderProfileDetails(contact);
      
      const appBody = document.querySelector('.app-body');
      if (window.innerWidth <= 768 && appBody) {
        appBody.classList.add('show-profile');
      }
    });

    contactsListContainer.appendChild(card);
  });
}

function renderProfileDetails(contact) {
  const profileCardContainer = document.getElementById('profileCard');
  if (!profileCardContainer) return;

  let heroAvatarHTML = '';
  if (contact.img) {
    heroAvatarHTML = `<img src="${contact.img}" alt="${contact.name}" class="hero-avatar">`;
  } else {
    const initial = contact.name.charAt(0);
    heroAvatarHTML = `<div class="contact-avatar-placeholder hero-avatar" style="background-color: ${contact.color || '#3b82f6'}; font-size: 2.5rem;">${initial}</div>`;
  }

  profileCardContainer.innerHTML = `
    <button class="back-to-list-btn" id="backToListBtn"><i class="fa-solid fa-arrow-left"></i> Back</button>
    <div class="profile-hero">
      ${heroAvatarHTML}
      <h2 class="hero-name">${contact.name}</h2>
      <p class="hero-role">${contact.role || 'No Designation'}</p>
    </div>

    <div class="profile-details-list">
      <div class="info-row">
        <div class="info-icon-box"><i class="fa-solid fa-mobile-screen-button"></i></div>
        <div class="info-content">
          <span class="info-label">Mobile Phone</span>
          <span class="info-value">${contact.mobile || '—'}</span>
        </div>
        <button class="copy-btn"><i class="fa-regular fa-copy"></i></button>
      </div>

      <div class="info-row">
        <div class="info-icon-box"><i class="fa-solid fa-phone"></i></div>
        <div class="info-content">
          <span class="info-label">Home Phone</span>
          <span class="info-value">${contact.home || '—'}</span>
        </div>
        <button class="copy-btn"><i class="fa-regular fa-copy"></i></button>
      </div>

      <div class="info-row">
        <div class="info-icon-box"><i class="fa-regular fa-envelope"></i></div>
        <div class="info-content">
          <span class="info-label">Email Address</span>
          <span class="info-value">${contact.email}</span>
        </div>
        <button class="copy-btn"><i class="fa-regular fa-copy"></i></button>
      </div>
    </div>
  `;

  const backBtn = document.getElementById('backToListBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const appBody = document.querySelector('.app-body');
      if (appBody) appBody.classList.remove('show-profile');
    });
  }
}

function setupMobileMenu() {
  const navColumn = document.getElementById('navColumn');
  const bottomMenuBtn = document.getElementById('bottomMenuBtn');
  const listMenuBtn = document.getElementById('listMenuBtn');
  
  if (navColumn) {
    const toggleMenu = (e) => {
      e.stopPropagation();
      navColumn.classList.toggle('mobile-active');
    };

    // Toggle menu through the bottom nav or list header menu icon
    if (bottomMenuBtn) bottomMenuBtn.addEventListener('click', toggleMenu);
    if (listMenuBtn) listMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (!navColumn.contains(e.target) && e.target !== bottomMenuBtn && e.target !== listMenuBtn) {
        navColumn.classList.remove('mobile-active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContactsList();
  if (contactsData.length > 0) {
    renderProfileDetails(contactsData[0]); 
  }
  setupMobileMenu();
});