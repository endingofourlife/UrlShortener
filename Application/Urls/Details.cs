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
        /// <summary>
        /// Represents a query request to view the URL.
        /// </summary>
        public class Query : IRequest<Url>
        {
            public Guid Id { get; set; }
        }

        /// <summary>
        /// Represents a query handler to handle the request for viewing a URL.
        /// </summary>
        public class Handler : IRequestHandler<Query, Url>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            /// <summary>
            /// Handles the query request to view the URL.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns the URL.</returns>
            public async Task<Url> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Urls.FindAsync(request.Id);
                return result;
            }
        }
    }
}
