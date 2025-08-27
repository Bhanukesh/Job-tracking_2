namespace ApiService.Job.Commands;

using MediatR;
using Data;

public record DeleteJobCommand(int Id) : IRequest<Unit>;

public class DeleteJobCommandHandler(JobDbContext context) : IRequestHandler<DeleteJobCommand, Unit>
{
    public async Task<Unit> Handle(DeleteJobCommand request, CancellationToken cancellationToken)
    {
        var job = await context.Jobs.FindAsync([request.Id], cancellationToken: cancellationToken);

        if (job == null)
        {
            return Unit.Value;
        }

        context.Jobs.Remove(job);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
