const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.modal);

        if (dialog) {
            dialog.showModal();
        }
    });
});