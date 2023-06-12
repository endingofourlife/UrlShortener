using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Urls.Models
{
    public class UrlViewDto : UrlCreateDto
    {
        public DateTime CreatedDate { get; set; }
    }
}
