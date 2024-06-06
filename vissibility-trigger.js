  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
  function toggleProvidersMore() {
    const desktopProviders = document.querySelectorAll('.desktop.home .providers-list a:not(:nth-child(-n + 18))');
    const mobileProviders = document.querySelectorAll('.mobile.home .providers-list a:not(:nth-child(-n + 16))');
    const button = document.querySelector('.show-more-button-switch');

    const toggleDisplay = (providers) => {
      providers.forEach(provider => {
        const currentDisplay = window.getComputedStyle(provider).getPropertyValue('display');
        provider.style.display = currentDisplay === 'none' ? 'flex' : 'none';
      });
    };

    toggleDisplay(desktopProviders);
    toggleDisplay(mobileProviders);

    button.textContent = button.textContent === 'Show More' ? 'Show Less' : 'Show More';
  }
