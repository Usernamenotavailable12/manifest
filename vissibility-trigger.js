  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
let currentIndex = 1; // Start with the first iframe
let slideInterval;

function showNextSlide() {
  const iframesJp = [
    document.getElementById('iframe2Amusnet'),
    document.getElementById('iframe3New'),
    document.getElementById('iframe1Digital')
  ];

  // Hide all iframes first
  iframesJp.forEach(iframe => iframe.style.display = 'none');

  // Show the next iframe
  currentIndex = (currentIndex + 1) % iframesJp.length;
  iframesJp[currentIndex].style.display = 'block';

  resetInterval();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(showNextSlide, 16000);
}

window.showNextSlide = showNextSlide;

// Initial setup to ensure only the first iframe is visible
document.addEventListener('DOMContentLoaded', () => {
  const iframesJp = [
    document.getElementById('iframe2Amusnet'),
    document.getElementById('iframe3New'),
    document.getElementById('iframe1Digital')
  ];

  iframesJp.forEach((iframe, index) => {
    iframe.style.display = index === 0 ? 'block' : 'none';
  });

  resetInterval();
});

// Function to load the YouTube widget script
function loadYouTubeWidget() {
  // Remove the existing script tag if it exists
  const existingScript = document.querySelector("script[src='https://widgets.sociablekit.com/youtube-channel-videos/widget.js']");
  if (existingScript) {
    existingScript.remove();
  }

  // Create a new script tag
  const script = document.createElement("script");
  script.src = 'https://widgets.sociablekit.com/youtube-channel-videos/widget.js';
  script.async = true;
  script.defer = true;

  // Append the new script tag to the body
  document.body.appendChild(script);
}

// Set up the popstate event listener
window.addEventListener('popstate', () => {
  // Reload the script when the user navigates back
  loadYouTubeWidget();
});

// Initial load of the script
loadYouTubeWidget();
