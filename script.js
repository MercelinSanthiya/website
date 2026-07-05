const contactsData = [
  {
    id: 1,
    name: "Arun Sharma",
    email: "arun.sharma@harvey.in",
    role: "Investor Implementation Analyst, Harvey Inc",
    mobile: "98765-43210",
    home: "011-25437690",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Ananya Murthy",
    email: "ananya.murthy@aool.com",
    role: "Senior Account Executive",
    mobile: "91234-56789",
    home: "022-41555983",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Amit Desai",
    email: "amit.desai@shotmail.com",
    role: "Product Manager",
    mobile: "98110-12345",
    home: "",
    color: "#f59e0b"
  },
  {
    id: 4,
    name: "Bhavna Patel",
    email: "bhavna.patel@yahoo.com",
    role: "Data Engineer",
    mobile: "94440-56781",
    home: "044-26175550",
    color: "#10b981"
  },
  {
    id: 5,
    name: "Vikram Ramirez",
    email: "vikram.ramirez@aahoo.com",
    role: "DevOps Consultant",
    mobile: "98940-11223",
    home: "",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Deepak Iyer",
    email: "deepak.iyer@aool.com",
    role: "Operations Coordinator",
    mobile: "97890-44556",
    home: "044-27025557",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Kavita Rao",
    email: "kavita.rao@rao.in",
    role: "UX/UI Designer",
    mobile: "96000-88943",
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

    if (bottomMenuBtn) bottomMenuBtn.addEventListener('click', toggleMenu);
    if (listMenuBtn) listMenuBtn.addEventListener('click', toggleMenu);

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