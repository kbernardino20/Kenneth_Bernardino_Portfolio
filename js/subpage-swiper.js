
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('#portfolioLightbox');
  const lightboxImage = document.querySelector('#portfolioLightboxImage');
  const lightboxCaption = document.querySelector('#portfolioLightboxCaption');
  const lightboxCounter = document.querySelector('#portfolioLightboxCounter');
  const lightboxPrevious = document.querySelector('.portfolio-lightbox-prev');
  const lightboxNext = document.querySelector('.portfolio-lightbox-next');

  let galleryItems = [];
  let activeLightboxIndex = 0;
  let lastFocusedElement = null;

  const updateLightbox = (index) => {
    if (!galleryItems.length || !lightboxImage) return;
    activeLightboxIndex = (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[activeLightboxIndex];
    const source = item.querySelector('img');
    if (!source) return;

    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt || '';

    if (lightboxCaption) {
      lightboxCaption.textContent =
        item.querySelector('figcaption strong')?.textContent?.trim() ||
        source.alt ||
        '';
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${activeLightboxIndex + 1} / ${galleryItems.length}`;
    }
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    lastFocusedElement = document.activeElement;
    updateLightbox(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('portfolio-lightbox-open');
    lightbox.querySelector('.portfolio-lightbox-close')?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('portfolio-lightbox-open');
    if (lightboxImage) lightboxImage.src = '';
    lastFocusedElement?.focus?.();
  };

  document.querySelectorAll('.portfolio-swiper').forEach((element) => {
    if (typeof Swiper !== 'function') return;

    const cards = [...element.querySelectorAll('.portfolio-slide-card')];
    galleryItems = cards;

    const swiper = new Swiper(element, {
      effect: 'coverflow',
      centeredSlides: true,
      grabCursor: true,
      loop: true,
      speed: 650,
      initialSlide: 0,
      slidesPerView: 1.12,
      spaceBetween: 18,
      keyboard: {
        enabled: true,
      },
      lazyPreloadPrevNext: 2,
      coverflowEffect: {
        rotate: 22,
        stretch: 0,
        depth: 170,
        modifier: 1.15,
        slideShadows: true,
      },
      pagination: {
        el: element.querySelector('.portfolio-swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: element.querySelector('.portfolio-swiper-next'),
        prevEl: element.querySelector('.portfolio-swiper-prev'),
      },
      breakpoints: {
        720: {
          slidesPerView: 1.7,
          spaceBetween: 24,
          coverflowEffect: {
            rotate: 20,
            depth: 180,
            modifier: 1.05,
          },
        },
        1080: {
          slidesPerView: 2.35,
          spaceBetween: 28,
          coverflowEffect: {
            rotate: 18,
            depth: 190,
            modifier: 1,
          },
        },
      },
    });

    element.addEventListener('click', (event) => {
      const card = event.target.closest('.portfolio-slide-card');
      if (!card) return;

      const slide = card.closest('.swiper-slide');
      if (!slide?.classList.contains('swiper-slide-active')) {
        const realIndex = Number(slide?.dataset?.swiperSlideIndex);
        if (Number.isFinite(realIndex)) swiper.slideToLoop(realIndex);
        return;
      }

      const originalIndex = cards.indexOf(card);
      if (originalIndex >= 0) openLightbox(originalIndex);
    });
  });

  lightboxPrevious?.addEventListener('click', () => updateLightbox(activeLightboxIndex - 1));
  lightboxNext?.addEventListener('click', () => updateLightbox(activeLightboxIndex + 1));

  lightbox?.querySelectorAll('[data-lightbox-close]').forEach((control) => {
    control.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('is-open')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') updateLightbox(activeLightboxIndex - 1);
    if (event.key === 'ArrowRight') updateLightbox(activeLightboxIndex + 1);
  });
});
