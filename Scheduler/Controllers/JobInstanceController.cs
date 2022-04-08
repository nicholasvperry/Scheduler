using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using Scheduler.Models;
using Scheduler.Repositories;


namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobInstanceController : ControllerBase
    {
        private readonly IJobInstanceRepository _jobInstanceRepository;
        public JobInstanceController(IJobInstanceRepository jobInstanceRepository)
        {
            _jobInstanceRepository = jobInstanceRepository;
        }
        // GET: api/<JobInstanceController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jobInstanceRepository.GetAll());
        }

        // GET api/<JobInstanceController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var job = _jobInstanceRepository.GetAllByJobId(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        // POST api/<JobInstanceController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<JobInstanceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JobInstanceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
