  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
  function toggleProviders() {
      const providers = document.querySelectorAll('.providers-list a:not(:nth-child(-n + 18))');
      if (providers.length === 0) {
          console.error('No providers found');
          return;
      }

      const firstProvider = providers[0];
      const isHidden = getComputedStyle(firstProvider).display === 'none';

      providers.forEach(provider => {
          provider.style.display = isHidden ? 'flex' : 'none';
      });

      const button = document.getElementById('toggleButtonShowMore');
      button.textContent = isHidden ? 'Show Less' : 'Show More';
  }

  document.addEventListener('DOMContentLoaded', function() {
      const button = document.getElementById('toggleButtonShowMore');
      button.addEventListener('click', toggleProviders);
  });
