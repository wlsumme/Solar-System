using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace SolarSystem.Controllers
{
    public class SolarSystemController : Controller
    {
        private readonly HttpClient _client;
        private readonly string _apiBaseUrl;

        public SolarSystemController(IHttpClientFactory clientFactory, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            _client = clientFactory.CreateClient();
            _apiBaseUrl = configuration["SolarSystemApiBaseUrl"];
        }
            //encapsulates the URL HTTP to be used in multiple methods

        public IActionResult Index()
        {
            return View("SolarSystem");
        }

       
        public async Task<IActionResult> GetPlanets()
        {
            var response = await _client.GetStringAsync($"{_apiBaseUrl}/bodies?filter[]=isPlanet,eq,true");
            return Json(JObject.Parse(response)["bodies"]);
        }
        // This method sends a request to the API and returns  the data as a JSON result.
        // And uses async keyword to help the flow of info.

      
        public async Task<IActionResult> GetMoons(string planetId)
        {
            var response = await _client.GetStringAsync($"{_apiBaseUrl}/bodies/{planetId}");
            var moons = JObject.Parse(response)["moons"];
            return Json(moons?.Select(m => m["moon"]) ?? Enumerable.Empty<JToken>());
        }
        // This gets info from the API about the planets and extracts the names of the moons of said planet.
        // Uses ?. the null-conditional operator to avoid throwing a NullReferenceException.
        // Also uses ?? the null-coalescing operator to help the method cases where a planet might not have a moon.

       
        public async Task<IActionResult> GetPlanetInfo(string planetId)
        {
            var planet = JObject.Parse(await _client.GetStringAsync($"{_apiBaseUrl}/bodies/{planetId}"));
            return Json($"{planet["englishName"]} is {GetOrdinal(planet["englishName"].ToString())} planet from the Sun. " +
                        $"It has a radius of {planet["meanRadius"]} km and a mass of {planet["mass"]["massValue"]}x10^{planet["mass"]["massExponent"]} kg. " +
                        $"Its gravity is {planet["gravity"]} m/s².");
        }
        // This method retrieves data uses string interpolation to display  the planets info.

        private string GetOrdinal(string planetName)
        {
            var planets = new[] { "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune" };
            var index = Array.FindIndex(planets, p => p.Equals(planetName, StringComparison.OrdinalIgnoreCase));
            return $"{index + 1}{(index < 3 ? new[] { "st", "nd", "rd" }[index] : "th")}";
        }
        // Defines an array of planets and helps how to display the planets name based on the index postion of said planet
    }
}