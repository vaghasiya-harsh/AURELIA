window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".header-main");

    if (window.scrollY > 200) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

});


// =========================================================
// MOBILE MENU TOGGLE
// =========================================================

const toggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("primaryNav");

toggle?.addEventListener("click", () => {

    const isOpen =
        nav.classList.toggle("is-open");

    toggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

});


// =========================================================
// DARK / LIGHT MODE
// =========================================================

const themeImage =
    document.querySelector("#theme-img");


// Dark mode default

let isDarkMode = true;


// =========================================================
// CURSOR THEME COLOR
// =========================================================

function updateCursorColor(isDark) {

    if (isDark) {

        document.documentElement.style.setProperty(
            "--cursor-color",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--cursor-border-color",
            "#ffffffbf"
        );

        document.documentElement.style.setProperty(
            "--cursor-hover-bg",
            "#ffffff0f"
        );

        document.documentElement.style.setProperty(
            "--cursor-image-bg",
            "#ffffff1a"
        );

        document.documentElement.style.setProperty(
            "--cursor-click-bg",
            "#ffffff26"
        );

    } else {

        document.documentElement.style.setProperty(
            "--cursor-color",
            "#000000"
        );

        document.documentElement.style.setProperty(
            "--cursor-border-color",
            "#000000bf"
        );

        document.documentElement.style.setProperty(
            "--cursor-hover-bg",
            "#0000000f"
        );

        document.documentElement.style.setProperty(
            "--cursor-image-bg",
            "#0000001a"
        );

        document.documentElement.style.setProperty(
            "--cursor-click-bg",
            "#00000026"
        );

    }

}


// =========================================================
// INITIAL DARK MODE
// =========================================================

document.documentElement.classList.add("dark");

document.body.removeAttribute("style");

themeImage.src =
    "right-wrapper.svg";


// IMPORTANT:
// Initial cursor = WHITE

updateCursorColor(true);


// =========================================================
// THEME TOGGLE
// =========================================================

themeImage.addEventListener(
    "click",
    () => {

        isDarkMode =
            !isDarkMode;


        // =================================================
        // DARK MODE
        // =================================================

        if (isDarkMode) {

            document.documentElement.classList.add(
                "dark"
            );

            document.body.removeAttribute(
                "style"
            );

            themeImage.src =
                "right-wrapper.svg";


            // CURSOR = WHITE

            updateCursorColor(true);


            const styleTag =
                document.getElementById(
                    "light-mode-style"
                );


            if (styleTag) {

                styleTag.remove();

            }

        }


        // =================================================
        // LIGHT MODE
        // =================================================

        else {

            document.documentElement.classList.remove(
                "dark"
            );


            document.body.setAttribute(
                "style",
                "background-color: #ffffff !important; color: #000000 !important;"
            );


            themeImage.src =
                "theme-sun.png";


            // CURSOR = BLACK

            updateCursorColor(false);


            let styleTag =
                document.getElementById(
                    "light-mode-style"
                );


            if (!styleTag) {

                styleTag =
                    document.createElement(
                        "style"
                    );


                styleTag.id =
                    "light-mode-style";


                styleTag.innerHTML = `

    body *:not(#theme-img):not(.cursor-dot):not(.cursor-outline):not(.cursor-text) {

        background-color:
            transparent !important;

        color:
            #000000 !important;

    }


                    body,
                    section,
                    main,
                    div:has(> section) {

                        background-color:
                            #ffffff !important;

                    }

                `;


                document.head.appendChild(
                    styleTag
                );

            }

        }

    }
);


// =========================================================
// SCROLL REVEAL ANIMATIONS
// =========================================================

const revealElements =
    document.querySelectorAll(
        "[data-reveal]"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    (element) => {

        observer.observe(
            element
        );

    }
);


// =========================================================
// BUTTON CLICK
// =========================================================

const button =
    document.querySelector(
        ".luxury-btn"
    );


button?.addEventListener(
    "click",
    () => {

        button.classList.add(
            "clicked"
        );

    }
);


// =========================================================
// CUSTOM CURSOR
// =========================================================

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );


const cursorOutline =
    document.querySelector(
        ".cursor-outline"
    );


const cursorText =
    document.querySelector(
        ".cursor-text"
    );


// =========================================================
// MOUSE POSITION
// =========================================================

let mouseX = 0;
let mouseY = 0;


// Outer cursor position

let outlineX = 0;
let outlineY = 0;


// =========================================================
// GET MOUSE POSITION
// =========================================================

window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


// =========================================================
// SMOOTH CURSOR ANIMATION
// =========================================================

