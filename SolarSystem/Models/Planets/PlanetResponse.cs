using SolarSystem.Controllers;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SolarSystem.Models.Planets
{
    public class PlanetResponse
    {
        public List<Planet> Bodies { get; set; }
    }

}
