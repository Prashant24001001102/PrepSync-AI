const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "") {

        formMessage.textContent = "Please enter your name.";
        formMessage.style.color = "#ff6b6b";

        return;
    }

    if (email === "") {

        formMessage.textContent = "Please enter your email.";
        formMessage.style.color = "#ff6b6b";

        return;
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent =
        "Please enter a valid email address.";

        formMessage.style.color = "#ff6b6b";

        return;
    }

    if (message === "") {

        formMessage.textContent =
        "Please enter your message.";

        formMessage.style.color = "#ff6b6b";

        return;
    }

    formMessage.textContent =
    "Message sent successfully!";

    formMessage.style.color = "#00ff99";

    form.reset();

});