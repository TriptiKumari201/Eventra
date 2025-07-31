using System;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Command;

public class EditActivity
{
    public class Command : IRequest
    {
        public required EventActivity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activityFromDb = await context.Activities.
                                       FindAsync([request.Activity.Id, cancellationToken])
                                        ?? throw new Exception("Cannot find Activity for given Id");

            //activityFromDb.Category = request.Activity.Category;
            mapper.Map(request.Activity, activityFromDb);
            //context.Activities.Update(request.Activity);
            await context.SaveChangesAsync(cancellationToken);

        }
    }
}
