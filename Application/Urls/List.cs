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
    public class List
    {
        public class Query : IRequest<List<Url>>
        {

        }
        public class Handler : IRequestHandler<Query, List<Url>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Url>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Urls.ToListAsync();
            }
        }
    }
}
