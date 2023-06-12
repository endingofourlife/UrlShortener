using Application.Urls;
using Application.Urls.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ShortcutController : BaseApiController
    {
        private readonly UserManager<User> _userManager;

        public ShortcutController(UserManager<User> userManager)
        {
            this._userManager = userManager;
        }

        [HttpGet("{shortUrl}")]
        public async Task<IActionResult> RedirectToOriginal(string shortUrl)
        {
            try
            {
                // Create a query to retrieve the list of URLs
                var query = new List.Query();
                var urls = await Mediator.Send(query);

                // Find the URL with the given short URL
                var url = urls.Value.FirstOrDefault(u => u.ShortUrl == shortUrl);

                // If the URL is not found, return a 404 error
                if (url == null)
                {
                    return NotFound(new { error = "Short URL not found" });
                }

                // Check if the original URL is valid
                var isUrlValid = CheckIfUrlIsValid(url.OriginalUrl);

                // If the original URL is not valid, return a 400 Bad Request error
                if (!isUrlValid)
                {
                    return BadRequest(new { error = "Invalid original URL" });
                }

                // Redirect the user to the original URL
                return Redirect(url.OriginalUrl);
            }
            catch (Exception)
            {
                // If an error occurs, return a 500 Internal Server Error
                return StatusCode(500, new { error = "Internal Server Error" });
            }
        }

      

        private bool CheckIfUrlIsValid(string url)
        {
            // Check if the URL is a valid absolute URL with HTTP or HTTPS scheme
            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) ||
                (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
            {
                return false;
            }

            // Use WebClient to attempt opening and reading the URL
            using (var client = new WebClient())
            {
                try
                {
                    using (client.OpenRead(url))
                    {
                        // If the URL is successfully opened and read, it is considered valid
                        return true;
                    }
                }
                catch
                {
                    // If an exception occurs while opening or reading the URL, it is considered invalid
                    return false;
                }
            }
        }

    }
}
