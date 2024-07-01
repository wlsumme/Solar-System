using Newtonsoft.Json;
using System.Collections.Generic;

namespace SolarSystem.Models.Planets
{
    public class Moon
    {
        [JsonProperty("moon")]
        public string Name { get; set; }
    }
}
