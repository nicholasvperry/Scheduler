using System;
using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class UserJobInstance
    {
        public int Id { get; set; }
        [Required]
        public int JobInstanceId { get; set; }
        public int UserId { get; set; }
        public DateTime? TimeIn { get; set; }

        public DateTime? TimeOut { get; set; }
        public User User {get; set;}
        public JobInstance JobInstance { get; set;} 
        public Job Job { get; set;}

    }
}