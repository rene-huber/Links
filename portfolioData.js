// portfolioData.js - Portfolio API Data
// This file acts as a simple API for portfolio data

const PORTFOLIO_API = {
    // Portfolio projects data
    projects: [
        {
            id: 'ecommerce-platform',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://portfolio1.rene-huber.eu',
            title: 'E-commerce Platform',
            description: 'Modern e-commerce solution built with React, Node.js, and 
MongoDB. Features include real-time inventory, payment processing, and admin 
dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            category: 'web-development',
            featured: true,
            completionDate: '2024-12-15'
        },
        {
            id: 'mobile-fitness-app',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://portfolio2.rene-huber.eu',
            title: 'Fitness Tracking App',
            description: 'Cross-platform mobile app for fitness tracking with 
AI-powered workout recommendations and social features.',
            technologies: ['React Native', 'Firebase', 'TensorFlow', 'Redux'],
            category: 'mobile-app',
            featured: true,
            completionDate: '2024-11-30'
        },
        {
            id: 'saas-dashboard',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://github.com/rene-huber',
            title: 'SaaS Analytics Dashboard',
            description: 'Comprehensive analytics dashboard with real-time data 
visualization, custom reports, and team collaboration features.',
            technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
            category: 'web-development',
            featured: false,
            completionDate: '2024-10-20'
        },
        {
            id: 'cartel-berlin-store',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://cartel-berlin.shop',
            title: 'Cartel Berlin - Fashion Store',
            description: 'High-end fashion e-commerce platform with custom design 
system, AR try-on features, and seamless checkout experience.',
            technologies: ['Next.js', 'Shopify', 'Three.js', 'Tailwind CSS'],
            category: 'e-commerce',
            featured: true,
            completionDate: '2024-09-15'
        },
        {
            id: 'subcultours-platform',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://subcultours.com',
            title: 'Subcultours - Travel Platform',
            description: 'Travel booking platform with interactive maps, custom 
itineraries, and integrated payment system for unique cultural experiences.',
            technologies: ['React', 'Express.js', 'MapBox', 'PayPal API'],
            category: 'web-development',
            featured: true,
            completionDate: '2024-08-10'
        },
        {
            id: 'blockchain-wallet',
            image: 'https://rene-huber.eu/images/dulce25.gif',
            modalImage: 'https://rene-huber.eu/images/undulcito_web.webp',
            url: 'https://www.instagram.com/huberpro/',
            title: 'Crypto Wallet DApp',
            description: 'Decentralized wallet application with multi-chain support, 
DeFi integration, and advanced security features.',
            technologies: ['Web3.js', 'Solidity', 'React', 'MetaMask'],
            category: 'blockchain',
            featured: false,
            completionDate: '2024-07-25'
        }
    ],

    // API Methods
    getAllProjects() {
        return this.projects;
    },

    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    },

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    },

    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    },

    getProjectsByTechnology(tech) {
        return this.projects.filter(project => 
            project.technologies.some(technology => 
                technology.toLowerCase().includes(tech.toLowerCase())
            )
        );
    },

    getRecentProjects(limit = 3) {
        return this.projects
            .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
            .slice(0, limit);
    },

    // Categories available
    getCategories() {
        const categories = [...new Set(this.projects.map(project => 
project.category))];
        return categories.map(category => ({
            id: category,
            name: this.formatCategoryName(category),
            count: this.projects.filter(project => project.category === 
category).length
        }));
    },

    // Technologies used across projects
    getTechnologies() {
        const allTech = this.projects.flatMap(project => project.technologies);
        const uniqueTech = [...new Set(allTech)];
        return uniqueTech.map(tech => ({
            name: tech,
            count: allTech.filter(t => t === tech).length
        })).sort((a, b) => b.count - a.count);
    },

    // Helper method to format category names
    formatCategoryName(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    },

    // Search functionality
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        return this.projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) 
||
            project.category.toLowerCase().includes(searchTerm)
        );
    },

    // Stats
    getStats() {
        return {
            totalProjects: this.projects.length,
            featuredProjects: this.getFeaturedProjects().length,
            categories: this.getCategories().length,
            technologies: this.getTechnologies().length,
            latestProject: this.getRecentProjects(1)[0]
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_API;
}
