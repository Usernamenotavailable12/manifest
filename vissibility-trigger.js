  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
  document.getElementById('toggleButtonShowMore').addEventListener('click', function() {
      const providers = document.querySelectorAll('.providers-list a:not(:nth-child(-n + 18))');
      const isHidden = providers[0].style.display === 'none' || providers[0].style.display === '';

      if (isHidden) {
          providers.forEach(provider => {
              provider.style.display = 'flex';
          });
          this.textContent = 'Show Less';
      } else {
          providers.forEach(provider => {
              provider.style.display = 'none';
          });
          this.textContent = 'Show More';
      }
  });
