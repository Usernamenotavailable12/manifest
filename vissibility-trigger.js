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
function loadYoutubeWidget() {
  // Check if the script is already present
  if (!document.querySelector("script[src='https://widgets.sociablekit.com/youtube-channel-videos/widget.js']")) {
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/youtube-channel-videos/widget.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

// Function to initialize the widget
function initializeWidget() {
  const widgetDiv = document.querySelector('.sk-ww-youtube-channel-videos');
  if (widgetDiv) {
    // Re-initialize or trigger the widget to load
    widgetDiv.innerHTML = ''; // Clear existing content
    widgetDiv.setAttribute('data-embed-id', '25474166'); // Re-set the embed ID if needed
    loadYoutubeWidget(); // Load the widget script
  }
}

// Load the widget on page load
window.addEventListener('load', initializeWidget);

// Re-load the widget when navigating back using the browser's history
window.addEventListener('popstate', initializeWidget);
