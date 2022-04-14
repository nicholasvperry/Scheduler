using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using Scheduler.Models;
using Scheduler.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserJobInstanceController : ControllerBase
    {
        private readonly IUserJobInstanceRepository _userJobInstanceRepository;
        public UserJobInstanceController(IUserJobInstanceRepository userJobInstanceRepository)
        {
            _userJobInstanceRepository = userJobInstanceRepository;
        }
        // GET: api/<UserJobInstanceController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userJobInstanceRepository.GetAll());
        }

        // GET api/<UserJobInstanceController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userJobInstance = _userJobInstanceRepository.GetAllByJobId(id);
            if (userJobInstance == null)
            {
                return NotFound();
            }
            return Ok(userJobInstance);
        }

        // GET api/<UserJobInstanceController>/5
        [HttpGet("getbyjobinstance/{id}")]
        public IActionResult GetByJobInstanceId(int id)
        {
            var userJobInstance = _userJobInstanceRepository.GetAllByJobInstanceId(id);
            if (userJobInstance == null)
            {
                return NotFound();
            }
            return Ok(userJobInstance);
        }

        // GET api/<UserJobInstanceController>/5
        [HttpGet("getbyuseranddate/{id}/{date}")]
        public IActionResult GetAllByUserAndDate(int id, DateTime date)
        {
            var userJobInstance = _userJobInstanceRepository.GetAllByUserAndDate(id, date);
            if (userJobInstance == null)
            {
                return NotFound();
            }
            return Ok(userJobInstance);
        }

        // GET api/<UserJobInstanceController>/5
        [HttpGet("getbyuser/{id}")]
        public IActionResult GetAllByUser(int id)
        {
            var userJobInstance = _userJobInstanceRepository.GetAllByUser(id);
            if (userJobInstance == null)
            {
                return NotFound();
            }
            return Ok(userJobInstance);
        }



        // POST api/<UserJobInstanceController>
        [HttpPost]
        public IActionResult Post(UserJobInstance userJobInstance)
        {
            userJobInstance.TimeOut = null;
            userJobInstance.TimeIn = null;
            _userJobInstanceRepository.Add(userJobInstance);
            return CreatedAtAction("Get", new { id = userJobInstance.Id }, userJobInstance); ;
        }

        // PUT api/<UserJobInstanceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserJobInstanceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
