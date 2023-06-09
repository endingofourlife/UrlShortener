using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Urls
{
    public class Details
    {
        public class Query : IRequest<Url>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Url>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Url> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Urls.FindAsync(request.Id);
                return result;
            }
        }
    }
}
