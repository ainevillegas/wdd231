const timestampField = document.getElementById("timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = event.target.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});