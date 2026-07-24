const formData = new URLSearchParams(window.location.search);

document.querySelector("#fname").textContent =
    formData.get("fname") || "Not provided";

document.querySelector("#lname").textContent =
    formData.get("lname") || "Not provided";

document.querySelector("#email").textContent =
    formData.get("email") || "Not provided";

document.querySelector("#phone").textContent =
    formData.get("phone") || "Not provided";

document.querySelector("#organization").textContent =
    formData.get("organization") || "Not provided";

const timestamp = formData.get("timestamp");

if (timestamp) {
    const submittedDate = new Date(timestamp);

    document.querySelector("#timestamp").textContent =
        submittedDate.toLocaleString();
} else {
    document.querySelector("#timestamp").textContent = "Not provided";
}