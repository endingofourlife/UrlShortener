using Application.Core;
using Application.Urls.Models;
using Application.Urls.Validators;
using Domain;
using FluentValidation;
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
        /// <summary>
        /// Represents a command request to create a URL.
        /// </summary>
        public class Command : IRequest<Result<Unit>>
        {
            public Url Url { get; set; }
        }
        /// <summary>
        /// Represents a command handler to handle the creating of the URL.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            /// <summary>
            /// Handles the command request to create the URL.
            /// </summary>
            /// <param name="request">The query request.</param>
            /// <returns>A task representing the asynchronous operation that returns Unit object.</returns>
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Url.UserId);
                if (user != null) 
                {
                    request.Url.User = user;
                    _context.Urls.Add(request.Url);
                }
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create shortcut");

                return Result<Unit>.Success(Unit.Value);
            }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Url).SetValidator(new UrlValidator());
            }
        }
    }
}
