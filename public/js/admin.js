document.addEventListener("DOMContentLoaded", function () {
    // Approve item report
    document.querySelectorAll(".approve-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id;
            alert(`Item ${itemId} approved!`);
            this.closest(".admin-item").classList.add("approved");
        });
    });

    // Reject item report
    document.querySelectorAll(".reject-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id;
            alert(`Item ${itemId} rejected.`);
            this.closest(".admin-item").remove();
        });
    });
});
