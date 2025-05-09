document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {  // Simulated API
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            feedback.textContent = `Thank you ${formData.name}, your message has been sent!`;
            form.reset();
        })
        .catch(error => {
            feedback.textContent = 'Sorry, there was an error sending your message.';
            console.error('Error:', error);
        });
    });
});
