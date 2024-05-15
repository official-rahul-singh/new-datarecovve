// menu start
let headerUl = document.querySelector('header nav');

function toggleButtons() {
  let header = document.querySelector("header");
  headerUl.classList.toggle("show-ul");
let cancel_btn= document.querySelector(".cancel-btn");

  if (!headerUl.classList.contains("show-ul")) {
    document.querySelector('.doc-overlay').remove();
    enableScroll();
  } else {
    let docOverlayDiv = document.createElement('div');
    header.appendChild(docOverlayDiv);
    docOverlayDiv.classList.add('doc-overlay');
    disableScroll();
    cancel_btn.style.display="block";

    docOverlayDiv.addEventListener('click', function (event) {
      headerUl.classList.remove("show-ul");
      docOverlayDiv.remove();
      enableScroll();
    });
  }
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}
// menu end

// mobile Dropdown  ============ start =====>
const navDropdowns = document.querySelectorAll(".dropdown");
navDropdowns.forEach((parentDropdown) => {
parentDropdown.addEventListener("click", function (e) {
this.classList.toggle("showMenu");
});

const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
subDropdowns.forEach((subDropdown) => {
subDropdown.addEventListener("click", function (event) {
   event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
});
});
});

// Add a click event listener to the document to close dropdowns when clicking outside
document.addEventListener("click", (e) => {
navDropdowns.forEach((dropdown) => {
if (!dropdown.contains(e.target)) {
   dropdown.classList.remove("showMenu");
}
});
});
// mobile Dropdown  ============ end =====>


// section2 number counter start =====>
// function createCounter(id, maxCount) {
//   let count = 0;
//   let interval = setInterval(() => {
//       let countElement = document.getElementById(id);
//       if (!countElement) {
//           console.error("Counter element with ID '" + id + "' not found.");
//           clearInterval(interval);
//           return;
//       }
//       countElement.innerHTML = ++count;
//       if (count === maxCount) {
//           clearInterval(interval);
//       }
//   }, 10);
// }

// // Create and start multiple counters
// createCounter("counter1", 90);
// createCounter("counter2", 120);
// createCounter("counter3", 60);
// createCounter("counter4", 3);

function createMultipleCounters(counterData) {
  counterData.forEach(data => {
    createCounter(data.id, data.maxCount);
  });
}

function createCounter(id, maxCount) {
  let count = 0;
  let interval = setInterval(() => {
      let countElement = document.getElementById(id);
      if (!countElement) {
          console.error("Counter element with ID '" + id + "' not found.");
          clearInterval(interval);
          return;
      }
      countElement.innerHTML = ++count;
      if (count === maxCount) {
          clearInterval(interval);
      }
  }, 10);
}

// Define the data for multiple counters
const counters = [
  { id: "counter1", maxCount: 90 },
  { id: "counter2", maxCount: 100 },
  { id: "counter3", maxCount: 60 },
  { id: "counter4", maxCount: 3 }
];
// second
const counter2 = [
  { id: "counter5", maxCount: 300 },
  { id: "counter6", maxCount: 300 },
  { id: "counter7", maxCount: 300 },
  { id: "counter8", maxCount: 300 }
];

// Call createMultipleCounters function with the counter data
createMultipleCounters(counters);
createMultipleCounters(counter2);

// section2 number counter end =======>

// testimonial slider START========
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slide-button");
  const sliderScrollbar = document.querySelector(".slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

  // const handleSlideButtons = () => {
  //     slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
  //     slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  // }

  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      // handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
// testimonial slider END========

// menu search ==== START==>
const searchIcon = document.querySelector(".search-btn");
const searchOverlay = document.querySelector(".search-overlay");
const closebtn = document.querySelector(".closebtn");
searchIcon.addEventListener("click", function () {
    searchOverlay.classList.add("search-bar-show");
});
closebtn.addEventListener("click", function () {
  searchOverlay.classList.remove("search-bar-show");
});
// menu search ==== END==>

let calcScrollValue = () => {
let scrollProgress = document.getElementById("progress");
let progressValue = document.getElementById("progress-value");
let pos = document.documentElement.scrollTop;
let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
let scrollValue = Math.round((pos * 100) / calcHeight);
if (pos > 100) {
    scrollProgress.style.display = "grid";
} else {
    scrollProgress.style.display = "none";
}
scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});
scrollProgress.style.background = `conic-gradient(#242627 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// header-scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
	let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
	if (currentScroll > lastScrollTop) {
		// Scrolling down
		document.querySelector('header').style.top = '-70px'; // Hide header
	} else {
		// Scrolling up
		document.querySelector('header').style.top = '0'; // Show header
	}
	lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
// header scroll end

  