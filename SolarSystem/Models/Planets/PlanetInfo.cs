using static SolarSystem.Controllers.SolarSystemController;

namespace SolarSystem.Models.Planets
{
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
