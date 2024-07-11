
    document.querySelectorAll('.planet-item').forEach(item => {
        item.addEventListener('click', function () {
            const planetName = this.querySelector('h3').textContent;
        
            fetch(`/SolarSystem/GetPlanetInfo?planetId=${planetName.toLowerCase()}`)
                .then(response => response.text())
                .then(info => {
                    document.getElementById('planet-description').textContent = info;
                    document.querySelector('#planet-info h2').textContent = `${planetName} Information`;
                    document.getElementById('planet-info').style.display = 'block';
                });

            fetch(`/SolarSystem/GetMoons?planetId=${planetName.toLowerCase()}`)
                .then(response => response.json())
                .then(moons => {
                    const moonList = document.getElementById('moonList');
                    moonList.innerHTML = moons.length ? moons.map(moon => `<li>${moon}</li>`).join('') : '<li>No moons found for this planet.</li>';
                    document.querySelector('#moons-container h2').textContent = `${planetName} Moons`;
                    document.getElementById('moons-container').style.display = 'block';
                });
        });
    });
//This JS calls info from the API. When the planets are clicked the name of the planet gets passed to the functions at line 6 and 14.
//At line 6 the API is called and displays planet info.
//And then line 14 also calls the API with a different endpoint and gives an array of moons from that planet.



