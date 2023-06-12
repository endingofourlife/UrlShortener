using Application.Core;
using Application.Urls.Models;
using AutoMapper;
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
        public class Query : IRequest<Result<List<UrlViewDto>>>
        {

        }
        /// <summary>
        /// Represents a query handler to handle the request for viewing of URLs.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<UrlViewDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            /// <summary>
            /// Handles the query request to view the URLs.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns the URL.</returns>
            public async Task<Result<List<UrlViewDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var urls = await _context.Urls.ToListAsync(cancellationToken);
                
                var urlsToReturn = _mapper.Map<List<UrlViewDto>>(urls);

                return Result<List<UrlViewDto>>.Success(urlsToReturn);
            }
        }
    }
}
