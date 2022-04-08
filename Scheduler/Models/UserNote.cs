using System;

namespace Scheduler.Models
{
    public class UserNote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public string Details { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int UserCreatedId { get; set; }
    }
}
