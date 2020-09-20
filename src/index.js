import { gsap } from "gsap";

const documentBody = document.getElementsByTagName('BODY');
const mainContent = document.querySelector('.covVir-mainContent');
const featuredMedia = document.querySelector('.covVir-featuredMedia');
const introWrap = document.querySelector('.covVir-introWrap');
const intro = document.querySelectorAll('.covVir-intro');
const sketchHeader = document.querySelector('.covVir-sketchHeader');
const sketchWrap = document.querySelector('.sketchfab-embed-wrapper');
const interactiveWindows = Array.from(document.querySelectorAll('.covVir-interactiveWindow'));
const swipeWindow = Array.from(document.querySelectorAll('.covVir-sWin'));
const counterTriggers = Array.from(document.querySelectorAll('.covVir-counter-trigger'));
const frontPage = document.querySelector('.covVir-frontPage');
const frontpageTitle = Array.from(document.querySelectorAll('.covVir-frontPage-title'));
const covTimer = document.querySelector('.covVir-Timer');
const timerFill = document.querySelector('.covVir-timerFill');
const trigger = document.querySelector('.covVir-readWrapper');
const ifrm = document.createElement('IFRAME');
ifrm.setAttribute('id', 'sketchFab');
ifrm.setAttribute('src', 'https://sketchfab.com/models/560fb642e7d04573aa58601a78b69331/embed?preload=1&amp;ui_infos=0&amp;ui_inspector=0&amp;ui_stop=0&amp;ui_watermark=1&amp;ui_watermark_link=1" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true');

sketchWrap.appendChild(ifrm);

const interactiveItemsOne = Array.from(document.querySelectorAll('.covVir-interactiveItemOne'));
const interactiveOneCountLinks = Array.from(document.querySelectorAll('.covVir-interactiveOneCountLink'));
const interactiveItemsTwo = Array.from(document.querySelectorAll('.covVir-interactiveItemTwo'));
const interactiveTwoCountLinks = Array.from(document.querySelectorAll('.covVir-interactiveTwoCountLink'));
const interactiveItemsThree = Array.from(document.querySelectorAll('.covVir-interactiveItemThree'));
const interactiveThreeCountLinks = Array.from(document.querySelectorAll('.covVir-interactiveThreeCountLink'));

let activeWindow;
let startX;
let endX;
let dist;
let threshold = 50;

let oneCount = 0;
let twoCount = 0;
let threeCount = 0;

let mobile = true;


frontpageTitle.forEach((title,index) => {
	setTimeout(() => {
		title.style.opacity = '1';
	}, 250 * index);
});

function timelineReveal() {
	covTimer.style.display = 'block';
}

function removeFrontPage() {
	function remove() {
		frontPage.style.display = 'none';
	}
	frontPage.style.opacity = '0';
	setTimeout(remove, 1000);
}

setTimeout(timelineReveal, 4500);
setTimeout(removeFrontPage, 10500);

// COMPLIANCE BANNER onload
function setBodyStyle() {
	documentBody[0].style.transform = 'none';
}

// function setBodyResize() {
// 	const wrapper = document.querySelector('.optanon-alert-box-wrapper');
// 	if (!wrapper.classList.contains('clicked')) {
// 		wrapper.style.top = '0';
// 		documentBody[0].style.position = 'relative';
// 		documentBody[0].style.top = '0';
// 		documentBody[0].style.transform = 'none';    
// 	}
// }

var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
        const wrapper = document.querySelector('.optanon-alert-box-wrapper');
        const button = document.querySelector('.optanon-allow-all');
        wrapper.style.top = '0';
        documentBody[0].style.transform = 'none';
        documentBody[0].style.position = 'relative';
        documentBody[0].style.top = '0';
        documentBody[0].style.scrollTop = '0';
        button.addEventListener('click', function(e) {
        	wrapper.classList.add('clicked');
        	setTimeout(setBodyStyle, 100);
        })
    }    
}, 100);

// WINDOW RESIZE FUNCTIONS
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const resizeFunction = debounce(function() {
	if (mobile == true && window.innerWidth > 900) {
		mobile = false;
		location.reload(true);
	} else if (mobile == false && window.innerWidth < 900) {
		mobile = true;
		location.reload(true);
	}
}, 250);

