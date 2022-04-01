using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class UserType
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }        
    }
}
