function generateResume() {
  // Show loading animation
  document.getElementById('loading').style.display = 'block';
  
  // Hide any existing resume output
  document.getElementById('resumeOutput').style.display = 'none';
  
  // Use setTimeout to allow the loading animation to render before processing
  setTimeout(() => {
    // Get personal info
    const name = document.getElementById('fullName').value || 'YOUR NAME';
    const profession = document.getElementById('profession').value || 'Professional Title';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '';
    const address = document.getElementById('address').value || 'City, State';
    const linkedin = document.getElementById('linkedin').value || '';
    const github = document.getElementById('github').value || '';
    
    // Get education info
    let educationHTML = '';
    for (let i = 1; i <= educationCount; i++) {
      const school = document.getElementById(`school${i}`)?.value || '';
      const degree = document.getElementById(`degree${i}`)?.value || '';
      const location = document.getElementById(`eduLocation${i}`)?.value || '';
      const years = document.getElementById(`eduYears${i}`)?.value || '';
      const gpa = document.getElementById(`gpa${i}`)?.value || '';
      
      if (school || degree) {
        educationHTML += `
          <div class="resume-entry">
            <div class="resume-entry-header">
              <div class="resume-entry-org">${school || 'University Name'}</div>
              <div class="resume-entry-date">${years || 'Year'}</div>
            </div>
            <div class="resume-entry-title">${degree || 'Degree'}</div>
            ${location ? `<div class="resume-entry-location">${location}</div>` : ''}
            ${gpa ? `<div class="resume-entry-gpa">${gpa}</div>` : ''}
          </div>
        `;
      }
    }
    
    // Get projects info
    let projectsHTML = '';
    for (let i = 1; i <= projectCount; i++) {
      const name = document.getElementById(`projectName${i}`)?.value || '';
      const dates = document.getElementById(`projectDates${i}`)?.value || '';
      const desc = document.getElementById(`projectDescription${i}`)?.value || '';
      
      if (name) {
        projectsHTML += `
          <div class="resume-entry">
            <div class="resume-entry-header">
              <div class="resume-entry-org">${name}</div>
              <div class="resume-entry-date">${dates}</div>
            </div>
            ${desc ? `<ul class="resume-bullets">${formatBulletPoints(desc)}</ul>` : ''}
          </div>
        `;
      }
    }
    
    // Get skills, certifications, hobbies, and extracurricular activities
    const techSkills = document.getElementById('technicalSkills').value || '';
    const softSkills = document.getElementById('softSkills').value || '';
    const certifications = document.getElementById('certifications').value || '';
    const hobbies = document.getElementById('hobbies').value || '';
    const extracurricular = document.getElementById('extracurricular').value || '';
    
    // Get selected template
    const template = document.getElementById('resumeTemplate').value;
    
    // Apply the selected template
    let resumeHTML = '';
    
    // Professional template (default)
    if (template === 'professional' || !template) {
      resumeHTML = generateProfessionalTemplate(
        name, profession, email, phone, address, linkedin, github,
        educationHTML, projectsHTML, techSkills, softSkills, 
        certifications, hobbies, extracurricular
      );
    }
    // Modern template
    else if (template === 'modern') {
      resumeHTML = generateModernTemplate(
        name, profession, email, phone, address, linkedin, github,
        educationHTML, projectsHTML, techSkills, softSkills, 
        certifications, hobbies, extracurricular
      );
    }
    // Minimal template
    else if (template === 'minimal') {
      resumeHTML = generateMinimalTemplate(
        name, profession, email, phone, address, linkedin, github,
        educationHTML, projectsHTML, techSkills, softSkills, 
        certifications, hobbies, extracurricular
      );
    }
    
    // Update the resume output container and make it visible
    const outputContainer = document.getElementById('resumeOutput');
    outputContainer.innerHTML = resumeHTML;
    outputContainer.style.display = 'block';
    
    // Hide loading animation
    document.getElementById('loading').style.display = 'none';
    
    // Scroll to the resume output
    outputContainer.scrollIntoView({ behavior: 'smooth' });
  }, 1000); // Simulating 1 second of "processing" time
}