window.addEventListener('resize', resizeFunction);

// background fade handler
function handleScroll() {
	let distanceScrolled = window.pageYOffset;

	if (!mainContent.classList.contains('scrolled') && distanceScrolled > mainContent.offsetTop + mainContent.parentElement.offsetTop) {
		mainContent.classList.add('scrolled');
		introWrap.style.backgroundColor = '#010D00';
		for (let i = 0; i < intro.length; i++) {
			intro[i].style.color = 'white';
		}
		sketchHeader.style.backgroundColor = '#010D00';
	} else if (mainContent.classList.contains('scrolled') && distanceScrolled < mainContent.offsetTop + mainContent.parentElement.offsetTop) {
		mainContent.classList.remove('scrolled');
		introWrap.style.backgroundColor = 'white';
		for (let i = 0; i < intro.length; i++) {
			intro[i].style.color = '#656565';
		}
		sketchHeader.style.backgroundColor = 'white';
	}

	if (!trigger.classList.contains('scrolled') && distanceScrolled > trigger.offsetTop + trigger.parentElement.offsetTop) {
		trigger.classList.add('scrolled');
		featuredMedia.style.opacity = '0';
	} else if (trigger.classList.contains('scrolled') && distanceScrolled < trigger.offsetTop + trigger.parentElement.offsetTop) {
		trigger.classList.remove('scrolled');
		featuredMedia.style.opacity = '1';
	}
}

