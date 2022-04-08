using System;

namespace Scheduler.Models
{
    public class CustomerNote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public string Details { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
