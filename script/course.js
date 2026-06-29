
const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Web Frontend Dev", credits: 3, completed: false },
    { code: "CSE110", name: "Intro Programming", credits: 3, completed: true },
    { code: "CSE210", name: "Programming w/ Classes", credits: 3, completed: false }
];

const container = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

// DISPLAY COURSES
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

// FILTERS
function showAll() {
    displayCourses(courses);
}

function showWDD() {
    displayCourses(courses.filter(c => c.code.startsWith("WDD")));
}

function showCSE() {
    displayCourses(courses.filter(c => c.code.startsWith("CSE")));
}

// INITIAL LOAD
displayCourses(courses);
