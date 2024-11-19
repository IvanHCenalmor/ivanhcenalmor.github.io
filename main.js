// Load markdown content
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

// Initialize content
async function initializeContent() {
    await Promise.all([
        loadMarkdownContent('about', 'about'),
        loadMarkdownContent('experience', 'experience'),
        loadMarkdownContent('projects', 'projects'),
        loadMarkdownContent('art', 'art'),
        loadSkills()
    ]);
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', initializeContent);