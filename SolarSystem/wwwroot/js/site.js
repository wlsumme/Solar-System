document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
    const exploreButton = document.getElementById('exploreButton');

    if (exploreButton) {
        console.log('Explore button found');
        exploreButton.addEventListener('click', () => {
            console.log('Button clicked');
            const url = exploreButton.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            } else {
                console.error('URL not found in data-url attribute');
                // Fallback to alert if URL is not found
                alert('Button clicked! Starting your journey...');
            }
        });
    } else {
        console.error('Explore button not found');
    }
});


const apiUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';

async function fetchBodies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayBodies(data.bodies);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBodies(bodies) {
    const bodyList = document.getElementById('bodyList');
    if (bodyList) {
        bodyList.innerHTML = '';
        bodies.forEach(body => {
            if (body.isPlanet) {
                const bodyCard = document.createElement('div');
                bodyCard.className = 'body-card';
                bodyCard.innerHTML = `
                    <h2>${body.name}</h2>
                    <p>English Name: ${body.englishName}</p>
                    <p>Body Type: ${body.bodyType}</p>
                    <p>Mass: ${body.mass ? body.mass.massValue + ' x 10^' + body.mass.massExponent + ' kg' : 'Unknown'}</p>
                    <p>Gravity: ${body.gravity} m/s²</p>
                    <p>Mean Radius: ${body.meanRadius} km</p>
                `;
                bodyList.appendChild(bodyCard);
            }
        });
    } else {
        console.error('bodyList element not found');
    }
}