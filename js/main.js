import data from './data.js'

const reviews = data.reviews;
$(function(){
// FIXED HEADER & BACK TO TOP BTN
const backToTopBtn = document.querySelector('.back-to-top-btn');
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scrollOffset = window.scrollY;
    if (scrollOffset > 100) {
        header.classList.add('fixed-header');
        backToTopBtn.classList.add('display-back-to-top-btn');
    } else {
        header.classList.remove('fixed-header');
        backToTopBtn.classList.remove('display-back-to-top-btn');
    }
})
// DISPLAY MOBILE MENU
const openMenuBtn = document.querySelector('header .open-mobile-menu img');
const closeMenuBtn = document.querySelector('header ul .exit i');
const menuWrap = document.querySelector('header ul');
openMenuBtn.addEventListener('click', () => menuWrap.classList.add('display-menu'));
closeMenuBtn.addEventListener('click', () => menuWrap.classList.remove('display-menu'));
// RELATED PRODUCTS CAROUSEL
    if ($('.related .related-carousel')) {
        $('.related .related-carousel').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow:'<button type="button" class="slick-prev pull-left"><i class="fas fa-long-arrow-alt-left"></i></button>',
            nextArrow:'<button type="button" class="slick-next pull-right"><i class="fas fa-long-arrow-alt-right"></i></button>',
            responsive: [
                {
                    breakpoint: 991.98,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767.98,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 575.98,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
    // LOAD REVIEWS
    if(document.querySelector('.reviews-wrap')){
        const reviewsWrap = document.querySelector('.reviews-wrap');
        function implementReviews() {
            reviews.forEach((review) => {
                const reviewItem = `<li class="review">
                <div class="user-img">
                    <img src="${review.img}" alt="user-img">
                </div>
                <div class="user-review">
                    <h3>${review.name}</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>${review.review}</p>
                </div>
            </li>`
            reviewsWrap.innerHTML += reviewItem;
            })
        }
        implementReviews()
    }
    // CHANGE TEMPLATE COLOR
    const colorBtns = [...document.querySelectorAll('.colors .circle-wraps .circle')];
    const pageWraps = [...document.querySelectorAll('.wrap')];
    const shoeImg = document.querySelector('.shoe-color');
    // CHANGE TEMPLATE COLOR ON LOAD
    function changeTemplateColorOnLoad() {
        if (localStorage.getItem('templateColor')){
            const newColorClass = localStorage.getItem('templateColor');
            pageWraps.forEach((wrap) => {
                const oldColorClass = wrap.classList[1];
                wrap.classList.remove(oldColorClass);
                wrap.classList.add(`${newColorClass}-color`);
            })
            if(document.querySelector('.shoe-color')) {
                shoeImg.src = `./images/global/${newColorClass}NikeShoe.png`;
                colorBtns.forEach((btn) => btn.classList.remove('active'));
                switch(newColorClass) {
                    case 'red':
                        colorBtns[0].classList.add('active');
                        break;
                    case 'blue':
                        colorBtns[1].classList.add('active');
                        break;
                    case 'green':
                        colorBtns[2].classList.add('active');
                        break;
                }
            }
        }
    }
    changeTemplateColorOnLoad();
    // CHANGE TEMPLATE COLOR ON CLICK
    function changeTemplateColorOnClick(btn) {
        colorBtns.forEach((btn) => btn.classList.remove('active'));
        btn.classList.add('active');
        const newColorClass = btn.classList[1];
        pageWraps.forEach((wrap) => {
            const oldColorClass = wrap.classList[1];
            wrap.classList.remove(oldColorClass);
            wrap.classList.add(`${newColorClass}-color`);
        })
        shoeImg.src = `./images/global/${newColorClass}NikeShoe.png`
        localStorage.setItem('templateColor', newColorClass)
    }
    colorBtns.forEach((btn) => btn.addEventListener('click', () => changeTemplateColorOnClick(btn)));
});
