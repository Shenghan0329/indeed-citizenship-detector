function markCitizenRequirements() {
  // Find all divs with class "jobsearch-RightPane"
  function requireCitizen(rightPane) {
    const hasClearance = Array.from(rightPane.querySelectorAll('b')).some(b => 
      b.textContent.toLowerCase().includes('clearance')
    );
    if (hasClearance) return true;
    // Check if it contains Clearence
    const hasLicense = Array.from(rightPane.querySelectorAll('h3[class*="js-match-insights-provider"]')).some(h3 => 
      h3.textContent.toLowerCase().includes('license')
    );
    if (hasLicense) return true;
    // Check if any descendant contains US Citizen variations
    const text = rightPane.textContent || rightPane.innerText;
    const hasCitizenRequirement = /U\.?S\.?\s*[Cc]itizen/.test(text);
    return hasCitizenRequirement;
  }

  document.querySelectorAll('div.jobsearch-RightPane').forEach(rightPane => {
    // Check if it contains <b>Clearance:</b>
    const requiresCitizen = requireCitizen(rightPane);
    
    // If either condition is true, modify the title
    if (requiresCitizen) {
      const titleH2 = rightPane.querySelector('h2.jobsearch-JobInfoHeader-title');
      
      if (titleH2 && !titleH2.querySelector('.citizen-warning')) {
        // Create a span with the warning text
        const warningSpan = document.createElement('span');
        warningSpan.className = 'citizen-warning';
        warningSpan.textContent = ' (Require Citizen)';
        warningSpan.style.color = 'red';
        warningSpan.style.fontWeight = 'bold';
        
        // Append to the title
        titleH2.appendChild(warningSpan);
        
        console.log('✓ Marked job as requiring citizenship:', titleH2.textContent.trim().substring(0, 50) + '...');
      }
    }
  });
}

// Run immediately
markCitizenRequirements();

// Run every second to catch new content
setInterval(markCitizenRequirements, 1000);

console.log('✅ Indeed Citizenship Requirement Marker: Running every second');