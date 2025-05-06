document.addEventListener('DOMContentLoaded', () => {
    const codeContainer = document.getElementById('codeContainer').querySelector('code');
    const lineInfo = document.getElementById('lineInfo');
    const lineDetails = document.getElementById('lineDetails');
    const topLevelCode = localStorage.getItem('topLevelCode');
    const functions = JSON.parse(localStorage.getItem('functions'));

    if (topLevelCode) {
        codeContainer.textContent = topLevelCode;
        Prism.highlightElement(codeContainer);
    } else {
        codeContainer.textContent = 'No code available. Please go back and analyze a repository.';
    }

    codeContainer.addEventListener('click', (event) => {
        const lineNumber = getLineNumber(event.target);
        console.log('Clicked line number:', lineNumber);
        if (lineNumber) {
            fetchLineInfo(lineNumber);
        }
    });

    function getLineNumber(target) {
        const preElement = target.closest('pre.line-numbers');
        if (preElement) {
            const lineHeight = parseFloat(getComputedStyle(preElement).lineHeight);
            const clickOffsetY = event.clientY - preElement.getBoundingClientRect().top;
            console.log('Line height:', lineHeight, 'Click offset Y:', clickOffsetY); // Debugging log
            return Math.floor(clickOffsetY / lineHeight);
        }

        return null;
    }

    function fetchLineInfo(lineNumber) {
        fetch(`http://127.0.0.1:8000/lineinfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ line: lineNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                lineInfo.style.display = 'block';
                lineDetails.textContent = data.info || 'No information available for this line.';
            })
            .catch((error) => {
                console.error('Error fetching line info:', error);
                lineDetails.textContent = 'Error fetching line info.';
            });
    }
});