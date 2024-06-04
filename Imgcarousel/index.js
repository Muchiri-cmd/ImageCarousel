const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children)
//console.log(Array.from(track.children))
const nextButton = document.querySelector('.right-button');
const prevButton = document.querySelector('.left-button');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track,currSlide,targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left; + ')';
    currSlide.classList.remove('curr-slide');
    targetSlide.classList.add('curr-slide');
}
nextButton.addEventListener('click',e => {
    const currSlide = track.querySelector('.curr-slide');
    const nextSlide = currSlide.nextElementSibling;
    
    
    const currDot = dotsNav.querySelector('.active-slide');
    const nextDot = currDot.nextElementSibling;

    const targetIndex = slides.findIndex(slide => slide === nextSlide)
    
    moveToSlide(track,currSlide,nextSlide)

    updateDots(currDot,nextDot)
    hideNavArrows(slides,prevButton,nextButton,targetIndex)
})
prevButton.addEventListener('click', e => {
    const currSlide = track.querySelector('.curr-slide');
    const prevSlide = currSlide.previousElementSibling;
   
    const currDot = dotsNav.querySelector('.active-slide');
    const prevDot = currDot.previousElementSibling;

    const targetIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track,currSlide,prevSlide)

    updateDots(currDot,prevDot)

    hideNavArrows(slides,prevButton,nextButton,targetIndex)

});

const updateDots = (currDot,targetDot) => {
    currDot.classList.remove('active-slide');
    targetDot.classList.add('active-slide');
}

const hideNavArrows = (slides,prevButton,nextButton,targetIndex) => {
    if (targetIndex === 0){
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currSlide = track.querySelector('.curr-slide');
    const currDot = dotsNav.querySelector('.active-slide');

    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track,currSlide,targetSlide)

    updateDots(currDot,targetDot)


    hideNavArrows(slides,prevButton,nextButton,targetIndex)
   
  

})