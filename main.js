// Load markdown content for a specific section
async function loadMarkdownContent(file, elementId) {
    try {
        const response = await fetch(`content/${file}.md`);
        const text = await response.text();
        const element = document.querySelector(`#${elementId} .content`);
        element.innerHTML = marked.parse(text);
    } catch (error) {
        console.error(`Error loading ${file}.md:`, error);
    }
}

// Load skills from JSON
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skills = await response.json();
        const skillsContainer = document.querySelector('#skills .skills');
        
        skillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Show selected section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const selectedSection = document.querySelector(`#${sectionId}`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        
        // Load content if needed
        if (sectionId === 'skills') {
            loadSkills();
        } else {
            loadMarkdownContent(sectionId, sectionId);
        }
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Handle navigation
function initializeNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

// Show initial section based on URL hash or default to 'about'
function showInitialSection() {
    const hash = window.location.hash.substring(1) || 'about';
    showSection(hash);
}

// Like system functionality
function initializeLikeSystem() {
    // Load likes from localStorage
    const likes = JSON.parse(localStorage.getItem('artLikes') || '{}');
    
    // Add click handlers to all like buttons
    document.querySelectorAll('.like-button').forEach(button => {
        const artId = button.dataset.artId;
        const likeCount = likes[artId] || 0;
        
        // Update initial like count
        updateLikeDisplay(button, likeCount);
        
        button.addEventListener('click', () => {
            // Toggle like status
            const currentLikes = likes[artId] || 0;
            const newLikes = currentLikes + 1;
            likes[artId] = newLikes;
            
            // Save to localStorage
            localStorage.setItem('artLikes', JSON.stringify(likes));
            
            // Update display
            updateLikeDisplay(button, newLikes);
            
            // Add animation class
            button.classList.add('liked');
            setTimeout(() => button.classList.remove('liked'), 700);
        });
    });
}

function updateLikeDisplay(button, count) {
    const countDisplay = button.querySelector('.like-count');
    countDisplay.textContent = count;
    button.setAttribute('title', `${count} likes`);
}

// Add to the initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    showInitialSection();
    
    // Initialize like system when art section is shown
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && document.querySelector('.gallery')) {
                initializeLikeSystem();
            }
        });
    });
    
    observer.observe(document.querySelector('#art .content'), {
        childList: true,
        subtree: true
    });
});