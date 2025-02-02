// Load markdown content for a specific section
async function loadMarkdownContent(file, elementId) {
    try {
        const response = await fetch(`content/${file}.md`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        const element = document.querySelector(`#${elementId} .content`);
        if (element) {
            // Split the markdown into sections
            const sections = text.split(/\n(?=#{1,2} )/).filter(section => section.trim());
            
            // Create sub-navigation
            const subNav = document.createElement('nav');
            subNav.className = 'sub-navigation';
            const subNavList = document.createElement('ul');
            
            // Create a container for the sections
            const sectionsContainer = document.createElement('div');
            sectionsContainer.className = 'markdown-sections';
            
            sections.forEach((section, index) => {
                // Extract the heading
                const headingMatch = section.match(/^(#{1,2})\s+(.+)/);
                if (headingMatch) {
                    const headingLevel = headingMatch[1].length;
                    const headingText = headingMatch[2].trim();
                    
                    // Create sub-nav item
                    const navItem = document.createElement('li');
                    const navLink = document.createElement('a');
                    navLink.href = `#section-${index}`;
                    navLink.textContent = headingText;
                    navItem.appendChild(navLink);
                    subNavList.appendChild(navItem);
                    
                    // Create section div
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'markdown-section';
                    sectionDiv.id = `section-${index}`;
                    sectionDiv.innerHTML = marked.parse(section);
                    sectionsContainer.appendChild(sectionDiv);
                }
            });
            
            subNav.appendChild(subNavList);
            
            // Clear and rebuild content
            element.innerHTML = '';
            element.appendChild(subNav);
            element.appendChild(sectionsContainer);
            
            // Add sub-navigation click handling
            subNav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        
                        // Update active state
                        subNav.querySelectorAll('a').forEach(link => {
                            link.classList.remove('active');
                        });
                        e.target.classList.add('active');
                    }
                }
            });
        }
    } catch (error) {
        console.error(`Error loading ${file}.md:`, error);
        const element = document.querySelector(`#${elementId} .content`);
        if (element) {
            element.innerHTML = '<div class="error">Failed to load content. Please try again later.</div>';
        }
    }
}

// Load skills from JSON files
async function loadSkills() {
    try {
        const skillsContainer = document.querySelector('#skills .skills');
        if (!skillsContainer) return;
        
        skillsContainer.innerHTML = '<div class="loading">Loading skills...</div>';
        
        const indexResponse = await fetch('content/skills/index.json');
        if (!indexResponse.ok) throw new Error('Failed to load skills index');
        
        const { categories } = await indexResponse.json();
        
        const skillsContent = document.createElement('div');
        skillsContent.className = 'skills-content';
        
        for (const category of categories) {
            const categorySection = document.createElement('div');
            categorySection.className = 'skill-category';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.name;
            categorySection.appendChild(categoryTitle);
            
            const skillsWrapper = document.createElement('div');
            skillsWrapper.className = 'skill-tags';
            
            try {
                const skillsResponse = await fetch(`content/skills/${category.file}`);
                if (!skillsResponse.ok) throw new Error(`Failed to load ${category.file}`);
                
                const skills = await skillsResponse.json();
                
                skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    
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
                        skillTag.textContent = skill;
                    }
                    
                    skillsWrapper.appendChild(skillTag);
                });
            } catch (error) {
                console.error(`Error loading skills for ${category.name}:`, error);
                skillsWrapper.innerHTML = `<div class="error">Error loading ${category.name} skills</div>`;
            }
            
            categorySection.appendChild(skillsWrapper);
            skillsContent.appendChild(categorySection);
        }
        
        skillsContainer.innerHTML = '';
        skillsContainer.appendChild(skillsContent);
        
    } catch (error) {
        console.error('Error loading skills:', error);
        skillsContainer.innerHTML = '<div class="error">Failed to load skills. Please try again later.</div>';
    }
}

// Show/hide sections based on navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        
        // Load appropriate content
        if (sectionId === 'skills') {
            loadSkills();
        } else {
            loadMarkdownContent(sectionId, sectionId);
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update URL without scrolling
        history.pushState(null, null, `#${sectionId}`);
    }
}

// Initialize navigation
function initializeNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'about';
        showSection(hash);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    
    // Show initial section based on URL hash or default to 'about'
    const initialSection = window.location.hash.substring(1) || 'about';
    showSection(initialSection);
});