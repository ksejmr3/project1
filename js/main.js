const initHeroSwiper = () => {
    const hero = document.querySelector('.hero-swiper');

    if (!hero || typeof Swiper === 'undefined') return;

    new Swiper(hero, {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#hero .swiper-pagination',
            clickable: true,
        },
        a11y: {
            enabled: true,
        },
    });
};

const initHeroControl = () => {
    const control = document.querySelector('#hero .control');
    const hero = document.querySelector('.hero-swiper');

    if (!control || !hero) return;

    control.addEventListener('click', () => {
        const swiper = hero.swiper;
        const isPaused = control.classList.toggle('is-paused');

        if (swiper) {
            if (isPaused) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
        }

        control.setAttribute('aria-label', isPaused ? '슬라이드 재생' : '슬라이드 일시정지');
    });
};

const initHorizontalSlider = ({
    listSelector,
    prevSelector,
    nextSelector,
    itemSelector,
}) => {
    const list = document.querySelector(listSelector);
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);

    if (!list || !prevButton || !nextButton) return;

    const getMoveDistance = () => {
        const item = list.querySelector(itemSelector);

        if (!item) return list.clientWidth;

        const styles = window.getComputedStyle(list);
        const gap = Number.parseFloat(styles.columnGap) || 0;

        return item.getBoundingClientRect().width + gap;
    };

    prevButton.addEventListener('click', () => {
        list.scrollBy({
            left: -getMoveDistance(),
            behavior: 'smooth',
        });
    });

    nextButton.addEventListener('click', () => {
        list.scrollBy({
            left: getMoveDistance(),
            behavior: 'smooth',
        });
    });
};

const initPromotionSlider = () => {
    const slider = document.querySelector('.promotion-swiper');
    const inner = slider?.closest('.inner');
    const list = slider?.querySelector('.promotion-list');
    const cards = list ? [...list.querySelectorAll('.promotion-card')] : [];

    if (!slider || !inner || !list || cards.length === 0 || typeof Swiper === 'undefined') return;

    const isInActiveArea = (clientX) => {
        const innerRect = inner.getBoundingClientRect();

        return clientX >= innerRect.left + innerRect.width / 2;
    };

    slider.addEventListener(
        'click',
        (event) => {
            if (isInActiveArea(event.clientX)) return;

            event.preventDefault();
            event.stopPropagation();
        },
        true,
    );

    for (let index = cards.length; index < 13; index += 1) {
        list.append(cards[index % cards.length].cloneNode(true));
    }

    new Swiper(slider, {
        loop: true,
        speed: 600,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        navigation: {
            prevEl: '.con1 .slide-button.prev',
            nextEl: '.con1 .slide-button.next',
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
        },
        a11y: {
            enabled: true,
        },
        on: {
            touchStart(swiper, event) {
                swiper.allowTouchMove = isInActiveArea(event.clientX);
            },
            touchEnd(swiper) {
                swiper.allowTouchMove = true;
            },
        },
    });
};

const initLiveSlider = () => {
    const slider = document.querySelector('.live-swiper');
    const list = slider?.querySelector('.live-list');
    const cards = list ? [...list.querySelectorAll('.live-card')] : [];

    if (!slider || !list || cards.length === 0 || typeof Swiper === 'undefined') return;

    for (let index = cards.length; index < 11; index += 1) {
        list.append(cards[index % cards.length].cloneNode(true));
    }

    new Swiper(slider, {
        loop: true,
        speed: 600,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 23,
        navigation: {
            prevEl: '.con2 .live-slide.prev',
            nextEl: '.con2 .live-slide.next',
        },
        a11y: {
            enabled: true,
        },
    });
};

const initRankingSlider = () => {
    const slider = document.querySelector('.ranking-swiper');
    const wrapper = slider?.querySelector('.swiper-wrapper');
    const firstGroup = wrapper?.querySelector('.ranking-list');

    if (!slider || !wrapper || !firstGroup || typeof Swiper === 'undefined') return;

    const firstGroupRanks = [1, 3, 4, 6, 2, 4, 5, 7];

    firstGroup.querySelectorAll('.rank').forEach((rank, cardIndex) => {
        rank.textContent = String(firstGroupRanks[cardIndex]);
    });

    for (let groupIndex = 1; groupIndex < 3; groupIndex += 1) {
        const group = firstGroup.cloneNode(true);

        group.querySelectorAll('.rank').forEach((rank, cardIndex) => {
            rank.textContent = String(groupIndex * 8 + cardIndex + 1);
        });

        wrapper.append(group);
    }

    new Swiper(slider, {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
            prevEl: '.con3 .ranking-slide.prev',
            nextEl: '.con3 .ranking-slide.next',
        },
        a11y: {
            enabled: true,
        },
    });
};

const initTopButton = () => {
    const topButton = document.querySelector('#footer .top-button');
    const hero = document.querySelector('#hero');
    const footer = document.querySelector('#footer');

    if (!topButton || !hero || !footer) return;

    let isTicking = false;

    const updateTopButton = () => {
        const heroRect = hero.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
        const isFooterVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;

        topButton.classList.toggle('is-hidden', isHeroVisible);
        topButton.classList.toggle('is-footer', !isHeroVisible && isFooterVisible);
        isTicking = false;
    };

    const requestTopButtonUpdate = () => {
        if (isTicking) return;

        isTicking = true;
        window.requestAnimationFrame(updateTopButton);
    };

    topButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    window.addEventListener('scroll', requestTopButtonUpdate, { passive: true });
    window.addEventListener('resize', requestTopButtonUpdate);
    updateTopButton();
};

(() => {
    initHeroSwiper();
    initHeroControl();
    initPromotionSlider();
    initLiveSlider();
    initRankingSlider();
    initTopButton();
})();
