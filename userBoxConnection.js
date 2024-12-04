    const API_URL = "https://www.ambassadoribet.com/_internal/gql";
    const BRAND_ID = "ab";
    let rewardTimeout;

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(row => row.trim().startsWith(name + '='));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    }

    function extractAuthDataFromCookie() {
        const auth = getCookie('auth');
        if (!auth) {
            console.error("auth cookie not found.");
            return null;
        }
        try {
            const decodedAuth = decodeURIComponent(auth);
            const authData = JSON.parse(decodedAuth);
            return { userId: authData.userId, accessToken: authData.accessToken };
        } catch (error) {
            console.error("Error parsing auth cookie:", error);
            return null;
        }
    }

    async function fetchGraphQL(query, variables) {
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

    async function fetchActiveUserBoxes() {
        const authData = extractAuthDataFromCookie();
        if (!authData) {
            throw new Error("Unable to retrieve user data.");
        }

        const query = `
            query UserBoxConnection($userId: ID, $brandId: ID!) {
                userBoxConnection(userId: $userId, brandId: $brandId) {
                    edges {
                        node {
                            userBoxId
                            status
                        }
                    }
                }
            }
        `;
        const data = await fetchGraphQL(query, { userId: authData.userId, brandId: BRAND_ID });
        return data.data.userBoxConnection.edges
            .map(edge => edge.node)
            .filter(box => box.status === "ACTIVE");
    }

    async function fetchBoxDetails(userBoxId) {
        const query = `
            query UserBox($userBoxId: ID!) {
                userBox(userBoxId: $userBoxId) {
                    box {
                        name
                        description
                        type
                    }
                }
            }
        `;
        const data = await fetchGraphQL(query, { userBoxId });
        return data.data.userBox;
    }

    async function openBox(userBoxId) {
        const mutation = `
            mutation OpenUserBox($input: OpenUserBoxInput!) {
                openUserBox(input: $input) {
                    userBox {
                        reward {
                            action {
                                ... on GiveBonusAction {
                                    bonus {
                                        name
                                        description
                                    }
                                }
                                ... on GiveAndActivateBonusAction {
                                    bonus {
                                        name
                                        description
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const data = await fetchGraphQL(mutation, { input: { userBoxId } });
        return data.data.openUserBox.userBox.reward.action.map(action => action.bonus);
    }

    async function initialize() {
        clearRewards();
        const activeBoxes = await fetchActiveUserBoxes();
        const boxesContainer = document.getElementById("boxes");
        boxesContainer.innerHTML = "";

        for (const box of activeBoxes) {
            const boxDetails = await fetchBoxDetails(box.userBoxId);
            const boxElement = document.createElement("div");
            boxElement.className = `box ${getBoxTypeClass(boxDetails.box.type)}`;
            boxElement.innerHTML = `
                <h3>${boxDetails.box.name}</h3>
                <p>${boxDetails.box.description}</p>
                <button class="button reward-button-title" onclick="handleOpenBox('${box.userBoxId}', this)"></button>
            `;
            boxesContainer.appendChild(boxElement);
        }
    }

    function getBoxTypeClass(type) {
        switch (type) {
            case "LOOT_BOX": return "loot-box";
            case "MYSTERY_BOX": return "mystery-box";
            case "WHEEL_OF_FORTUNE": return "wheel-of-fortune";
            default: return "";
        }
    }

    async function handleOpenBox(userBoxId, button) {
        button.disabled = true;
        button.innerText = "......";
        const rewards = await openBox(userBoxId);
        displayRewards(rewards);
        button.closest(".box").remove();
    }

    function displayRewards(rewards) {
        clearRewards();
        const rewardsContainer = document.getElementById("rewards");
        for (const reward of rewards) {
            const rewardElement = document.createElement("div");
            rewardElement.className = "reward-item";
            rewardElement.innerHTML = `
                <p class="reward-title"></p><strong>${reward.name}</strong>
                <p class="reward-description"></p><p>${reward.description || "No description provided"}</p>
            `;
            rewardsContainer.appendChild(rewardElement);
        }
        rewardTimeout = setTimeout(clearRewards, 4000);
    }

    function clearRewards() {
        clearTimeout(rewardTimeout);
        document.getElementById("rewards").innerHTML = "";
    }

    function clearBoxes() {
        const boxesElement = document.getElementById('boxes');
        if (boxesElement) {
            boxesElement.innerHTML = ''; 
        }
    }
