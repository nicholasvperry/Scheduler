using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class CustomerLocation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Zip { get; set; }
        public Customer Customer { get; set; }
        public List<Job> Jobs { get; set; } 


    }
}
