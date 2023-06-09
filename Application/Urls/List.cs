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
        /// <summary>
        /// Represents a query request to view all URLs.
        /// </summary>
        public class Query : IRequest<List<Url>>
        {

        }
        /// <summary>
        /// Represents a query handler to handle the request for viewing of URLs.
        /// </summary>
        public class Handler : IRequestHandler<Query, List<Url>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            /// <summary>
            /// Handles the query request to view the URLs.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns the URL.</returns>
            public async Task<List<Url>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Urls.ToListAsync();
            }
        }
    }
}
