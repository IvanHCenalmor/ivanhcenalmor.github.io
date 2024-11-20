
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

// Load skills from multiple JSON files in the skills folder
async function loadSkills() {
    try {
        const skillsContainer = document.querySelector('#skills .skills');
        skillsContainer.innerHTML = ''; // Clear existing content
        
        // First, fetch the skills index that lists all skill categories
        const indexResponse = await fetch('content/skills/index.json');
        const skillCategories = await indexResponse.json();
        
        // Create a container for each category
        for (const category of skillCategories) {
            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'skill-category';
            
            // Add category title
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.name;
            categorySection.appendChild(categoryTitle);
            
            // Create container for skills in this category
            const skillsWrapper = document.createElement('div');
            skillsWrapper.className = 'skill-tags';
            
            try {
                // Fetch skills for this category
                const response = await fetch(`content/skills/${category.file}`);
                const skills = await response.json();
                
                // Add each skill
                skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    
                    // If skill has additional properties (like proficiency level)
                    if (typeof skill === 'object') {
                        skillTag.textContent = skill.name;
                        if (skill.level) {
                            skillTag.dataset.level = skill.level;
                            skillTag.classList.add(`level-${skill.level}`);
                        }
                        if (skill.years) {
                            skillTag.title = `${skill.years} years of experience`;
                        }
                    } else {
                        // If skill is just a string
                        skillTag.textContent = skill;
                    }
                    
                    skillsWrapper.appendChild(skillTag);
                });
            } catch (error) {
                console.error(`Error loading skills for ${category.name}:`, error);
                skillsWrapper.innerHTML = `<p class="error">Error loading ${category.name} skills</p>`;
            }
            
            categorySection.appendChild(skillsWrapper);
            skillsContainer.appendChild(categorySection);
        }
    } catch (error) {
        console.error('Error loading skills index:', error);
        skillsContainer.innerHTML = '<p class="error">Error loading skills</p>';
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    showInitialSection();
});