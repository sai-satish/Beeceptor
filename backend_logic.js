document.addEventListener('DOMContentLoaded', function () {
            
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });


        const endpoint = 'http://localhost:5000/login'

        // Send the form data to the endpoint via a POST request
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) =>  response.json())
            .then((data) => {
                // console.log('Success:', data);
            

                if (!data?.['status']) {
                    const message = document.getElementById("error-message");

                    // Showing error message
                    message.style.display = "block";
                    setTimeout(() => {
                        message.style.display = "none"; 
                        window.location.href = 'http://localhost:5000/signup';
                    }, 3000);
                } else {
                    alert('Login successful');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    });
});
