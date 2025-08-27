namespace ApiService.Controllers;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Job.Commands;
using Job.Queries;
using Job.DTO;

[ApiController]
[Route("api/[controller]")]
public class JobsController(IMediator mediator) : ControllerBase
{
    [HttpGet(Name = nameof(GetJobs))]
    public async Task<IEnumerable<JobItem>> GetJobs()
    {
        return await mediator.Send(new GetJobsQuery());
    }

    [HttpGet("{id}", Name = nameof(GetJob))]
    public async Task<ActionResult<JobItem>> GetJob(int id)
    {
        var job = await mediator.Send(new GetJobQuery(id));
        if (job == null)
            return NotFound();
        
        return job;
    }

    [HttpPost(Name = nameof(CreateJob))]
    public async Task<ActionResult<int>> CreateJob(CreateJobCommand command)
    {
        return await mediator.Send(command);
    }

    [HttpPut("{id}", Name = nameof(UpdateJob))]
    public async Task<IActionResult> UpdateJob(int id, UpdateJobCommandDto dto)
    {
        await mediator.Send(new UpdateJobCommand(id, dto));
        return NoContent();
    }

    [HttpDelete("{id}", Name = nameof(DeleteJob))]
    public async Task<IActionResult> DeleteJob(int id)
    {
        await mediator.Send(new DeleteJobCommand(id));
        return NoContent();
    }
}
