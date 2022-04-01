﻿using System.ComponentModel.DataAnnotations;


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
        public int PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
