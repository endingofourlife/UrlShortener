using API.DTOs;
using Application.Urls;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UrlController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<UrlDto>>> GetUrls()
        {
            var query = new List.Query();
            var urls = await Mediator.Send(query);
            return urls;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Url>> GetUrl(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            
            return result;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUrl(UrlDto urlDto)
        {
            Url url = new Url()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                OriginalUrl = urlDto.OriginalUrl,
                ShortUrl = urlDto.ShortUrl,
                UserId = urlDto.UserId
            };

            return Ok(await Mediator.Send(new Create.Command { Url = url }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUrl(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUrls()
        {
            return Ok(await Mediator.Send(new DeleteAll.Command()));
        }
    }
}
