$(document).ready(function () {
    $('.planet-item').click(function () {
        var planetId = $(this).data('id');
        var planetName = $(this).find('h3').text();
        loadPlanetInfo(planetId, planetName);
        loadMoons(planetId, planetName);  // Pass both planetId and planetName
    });

    function loadPlanetInfo(planetId, planetName) {
        $.ajax({
            url: '/SolarSystem/GetPlanetInfo',
            type: 'GET',
            data: { planetId: planetName.toLowerCase() },
            success: function (info) {
                $('#planet-description').text(info);
                $('#planet-info h2').text(planetName + ' Information');
                $('#planet-info').show();
            },
            error: function (xhr, status, error) {
                console.error("Error loading planet information:", error);
                $('#planet-description').text('Error loading planet information. Please try again.');
            }
        });
    }

    function loadMoons(planetId, planetName) {
        $.ajax({
            url: '/SolarSystem/GetMoons',
            type: 'GET',
            data: { planetId: planetName.toLowerCase() },
            success: function (moons) {
                displayMoons(moons);
            },
            error: function (xhr, status, error) {
                console.error("Error loading moons:", error);
                $('#moonList').html('<li>Error loading moons. Please try again.</li>');
                $('#moons-container').show();
            }
        });
    }

    function displayMoons(moons) {
        var moonList = $('#moonList');
        moonList.empty();
        if (moons && moons.length > 0) {
            moons.forEach(function (moon) {
                moonList.append(`<li>${moon}</li>`);
            });
            $('#moons-container').show();
        } else {
            moonList.html('<li>No moons found for this planet.</li>');
            $('#moons-container').show();
        }
    }

    $('#startJourneyButton').click(function () {
        $('.solar-system').show();
    });
});