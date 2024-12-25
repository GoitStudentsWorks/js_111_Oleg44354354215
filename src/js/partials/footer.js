document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".footer-form");
    const modal = document.querySelector(".footer-modal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay);
    modalOverlay.appendChild(modal);

    const emailInput = document.getElementById("email");
    const commentInput = document.getElementById("comment");
    const modalCloseButton = document.querySelector(".modal-btn");
    let isModalOpen = false;

    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Success!";
    emailInput.parentNode.insertBefore(successMessage, emailInput.nextSibling);

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = "Invalid email, try again";
    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);

    function closeModal() { 
        modal.style.display = "none";
        modalOverlay.style.display = "none"; 
        isModalOpen = false;
    }
    
    closeModal();

    function showModal(message) {
        if (!isModalOpen) {
            modal.style.display = "flex";
            modalOverlay.style.display = "flex";
            isModalOpen = true;
        }
        document.querySelector(".modal-message").innerText = message;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailValue = emailInput.value;
        const commentValue = commentInput.value;

        if (validateEmail(emailValue)) {
            fakeBackendRequest(emailValue, commentValue)
                .then(response => {
                    showModal("Success");
                })
                .catch(error => {
                    showModal("Error");
                });
        } else {
            showModal("Invalid email");
        }
    });

    modalCloseButton.addEventListener("click", function() {
        closeModal();
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && isModalOpen) {
            closeModal();
        }
    });

    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function fakeBackendRequest(email, comment) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    resolve("Success");
                } else {
                    reject("Error");
                }
            }, 1000);
        });
    }
    
    emailInput.addEventListener("input", function() {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.add("success");
            emailInput.classList.remove("error");
            successMessage.style.display = "block";
            errorMessage.style.display = "none";
        } else {
            emailInput.classList.add("error");
            emailInput.classList.remove("success");
            successMessage.style.display = "none";
            errorMessage.style.display = "block";
        }
    });
});
