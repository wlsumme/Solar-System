$(document).ready(function () {
    $('.planet-item').hover(
        function () {
            var planetId = $(this).data('id');
            var planetName = $(this).find('h3').text();
            loadPlanetInfo(planetId, planetName);
        },
        function () {
            $('#planet-info').hide();
        }
    );

    $('.planet-item').click(function () {
        var planetId = $(this).data('id');
        var planetName = $(this).find('h3').text();
        loadMoons(planetId, planetName);
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
                displayMoons(moons, planetName);
            },
            error: function (xhr, status, error) {
                console.error("Error loading moons:", error);
                $('#moonList').html('<li>Error loading moons. Please try again.</li>');
                $('#moons-container').show();
            }
        });
    }

    function displayMoons(moons, planetName) {
        var moonList = $('#moonList');
        moonList.empty();
        $('#moons-container h2').text(planetName + ' Moons');
        if (moons && moons.length > 0) {
            moons.forEach(function (moon) {
                moonList.append(`<li>${moon}</li>`);
            });
        } else {
            moonList.html('<li>No moons found for this planet.</li>');
        }
        $('#moons-container').show();
    }

    $('#startJourneyButton').click(function () {
        $('.solar-system').show();
    });
});