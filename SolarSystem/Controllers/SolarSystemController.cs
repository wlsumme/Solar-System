using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace SolarSystemWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolarSystemController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public SolarSystemController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("bodies")]
        public async Task<IActionResult> GetMoons()
        {
            var apiUrl = "https://api.le-systeme-solaire.net/rest/bodies/";
            var response = await _httpClient.GetAsync(apiUrl);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                return Ok(data);
            }
            return StatusCode((int)response.StatusCode, response.ReasonPhrase);
        }
    }
}
