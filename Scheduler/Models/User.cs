﻿using System.ComponentModel.DataAnnotations;


namespace Scheduler.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public int UserTypeId { get; set; }
    }
}
