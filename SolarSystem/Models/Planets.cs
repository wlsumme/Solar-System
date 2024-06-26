namespace SolarSystem.Models
{
    public class Planets
    {
        public string id { get; set; }
        public string name { get; set; }
        public string englishName { get; set; }
        public bool isPlanet { get; set; }
        public object moons { get; set; }
        public int semimajorAxis { get; set; }
        public int perihelion { get; set; }
        public int aphelion { get; set; }
        public double eccentricity { get; set; }
        public double inclination { get; set; }
        public double mass { get; set; }
        public double vol { get; set; }
        public double density { get; set; }
        public double gravity { get; set; }
        public double escape { get; set; }
        public double meanRadius { get; set; }
        public double equaRadius { get; set; }
        public double polarRadius { get; set; }
        public double flattening { get; set; }
        public string dimension { get; set; }
        public double sideralOrbit { get; set; }
        public double sideralRotation { get; set; }
        public double aroundPlanet { get; set; }
        public string discoveredBy { get; set; }
        public string discoveryDate { get; set; }
        public string alternativeName { get; set; }
        public double axialTilt { get; set; }
        public int avgTemp { get; set; }
        public double mainAnomaly { get; set; }
        public double argPeriapsis { get; set; }
        public double longAscNode { get; set; }
        public string bodyType { get; set; }
        public string rel { get; set; }
    }
}