// Mobile Swipe handlers
function handleNext(e) {
	if (activeWindow.id == 'covVir-interactiveOne') {
		let elem = interactiveItemsOne[oneCount];
		interactiveItemsOne[oneCount].classList.remove('swipedTo');
		interactiveOneCountLinks[oneCount].classList.remove('active');
		if (oneCount < interactiveItemsOne.length - 1) {
			oneCount++;
		} else {
			oneCount = 0;
		}
		interactiveItemsOne[oneCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsOne[oneCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsOne[oneCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsOne[oneCount].children[1], {xPercent: 100, opacity:0, duration: 1, ease: "power4"});
		interactiveOneCountLinks[oneCount].classList.add('active');
	} else if (activeWindow.id == 'covVir-interactiveTwo') {
		let elem = interactiveItemsTwo[twoCount];
		interactiveItemsTwo[twoCount].classList.remove('swipedTo');
		interactiveTwoCountLinks[twoCount].classList.remove('active');
		if (twoCount < interactiveItemsTwo.length - 1) {
			twoCount++;
		} else {
			twoCount = 0;
		}
		interactiveItemsTwo[twoCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsTwo[twoCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsTwo[twoCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsTwo[twoCount].children[1], {xPercent: 100, opacity:0, duration: 1, ease: "power4"});
		interactiveTwoCountLinks[twoCount].classList.add('active');
	} else if (activeWindow.id == 'covVir-interactiveThree') {
		let elem = interactiveItemsThree[threeCount];
		interactiveItemsThree[threeCount].classList.remove('swipedTo');
		interactiveThreeCountLinks[threeCount].classList.remove('active');
		if (threeCount < interactiveItemsThree.length - 1) {
			threeCount++;
		} else {
			threeCount = 0;
		}
		interactiveItemsThree[threeCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsThree[threeCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsThree[threeCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsThree[threeCount].children[1], {xPercent: 100, opacity:0, duration: 1, ease: "power4"});
		interactiveThreeCountLinks[threeCount].classList.add('active');
	}
}

function handlePrev(e) {
	if (activeWindow.id == 'covVir-interactiveOne') {
		let elem = interactiveItemsOne[oneCount];
		interactiveItemsOne[oneCount].classList.remove('swipedTo');
		interactiveOneCountLinks[oneCount].classList.remove('active');
		if (oneCount > 0) {
			oneCount--;
		} else if (oneCount == 0) {
			oneCount = interactiveItemsOne.length - 1;
		}
		interactiveItemsOne[oneCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsOne[oneCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsOne[oneCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsOne[oneCount].children[1], {xPercent: -100, opacity:0, duration: 1, ease: "power4"});
		interactiveOneCountLinks[oneCount].classList.add('active');
	} else if (activeWindow.id == 'covVir-interactiveTwo') {
		let elem = interactiveItemsTwo[twoCount];
		interactiveItemsTwo[twoCount].classList.remove('swipedTo');
		interactiveTwoCountLinks[twoCount].classList.remove('active');
		if (twoCount > 0) {
			twoCount--;
		} else if (twoCount == 0) {
			twoCount = interactiveItemsTwo.length - 1;
		}
		interactiveItemsTwo[twoCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsTwo[twoCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsTwo[twoCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsTwo[twoCount].children[1], {xPercent: -100, opacity:0, duration: 1, ease: "power4"});
		interactiveTwoCountLinks[twoCount].classList.add('active');
	} else if (activeWindow.id == 'covVir-interactiveThree') {
		let elem = interactiveItemsThree[threeCount];
		interactiveItemsThree[threeCount].classList.remove('swipedTo');
		interactiveThreeCountLinks[threeCount].classList.remove('active');
		if (threeCount > 0) {
			threeCount--;
		} else if (threeCount == 0) {
			threeCount = interactiveItemsThree.length - 1;
		}
		interactiveItemsThree[threeCount].classList.add('swipedTo');
		elem.firstElementChild.children[0].currentTime = '0';
		gsap.from(interactiveItemsThree[threeCount].children[0], {opacity: 0, duration: .25});
		interactiveItemsThree[threeCount].firstElementChild.children[0].play();
		gsap.from(interactiveItemsThree[threeCount].children[1], {xPercent: -100, opacity:0, duration: 1, ease: "power4"});
		interactiveThreeCountLinks[threeCount].classList.add('active');
	}
}

// mobile scroll handler
function mobileScroll() {
	let mobileScroll = window.pageYOffset;

	interactiveWindows.forEach(elem => {
		if (mobileScroll > elem.offsetTop + elem.parentElement.offsetTop + elem.parentElement.offsetParent.offsetTop + elem.parentElement.offsetParent.parentElement.offsetTop - (window.innerHeight / 2)) {
			elem.firstElementChild.children[0].firstElementChild.play();
		}
	})
}

// desktop scroll handler
function desktopScroll() {
	let desktopScroll = window.pageYOffset;
	counterTriggers.forEach(trigger => {
		if (!trigger.classList.contains('scrolling') && desktopScroll > trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop) {
			let counter = document.getElementById(trigger.dataset.counter);
			counter.classList.add('scrolling');
			trigger.classList.add('scrolling');
		} else if (trigger.classList.contains('scrolling') && desktopScroll < trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop) {
			let counter = document.getElementById(trigger.dataset.counter);
			counter.classList.remove('scrolling');
			trigger.classList.remove('scrolling');
		}

		if (!trigger.classList.contains('scrolled') && trigger.classList.contains('scrolling') && desktopScroll > trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop + (trigger.offsetHeight - window.innerHeight)) {
			let counter = document.getElementById(trigger.dataset.counter);
			counter.classList.add('scrolled');
			trigger.classList.add('scrolled');
		} else if (trigger.classList.contains('scrolled') && trigger.classList.contains('scrolling') && desktopScroll < trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop + (trigger.offsetHeight - window.innerHeight)) {
			let counter = document.getElementById(trigger.dataset.counter);
			counter.classList.remove('scrolled');
			trigger.classList.remove('scrolled');
		}
	})

	interactiveWindows.forEach(elem => {
		if (!elem.classList.contains('scrolling') && desktopScroll > elem.offsetTop + elem.parentElement.offsetTop + elem.parentElement.offsetParent.offsetTop + elem.parentElement.offsetParent.parentElement.offsetTop) {
			for (let i = 0; i < elem.children.length; i++) {
				elem.children[i].firstElementChild.classList.add('scrolling');
			}
			elem.classList.add('scrolling');
		} else if (elem.classList.contains('scrolling') && desktopScroll < elem.offsetTop + elem.parentElement.offsetTop + elem.parentElement.offsetParent.offsetTop + elem.parentElement.offsetParent.parentElement.offsetTop) {
			for (let i = 0; i < elem.children.length; i++) {
				elem.children[i].firstElementChild.classList.remove('scrolling');
			}
			elem.classList.remove('scrolling');
		}

		if (elem.classList.contains('scrolling') && !elem.classList.contains('scrolled') && desktopScroll > elem.offsetTop + elem.parentElement.offsetTop + elem.parentElement.offsetParent.offsetTop + elem.parentElement.offsetParent.parentElement.offsetTop + (elem.offsetHeight - window.innerHeight)) {
			for (let i = 0; i < elem.children.length; i++) {
				elem.children[i].firstElementChild.classList.add('scrolled');
			}
			elem.classList.add('scrolled');
		} else if (elem.classList.contains('scrolling') && elem.classList.contains('scrolled') && desktopScroll < elem.offsetTop + elem.parentElement.offsetTop + elem.parentElement.offsetParent.offsetTop + elem.parentElement.offsetParent.parentElement.offsetTop + (elem.offsetHeight - window.innerHeight)) {
			for (let i = 0; i < elem.children.length; i++) {
				elem.children[i].firstElementChild.classList.remove('scrolled');
			}
			elem.classList.remove('scrolled');
		}
	})

	interactiveItemsOne.forEach((item,index) => {
		if (!item.classList.contains('active') && index == 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			oneCount = index;
			item.classList.add('active');
		} else if (!item.classList.contains('active') && index > 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			interactiveOneCountLinks[index].classList.add('active');
			oneCount = index;
			item.classList.add('active');
		} else if (item.classList.contains('active') && index > 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			interactiveOneCountLinks[index].classList.remove('active');
			oneCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		} else if (item.classList.contains('active') && index == 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			item.firstElementChild.children[0].currentTime = '0';
			oneCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		}
	})

	interactiveItemsTwo.forEach((item,index) => {
		if (!item.classList.contains('active') && index == 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			twoCount = index;
			item.classList.add('active');
		} else if (!item.classList.contains('active') && index > 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			interactiveTwoCountLinks[index].classList.add('active');
			twoCount = index;
			item.classList.add('active');
		} else if (item.classList.contains('active') && index > 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			interactiveTwoCountLinks[index].classList.remove('active');
			twoCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		} else if (item.classList.contains('active') && index == 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			twoCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		}
	})

	interactiveItemsThree.forEach((item,index) => {
		if (!item.classList.contains('active') && index == 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			threeCount = index;
			item.classList.add('active');
		} else if (!item.classList.contains('active') && index > 0 && desktopScroll > item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			item.firstElementChild.style.opacity = '1';
			item.firstElementChild.children[0].play();
			interactiveThreeCountLinks[index].classList.add('active');
			threeCount = index;
			item.classList.add('active');
		} else if (item.classList.contains('active') && index > 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			interactiveThreeCountLinks[index].classList.remove('active');
			threeCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		} else if (item.classList.contains('active') && index == 0 && desktopScroll < item.offsetTop + item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop + item.parentElement.offsetParent.parentElement.offsetTop + item.parentElement.offsetParent.parentElement.offsetParent.offsetTop - (window.innerHeight / 1.3)) {
			function rewind() {
				item.firstElementChild.children[0].currentTime = '0';
			}
			item.firstElementChild.style.opacity = '0';
			threeCount = index;
			item.classList.remove('active');
			setTimeout(rewind, 1000);
		}
	})
}

window.addEventListener('scroll', handleScroll);

if (window.innerWidth < 900) {
	mobile = true;
	window.addEventListener('scroll', mobileScroll);
	for(let i = 0; i < swipeWindow.length; i++) {
		swipeWindow[i].addEventListener('touchstart', function(e) {
		    let touchobj = e.changedTouches[0];
		    startX = touchobj.pageX;
		    e.preventDefault();
		}, false);

		swipeWindow[i].addEventListener('touchmove', function(e){
		    e.preventDefault();
		}, false)

		swipeWindow[i].addEventListener('touchend', function(e){
			activeWindow = this;
		    let touchobj = e.changedTouches[0];
		    dist = touchobj.pageX - startX;
		    endX = touchobj.pageX;
		    if (endX > startX && Math.abs(dist) >= threshold) {
		    	handlePrev();
		    } else if (endX < startX && Math.abs(dist) >= threshold) {
		    	handleNext();  	
		    }
		    e.preventDefault();
		}, false)
	}
} else if (window.innerWidth > 900) {
	mobile = false;
	window.addEventListener('scroll', desktopScroll);
}