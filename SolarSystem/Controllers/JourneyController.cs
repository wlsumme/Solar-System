using Microsoft.AspNetCore.Mvc;

namespace SolarSystem.Controllers
{
    public class JourneyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public ActionResult StartYourJourney()
        {
            return View();
        }
    }
}
