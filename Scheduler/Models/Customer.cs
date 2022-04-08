using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime CreateDateTime { get; set; }
        public List<CustomerLocation> CustomerLocations { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
