  function toggleMapLocation() {
    var iframe = document.getElementById('mapIframe');
    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}
        document.getElementById('toggleButtonShowMore').addEventListener('click', function() {
            const button = this;
            const styleText = `.providers-list a:not(:nth-child(-n + 18)) { display: flex; }`;
            const existingStyle = document.getElementById('dynamicDisplayStyleForShowMore');

            if (!existingStyle) {
                // If style doesn't exist, add it
                const style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'dynamicDisplayStyleForShowMore';
                style.textContent = styleText;
                document.body.appendChild(style);
                button.textContent = 'Show Less';
            } else {
                // If style exists, remove it
                existingStyle.remove();
                button.textContent = 'Show More';
            }
        });
