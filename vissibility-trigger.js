          function toggleMapLocation() {
      var iframe = document.getElementById('mapIframe');
      if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
      } else {
        iframe.style.display = 'none';
      }
    }
        window.onload = function() {
            const bat = document.getElementById('bat');
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            function getRandomPosition() {
                const x = Math.random() * (containerWidth - 100); // Subtracting 100 to ensure bat stays within the screen
                const y = Math.random() * (containerHeight - 100); // Subtracting 100 to ensure bat stays within the screen
                return { x, y };
            }

            function flyToRandomPosition() {
                const newPosition = getRandomPosition();
                bat.style.transition = 'transform 5s ease';
                bat.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px) rotate(0deg)`;

                setTimeout(flyToRandomPosition, Math.random() * 5000 + 9000); // Random delay between 2s to 7s
            }

            flyToRandomPosition();
        };
