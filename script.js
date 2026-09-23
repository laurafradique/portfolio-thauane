const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((element, index) => { element.style.transitionDelay = `${(index % 3) * 70}ms`; observer.observe(element); });

const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');
if (menu) menu.addEventListener('click', () => { const open = header.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
document.querySelectorAll('.site-header nav a').forEach((link) => link.addEventListener('click', () => { header.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }));

const projectData = {
  lab: { title: 'Lab Burger', category: 'Branding · Identidade visual', images: ['capa.png','imagem-2.png','imagem-3.png','imagem-4.png','imagem-5.png','imagem-6.png'].map(name => `assets/projects/lab-burger/${name}`), pdf: 'assets/projects/lab-burger/complementar.pdf' },
  closet: { title: 'In Closet', category: 'Branding · UI design', images: ['capa.png','imagem-2.png','imagem-3.png','imagem-4.png','imagem-5.png'].map(name => `assets/projects/in-closet/${name}`) },
  occean: { title: 'Occean', category: 'Social media', images: ['capa.webp','imagem-2.webp','imagem-3.webp','imagem-4.webp','imagem-5.webp','imagem-6.webp','imagem-7.webp','imagem-8.webp','imagem-9.webp'].map(name => `assets/projects/occean/${name}`) },
  carel: { title: 'Carel Clínica', category: 'Social media', images: ['capa.png','imagem-2.webp','imagem-3.webp','imagem-4.png'].map(name => `assets/projects/carel/${name}`) },
  coffee: { title: 'We Coffee', category: 'UI design', images: ['capa.png','imagem-2.png'].map(name => `assets/projects/we-coffee/${name}`) }
};

const dialog = document.querySelector('.project-dialog');
if (dialog) {
  const dialogTitle = dialog.querySelector('h2');
  const dialogCategory = dialog.querySelector('.modal-category');
  const gallery = dialog.querySelector('.modal-gallery');
  document.querySelectorAll('[data-project]').forEach((card) => card.addEventListener('click', (event) => {
    event.preventDefault();
    const project = projectData[card.dataset.project];
    dialogTitle.textContent = project.title;
    dialogCategory.textContent = project.category;
    gallery.innerHTML = project.images.map((src, index) => `<img class="${index === 0 ? 'modal-wide' : ''}" src="${src}" alt="${project.title} — imagem ${index + 1}" loading="lazy">`).join('');
    if (project.pdf) gallery.insertAdjacentHTML('beforeend', `<div class="pdf-view"><span>MANUAL COMPLEMENTAR</span><iframe src="${project.pdf}#toolbar=0&navpanes=0&view=FitH" title="Manual complementar Lab Burger"></iframe></div>`);
    dialog.showModal();
    gallery.scrollTop = 0;
  }));
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}
