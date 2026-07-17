const membersURL = "data/members.json";
const spotlightContainer = document.querySelector("#spotlights");

async function loadMemberSpotlights() {
    if (!spotlightContainer) {
        return;
    }

    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`Unable to load members.json: ${response.status}`);
        }

        const data = await response.json();

        const eligibleMembers = data.members.filter(
            member =>
                member.membershipLevel === 2 ||
                member.membershipLevel === 3
        );

        const shuffledMembers = eligibleMembers.sort(
            () => Math.random() - 0.5
        );

        const selectedMembers = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Member spotlight error:", error);

        spotlightContainer.innerHTML = `
            <p class="data-error">
                Member spotlight information is currently unavailable.
            </p>
        `;
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const membershipName =
            member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                width="120"
                height="120"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p class="membership-level">
                ${membershipName}
            </p>

            <p>${member.address}</p>

            <p>
                <a href="tel:${member.phone.replace(/[^+\d]/g, "")}">
                    ${member.phone}
                </a>
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadMemberSpotlights();