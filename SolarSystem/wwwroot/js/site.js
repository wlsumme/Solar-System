document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
    const exploreButton = document.getElementById('exploreButton');
    const planetsContainer = document.getElementById('planets-container');
    const moonsContainer = document.getElementById('moons-container');
    const backButton = document.getElementById('back-to-planets');

    if (exploreButton) {
        console.log('Explore button found');
        exploreButton.addEventListener('click', loadPlanets);
    } else {
        console.error('Explore button not found');
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            moonsContainer.style.display = 'none';
            planetsContainer.style.display = 'block';
        });
    }

    // Load planets if we're on the StartYourJourney page
    if (planetsContainer) {
        loadPlanets();
    }
});

function loadPlanets() {
    console.log("Attempting to load planets");
    $('#loading-planets').show();
    $.ajax({
        url: '/SolarSystem/GetPlanets',
        type: 'GET',
        success: function (planets) {
            console.log('Planets received:', planets);
            var container = $('#planets-container');
            container.empty();
            if (planets && Array.isArray(planets) && planets.length > 0) {
                planets.forEach(function (planet) {
                    if (planet && planet.id && planet.englishName) {
                        var button = $(`<button class="planet-button" data-id="${planet.id}">${planet.englishName}</button>`);
                        container.append(button);
                    } else {
                        console.error(`Invalid planet data:`, planet);
                    }
                });
                addPlanetButtonListeners();
            } else {
                container.append('<p>No planets found.</p>');
            }
            container.show();
            $('#moonContainer').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch planets:', textStatus, errorThrown);
            $('#planets-container').html('<p>Error loading planets. Please try again later.</p>');
        },
        complete: function () {
            $('#loading-planets').hide();
        }
    });
}

function addPlanetButtonListeners() {
    $('.planet-button').click(function () {
        var planetId = $(this).data('id');
        var planetName = $(this).text();
        loadMoons(planetId, planetName);
    });
}

function loadMoons(planetId, planetName) {
    console.log("Attempting to load moons for planet:", planetName);
    $.ajax({
        url: '/SolarSystem/GetMoons',
        type: 'GET',
        data: { planetId: planetId },
        success: function (moons) {
            console.log('Moons received:', moons);
            $('#selected-planet').text(planetName);
            var moonList = $('#moonList');
            moonList.empty();
            if (moons && moons.length > 0) {
                moons.forEach(function (moon) {
                    moonList.append(`<li>${moon}</li>`);
                });
            } else {
                moonList.append('<li>No moons found for this planet.</li>');
            }
            $('#planets-container').hide();
            $('#moonContainer').show();
        },
        error: function (error) {
            console.log('Error fetching moons:', error);
            $('#moonList').html('<li>Error loading moons. Please try again later.</li>');
        }
    });
}