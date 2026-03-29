// script/app.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("CodeMastery App Initialized.");
  
  // Create animated gradient hover effects dynamically
  const buttons = document.querySelectorAll('.btn-primary');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// Utility to escape HTML for code displays
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