function generateProfessionalTemplate(
  name, profession, email, phone, address, linkedin, github,
  educationHTML, projectsHTML, techSkills, softSkills, 
  certifications, hobbies, extracurricular
) {
  return `
    <div class="resume-container">
      <div class="resume-header">
        <h1 class="resume-name">${name}</h1>
        <p class="resume-title">${profession}</p>
        <div class="resume-contact">
          ${email ? `<div class="resume-contact-item">${email}</div>` : ''}
          ${phone ? `<div class="resume-contact-item">${phone}</div>` : ''}
          ${address ? `<div class="resume-contact-item">${address}</div>` : ''}
          ${linkedin ? `<div class="resume-contact-item">${linkedin}</div>` : ''}
          ${github ? `<div class="resume-contact-item">${github}</div>` : ''}
        </div>
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Education</h2>
        ${educationHTML || '<p>No education entries added</p>'}
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Projects</h2>
        ${projectsHTML || '<p>No projects added</p>'}
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Skills</h2>
        <div class="resume-skills">
          <div class="resume-skills-column">
            <div class="resume-skill-category">
              <div class="resume-skill-title">Technical Skills</div>
              <p>${techSkills || 'No technical skills added'}</p>
            </div>
          </div>
          <div class="resume-skills-column">
            <div class="resume-skill-category">
              <div class="resume-skill-title">Soft Skills</div>
              <ul class="resume-bullets">
                ${formatBulletPoints(softSkills) || '<li>No soft skills added</li>'}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Certifications</h2>
        <ul class="resume-bullets">
          ${formatBulletPoints(certifications) || '<li>No certifications added</li>'}
        </ul>
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Extracurricular Activities</h2>
        <ul class="resume-bullets">
          ${formatBulletPoints(extracurricular) || '<li>No extracurricular activities added</li>'}
        </ul>
      </div>
      
      <div class="resume-section">
        <h2 class="resume-section-title">Hobbies</h2>
        <ul class="resume-bullets">
          ${formatBulletPoints(hobbies) || '<li>No hobbies added</li>'}
        </ul>
      </div>
    </div>
    <button class="print-button" onclick="window.print()">Print/Save as PDF</button>
  `;
}

