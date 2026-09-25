// Theme toggle script
const toggleBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // Persist preference
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? 'Toggle Light' : 'Toggle Dark';
}

// Initialize theme from localStorage or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});
