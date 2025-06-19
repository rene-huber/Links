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

// Optional: Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


  function abrirGmail() {
    const destinatario = "huberskull@gmail.com";
    const asunto = encodeURIComponent("Consulta desde tu sitio web");
    const cuerpo = encodeURIComponent("Hola, quiero más información sobre...");

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`;

    window.open(gmailURL, '_blank');
  }


  function openTallyModal() {
    const modal = document.getElementById('tallyModal');
    const iframe = document.getElementById('tallyFrame');
    
    
    iframe.src = 'https://tally.so/r/3qXAPO';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeTallyModal() {
    const modal = document.getElementById('tallyModal');
    const iframe = document.getElementById('tallyFrame');
    
    modal.style.display = 'none';
    iframe.src = ''; // Limpiar el iframe
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Cerrar modal al hacer click fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('tallyModal');
    if (event.target === modal) {
        closeTallyModal();
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('tallyModal');
        if (modal.style.display === 'block') {
            closeTallyModal();
        }
    }
});



// Agregar al final de script.js

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

// Portfolio modal functions
function openPortfolioModal(imageSrc) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('portfolioModalImg');
    
    modalImg.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close portfolio modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const portfolioModal = document.getElementById('portfolioModal');
        if (portfolioModal && portfolioModal.style.display === 'block') {
            closePortfolioModal();
        }
    }
});