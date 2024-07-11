using Newtonsoft.Json;


namespace SolarSystem.Models.Planets
{
    public class Moon
    {
        [JsonProperty("moon")]
        public string Name { get; set; }
    }
}
