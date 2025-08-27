namespace ApiService.Job.Commands;

using MediatR;
using Data;

public record CreateJobCommand(
    string Title,
    string? Company,
    DateTime DateApplied,
    JobStatus Status,
    string? Description,
    string? Url,
    string? Location,
    decimal? Salary) : IRequest<int>;

public class CreateJobHandler(JobDbContext context) : IRequestHandler<CreateJobCommand, int>
{
    public async Task<int> Handle(CreateJobCommand request, CancellationToken cancellationToken)
    {
        var entity = new Job
        {
            Title = request.Title,
            Company = request.Company,
            DateApplied = request.DateApplied,
            Status = request.Status,
            Description = request.Description,
            Url = request.Url,
            Location = request.Location,
            Salary = request.Salary
        };

        context.Jobs.Add(entity);
        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
