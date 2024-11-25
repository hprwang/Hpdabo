const API_URL = 'http://localhost:5000/opinions';

document.getElementById('opinionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('opinionText').value;

    if (text.trim() === '') return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    document.getElementById('opinionText').value = '';
    fetchOpinions();
});

async function fetchOpinions() {
    const response = await fetch(API_URL);
    const opinions = await response.json();

    const opinionsDiv = document.getElementById('opinions');
    opinionsDiv.innerHTML = '';

    opinions.forEach((opinion) => {
        const div = document.createElement('div');
        div.classList.add('opinion');
        div.innerText = opinion.text;
        opinionsDiv.appendChild(div);
    });
}

fetchOpinions();
