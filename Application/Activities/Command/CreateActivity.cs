using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Command;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required EventActivity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);
            await context.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
}
