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
    public class JobController : ControllerBase
    {
        private readonly IJobRepository _jobRepository;
        public JobController(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }
        // GET: api/<JobController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jobRepository.GetAll());
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var job = _jobRepository.GetJobById(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpGet("customer/{id}")]
        public IActionResult GetAllJobsByCustomer(int id)
        {
            var job = _jobRepository.GetAllJobsByCustomer(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpGet("location/{id}")]
        public IActionResult GetAllJobsByLocationWithCustomer(int id)
        {
            var job = _jobRepository.GetAllJobsByLocationWithCustomer(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        // POST api/<JobController>
        [HttpPost]
        public IActionResult Post(Job job)
        {
            _jobRepository.Add(job);
            return CreatedAtAction("Get", new { id = job.Id }, job);
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
