
const url = "data/members.json";

const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>
            <a href="${member.website}" target="_blank">
            Visit Website
            </a>
            </p>
            <p>Membership Level: ${member.membership}</p>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

document.querySelector("#gridView").addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

document.querySelector("#listView").addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;
