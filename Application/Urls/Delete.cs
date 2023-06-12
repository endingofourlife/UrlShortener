using Application.Core;
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
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        /// <summary>
        /// Represents a command handler to handle the deletion of the URL.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var url = await _context.Urls.FindAsync(request.Id);

                if (url == null) return null;

                _context.Remove(url);

                var result = await _context.SaveChangesAsync()>0;

                if (!result) return Result<Unit>.Failure("Failed to delete the shortcut");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
