
namespace Data;

public enum JobStatus
{
    Interested,
    Applied,
    Interview,
    Offer,
    Rejected,
    Accepted,
    Declined
}

public class Job
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Company { get; set; }
    public DateTime DateApplied { get; set; }
    public JobStatus Status { get; set; }
    public string? Description { get; set; }
    public string? Url { get; set; }
    public string? Location { get; set; }
    public decimal? Salary { get; set; }
}
