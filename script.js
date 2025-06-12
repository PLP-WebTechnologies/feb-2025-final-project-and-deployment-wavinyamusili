// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        excerpt: "A beginner's guide to learning HTML, CSS, and JavaScript. Perfect for those just starting their coding journey.",
        category: "tech",
        date: "2024-01-15",
        featured: true
    },
    {
        id: 2,
        title: "My Journey Learning to Code",
        excerpt: "Sharing my personal experience and lessons learned while transitioning into web development.",
        category: "life",
        date: "2024-01-10",
        featured: true
    },
    {
        id: 3,
        title: "Best Practices for Clean Code",
        excerpt: "Tips and techniques for writing maintainable and readable code that your future self will thank you for.",
        category: "tech",
        date: "2024-01-08",
        featured: true
    },
    {
        id: 4,
        title: "Work-Life Balance in Tech",
        excerpt: "How to maintain a healthy balance between your career and personal life in the fast-paced tech industry.",
        category: "life",
        date: "2024-01-05",
        featured: false
    },
    {
        id: 5,
        title: "Weekend Trip to the Mountains",
        excerpt: "A refreshing weekend getaway to the mountains. Sometimes you need to disconnect to reconnect.",
        category: "travel",
        date: "2024-01-03",
        featured: false
    },
    {
        id: 6,
        title: "Building Responsive Websites",
        excerpt: "Learn how to create websites that look great on all devices using modern CSS techniques.",
        category: "tech",
        date: "2024-01-01",
        featured: false
    }
];

// Current filtered posts
let currentPosts = [...blogPosts];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Load posts on different pages
    if (document.getElementById('recentPosts')) {
        loadRecentPosts();
    }
    
    if (document.getElementById('allPosts')) {
        loadAllPosts();
    }
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize animations
    initAnimations();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Load Recent Posts (Home Page)
function loadRecentPosts() {
    const container = document.getElementById('recentPosts');
    if (!container) return;
    
    const featuredPosts = blogPosts.filter(post => post.featured);
    
    container.innerHTML = featuredPosts.map(post => createPostCard(post)).join('');
}

// Load All Posts (Blog Page)
function loadAllPosts() {
    const container = document.getElementById('allPosts');
    if (!container) return;
    
    container.innerHTML = blogPosts.map(post => createPostCard(post)).join('');
}

// Create Post Card HTML
function createPostCard(post) {
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <article class="post-card fade-in">
            <div class="post-image">
                📝
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${postDate}</span>
                    <span class="post-category">${post.category}</span>
                </div>
            </div>
        </article>
    `;
}

// Post Filtering (Blog Page)
function filterPosts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const activeCategory = document.querySelector('.filter-btn.active')?.textContent.toLowerCase() || 'all';
    
    currentPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                             post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    renderFilteredPosts();
}

function filterByCategory(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    filterPosts();
}

function renderFilteredPosts() {
    const container = document.getElementById('allPosts');
    if (!container) return;
    
    if (currentPosts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #64748b;">
                <p>No posts found matching your criteria.</p>
            </div>
        `;
    } else {
        container.innerHTML = currentPosts.map(post => createPostCard(post)).join('');
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all elements that should animate
    document.querySelectorAll('.post-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
