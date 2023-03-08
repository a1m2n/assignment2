// Get all the panels on the page
const panels = document.querySelectorAll('.panel');

// Set the active panel based on scroll position
function setActivePanel() {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Loop through each panel
  panels.forEach((panel) => {
    // Get the top and bottom positions of the panel
    const panelTop = panel.offsetTop;
    const panelBottom = panelTop + panel.offsetHeight;

    // If the scroll position is within the panel, add the 'active' class
    if (scrollPosition >= panelTop && scrollPosition < panelBottom) {
      panel.classList.add('active');

      // Get the first image element inside the active panel
      const activeImage = panel.querySelector('img');
      if (activeImage) {
        // Create an Audio object and set its source to the src attribute of the image
        const firstImage = panel.querySelector('img');
        if (!firstImage.dataset.played) {
        const sound = new Audio(firstImage.dataset.sound);
        sound.play();
        firstImage.dataset.played = true;
      }
      }
    } else {
      // If the scroll position is outside the panel, remove the 'active' class
      panel.classList.remove('active');
    }
  });
}

// Function to animate scrolling between panels
function scrollToNextPanel(event) {
  // Prevent the default behavior of clicking on an image
  event.preventDefault();

  // Find the current panel and the next panel
  const currentPanel = event.currentTarget.closest('.panel');
  const nextPanel = currentPanel.nextElementSibling;

  // If there is a next panel, scroll to it
  if (nextPanel) {
    nextPanel.scrollIntoView({ behavior: 'smooth' });
  }
}

// Loop through each panel and add a click event listener to its images
panels.forEach((panel) => {
  const images = panel.querySelectorAll('img');
  images.forEach((image) => {
    image.addEventListener('click', scrollToNextPanel);
  });
});

// Randomly change the color of the header text every second
const headerText = document.querySelector('.header');
const colors = ['#FF7F50', '#DC143C', '#00CED1', '#FFD700', '#8B008B'];
setInterval(() => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  headerText.style.color = randomColor;
}, 1000);

// Add a bouncy text effect to each word in the header
const words = headerText.innerText.split(' ');
headerText.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
const spans = document.querySelectorAll('.header span');
spans.forEach(span => {
  span.addEventListener('mouseover', function(e) {
    span.classList.add('animated', 'bounce');
  });
  span.addEventListener('animationend', function(e) {
    span.classList.remove('animated', 'bounce');
  });
});

// Remove the arrow when the user reaches the bottom of the page
$(document).ready(function() {

  // Add a click event listener to the arrow
  $('.arrow-container').click(function() {
    // Animate the page scrolling down to the first panel
    $('html, body').animate({
      scrollTop: $('.panel1').offset().top
    }, 1000);
  });

  // Check if the user has scrolled to the bottom of the page
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      // If at the bottom, hide the arrow
      $('.arrow-container').fadeOut();
    } else {
      // If not at the bottom, show the arrow
      $('.arrow-container').fadeIn();
    }
  });
});



// button to go to the top of the webpage
const scrollToTopButton = document.getElementById('scroll-to-top');

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
 setTimeout(() => {
   location.reload();
  }, 1000);
});


//displaying three images on one panel and controlling the display with arrow keys
panels.forEach(panel => {
  let images = panel.querySelectorAll('img');
  let activeIndex = 0;

  images.forEach(image => {
    image.classList.remove('active', 'prev', 'next');
    let soundSrc = image.getAttribute('data-sound');
    if (soundSrc) {
      let audio = document.createElement('audio');
      audio.src = soundSrc;
      image.parentNode.insertBefore(audio, image.nextSibling);
    }
  });

  images[activeIndex].classList.add('active');

  function showImage(index) {
    images[activeIndex].classList.remove('active');
    images[index].classList.add('active');

    if (index > activeIndex) {
      images[activeIndex].classList.add('prev');
      images[index].classList.remove('next');
    } else {
      images[activeIndex].classList.add('next');
      images[index].classList.remove('prev');
    }

    activeIndex = index;

    // Play sound
    images.forEach((image, index) => {
      let audio = image.nextSibling;
      if (index === activeIndex && audio && audio.tagName === 'AUDIO') {
        audio.currentTime = 0;
        audio.play();
      } else if (audio && audio.tagName === 'AUDIO') {
        audio.pause();
        audio.currentTime = 0;
      }
    });

  }

  document.addEventListener('keydown', event => {
    if(panel.classList.contains('active')){
      if (event.key === 'ArrowRight') {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= images.length) {
        }else{
          showImage(nextIndex);
        }
      } else if (event.key === 'ArrowLeft') {
        let prevIndex = activeIndex - 1;
        if (prevIndex < 0) {
        }else{
          showImage(prevIndex);
        }
      } 
    }
  });
});





window.addEventListener('scroll', setActivePanel); 
