using Microsoft.AspNetCore.Mvc;
using System;
using Scheduler.Models;
using Scheduler.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserProfileController(IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: UserProfileController
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET: UserProfileController
        [HttpGet("GetAdmins")]
        public ActionResult GetAdmins()
        {
            return Ok(_userRepository.GetAdminProfiles());
        }


        // GET: UserProfileController
        [HttpGet("userTypes")]
        public ActionResult GetUserTypes()
        {
            return Ok(_userRepository.GetUserTypes());
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                "GetByEmail",
                new { email = user.Email },
                user);
        }

        //userprofile/id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {

            var user = _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // Patch /userprofilecontroller/deactivate/id
        [HttpPatch("deactivate/{id}")]
        public void Deactivate(int id)
        {
            _userRepository.Deactivate(id);

        }

        // Patch /userprofilecontroller/deactivate/id
        [HttpPatch("reactivate/{id}")]
        public void Reactivate(int id)
        {
            _userRepository.Reactivate(id);

        }

        //Update /userprofilecontroller/id
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {

            _userRepository.UpdateUserType(user);
            return NoContent();

        }


    }
}
