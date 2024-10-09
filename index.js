function submitComment() {
    const userComment = document.getElementById('comment').value;

    // Send comment to the server
    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: userComment}),
    })
        .then(response => response.json())
        .then(data => {
            // Display updated comments
            displayComments(data.comments);
        })
        .catch(error => console.error('Error:', error));
}


function displayComments(comments) {
    document.getElementById('commentsList').innerHTML = comments.map(comment => `<li>${comment}</li>`).join('');
}

fetch("get-comments")
    .then(response => response.json())
    .then(data => {
        // Display updated comments
        displayComments(data.comments);
    })
    .catch(error => console.error('Error:', error));


document.getElementById('inputButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('output').innerHTML = `User input: ${userInput}`; // Vulnerable to XSS
});


document.getElementById('submit_btn').addEventListener('click', () => {
    submitComment()
});
