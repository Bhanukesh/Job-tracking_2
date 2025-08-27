namespace ApiService.Job.Queries;

using MediatR;
using Microsoft.EntityFrameworkCore;
using Data;
using DTO;

public record GetJobsQuery : IRequest<IEnumerable<JobItem>>;

public class GetJobsQueryHandler(JobDbContext context) : IRequestHandler<GetJobsQuery, IEnumerable<JobItem>>
{
    public async Task<IEnumerable<JobItem>> Handle(GetJobsQuery request, CancellationToken cancellationToken)
    {
        return await context.Jobs
            .OrderByDescending(x => x.DateApplied)
            .Select(x => new JobItem 
            { 
                Id = x.Id, 
                Title = x.Title,
                Company = x.Company,
                DateApplied = x.DateApplied,
                Status = x.Status,
                Description = x.Description,
                Url = x.Url,
                Location = x.Location,
                Salary = x.Salary
            })
            .ToListAsync(cancellationToken);
    }
}

public record GetJobQuery(int Id) : IRequest<JobItem?>;

public class GetJobQueryHandler(JobDbContext context) : IRequestHandler<GetJobQuery, JobItem?>
{
    public async Task<JobItem?> Handle(GetJobQuery request, CancellationToken cancellationToken)
    {
        return await context.Jobs
            .Where(x => x.Id == request.Id)
            .Select(x => new JobItem 
            { 
                Id = x.Id, 
                Title = x.Title,
                Company = x.Company,
                DateApplied = x.DateApplied,
                Status = x.Status,
                Description = x.Description,
                Url = x.Url,
                Location = x.Location,
                Salary = x.Salary
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
