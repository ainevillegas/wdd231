
const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {

    const response = await fetch("data/members.json");
    const members = await response.json();

    const qualifiedMembers = members.filter(member =>
        member.membership === "Gold" ||
        member.membership === "Silver"
    );

    qualifiedMembers.sort(() => Math.random() - 0.5);

    const spotlights = qualifiedMembers.slice(0, 3);

    displaySpotlights(spotlights);
}

function displaySpotlights(members) {

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.name}</h3>
            }"
                 alt="${member.name} logo"
                 loading="lazy">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p>Membership: ${member.membership}</p>
            ${member.website}">
                Visit Website
            </a>
        `;

        spotlightContainer.appendChild(card);

    });
}

getSpotlights();
