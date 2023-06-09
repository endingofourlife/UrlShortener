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
    /// <summary>
    /// Represents a command to delete all URLs. Only admin user can do it.
    /// </summary>
    public class DeleteAll
    {
        /// <summary>
        /// Represents a command request to delete all URLs.
        /// </summary>
        public class Command : IRequest
        {

        }
        /// <summary>
        /// Represents a command handler to handle the deletion of all URLs.
        /// </summary>
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            /// <summary>
            /// Handles the command request to delete all urls.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns Unit object.</returns>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var url = await _context.Urls.ToListAsync();

                _context.RemoveRange(url);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
