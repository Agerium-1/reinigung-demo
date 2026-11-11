// Klarwerk Theme: Mobilmenü, Header beim Scrollen, Vorher/Nachher-Regler, Einblenden.
(() => {
	const header = document.querySelector('[data-header]');
	const toggle = document.querySelector('[data-menu-toggle]');

	if (toggle && header) {
		toggle.addEventListener('click', () => {
			const open = toggle.getAttribute('aria-expanded') !== 'true';
			toggle.setAttribute('aria-expanded', String(open));
			header.classList.toggle('is-open', open);
			document.body.classList.toggle('no-scroll', open);
		});
	}

	if (header) {
		const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	// Vorher/Nachher: Der Regler liegt unsichtbar über dem Bild, so funktionieren Maus, Touch und Tastatur.
	document.querySelectorAll('[data-compare]').forEach((box) => {
		const range = box.querySelector('input');
		const set = () => box.style.setProperty('--pos', range.value + '%');
		range.addEventListener('input', set);
		set();
	});

	const items = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-in');
					io.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px' });
		items.forEach((el) => io.observe(el));
	} else {
		items.forEach((el) => el.classList.add('is-in'));
	}
})();
