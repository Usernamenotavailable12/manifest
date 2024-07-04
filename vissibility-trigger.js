  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
  let currentIndex = 0;

function showNextSlide() {
  const iframesJp = [
    document.getElementById('iframe1Digital'),
    document.getElementById('iframe2Amusnet')
  ];

  iframesJp[currentIndex].style.display = 'none';
  currentIndex = 1 - currentIndex; 
  iframesJp[currentIndex].style.display = 'block';
}

window.showNextSlide = showNextSlide;

setInterval(showNextSlide, 17000);
