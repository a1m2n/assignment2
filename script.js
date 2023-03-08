const panels = document.querySelectorAll('.panel');

function setActivePanel() {
  const scrollPosition = window.scrollY;

  panels.forEach((panel) => {
    const panelTop = panel.offsetTop;
    const panelBottom = panelTop + panel.offsetHeight;

    if (scrollPosition >= panelTop && scrollPosition < panelBottom) {
      panel.classList.add('active');

      // Get the first image element inside the active panel
      const activeImage = panel.querySelector('img');
      if (activeImage) {
        // Create an Audio object and set its source to the src attribute of the image
        const audio = new Audio(activeImage.src);
        // Play the audio
        audio.play();
      }
    } else {
      panel.classList.remove('active');

      // Pause the audio when the panel is inactive
      const audio = panel.querySelector('audio');
      if (audio) {
        audio.pause();
      }
    }
  });
}




//animate the scrolling between the panels
function scrollToNextPanel(event) {
  event.preventDefault();

  const currentPanel = event.currentTarget.closest('.panel');
  const nextPanel = currentPanel.nextElementSibling;

  if (nextPanel) {
    nextPanel.scrollIntoView({ behavior: 'smooth' });
  }
}

panels.forEach((panel) => {
  const images = panel.querySelectorAll('img');

  images.forEach((image) => {
    image.addEventListener('click', scrollToNextPanel);
  });
});


// Randomly change color of header text
const headerText = document.querySelector('.header');
const colors = ['#FF7F50', '#DC143C', '#00CED1', '#FFD700', '#8B008B'];
setInterval(() => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  headerText.style.color = randomColor;
}, 1000);

// Add bouncy text effect to header
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

//remove the arrow when you get to the end of the webpage
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
