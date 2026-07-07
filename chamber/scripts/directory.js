const membersContainer = document.querySelector("#membersContainer");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Failed to load members.json");
        }

        const data = await response.json();
        displayMembers(data.members);

    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p>Membership Level: ${member.level}</p>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

document.querySelector("#gridBtn").addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

document.querySelector("#listBtn").addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});