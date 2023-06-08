using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User : IdentityUser
    {
        public bool IsAdmin { get; set; }
        public ICollection<Url> Urls { get; set; } = new List<Url>();
    }
}
