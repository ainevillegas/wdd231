
const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Web Frontend Development", credits: 3, completed: false },
    { code: "CSE110", name: "Introduction to Programming", credits: 3, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 3, completed: false }
];

// DOM REFERENCES
const container = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

// ✅ FILTER BUTTONS (NO onclick in HTML)
const allBtn = document.getElementById("allBtn");
const wddBtn = document.getElementById("wddBtn");
const cseBtn = document.getElementById("cseBtn");

// DISPLAY FUNCTION
function displayCourses(courseList) {
    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;

        container.appendChild(card);
    });

    // TOTAL CREDITS
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = "Total Credits: " + total;
}

// FILTER EVENTS
allBtn.addEventListener("click", () => displayCourses(courses));

wddBtn.addEventListener("click", () => {
    const filtered = courses.filter(course => course.code.startsWith("WDD"));
    displayCourses(filtered);
});

cseBtn.addEventListener("click", () => {
    const filtered = courses.filter(course => course.code.startsWith("CSE"));
    displayCourses(filtered);
});

// INITIAL LOAD
displayCourses(courses);
