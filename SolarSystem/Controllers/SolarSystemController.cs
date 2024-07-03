using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using SolarSystem.Models.Planets;
using System.Linq;

namespace SolarSystem.Controllers
{
    public class SolarSystemController : Controller
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<SolarSystemController> _logger;
        private readonly string _apiBaseUrl;

        public SolarSystemController(IHttpClientFactory clientFactory, ILogger<SolarSystemController> logger, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _logger = logger;
            _apiBaseUrl = configuration["SolarSystemApiBaseUrl"];
        }

        public IActionResult Index()
        {
            return View("SolarSystem");
        }

        public IActionResult StartYourJourney()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetPlanets()
        {
            try
            {
                var client = _clientFactory.CreateClient();
                var response = await client.GetAsync($"{_apiBaseUrl}/bodies?filter[]=isPlanet,eq,true");

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var planets = JsonConvert.DeserializeObject<PlanetResponse>(content);
                    _logger.LogInformation($"Planets fetched: {planets.Bodies.Count}");
                    return Json(planets.Bodies);
                }
                else
                {
                    _logger.LogWarning($"Failed to fetch planets. Status code: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Failed to fetch planets");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching planets");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMoons(string planetId)
        {
            try
            {
                var client = _clientFactory.CreateClient();
                var response = await client.GetAsync($"{_apiBaseUrl}/bodies/{planetId}");

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var planet = JsonConvert.DeserializeObject<Planet>(content);
                    return Json(planet.Moons?.Select(m => m.Name).ToList() ?? new List<string>());
                }
                else
                {
                    _logger.LogWarning($"Failed to fetch moons for planet {planetId}. Status code: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Failed to fetch moons");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching moons for planet {planetId}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPlanetInfo(string planetId)
        {
            try
            {
                var client = _clientFactory.CreateClient();
                var response = await client.GetAsync($"{_apiBaseUrl}/bodies/{planetId}");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var planetInfo = JsonConvert.DeserializeObject<PlanetInfo>(content);

                    string info = $"{planetInfo.englishName} is {GetOrdinal(planetInfo.englishName, planetInfo.semimajorAxis)} planet from the Sun. " +
                                  $"It has a radius of {planetInfo.meanRadius} km and a mass of {planetInfo.mass.massValue}x10^{planetInfo.mass.massExponent} kg. " +
                                  $"Its gravity is {planetInfo.gravity} m/s².";

                    return Json(info);
                }
                else
                {
                    return Json("Information not available.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching info for planet {planetId}");
                return Json($"Error: {ex.Message}");
            }
        }

        private string GetOrdinal(string planetName, double semimajorAxis)
        {
            var planets = new[] { "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune" };
            var index = Array.FindIndex(planets, p => p.Equals(planetName, StringComparison.OrdinalIgnoreCase));
            string[] suffixes = { "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th" };
            return $"{index + 1}{suffixes[(index + 1) % 10]}";
        }

        public class PlanetInfo
        {
            public string id { get; set; }
            public string englishName { get; set; }
            public double semimajorAxis { get; set; }
            public double meanRadius { get; set; }
            public double gravity { get; set; }
            public Mass mass { get; set; }
        }

        
    }
}