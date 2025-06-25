// Portfolio data mapping - cada imagen con su URL correspondiente
const portfolioData = [
    {
        id: 'project1',
        image: 'https://rene-huber.eu/images/dulce25.gif',
        modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
        url: 'https://undulcito.com',
        title: 'www.undulcito.com',
        description: 'Online store, Wordpress'
    },
    {
        id: 'project2',
        image: 'https://rene-huber.eu/images/pressure_25.gif',
        modalImage: 'https://rene-huber.eu/images/pressurewasser_web.webp',
        url: 'https://pressurewashertotalcleaner.com/',
        title: 'pressurewashertotalcleaner.com',
        description: 'Landing page , Wordpress'
    },
    {
        id: 'project3',
        image: 'https://rene-huber.eu/images/pool-tapa.gif',
        modalImage: 'https://rene-huber.eu/images/pool_1.webp',
        url: 'https://poolfusion.de/',
        title: 'www.poolfusion.de',
        description: 'Landing Page, Wordpress'
    },
    {
        id: 'project4',
        image: 'https://rene-huber.eu/images/franelas.gif',
        modalImage: 'https://rene-huber.eu/images/cartel_S1.webp',
        url: 'https://cartel-berlin.shop',
        title: 'www.Cartel-berlin.shop',
        description: 'Online Shop - Clothes'
    },
    {
        id: 'project5',
        image: 'https://rene-huber.eu/images/hypnosisl.gif',
        modalImage: 'https://rene-huber.eu/images/hypnosis.png',
        url: 'https://bitacorahypnosis.com/',
        title: 'www.bitacorahypnosis.com',
        description: 'landing page for booking, Wordpress'
    },
    {
        id: 'project6',
        image: 'https://rene-huber.eu/images/yate.gif',
        modalImage: 'https://rene-huber.eu/images/yate.png',
        url: 'https://myyachtstore.com/',
        title: 'www.myyachtstore.com',
        description: 'Landing Page, Wordpress'
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

// Updated portfolio modal function to handle project data// Función actualizada para abrir el modal del portfolio con contenido centrado
function openPortfolioModal(project) {
    const modal = document.getElementById('portfolioModal');
    const modalContent = modal.querySelector('.portfolio-modal-content');
    
    // Clear existing content
    modalContent.innerHTML = '';
    
    // Create modal content with centered layout
    modalContent.innerHTML = `
        <div class="portfolio-modal-footer">
            <span class="portfolio-close" onclick="closePortfolioModal()">&times;</span>
        </div>
        
        <div class="portfolio-modal-header">
            <h3 class="titulo">${project.title}</h3>  
        </div>
        
        <div class="portfolio-modal-body">
            <img src="${project.modalImage}" alt="${project.title}" class="portfolio-modal-img">
            <div class="portfolio-modal-info">
                <p>${project.description}</p>
                <a href="${project.url}" target="_blank" class="visit-project-btn">               
                    View Project
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