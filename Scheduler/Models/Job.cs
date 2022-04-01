using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class Job
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Details { get; set; }
        [Required]
        public int CustomerLocationId { get; set; }
        public int BillingTypeId { get; set; }
        public int RouteOrderNumber { get; set; }
    }
}
