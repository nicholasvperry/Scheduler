using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Scheduler.Models;
using Scheduler.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        // GET: api/<CustomerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_customerRepository.GetAll());
        }

        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public IActionResult GetCustomerByIdWithJobInformation(int id)
        {
            var customer = _customerRepository.GetCustomerByIdWithJobInformation(id);
            if(customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            _customerRepository.Add(customer);
            return CreatedAtAction("Get", new { id=customer.Id }, customer);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _customerRepository.DeleteCustomer(id);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Customer customer)
        {
            _customerRepository.UpdateCustomer(customer);
            return NoContent();
        }
    }
}
