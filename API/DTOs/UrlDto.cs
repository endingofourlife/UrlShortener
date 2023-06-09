
namespace API.DTOs
{
    public class UrlDto
    {
        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserId { get; set; }
    }
}
