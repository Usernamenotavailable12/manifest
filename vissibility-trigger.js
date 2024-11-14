      function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
let currentIndex = 0; // Start with the first iframe
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
