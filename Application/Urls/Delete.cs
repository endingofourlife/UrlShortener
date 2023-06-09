using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Urls
{
    public class Delete
    {
        /// <summary>
        /// Represents a command request to delete all URLs.
        /// </summary>
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        /// <summary>
        /// Represents a command handler to handle the deletion of the URL.
        /// </summary>
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            /// <summary>
            /// Handles the command request to delete the URL.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns Unit object.</returns>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var url = await _context.Urls.FindAsync(request.Id);

                _context.Remove(url);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
