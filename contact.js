
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const statusDiv = document.getElementById('form-status');

    statusDiv.textContent = '';
    statusDiv.className = 'mt-4 text-center';
    statusDiv.classList.remove('visible'); 

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    };

    statusDiv.textContent = 'Sending...';
    statusDiv.classList.add('status-sending', 'visible'); 

    fetch('/api/contact', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {

             return response.json().then(err => {
                 throw new Error(err.message || `Server responded with status ${response.status}`);
             }).catch(() => {

                 throw new Error(`Server responded with status ${response.status}`);
             });
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Success:', data);
        statusDiv.textContent = 'Message sent successfully!';

        statusDiv.classList.remove('status-sending');
        statusDiv.classList.add('status-success', 'visible');
        form.reset(); 

    })
    .catch((error) => {
        console.error('Error:', error);
        statusDiv.textContent = `Error: ${error.message}. Please try again.`;
        statusDiv.classList.remove('status-sending');
        statusDiv.classList.add('status-error', 'visible');
    });
});