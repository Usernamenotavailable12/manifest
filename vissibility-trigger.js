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
    const searchText = "3H05RomL1m5Ad9B9XLSK";

    function checkForText() {
        const htmlContent = document.body.innerHTML;
        if (htmlContent.includes(searchText)) {
            document.body.classList.add("maintenance-popout");
        } else {
            document.body.classList.remove("maintenance-popout");
        }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(checkForText);

    // Start observing the target node for configured mutations
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // Initial check
    checkForText();
