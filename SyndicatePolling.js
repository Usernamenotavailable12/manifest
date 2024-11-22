async function fetchSyndicateData() {
  const query = `
    query SyndicateConnection {
      syndicateConnection(brandId: "ab") {
        edges {
          node {
            name
            imageRef
            stats {
              numberOfFinishedSessions
              maxWinAmount
              maxParticipants
              maxResultAmount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api-tma1-prd.themill.tech/gql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    const container = document.getElementById('syndicate-container-box');
    if (!container) {
      // If the element doesn't exist, stop execution
      return;
    }

    if (result?.data?.syndicateConnection?.edges) {
      // Cache the data in sessionStorage
      sessionStorage.setItem(
        'syndicateData',
        JSON.stringify(result.data.syndicateConnection.edges)
      );
    } else {
      console.error('Unexpected API response:', result);
      if (container) container.innerHTML = '<p>Error fetching data</p>';
    }
  } catch (error) {
    const container = document.getElementById('syndicate-container-box');
    if (container) {
      container.innerHTML = '<p>Network error. Please try again later.</p>';
    }
    console.error('Fetch error:', error);
  }
}

function displayData(data) {
  const container = document.getElementById('syndicate-container-box');
  if (!container) {
    // If the element doesn't exist, stop execution
    return;
  }

  // Sort data by maxWinAmount in descending order
  const sortedData = data
    .filter(edge => edge.node?.stats?.maxWinAmount != null)
    .sort((a, b) => b.node.stats.maxWinAmount - a.node.stats.maxWinAmount)
    .slice(0, 7); // Take the top 7 items

  container.innerHTML = sortedData
    .map(edge => {
      if (!edge.node) return '<div>Data not available</div>';
      const { name, imageRef, stats } = edge.node;
      return `
        <div style="--syndicate-background-image: url('${imageRef}');" class="syndicate-box">
          <div 
            class="syndicate-header-box" 
            style="--syndicate-background-image: url('${imageRef}');">
          </div>
          <h3 class="syndicateIdentityName">${name || 'No Name'}</h3>
          <p class="maxWinAmount">${stats?.maxWinAmount != null
            ? stats.maxWinAmount.toLocaleString()
            : 'N/A'
          } ₾</p>
          <p style="display: none" class="maxResultAmount">${stats?.maxResultAmount ?? 'N/A'
          } ₾</p>
        </div>
      `;
    })
    .join('');
}

function startSyndicatePolling() {
  const gqlFetchInterval = 30000; // 30 seconds
  const displayInterval = 1000; // 1 second

  // Fetch new data from the API every 30 seconds
  fetchSyndicateData(); // Run once immediately
  setInterval(fetchSyndicateData, gqlFetchInterval);

  // Refresh display from cached data every 1 second
  setInterval(() => {
    const cachedData = sessionStorage.getItem('syndicateData');
    if (cachedData) {
      displayData(JSON.parse(cachedData));
    }
  }, displayInterval);
}

// Attach to the global `window` object to ensure availability
window.startSyndicatePolling = startSyndicatePolling;

// Start polling with a 3-second delay
setTimeout(() => {
  startSyndicatePolling();
}, 3000);
