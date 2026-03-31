// ========================================
// 作品集网站 - 交互脚本 v2
// 惊艳细节版
// ========================================

// --- 自定义光标 ---
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// 检测是否为触摸设备
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 光标跟随动画（使用 requestAnimationFrame 实现平滑跟随）
  function animateCursor() {
    // 主光标快速跟随
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // 跟随圆慢速跟随
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 悬浮在可点击元素时改变光标样式
  const clickables = document.querySelectorAll('a, button, .work-card, .result-card');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// --- 导航栏滚动效果 ---
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// 移动端菜单切换
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // 点击导航链接后关闭菜单
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// --- 滚动渐入动画 ---
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// 观察所有需要渐入的元素
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// --- 幕帘揭开动画 ---
const maskObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal-mask').forEach(el => {
  maskObserver.observe(el);
});

// --- 文字逐字动画 ---
function splitText(element) {
  const text = element.textContent;
  element.textContent = '';

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.transitionDelay = `${index * 0.03}s`;
    element.appendChild(span);
  });
}

// 为所有 split-text 元素分割文字
document.querySelectorAll('.split-text').forEach(el => {
  splitText(el);
});

// 观察并触发动画
const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, delay);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.split-text').forEach(el => {
  textObserver.observe(el);
});

// --- 数字跳动动画 ---
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// 为所有数字元素设置动画
const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateNumber(entry.target, target);
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num, .result-num').forEach(el => {
  numberObserver.observe(el);
});

// --- 磁吸效果 ---
if (!isTouchDevice) {
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // 限制磁吸距离
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 80;

      if (distance < maxDistance) {
        const strength = 0.3;
        this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }
    });

    el.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

// --- 平滑滚动 ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// --- 横向滚动提示 ---
const hscrollWrapper = document.querySelector('.hscroll-wrapper');
if (hscrollWrapper) {
  // 检测是否可以滚动
  const checkScroll = () => {
    const canScroll = hscrollWrapper.scrollWidth > hscrollWrapper.clientWidth;
    if (canScroll && hscrollWrapper.scrollLeft === 0) {
      hscrollWrapper.style.cursor = 'grab';
    }
  };

  checkScroll();
  window.addEventListener('resize', checkScroll);

  // 拖拽滚动
  let isDown = false;
  let startX;
  let scrollLeft;

  hscrollWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    hscrollWrapper.style.cursor = 'grabbing';
    startX = e.pageX - hscrollWrapper.offsetLeft;
    scrollLeft = hscrollWrapper.scrollLeft;
  });

  hscrollWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    hscrollWrapper.style.cursor = 'grab';
  });

  hscrollWrapper.addEventListener('mouseup', () => {
    isDown = false;
    hscrollWrapper.style.cursor = 'grab';
  });

  hscrollWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - hscrollWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    hscrollWrapper.scrollLeft = scrollLeft - walk;
  });
}

// --- 视差滚动效果（轻微） ---
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  // 英雄区视差
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const heroOffset = scrolled * 0.3;
    hero.style.transform = `translateY(${heroOffset}px)`;
  }

  // 案例编号视差
  document.querySelectorAll('.case-number').forEach((num, index) => {
    const rect = num.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.05;
      num.style.transform = `translateY(${offset}px)`;
    }
  });
});

// --- 页面加载完成后的初始化 ---
window.addEventListener('load', () => {
  // 为首屏元素立即添加 visible 类
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('visible');
  });

  // 触发英雄区文字动画
  document.querySelectorAll('.hero .split-text').forEach((el, index) => {
    const delay = parseFloat(el.dataset.delay || 0) * 1000;
    setTimeout(() => {
      el.classList.add('animate');
    }, delay + 300);
  });
});

// --- 性能优化：减少重绘 ---
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});
