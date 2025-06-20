// Portfolio data mapping - cada imagen con su URL correspondiente
const portfolioData = [
    {
        id: 'project1',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://rene-huber.eu',
        title: 'Proyecto 1 - E-commerce',
        description: 'Tienda online desarrollada con React y Node.js'
    },
    {
        id: 'project2',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://portfolio2.rene-huber.eu',
        title: 'Proyecto 2 - Web App',
        description: 'Aplicación web con dashboard administrativo'
    },
    {
        id: 'project3',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://github.com/rene-huber',
        title: 'Proyecto 3 - Mobile App',
        description: 'App móvil desarrollada con React Native'
    },
    {
        id: 'project4',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://cartel-berlin.shop',
        title: 'Proyecto 4 - Landing Page',
        description: 'Página de aterrizaje con animaciones CSS'
    },
    {
        id: 'project5',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://subcultours.com',
        title: 'Proyecto 5 - CMS',
        description: 'Sistema de gestión de contenidos personalizado'
    },
    {
        id: 'project6',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://www.instagram.com/huberpro/',
        title: 'Proyecto 6 - API REST',
        description: 'API robusta para aplicaciones móviles'
    }
];

// Toggle expandable sections
function toggleExpand(element) {
    const content = element.querySelector('.expandable-content');
    const arrow = element.querySelector('.link-arrow');
    
    // Close all other expanded items
    document.querySelectorAll('.link-item.expandable').forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
            item.querySelector('.expandable-content').classList.remove('active');
            item.querySelector('.link-arrow').textContent = '↓';
        }
    });
    
    // Toggle current item
    const isActive = element.classList.contains('active');
    
    if (isActive) {
        element.classList.remove('active');
        content.classList.remove('active');
        arrow.textContent = '↓';
    } else {
        element.classList.add('active');
        content.classList.add('active');
        arrow.textContent = '↑';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio items with data
    initializePortfolio();

    document.querySelectorAll('.link-item.expandable .link-header').forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleExpand(this.closest('.link-item.expandable'));
        });
        
        header.addEventListener('mouseenter', function() {
            if (!this.closest('.link-item.expandable').classList.contains('active')) {
                this.querySelector('.link-arrow').style.transform = 'scale(1.1)';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            if (!this.closest('.link-item.expandable').classList.contains('active')) {
                this.querySelector('.link-arrow').style.transform = 'scale(1)';
            }
        });
    });

    document.querySelectorAll('.expandable-content').forEach(content => {
        content.addEventListener('click', function(e) {
            if (!e.target.closest('.contact-button')) {
                e.stopPropagation();
            }
        });
    });

    document.querySelectorAll('.contact-button, .expandable-content a').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.href || this.getAttribute('href');
            console.log('Button clicked:', href);
            
            if (href && !href.startsWith('#') && href !== '') {
                if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('whatsapp:') || href.includes('wa.me') || href.includes('t.me')) {
                    window.open(href, '_blank');
                    e.preventDefault();
                }
            }
        });
    });
});

// Initialize portfolio with dynamic data
function initializePortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    // Clear existing items
    portfolioGrid.innerHTML = '';

    // Create portfolio items dynamically
    portfolioData.forEach((project, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-project-id', project.id);
        portfolioItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="portfolio-overlay">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
            </div>
        `;
        
        // Add click event to open modal with specific project data
        portfolioItem.addEventListener('click', function() {
            openPortfolioModal(project);
        });

        portfolioGrid.appendChild(portfolioItem);
    });
}

// Updated portfolio modal function to handle project data
function openPortfolioModal(project) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('portfolioModalImg');
    const modalContent = modal.querySelector('.portfolio-modal-content');
    
    // Clear existing content
    modalContent.innerHTML = '';
    
    // Create modal content with image and visit button
    modalContent.innerHTML = `
        <div class="portfolio-modal-header">
            <span class="portfolio-close" onclick="closePortfolioModal()">&times;</span>
        </div>
        <div class="portfolio-modal-body">
            <img src="${project.modalImage}" alt="${project.title}" class="portfolio-modal-img">
            <div class="portfolio-modal-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.url}" target="_blank" class="visit-project-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                    </svg>
                    Visitar Proyecto
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closePortfolioModal();
        }
    };
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.onclick = null; // Remove click outside handler
}

// Toggle nested expandable sections
function toggleNested(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.nested-arrow');
    const isActive = content.classList.contains('active');
    
    // Close all other nested items in the same parent
    const parent = element.closest('.expandable-content');
    parent.querySelectorAll('.nested-content.active').forEach(item => {
        if (item !== content) {
            item.classList.remove('active');
            item.previousElementSibling.querySelector('.nested-arrow').textContent = '↓';
        }
    });
    
    if (isActive) {
        content.classList.remove('active');
        arrow.textContent = '↓';
    } else {
        content.classList.add('active');
        arrow.textContent = '↑';
    }
}

// Tally modal functions
function openTallyModal() {
    const modal = document.getElementById('tallyModal');
    const iframe = document.getElementById('tallyFrame');
    
    iframe.src = 'https://tally.so/r/3qXAPO';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTallyModal() {
    const modal = document.getElementById('tallyModal');
    const iframe = document.getElementById('tallyFrame');
    
    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
}

// Gmail function
function abrirGmail() {
    const destinatario = "huberskull@gmail.com";
    const asunto = encodeURIComponent("Consulta desde tu sitio web");
    const cuerpo = encodeURIComponent("Hola, quiero más información sobre...");
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`;
    window.open(gmailURL, '_blank');
}

// Event listeners for modals and smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const tallyModal = document.getElementById('tallyModal');
        const portfolioModal = document.getElementById('portfolioModal');
        
        if (tallyModal && tallyModal.style.display === 'block') {
            closeTallyModal();
        }
        if (portfolioModal && portfolioModal.style.display === 'block') {
            closePortfolioModal();
        }
    }
});

// Close Tally modal by clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('tallyModal');
    if (event.target === modal) {
        closeTallyModal();
    }
}

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});