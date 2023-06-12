﻿using Application.Core;
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
        public class Command : IRequest<Result<Unit>>
        {

        }
        /// <summary>
        /// Represents a command handler to handle the deletion of all URLs.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var urls = await _context.Urls.ToListAsync();

                if (!urls.Any()) return null;

                _context.RemoveRange(urls);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete shortcuts");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
