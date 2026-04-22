/* ═══════════════════════════════════════════════════════════
   script.js — Fédération Mawahibou Nafih
   Structure :
   1. Navigation — scroll shrink + menu mobile
   2. Reveal au scroll (Intersection Observer)
   3. Formulaire de contact
   4. Smooth scroll sur les liens d'ancre
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ───────────────────────────────────────
     1. NAVIGATION
     - Rétrécit la barre au scroll
     - Ouvre/ferme le menu hamburger sur mobile
  ─────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Rétrécissement au scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Menu hamburger mobile
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Ferme le menu quand on clique un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  /* ───────────────────────────────────────
     2. REVEAL AU SCROLL
     - Ajoute la classe .reveal sur les blocs
       à animer, puis .visible quand ils entrent
       dans le viewport.
  ─────────────────────────────────────── */
  const revealTargets = [
    '.activite-card',
    '.zone-card',
    '.commission-item',
    '.adhesion-card',
    '.produit-card',
    '.contact-item',
    '.engage-item',
    '.about-text',
    '.about-visual',
  ];

  // Applique la classe .reveal à chaque élément ciblé
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Décalage léger pour un effet en cascade
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Observer qui déclenche l'animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // une seule fois
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* ───────────────────────────────────────
     3. FORMULAIRE DE CONTACT
     - Empêche le rechargement de page
     - Affiche un message de succès
     - Réinitialise le formulaire
  ─────────────────────────────────────── */
  window.handleForm = function(event) {
    event.preventDefault();

    const form       = event.target;
    const successMsg = document.getElementById('form-success');
    const submitBtn  = form.querySelector('button[type="submit"]');

    // État chargement
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Envoi en cours…';

    // Simulation d'envoi (remplacer par fetch() vers votre backend)
    setTimeout(() => {
      form.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Envoyer';
      successMsg.style.display = 'block';

      // Cache le message après 5 secondes
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1200);
  };


  /* ───────────────────────────────────────
     4. SMOOTH SCROLL SUR LES ANCRES
     - Compense la hauteur fixe de la nav
  ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

}); // fin DOMContentLoaded
