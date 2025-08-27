namespace ApiService.Job.Commands;

using MediatR;
using Data;

public record UpdateJobCommandDto(
    string Title,
    string? Company,
    DateTime DateApplied,
    JobStatus Status,
    string? Description,
    string? Url,
    string? Location,
    decimal? Salary);

public record UpdateJobCommand(int Id, UpdateJobCommandDto Dto) : IRequest<Unit>;

public class UpdateJobCommandHandler(JobDbContext context) : IRequestHandler<UpdateJobCommand, Unit>
{
    public async Task<Unit> Handle(UpdateJobCommand request, CancellationToken cancellationToken)
    {
        var job = await context.Jobs.FindAsync([request.Id], cancellationToken: cancellationToken);

        if (job == null)
        {
            return Unit.Value;
        }

        job.Title = request.Dto.Title;
        job.Company = request.Dto.Company;
        job.DateApplied = request.Dto.DateApplied;
        job.Status = request.Dto.Status;
        job.Description = request.Dto.Description;
        job.Url = request.Dto.Url;
        job.Location = request.Dto.Location;
        job.Salary = request.Dto.Salary;

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
