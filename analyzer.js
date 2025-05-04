document.addEventListener('DOMContentLoaded', () => {
    const codeContainer = document.getElementById('codeContainer');
    const topLevelCode = localStorage.getItem('topLevelCode');

    if (topLevelCode) {
        codeContainer.textContent = topLevelCode;
    } else {
        codeContainer.textContent = 'No code available. Please go back and analyze a repository.';
    }
});