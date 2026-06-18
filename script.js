const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const formMessage = document.getElementById("formMessage");

if (form) {
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
      const submissions =
    JSON.parse(localStorage.getItem("contacts")) || [];

submissions.push({
    name,
    email,
    subject,
    message,
    time: new Date().toLocaleString()
});

localStorage.setItem(
    "contacts",
    JSON.stringify(submissions)
);
console.log(localStorage.getItem("contacts"));
console.log("Saving to localStorage...");
console.log(name, email, subject, message);
    form.reset();

});
}
// DISPLAY SUBMISSIONS PAGE

const submissionsContainer = document.getElementById("submissionsContainer");

if (submissionsContainer) {

    const submissions =
        JSON.parse(localStorage.getItem("contacts")) || [];

    document.getElementById("totalMessages").textContent =
        submissions.length;

    if (submissions.length === 0) {

        submissionsContainer.innerHTML = `
            <div class="submission-card">
                <h3>No Submissions Yet</h3>
                <p>Contact form messages will appear here.</p>
            </div>
        `;

    } else {

       submissions.forEach((submission, index) => {

           submissionsContainer.innerHTML += `
    <div class="submission-card">
        <h3>${submission.name}</h3>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Subject:</strong> ${submission.subject}</p>
        <p><strong>Message:</strong> ${submission.message}</p>
        <p><strong>Submitted:</strong> ${submission.time}</p>

        <button class="delete-btn"
        onclick="deleteSubmission(${index})">
        🗑 Delete
        </button>
    </div>
`;
        });

    }
}
function deleteSubmission(index) {

    let submissions =
    JSON.parse(localStorage.getItem("contacts")) || [];

    submissions.splice(index, 1);

    localStorage.setItem(
        "contacts",
        JSON.stringify(submissions)
    );

    location.reload();
}