function generateModernTemplate(
  name, profession, email, phone, address, linkedin, github,
  educationHTML, projectsHTML, techSkills, softSkills, 
  certifications, hobbies, extracurricular
) {
  return `
    <div class="modern-resume">
      <div class="modern-header">
        <h1 class="modern-name">${name}</h1>
        <p class="modern-title">${profession}</p>
        <div class="modern-contact">
          ${email ? `<div>${email}</div>` : ''}
          ${phone ? `<div>${phone}</div>` : ''}
          ${address ? `<div>${address}</div>` : ''}
          ${linkedin ? `<div>${linkedin}</div>` : ''}
          ${github ? `<div>${github}</div>` : ''}
        </div>
      </div>
      
      <div class="modern-content">
        <div class="modern-section">
          <h2 class="modern-section-title">Education</h2>
          ${educationHTML.replace(/resume-entry/g, 'modern-entry')
            .replace(/resume-entry-header/g, 'modern-entry-header')
            .replace(/resume-entry-org/g, 'modern-entry-org')
            .replace(/resume-entry-date/g, 'modern-entry-date')
            .replace(/resume-entry-title/g, 'modern-entry-title')
            .replace(/resume-entry-location/g, 'modern-entry-location')
            .replace(/resume-bullets/g, 'modern-bullets') || '<p>No education entries added</p>'}
        </div>
        
        <div class="modern-section">
          <h2 class="modern-section-title">Projects</h2>
          ${projectsHTML.replace(/resume-entry/g, 'modern-entry')
            .replace(/resume-entry-header/g, 'modern-entry-header')
            .replace(/resume-entry-org/g, 'modern-entry-org')
            .replace(/resume-entry-date/g, 'modern-entry-date')
            .replace(/resume-entry-title/g, 'modern-entry-title')
            .replace(/resume-entry-location/g, 'modern-entry-location')
            .replace(/resume-bullets/g, 'modern-bullets') || '<p>No projects added</p>'}
        </div>
        
        <div class="modern-section">
          <h2 class="modern-section-title">Skills</h2>
          <div class="modern-skills-grid">
            <div class="modern-skill-category">
              <div class="modern-skill-title">Technical Skills</div>
              <p>${techSkills || 'No technical skills added'}</p>
            </div>
            <div class="modern-skill-category">
              <div class="modern-skill-title">Soft Skills</div>
              <ul class="modern-bullets">
                ${formatBulletPoints(softSkills) || '<li>No soft skills added</li>'}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="modern-section">
          <h2 class="modern-section-title">Certifications</h2>
          <ul class="modern-bullets">
            ${formatBulletPoints(certifications) || '<li>No certifications added</li>'}
          </ul>
        </div>
        
        <div class="modern-section">
          <h2 class="modern-section-title">Extracurricular Activities</h2>
          <ul class="modern-bullets">
            ${formatBulletPoints(extracurricular) || '<li>No extracurricular activities added</li>'}
          </ul>
        </div>
        
        <div class="modern-section">
          <h2 class="modern-section-title">Hobbies</h2>
          <ul class="modern-bullets">
            ${formatBulletPoints(hobbies) || '<li>No hobbies added</li>'}
          </ul>
        </div>
      </div>
    </div>
    <button class="print-button" onclick="window.print()">Print/Save as PDF</button>
  `;
}

function generateMinimalTemplate(
  name, profession, email, phone, address, linkedin, github,
  educationHTML, projectsHTML, techSkills, softSkills, 
  certifications, hobbies, extracurricular
) {
  return `
    <div class="minimal-resume">
      <div class="minimal-header">
        <h1 class="minimal-name">${name}</h1>
        <p class="minimal-title">${profession}</p>
        <div class="minimal-contact">
          ${email ? `<div>${email}</div>` : ''}
          ${phone ? `<div>${phone}</div>` : ''}
          ${address ? `<div>${address}</div>` : ''}
          ${linkedin ? `<div>${linkedin}</div>` : ''}
          ${github ? `<div>${github}</div>` : ''}
        </div>
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Education</h2>
        ${educationHTML.replace(/resume-entry/g, 'minimal-entry')
          .replace(/resume-entry-header/g, 'minimal-entry-header')
          .replace(/resume-entry-org/g, 'minimal-entry-org')
          .replace(/resume-entry-date/g, 'minimal-entry-date')
          .replace(/resume-entry-title/g, 'minimal-entry-title')
          .replace(/resume-entry-location/g, 'minimal-entry-location')
          .replace(/resume-bullets/g, 'minimal-bullets') || '<p>No education entries added</p>'}
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Projects</h2>
        ${projectsHTML.replace(/resume-entry/g, 'minimal-entry')
          .replace(/resume-entry-header/g, 'minimal-entry-header')
          .replace(/resume-entry-org/g, 'minimal-entry-org')
          .replace(/resume-entry-date/g, 'minimal-entry-date')
          .replace(/resume-entry-title/g, 'minimal-entry-title')
          .replace(/resume-entry-location/g, 'minimal-entry-location')
          .replace(/resume-bullets/g, 'minimal-bullets') || '<p>No projects added</p>'}
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Skills</h2>
        <p><strong>Technical Skills:</strong> ${techSkills || 'No technical skills added'}</p>
        <p><strong>Soft Skills:</strong></p>
        <ul class="minimal-bullets">
          ${formatBulletPoints(softSkills) || '<li>No soft skills added</li>'}
        </ul>
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Certifications</h2>
        <ul class="minimal-bullets">
          ${formatBulletPoints(certifications) || '<li>No certifications added</li>'}
        </ul>
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Extracurricular</h2>
        <ul class="minimal-bullets">
          ${formatBulletPoints(extracurricular) || '<li>No extracurricular activities added</li>'}
        </ul>
      </div>
      
      <div class="minimal-section">
        <h2 class="minimal-section-title">Hobbies</h2>
        <ul class="minimal-bullets">
          ${formatBulletPoints(hobbies) || '<li>No hobbies added</li>'}
        </ul>
      </div>
    </div>
    <button class="print-button" onclick="window.print()">Print/Save as PDF</button>
  `;
}


