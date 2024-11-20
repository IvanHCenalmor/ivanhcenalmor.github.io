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

// Like system functionality with limits
function initializeLikeSystem() {
    // Load likes and user interaction data from localStorage
    const likes = JSON.parse(localStorage.getItem('artLikes') || '{}');
    const userLikes = JSON.parse(localStorage.getItem('userArtLikes') || '{}');
    const lastLikeTimestamps = JSON.parse(localStorage.getItem('lastLikeTimestamps') || '{}');
    
    // Constants for limits
    const MAX_LIKES_PER_ART = 3;  // Maximum likes per artwork per user
    const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    document.querySelectorAll('.like-button').forEach(button => {
        const artId = button.dataset.artId;
        const likeCount = likes[artId] || 0;
        
        // Update initial like count and button state
        updateLikeDisplay(button, likeCount);
        updateButtonState(button, artId, userLikes[artId] || 0, lastLikeTimestamps[artId] || 0);
        
        button.addEventListener('click', () => {
            const userLikeCount = userLikes[artId] || 0;
            const lastLikeTime = lastLikeTimestamps[artId] || 0;
            const currentTime = Date.now();
            
            // Check if user can like
            if (canUserLike(userLikeCount, lastLikeTime, currentTime)) {
                // Update likes
                const newLikes = (likes[artId] || 0) + 1;
                likes[artId] = newLikes;
                
                // Update user-specific data
                userLikes[artId] = (userLikes[artId] || 0) + 1;
                lastLikeTimestamps[artId] = currentTime;
                
                // Save all data to localStorage
                localStorage.setItem('artLikes', JSON.stringify(likes));
                localStorage.setItem('userArtLikes', JSON.stringify(userLikes));
                localStorage.setItem('lastLikeTimestamps', JSON.stringify(lastLikeTimestamps));
                
                // Update display
                updateLikeDisplay(button, newLikes);
                updateButtonState(button, artId, userLikes[artId], currentTime);
                
                // Add animation class
                button.classList.add('liked');
                setTimeout(() => button.classList.remove('liked'), 700);
            }
        });
    });
}

function canUserLike(userLikeCount, lastLikeTime, currentTime) {
    const MAX_LIKES_PER_ART = 3;
    const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 hours
    
    // Check if user has reached the maximum likes
    if (userLikeCount >= MAX_LIKES_PER_ART) {
        showTooltip('You\'ve reached the maximum likes for this artwork');
        return false;
    }
    
    // Check if enough time has passed since last like
    if (currentTime - lastLikeTime < COOLDOWN_PERIOD) {
        const hoursLeft = Math.ceil((COOLDOWN_PERIOD - (currentTime - lastLikeTime)) / (60 * 60 * 1000));
        showTooltip(`Please wait ${hoursLeft} hours before liking again`);
        return false;
    }
    
    return true;
}

function updateLikeDisplay(button, count) {
    const countDisplay = button.querySelector('.like-count');
    countDisplay.textContent = count;
    button.setAttribute('title', `${count} likes`);
}

function updateButtonState(button, artId, userLikeCount, lastLikeTime) {
    const MAX_LIKES_PER_ART = 3;
    const currentTime = Date.now();
    
    if (userLikeCount >= MAX_LIKES_PER_ART) {
        button.classList.add('max-likes');
        button.setAttribute('title', 'Maximum likes reached');
    } else if (currentTime - lastLikeTime < 24 * 60 * 60 * 1000) {
        button.classList.add('cooling-down');
        const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (currentTime - lastLikeTime)) / (60 * 60 * 1000));
        button.setAttribute('title', `Wait ${hoursLeft} hours before liking again`);
    } else {
        button.classList.remove('max-likes', 'cooling-down');
        button.setAttribute('title', 'Like this artwork');
    }
}

function showTooltip(message) {
    // Remove any existing tooltip
    const existingTooltip = document.querySelector('.like-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Create and show new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'like-tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);
    
    // Remove tooltip after delay
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}