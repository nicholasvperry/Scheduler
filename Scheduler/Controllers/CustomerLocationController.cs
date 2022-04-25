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
    public class CustomerLocationController : ControllerBase
    {
        private readonly ICustomerLocationReposirory _customerLocationReposirory;
        public CustomerLocationController(ICustomerLocationReposirory customerLocationReposirory)
        {
            _customerLocationReposirory = customerLocationReposirory;
        }

        // GET: api/<CustomerLocationController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CustomerLocationController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CustomerLocationController>
        [HttpPost]
        public IActionResult Post(CustomerLocation customerLocation)
        {
            _customerLocationReposirory.Add(customerLocation);
            return CreatedAtAction("Get", new { id = customerLocation.Id }, customerLocation);
        }

        // PUT api/<CustomerLocationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomerLocationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
