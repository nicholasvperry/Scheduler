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
        public string StreedAddress { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public int Zip { get; set; }
        public bool IsBilling { get; set; }

    }
}
