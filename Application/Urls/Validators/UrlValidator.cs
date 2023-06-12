using Application.Urls.Models;
using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Urls.Validators
{
    public class UrlValidator : AbstractValidator<Url>
    {
        public UrlValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x=>x.OriginalUrl).NotEmpty();
            RuleFor(x=>x.ShortUrl).NotEmpty().MinimumLength(4).MaximumLength(7);
        }
    }
}
