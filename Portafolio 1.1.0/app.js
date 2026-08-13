// ===== DATOS INICIALES =====
const EMOJIS = ['🔮','⚔️','🧪','🗺️','🦅','🌑','📜','🔬','🏰','⚡'];
const BANNERS = ['b1','b2','b3','b4'];

// Proyectos guardados en localStorage (persisten entre sesiones)
let projects = JSON.parse(localStorage.getItem('hp-projects') || 'null') || [
  {
    id: 1,
    name: 'Lab Blue Team vs Red Team',
    desc: 'Entorno de seguridad defensiva con Wazuh, Kali Linux y Ubuntu. Análisis de amenazas en tiempo real.',
    tech: ['Wazuh', 'Kali Linux', 'VMware'],
    status: 'active',
    emoji: '🛡️',
    banner: 'b1',
    link: '',
    imgData: null
  },
  {
    id: 2,
    name: 'Tesis: Ancho de Banda HN',
    desc: 'Investigación académica sobre el ancho de banda como factor del crecimiento tecnológico en Honduras.',
    tech: ['LaTeX', 'Python', 'Datos'],
    status: 'active',
    emoji: '📊',
    banner: 'b2',
    link: '',
    imgData: null
  },
  {
    id: 3,
    name: 'Microsoft Authenticator Sec',
    desc: 'Análisis de vulnerabilidades y actualizaciones de seguridad en el autenticador de Microsoft.',
    tech: ['Seguridad', 'Blue Team'],
    status: 'wip',
    emoji: '🔐',
    banner: 'b3',
    link: '',
    imgData: null
  }
];

let nextId = Math.max(...projects.map(p => p.id), 3) + 1;
let selectedImageData = null;

// ===== GUARDAR EN LOCALSTORAGE =====
function saveProjects() {
  localStorage.setItem('hp-projects', JSON.stringify(projects));
}

// ===== RENDERIZAR TARJETA =====
function getStatusLabel(s) {
  const map = {
    active: '<span class="project-status status-active">Activo</span>',
    wip:    '<span class="project-status status-wip">En Progreso</span>',
    archived: '<span class="project-status status-archived">Archivado</span>'
  };
  return map[s] || map.archived;
}

function renderCard(p) {
  const tags = p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
  const bannerContent = p.imgData
    ? `<img class="banner-img" src="${p.imgData}" alt="${escapeHtml(p.name)}"><span class="banner-emoji">${p.emoji || '⚡'}</span>`
    : `<span class="banner-emoji">${p.emoji || '⚡'}</span>`;
  const linkBtn = p.link
    ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener" style="font-size:11px;color:var(--hp-gold-dim);text-decoration:none;margin-left:auto;" onclick="event.stopPropagation()">Ver →</a>`
    : '';

  return `
    <div class="project-card" title="${escapeHtml(p.name)}">
      <div class="project-card-banner ${p.banner}">${bannerContent}</div>
      <div class="project-body">
        <div class="project-title">${escapeHtml(p.name)}</div>
        <div class="project-desc">${escapeHtml(p.desc)}</div>
        <div class="tech-tags">${tags}</div>
        <div class="project-meta">${getStatusLabel(p.status)}${linkBtn}</div>
      </div>
    </div>`;
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ===== RENDERIZAR TODOS LOS PROYECTOS =====
function renderProjects() {
  const recent = [...projects].reverse().slice(0, 4);
  const recentEl = document.getElementById('recent-projects');
  const allEl    = document.getElementById('all-projects');

  if (recentEl) recentEl.innerHTML = recent.map(renderCard).join('') || '<p style="color:var(--hp-muted);font-style:italic;font-size:13px;">Aún no hay proyectos. ¡Sube el primero!</p>';
  if (allEl)    allEl.innerHTML    = [...projects].reverse().map(renderCard).join('') || '<p style="color:var(--hp-muted);font-style:italic;font-size:13px;padding:20px 0;">Aún no hay proyectos. ¡Sube el primero!</p>';

  const statEl = document.getElementById('stat-proj');
  if (statEl) statEl.textContent = projects.length;
}

// ===== NAVEGACIÓN =====
function nav(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  const navEl  = document.querySelector(`[data-page="${page}"]`);

  if (pageEl) pageEl.classList.add('active');
  if (navEl)  navEl.classList.add('active');

  if (page === 'home') animateBars();
}

// ===== ANIMACIÓN BARRAS DE HABILIDAD =====
function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(b => {
      b.style.width = (b.dataset.w || 0) + '%';
    });
  }, 200);
}

// ===== AGREGAR PROYECTO =====
function addProject() {
  const name = document.getElementById('proj-name').value.trim();
  if (!name) {
    document.getElementById('proj-name').focus();
    document.getElementById('proj-name').style.borderColor = 'rgba(200,60,60,0.6)';
    setTimeout(() => {
      document.getElementById('proj-name').style.borderColor = '';
    }, 1500);
    return;
  }

  const desc   = document.getElementById('proj-desc').value.trim()  || 'Sin descripción.';
  const techRaw = document.getElementById('proj-tech').value.trim();
  const tech   = techRaw ? techRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const status = document.getElementById('proj-status').value;
  const link   = document.getElementById('proj-link').value.trim();
  const emoji  = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const banner = BANNERS[Math.floor(Math.random() * BANNERS.length)];

  projects.push({
    id: nextId++,
    name, desc, tech, status, emoji, banner, link,
    imgData: selectedImageData
  });

  saveProjects();
  renderProjects();
  clearForm();
  showToast('✦ Proyecto añadido al grimorio');

  setTimeout(() => nav('projects'), 1400);
}

// ===== LIMPIAR FORMULARIO =====
function clearForm() {
  ['proj-name','proj-desc','proj-tech','proj-link'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const fileLabel = document.getElementById('file-label');
  if (fileLabel) fileLabel.textContent = 'PNG, JPG, GIF — Portada del proyecto';
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.value = '';
  selectedImageData = null;
}

// ===== IMAGEN DE PORTADA =====
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const label = document.getElementById('file-label');
      if (label) label.textContent = '✓ ' + file.name;

      const reader = new FileReader();
      reader.onload = e => { selectedImageData = e.target.result; };
      reader.readAsDataURL(file);
    });
  }

  // Drag & drop en upload zone
  const zone = document.querySelector('.upload-zone');
  if (zone) {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.style.borderColor = 'var(--hp-gold)';
    });
    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = '';
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const label = document.getElementById('file-label');
        if (label) label.textContent = '✓ ' + file.name;
        const reader = new FileReader();
        reader.onload = ev => { selectedImageData = ev.target.result; };
        reader.readAsDataURL(file);
      }
    });
  }
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  if (!t || !m) return;
  m.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== PARTÍCULAS DORADAS =====
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:      Math.random() * W,
      y:      Math.random() * H,
      size:   Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  resize();
  particles = Array.from({ length: 60 }, createParticle);
  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= 0.0008;
      if (p.y < -10 || p.opacity <= 0) {
        particles[i] = createParticle();
        particles[i].y = H + 10;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== INICIALIZACIÓN =====
window.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  animateBars();
  initParticles();
});
