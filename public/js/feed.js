document.addEventListener("DOMContentLoaded", function () {
    // Claim an item
    document.querySelectorAll(".claim").forEach(button => {
        button.addEventListener("click", function () {
            if (!this.classList.contains("claimed")) {
                this.classList.add("claimed");
                this.textContent = "Claimed";
                this.style.backgroundColor = "gray";
                alert("Claim request sent!");
            }
        });
    });

    // Toggle Found/Lost Status
    document.querySelectorAll(".status").forEach(button => {
        button.addEventListener("click", function () {
            if (this.classList.contains("found")) {
                this.classList.remove("found");
                this.classList.add("lost");
                this.textContent = "Lost";
                this.style.backgroundColor = "red";
            } else {
                this.classList.remove("lost");
                this.classList.add("found");
                this.textContent = "Found";
                this.style.backgroundColor = "green";
            }
        });
    });
});
