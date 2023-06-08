using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Url
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string OriginalUrl { get; set; }
        [Required]
        public string ShortUrl { get; set; }
        public DateTime CreatedDate { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
