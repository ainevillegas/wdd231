const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const openModalButtons = document.querySelectorAll(
    ".membership-card button[data-modal]"
);

openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const dialog = document.getElementById(modalId);

        if (dialog) {
            dialog.showModal();
        }
    });
});

const closeModalButtons = document.querySelectorAll(".close-modal");

closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const dialog = document.getElementById(modalId);

        if (dialog) {
            dialog.close();
        }
    });
});

const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});