// Main functionality for Resume Builder
let educationCount = 1;
let projectCount = 1;

// Tab navigation
function showTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hide');
  });
  
  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab content
  document.getElementById(tabId).classList.remove('hide');
  
  // Add active class to selected tab
  Array.from(document.querySelectorAll('.tab')).find(tab => 
    tab.textContent.toLowerCase().includes(tabId.toLowerCase())
  ).classList.add('active');
  
  // Update progress bar
  updateProgress(tabId);
}

function nextTab(tabId) {
  showTab(tabId);
}

function prevTab(tabId) {
  showTab(tabId);
}

function updateProgress(tabId) {
  const progressMap = {
    'personalInfo': 10,
    'education': 30,
    'projects': 50,
    'skills': 75,
    'extras': 100
  };
  
  document.getElementById('progressBar').style.width = progressMap[tabId] + '%';
}

// Education section
function addEducation() {
  educationCount++;
  const container = document.getElementById('educationContainer');
  const newEntry = document.createElement('div');
  newEntry.className = 'entry-container';
  newEntry.innerHTML = `
    <label for="school${educationCount}">School/University:</label>
    <input type="text" id="school${educationCount}" placeholder="University of Example">
    
    <label for="degree${educationCount}">Degree/Certificate:</label>
    <input type="text" id="degree${educationCount}" placeholder="Bachelor of Science in Computer Science">
    
    <label for="eduLocation${educationCount}">Location:</label>
    <input type="text" id="eduLocation${educationCount}" placeholder="City, State, Country">
    
    <label for="eduYears${educationCount}">Duration:</label>
    <input type="text" id="eduYears${educationCount}" placeholder="2020-2024">
    
    <label for="gpa${educationCount}">CGPA/Percentage:</label>
    <input type="text" id="gpa${educationCount}" placeholder="3.8/4.0">
  `;
  container.appendChild(newEntry);
}

function removeEducation() {
  if (educationCount > 1) {
    const container = document.getElementById('educationContainer');
    container.removeChild(container.lastChild);
    educationCount--;
  }
}

// Projects section
function addProject() {
  projectCount++;
  const container = document.getElementById('projectsContainer');
  const newEntry = document.createElement('div');
  newEntry.className = 'entry-container';
  newEntry.innerHTML = `
    <label for="projectName${projectCount}">Project Name:</label>
    <input type="text" id="projectName${projectCount}" placeholder="E-commerce Platform">
    
    <label for="projectDates${projectCount}">Timeline:</label>
    <input type="text" id="projectDates${projectCount}" placeholder="Jan 2023 - Mar 2023">
    
    <label for="projectDescription${projectCount}">Description & Technologies:</label>
    <textarea id="projectDescription${projectCount}" rows="4" placeholder="• Developed a full-stack e-commerce platform...
• Implemented user authentication using JWT
• Created responsive UI with React and Tailwind CSS
• Utilized Node.js and Express for the backend API"></textarea>
  `;
  container.appendChild(newEntry);
}

function removeProject() {
  if (projectCount > 1) {
    const container = document.getElementById('projectsContainer');
    container.removeChild(container.lastChild);
    projectCount--;
  }
}

