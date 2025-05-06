document.getElementById('repoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const repoUrl = document.getElementById('repoUrl').value;

    try {
        const response = await fetch('http://127.0.0.1:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repoUrl }),
        });

        if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem('topLevelCode', responseData.topLevelCode);
            localStorage.setItem('functions', JSON.stringify(responseData.functions));
            window.location.href = 'analyzer.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send the repository URL. Please try again.');
    }
});