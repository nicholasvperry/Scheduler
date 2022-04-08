using System;

namespace Scheduler.Models
{
    public class JobNote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
        public string Details { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