// Helper function to format bullet points
function formatBulletPoints(text) {
  if (!text) return '';
  return text.split('\n')
    .filter(line => line.trim())
    .map(line => {
      // Ensure each line begins with a bullet point
      const cleanLine = line.trim().replace(/^[•\-*]\s*/, '');
      return `<li>${cleanLine}</li>`;
    })
    .join('');
}

// Initialize the first tab
document.addEventListener('DOMContentLoaded', function() {
  showTab('personalInfo');
});

// Print optimization for one-page resume
document.addEventListener('DOMContentLoaded', function() {
  // Add additional CSS for print optimization
  const onePageStyleSheet = document.createElement('style');
  onePageStyleSheet.textContent = `
    /* One-page resume optimizations for print */
    @media print {
      /* Base container settings */
      .resume-container, .modern-resume, .minimal-resume {
        max-width: 8.5in;
        height: 11in;
        overflow: hidden;
        page-break-after: avoid;
        page-break-inside: avoid;
        margin: 0 !important;
        padding: 0.4in !important;
        box-sizing: border-box;
      }
      
      /* Font size adjustments */
      .resume-name, .modern-name, .minimal-name {
        font-size: 20pt !important;
      }
      
      .resume-title, .modern-title, .minimal-title {
        font-size: 12pt !important;
      }
      
      .resume-section-title, .modern-section-title, .minimal-section-title {
        font-size: 12pt !important;
        margin-bottom: 6px !important;
      }
      
      /* Spacing adjustments */
      .resume-section, .modern-section, .minimal-section {
        margin-bottom: 10px !important;
      }
      
      .resume-entry, .modern-entry, .minimal-entry {
        margin-bottom: 8px !important;
      }
      
      .resume-entry-header, .modern-entry-header, .minimal-entry-header {
        margin-bottom: 2px !important;
      }
      
      .resume-bullets, .modern-bullets, .minimal-bullets {
        margin: 3px 0 !important;
        padding-left: 16px !important;
      }
      
      .resume-bullets li, .modern-bullets li, .minimal-bullets li {
        margin-bottom: 2px !important;
        line-height: 1.2 !important;
      }
      
      /* Optimize specific templates */
      .modern-header {
        padding: 15px !important;
      }
      
      .modern-content {
        padding: 15px !important;
      }
      
      /* Hide the print button when printing */
      .print-button {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(onePageStyleSheet);

  // Enhance the original generateResume function
  enhanceGenerateResume();
});

function enhanceGenerateResume() {
  // Store the original function
  const originalGenerateResume = window.generateResume;
  
  // Replace with enhanced version
  window.generateResume = function() {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';
    
    // Hide any existing resume output
    document.getElementById('resumeOutput').style.display = 'none';
    
    // Process the resume after a short delay to allow loading animation
    setTimeout(() => {
      // Call the original function implementation
      originalGenerateResume.call(window);
      
      // Wait for the resume to be rendered
      setTimeout(() => {
        // Apply smart content optimization
        const resumeElement = document.querySelector('.resume-container, .modern-resume, .minimal-resume');
        if (resumeElement) {
          optimizeResumeForOnePage(resumeElement);
        }
      }, 500);
    }, 100);
  };
}

// Function to intelligently optimize resume content for one page
function optimizeResumeForOnePage(resumeElement) {
  // Create a hidden clone to measure actual height
  const clone = resumeElement.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.width = '8.5in';
  document.body.appendChild(clone);
  
  // Check if content overflows a single page (11 inches)
  const contentHeight = clone.offsetHeight;
  const pageHeight = 11 * 96; // 11 inches in pixels (approximate DPI)
  
  if (contentHeight > pageHeight) {
    console.log("Resume is too long - applying optimization...");
    const compressionRatio = pageHeight / contentHeight;
    
    // Progressive optimization based on overflow amount
    if (compressionRatio > 0.9) {
      // Minor overflow - reduce margins and spacing
      applyMinorCompression(resumeElement);
    } else if (compressionRatio > 0.75) {
      // Moderate overflow - adjust font sizes and compact bullets
      applyModerateCompression(resumeElement);
    } else {
      // Significant overflow - trim content and hide less critical sections
      applyMajorCompression(resumeElement);
    }
    
    // Add a class to indicate optimization has been applied
    resumeElement.classList.add('one-page-optimized');
  }
  
  // Remove the clone after measurement
  document.body.removeChild(clone);
}

function applyMinorCompression(element) {
  // Reduce spacing between sections and entries
  const style = document.createElement('style');
  style.textContent = `
    .one-page-optimized .resume-section, 
    .one-page-optimized .modern-section, 
    .one-page-optimized .minimal-section {
      margin-bottom: 8px !important;
    }
    
    .one-page-optimized .resume-entry,
    .one-page-optimized .modern-entry,
    .one-page-optimized .minimal-entry {
      margin-bottom: 6px !important;
    }
    
    .one-page-optimized .resume-bullets li,
    .one-page-optimized .modern-bullets li,
    .one-page-optimized .minimal-bullets li {
      margin-bottom: 1px !important;
      line-height: 1.2 !important;
    }
  `;
  document.head.appendChild(style);
}

function applyModerateCompression(element) {
  // Apply minor compression first
  applyMinorCompression(element);
  
  // Reduce font sizes
  const style = document.createElement('style');
  style.textContent = `
    .one-page-optimized {
      font-size: 95% !important;
    }
    
    .one-page-optimized .resume-name,
    .one-page-optimized .modern-name,
    .one-page-optimized .minimal-name {
      font-size: 18pt !important;
    }
    
    .one-page-optimized .resume-bullets li,
    .one-page-optimized .modern-bullets li,
    .one-page-optimized .minimal-bullets li {
      line-height: 1.1 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Shorten long bullet points
  const bullets = element.querySelectorAll('li');
  bullets.forEach(bullet => {
    if (bullet.textContent.length > 100) {
      bullet.textContent = bullet.textContent.substring(0, 97) + '...';
    }
  });
}

function applyMajorCompression(element) {
  // Apply moderate compression first
  applyModerateCompression(element);
  
  // More aggressive font size reduction
  const style = document.createElement('style');
  style.textContent = `
    .one-page-optimized {
      font-size: 90% !important;
    }
    
    .one-page-optimized .resume-section,
    .one-page-optimized .modern-section,
    .one-page-optimized .minimal-section {
      margin-bottom: 5px !important;
    }
  `;
  document.head.appendChild(style);
  
  // Further shorten bullet points
  const bullets = element.querySelectorAll('li');
  bullets.forEach(bullet => {
    if (bullet.textContent.length > 80) {
      bullet.textContent = bullet.textContent.substring(0, 77) + '...';
    }
  });
  
  // Identify low-priority sections that could be hidden if needed
  const sections = Array.from(element.querySelectorAll('.resume-section, .modern-section, .minimal-section'));
  
  // Create a priority list (lower number = less important)
  const sectionPriorities = {
    'Hobbies': 1,
    'Extracurricular Activities': 2,
    'Extracurricular': 2,
    'Certifications': 3
  };
  
  // Sort sections by priority
  sections.sort((a, b) => {
    const titleA = a.querySelector('h2').textContent;
    const titleB = b.querySelector('h2').textContent;
    const priorityA = sectionPriorities[titleA] || 10;
    const priorityB = sectionPriorities[titleB] || 10;
    return priorityA - priorityB;
  });
  
  // Hide lowest priority section if still too much content
  if (calculateContentHeight(element) > 10.5 * 96 && sections.length > 0) {
    sections[0].style.display = 'none';
  }
}

function calculateContentHeight(element) {
  // Creates a clone to measure height without affecting the original
  const clone = element.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.width = '8.5in';
  document.body.appendChild(clone);
  const height = clone.offsetHeight;
  document.body.removeChild(clone);
  return height;
}