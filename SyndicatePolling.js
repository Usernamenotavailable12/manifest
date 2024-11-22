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

      if (result?.data?.syndicateConnection?.edges) {
        // Cache the data in sessionStorage
        sessionStorage.setItem(
          'syndicateData',
          JSON.stringify(result.data.syndicateConnection.edges)
        );

        displayData(result.data.syndicateConnection.edges);
      } else {
        console.error('Unexpected API response:', result);
        document.getElementById('syndicate-container-box').innerHTML =
          '<p>Error fetching data</p>';
      }
    } catch (error) {
      console.error('Fetch error:', error);
      document.getElementById('syndicate-container-box').innerHTML =
        '<p>Network error. Please try again later.</p>';
    }
  }

  function displayData(data) {
    // Sort data by maxWinAmount in descending order
    const sortedData = data
      .filter(edge => edge.node?.stats?.maxWinAmount != null)
      .sort((a, b) => b.node.stats.maxWinAmount - a.node.stats.maxWinAmount)
      .slice(0, 7); // Take the top 7 items

    const container = document.getElementById('syndicate-container-box');
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
    const interval = 1000; // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Run once initially
    const cachedData = sessionStorage.getItem('syndicateData');
    if (cachedData) {
      displayData(JSON.parse(cachedData));
    } else {
      fetchSyndicateData();
    }

    // Set up periodic polling
    setInterval(fetchSyndicateData, interval);
  }

  // Attach to the global `window` object to ensure availability
  window.startSyndicatePolling = startSyndicatePolling;

  // Delay the start by 3 seconds
  setTimeout(() => {
    startSyndicatePolling();
  }, 1000);
