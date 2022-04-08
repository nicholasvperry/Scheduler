using System;
using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class JobInstance
    {
        public int Id { get; set; }
        [Required]
        public int JobId { get; set; }
        
        public DateTime? CompletedDate { get; set; }
        
        public decimal? Price { get; set; }
        
        public int? CurrentRouteOrderNumber { get; set; }
        
        public DateTime? ScheduleDate { get; set; }
        
        public bool IsPaid { get; set; }
        public int? CompletedUserId { get; set; }

    }
}
