import './style.css';

const initNavigation = () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav-panel]');
  const dropdown = document.querySelector('[data-dropdown]');
  const dropdownTrigger = document.querySelector('[data-dropdown-trigger]');
  const dropdownPanel = document.querySelector('[data-dropdown-panel]');

  if (!navToggle || !navPanel) {
    return;
  }

  const closePanel = () => {
    navPanel.classList.add('hidden');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isHidden = navPanel.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', String(!isHidden));
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closePanel);
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  // Desktop dropdown (hover/focus, stays open while hovered)
  if (dropdown && dropdownTrigger && dropdownPanel) {
    let dropdownTimer;

    const openDropdown = () => {
      clearTimeout(dropdownTimer);
      dropdownPanel.classList.remove('hidden');
      dropdownTrigger.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      dropdownTimer = setTimeout(() => {
        dropdownPanel.classList.add('hidden');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }, 120);
    };

    [dropdownTrigger, dropdownPanel].forEach((el) => {
      el.addEventListener('mouseenter', openDropdown);
      el.addEventListener('focus', openDropdown);
      el.addEventListener('mouseleave', closeDropdown);
      el.addEventListener('blur', closeDropdown);
    });
  }
};

const init = () => {
  initNavigation();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