function animateCursor() {


    // Inner dot follows mouse directly

    cursorDot.style.left =
        `${mouseX}px`;

    cursorDot.style.top =
        `${mouseY}px`;


    // Outer circle follows smoothly

    outlineX +=
        (mouseX - outlineX) * 0.15;


    outlineY +=
        (mouseY - outlineY) * 0.15;


    cursorOutline.style.left =
        `${outlineX}px`;


    cursorOutline.style.top =
        `${outlineY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


// =========================================================
// BUTTON + LINK HOVER
// =========================================================

const interactiveElements =
    document.querySelectorAll(
        "a, button"
    );


interactiveElements.forEach(
    (element) => {


        // Mouse enters

        element.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "cursor-hover"
                );

            }
        );


        // Mouse leaves

        element.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "cursor-hover"
                );

            }
        );

    }
);


// =========================================================
// IMAGE HOVER
// =========================================================

const imageElements =
    document.querySelectorAll(
        ".cursor-image"
    );


imageElements.forEach(
    (image) => {


        // Mouse enters image

        image.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "cursor-image-hover"
                );


                cursorText.textContent =
                    "VIEW";

            }
        );


        // Mouse leaves image

        image.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "cursor-image-hover"
                );


                cursorText.textContent =
                    "";

            }
        );

    }
);


// =========================================================
// CLICK EFFECT
// =========================================================

window.addEventListener(
    "mousedown",
    () => {

        cursorOutline.classList.add(
            "cursor-click"
        );

    }
);


window.addEventListener(
    "mouseup",
    () => {

        cursorOutline.classList.remove(
            "cursor-click"
        );

    }
);


// =========================================================
// TYPING TEXT ANIMATION
// =========================================================

const typingElements =
    document.querySelectorAll(
        ".typing-text"
    );


typingElements.forEach(
    (element) => {


        // Save original text

        const originalText =
            element.textContent.trim();


        // Empty text temporarily

        element.textContent =
            "";


        // Character counter

        let characterIndex =
            0;


        // Typing speed

        const typingSpeed =
            90;


        // Typing function

        function typeText() {


            if (
                characterIndex <
                originalText.length
            ) {


                element.textContent =
                    originalText.slice(
                        0,
                        characterIndex + 1
                    );


                characterIndex++;


                setTimeout(
                    typeText,
                    typingSpeed
                );

            }

        }

        // Start typing

        typeText();

    }
);
// =========================================================
// AURELIA EMAIL VALIDATION
// =========================================================

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("userEmail");

const emailField =
    document.querySelector(".email-field");

const emailMessage =
    document.getElementById("emailMessage");

const emailStatus =
    document.querySelector(".email-status");

const subscribeButton =
    document.querySelector(".Newsletter-btn a");


// Stop if email form doesn't exist

if (
    newsletterForm &&
    emailInput &&
    emailField &&
    emailMessage
) {


    // =====================================================
    // VALIDATE EMAIL
    // =====================================================

    function validateEmail(showMessage = true) {

        const email =
            emailInput.value.trim();


        // Reset browser custom validity

        emailInput.setCustomValidity("");


        // Empty email

        if (email === "") {

            emailField.classList.remove(
                "email-valid"
            );

            emailField.classList.add(
                "email-invalid"
            );


            if (showMessage) {

                emailMessage.textContent =
                    "Please enter your email address.";

                emailMessage.classList.remove(
                    "show-success"
                );

                emailMessage.classList.add(
                    "show-error"
                );

            }

            return false;

        }


        // Browser's built-in email validation

        if (!emailInput.validity.valid) {

            emailField.classList.remove(
                "email-valid"
            );

            emailField.classList.add(
                "email-invalid"
            );


            if (showMessage) {

                emailMessage.textContent =
                    "Please enter a valid email address.";

                emailMessage.classList.remove(
                    "show-success"
                );

                emailMessage.classList.add(
                    "show-error"
                );

            }

            return false;

        }


        // =================================================
        // VALID EMAIL
        // =================================================

        emailField.classList.remove(
            "email-invalid"
        );

        emailField.classList.add(
            "email-valid"
        );


        if (showMessage) {

            emailMessage.textContent =
                "Email verified. Welcome to the Aurelia Journal.";

            emailMessage.classList.remove(
                "show-error"
            );

            emailMessage.classList.add(
                "show-success"
            );

        }


        return true;

    }


    // =====================================================
    // USER TYPES
    // =====================================================

    emailInput.addEventListener(
        "input",
        () => {

            // Remove old shake

            emailField.classList.remove(
                "shake"
            );


            // Empty field

            if (
                emailInput.value.trim() === ""
            ) {

                emailField.classList.remove(
                    "email-valid",
                    "email-invalid"
                );

                emailMessage.textContent =
                    "";

                emailMessage.classList.remove(
                    "show-error",
                    "show-success"
                );

                return;

            }


            // Validate while typing

            validateEmail(true);

        }
    );


    // =====================================================
    // FOCUS
    // =====================================================

    emailInput.addEventListener(
        "focus",
        () => {

            emailField.classList.add(
                "is-focused"
            );

        }
    );


    // =====================================================
    // BLUR
    // =====================================================

    emailInput.addEventListener(
        "blur",
        () => {

            emailField.classList.remove(
                "is-focused"
            );


            if (
                emailInput.value.trim() !== ""
            ) {

                validateEmail(true);

            }

        }
    );


    // =====================================================
    // SUBMIT
    // =====================================================

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const isValid =
                validateEmail(true);


            // =============================================
            // INVALID
            // =============================================

            if (!isValid) {

                emailField.classList.remove(
                    "shake"
                );


                // Force browser to restart animation

                void emailField.offsetWidth;


                emailField.classList.add(
                    "shake"
                );


                emailInput.focus();

                return;

            }


            // =============================================
            // SUCCESS
            // =============================================

            emailField.classList.add(
                "success-pulse"
            );


            emailMessage.textContent =
                "You're on the list. Welcome to Aurelia.";


            emailMessage.classList.remove(
                "show-error"
            );

            emailMessage.classList.add(
                "show-success"
            );


            // Remove animation class later

            setTimeout(
                () => {

                    emailField.classList.remove(
                        "success-pulse"
                    );

                },
                600
            );

        }
    );


    // =====================================================
    // SUBSCRIBE LINK
    // =====================================================

    if (subscribeButton) {

        subscribeButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                newsletterForm.dispatchEvent(
                    new Event(
                        "submit",
                        {
                            bubbles: true,
                            cancelable: true
                        }
                    )
                );

            }
        );

    }

}
