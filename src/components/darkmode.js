const html = document.querySelector('html');
const darkModeToggle = document.querySelector('.checkbox');
let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
  html.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
  html.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

let f;
