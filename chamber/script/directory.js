
const url = "data/members.json";
const container = document.querySelector("#members");

// FETCH DATA (async/await ✅)
async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership}</p>
        `;

        container.appendChild(card);
    });
}

getMembers();

// ✅ GRID / LIST TOGGLE
document.getElementById("gridView").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

document.getElementById("listView").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// ✅ MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// ✅ FOOTER DATES
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;