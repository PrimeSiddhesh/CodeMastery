// script/progress.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("Progress module loaded.");

  // Make sure checkSession exists from auth.js, but since progress is injected on dashboard
  // we check it directly.
  const checkSessionLocal = () => {
    const session = localStorage.getItem('codemastery_session');
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    return JSON.parse(session);
  };

  const user = checkSessionLocal();
  if (!user) return; // Halt execution if not logged in

  // Update UI Profile
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-email').textContent = user.email;
  document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();

  // Load User Progress
  let progressData = JSON.parse(localStorage.getItem(`codemastery_progress_${user.id}`)) || {
    js: { completedLessons: [] },
    html: { completedLessons: [] }
  };

  // Assume constants for total lessons for UI mockup. To be updated by real course data.
  const totalJsLessons = 7; 
  const totalHtmlLessons = 5;

  const jsCompleted = progressData.js.completedLessons.length;
  const htmlCompleted = progressData.html.completedLessons.length;

  const jsPercentage = Math.round((jsCompleted / totalJsLessons) * 100) || 0;
  const htmlPercentage = Math.round((htmlCompleted / totalHtmlLessons) * 100) || 0;

  // Update Progress Bars
  setTimeout(() => {
    document.getElementById('js-progress-bar').style.width = `${jsPercentage}%`;
    document.getElementById('js-progress-text').textContent = `${jsPercentage}% Completed`;
    
    document.getElementById('html-progress-bar').style.width = `${htmlPercentage}%`;
    document.getElementById('html-progress-text').textContent = `${htmlPercentage}% Completed`;
  }, 100);

  // Update Global Stats
  document.getElementById('stat-completed').textContent = jsCompleted + htmlCompleted;
});
