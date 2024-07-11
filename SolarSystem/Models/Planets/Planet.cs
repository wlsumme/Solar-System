using Newtonsoft.Json;



namespace SolarSystem.Models.Planets
{
    public class Planet
    {
        public string Id { get; set; }
        public string EnglishName { get; set; }
        [JsonProperty("moons")]
        public List<Moon> Moons { get; set; }
        
        [JsonProperty("isPlanet")]
        public bool IsPlanet { get; set; }
    }
}



