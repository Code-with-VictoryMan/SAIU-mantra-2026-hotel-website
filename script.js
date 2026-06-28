// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. Mobile Hamburger Navigation Logic
    // ==========================================
    
    var hamburgerMenu = document.getElementById("hamburger-menu");
    var navLinksContainer = document.querySelector(".nav-links");

    if (hamburgerMenu !== null && navLinksContainer !== null) {
        hamburgerMenu.addEventListener("click", function() {
            var isHamburgerActive = false;
            
            for (var i = 0; i < hamburgerMenu.classList.length; i++) {
                if (hamburgerMenu.classList[i] === "active") {
                    isHamburgerActive = true;
                    break;
                }
            }

            if (isHamburgerActive === true) {
                hamburgerMenu.classList.remove("active");
                navLinksContainer.classList.remove("nav-active");
            } else {
                hamburgerMenu.classList.add("active");
                navLinksContainer.classList.add("nav-active");
            }
        });
    }

    // ==========================================
    // 2. Booking Form Validation Logic
    // ==========================================
    
    var bookingForm = document.getElementById("booking-form");

    if (bookingForm !== null) {
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var formHasErrors = false;

            var nameInput = document.getElementById("guest-name");
            var emailInput = document.getElementById("guest-email");
            var checkinInput = document.getElementById("check-in");
            var checkoutInput = document.getElementById("check-out");
            var roomInput = document.getElementById("room-type");

            var nameError = document.getElementById("name-error");
            var emailError = document.getElementById("email-error");
            var checkinError = document.getElementById("checkin-error");
            var checkoutError = document.getElementById("checkout-error");
            var roomError = document.getElementById("room-error");

            var allInputs = [nameInput, emailInput, checkinInput, checkoutInput, roomInput];
            var allErrors = [nameError, emailError, checkinError, checkoutError, roomError];
            
            for (var j = 0; j < allInputs.length; j++) {
                var currentInput = allInputs[j];
                var currentError = allErrors[j];
                
                if (currentInput !== null) {
                    currentInput.classList.remove("input-error");
                }
                if (currentError !== null) {
                    currentError.textContent = "";
                }
            }

            // --- Validate Name ---
            if (nameInput.value.trim() === "") {
                nameError.textContent = "Please enter your full name.";
                nameInput.classList.add("input-error");
                formHasErrors = true;
            }

            // --- Validate Email ---
            var emailValue = emailInput.value.trim();
            var hasAtSymbol = false;
            var hasDot = false;
            
            for (var k = 0; k < emailValue.length; k++) {
                if (emailValue[k] === '@') {
                    hasAtSymbol = true;
                }
                if (emailValue[k] === '.') {
                    hasDot = true;
                }
            }

            if (emailValue === "") {
                emailError.textContent = "Please enter your email address.";
                emailInput.classList.add("input-error");
                formHasErrors = true;
            } else if (hasAtSymbol === false || hasDot === false) {
                emailError.textContent = "Please enter a valid email address.";
                emailInput.classList.add("input-error");
                formHasErrors = true;
            }

            // --- Validate Check-in Date ---
            if (checkinInput.value === "") {
                checkinError.textContent = "Please select a check-in date.";
                checkinInput.classList.add("input-error");
                formHasErrors = true;
            }

            // --- Validate Check-out Date ---
            if (checkoutInput.value === "") {
                checkoutError.textContent = "Please select a check-out date.";
                checkoutInput.classList.add("input-error");
                formHasErrors = true;
            }

            if (checkinInput.value !== "" && checkoutInput.value !== "") {
                var inDate = new Date(checkinInput.value);
                var outDate = new Date(checkoutInput.value);
                
                if (outDate <= inDate) {
                    checkoutError.textContent = "Check-out must be after check-in.";
                    checkoutInput.classList.add("input-error");
                    formHasErrors = true;
                }
            }

            // --- Validate Room Type ---
            if (roomInput.value === "") {
                roomError.textContent = "Please select a room type.";
                roomInput.classList.add("input-error");
                formHasErrors = true;
            }

            // --- Final Submission Check ---
            var successMessage = document.getElementById("form-success-message");
            
            if (formHasErrors === false) {
                successMessage.classList.remove("hidden");
                for (var m = 0; m < allInputs.length; m++) {
                    if (allInputs[m] !== null) {
                        allInputs[m].value = "";
                    }
                }
            } else {
                successMessage.classList.add("hidden");
            }
        });
    }

    // ==========================================
    // 3. Apple-Style Scroll Reveal Animations
    // ==========================================
    var revealElements = document.querySelectorAll(".reveal");
    
    // Check if IntersectionObserver is supported
    if (revealElements.length > 0 && "IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function(entries, observer) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("active");
                    // Stop observing once the element has revealed
                    observer.unobserve(entries[i].target); 
                }
            }
        }, {
            root: null,
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom
        });

        for (var j = 0; j < revealElements.length; j++) {
            revealObserver.observe(revealElements[j]);
        }
    } else {
        // Fallback for older browsers
        for (var k = 0; k < revealElements.length; k++) {
            revealElements[k].classList.add("active");
        }
    }

});
