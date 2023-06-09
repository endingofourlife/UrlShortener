using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Urls
{
    public class Create
    {
        public class Command : IRequest
        {
            public Url Url { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Url.UserId);
                if (user != null) 
                {
                    request.Url.User = user;
                    _context.Urls.Add(request.Url);
                }
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
