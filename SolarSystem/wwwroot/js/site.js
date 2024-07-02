$(document).ready(function () {
    console.log('DOM fully loaded');

    $('#exploreButton').click(loadPlanets);
    $('#back-to-planets').click(showPlanets);

    function loadPlanets() {
        console.log("Attempting to load planets");
        $('#loading-planets').show();
        $('#planets-container, #moons-container').hide();

        $.ajax({
            url: '/SolarSystem/GetPlanets',
            type: 'GET',
            success: function (planets) {
                console.log('Planets received:', planets);
                renderPlanets(planets);
                showPlanets();
            },
            error: function (error) {
                console.log('Error fetching planets:', error);
                $('#planetList').html('<li>Error loading planets. Please try again later.</li>');
            },
            complete: function () {
                $('#loading-planets').hide();
            }
        });
    }

    function renderPlanets(planets) {
        var planetList = $('#planetList');
        planetList.empty();
        planets.forEach(function (planet) {
            planetList.append(`<li class="planet-item" data-id="${planet.id}">${planet.englishName}</li>`);
        });
        $('.planet-item').click(function () {
            var planetId = $(this).data('id');
            var planetName = $(this).text();
            loadMoons(planetId, planetName);
        });
    }

    function loadMoons(planetId, planetName) {
        console.log(`Loading moons for planet: ${planetName} (ID: ${planetId})`);
        $('#loading-planets').show();
        $('#planets-container, #moons-container').hide();

        $.ajax({
            url: '/SolarSystem/GetMoons',
            type: 'GET',
            data: { planetId: planetId },
            success: function (moons) {
                console.log('Moons received:', moons);
                renderMoons(moons, planetName);
                showMoons();
            },
            error: function (error) {
                console.log('Error fetching moons:', error);
                $('#moonList').html('<li>Error loading moons. Please try again later.</li>');
            },
            complete: function () {
                $('#loading-planets').hide();
            }
        });
    }

    function renderMoons(moons, planetName) {
        $('#selected-planet').text(planetName);
        var moonList = $('#moonList');
        moonList.empty();
        if (moons.length > 0) {
            moons.forEach(function (moon) {
                moonList.append(`<li>${moon}</li>`);
            });
        } else {
            moonList.append('<li>No moons found for this planet.</li>');
        }
    }

    function showPlanets() {
        $('#moons-container').hide();
        $('#planets-container').show();
    }

    function showMoons() {
        $('#planets-container').hide();
        $('#moons-container').show();
    }
});