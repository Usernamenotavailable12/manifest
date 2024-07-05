  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
  let currentIndex = 1;
  let slideInterval;

  function showNextSlide() {
    const iframesJp = [
      document.getElementById('iframe1Digital'),
      document.getElementById('iframe2Amusnet'),
      document.getElementById('iframe3New')
    ];

    iframesJp[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % iframesJp.length;
    iframesJp[currentIndex].style.display = 'block';

    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(showNextSlide, 16000);
  }

  window.showNextSlide = showNextSlide;

  resetInterval();
