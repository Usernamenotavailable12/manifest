  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
        function toggleProvidersMore() {
            const providers = document.querySelectorAll('.providers-list a:not(:nth-child(-n + 18))');
            const button = document.querySelector('.show-more-button-swich');

            providers.forEach(provider => {
                const currentDisplay = window.getComputedStyle(provider).getPropertyValue('display');
                provider.style.display = currentDisplay === 'none' ? 'flex' : 'none';
            });

            button.textContent = button.textContent === 'Show More' ? 'Show Less' : 'Show More';
        }
