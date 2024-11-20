const fs = require('fs')
const path = require('path'); 

// Iterate trough a skills folder
async function lsSkills(path) {
  const dir = await fs.promises.opendir(path)
  for await (const dirent of dir) {
    skills_path = path.join(path, dirent.name);
    loadSkills(skills_path);
  }
}


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
async function loadSkills(dataPath) {
    try {
        const response = await fetch(dataPath);
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
            lsSkills('./data/skills');
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    showInitialSection();
});