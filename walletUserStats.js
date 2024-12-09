    async function fetchGraphQLBet(query, variables) {
        const authData = extractAuthDataFromCookie();
        if (!authData) {
            throw new Error("Unable to retrieve authorization data.");
        }
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData.accessToken}`,
            },
            body: JSON.stringify({ query, variables }),
        });
        return response.json();
    }

    function calculateTimeInterval() {
        const now = new Date();
        const utcOffset = 4; // UTC +4 timezone
        now.setUTCHours(now.getUTCHours() + utcOffset);

        const startOfDay = new Date(now);
        startOfDay.setHours(now.getHours() < 12 ? 0 : 12, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(startOfDay.getHours() + 12);

        return {
            from: startOfDay.toISOString(),
            to: endOfDay.toISOString()
        };
    }

    async function showBetProgress() {
        const timeInterval = calculateTimeInterval();
        const authData = extractAuthDataFromCookie();

        if (!authData) {
            alert("Authorization data is missing.");
            return;
        }

        const query = `
                query WalletUserStats($userId: ID!) {
                    walletUserStats(userId: $userId, from: "${timeInterval.from}", to: "${timeInterval.to}") {
                        totalRealBet
                    }
                }
            `;

        try {
            const result = await fetchGraphQLBet(query, { userId: authData.userId });
            const totalRealBet = result.data.walletUserStats.totalRealBet || 0;

            displayProgressBar(totalRealBet);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch progress data.");
        }
    }

    function displayProgressBar(totalRealBet) {
        const progressBarContainer = document.getElementById("progressBarContainer");
        const progress = document.getElementById("progress");
        const milestones = document.getElementById("milestones");
        const progressInfo = document.getElementById("progressInfo");

        progressBarContainer.style.display = "block";
        progressInfo.style.display = "block";

        const percentage = Math.min((totalRealBet / 20000) * 100, 100).toFixed(2);
        progress.style.width = `${percentage}%`;
        progress.textContent = `${percentage}%`;

        progressInfo.textContent = `${totalRealBet}/20000`;

        milestones.innerHTML = "";

        for (let milestone = 1000; milestone <= 20000; milestone += 1000) {
            const milestonePosition = (milestone / 20000) * 100;
            const milestoneDiv = document.createElement("div");
            milestoneDiv.className = "milestone";
            milestoneDiv.style.left = `${milestonePosition}%`;

            const label = document.createElement("div");
            label.className = "milestone-label";
            label.style.left = `${milestonePosition}%`;

            if (milestone % 2000 === 0) {
                label.classList.add("active");
                label.textContent = milestone;
            }

            milestones.appendChild(milestoneDiv);
            milestones.appendChild(label);
        }
    }
