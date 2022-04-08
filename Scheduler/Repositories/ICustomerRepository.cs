using Scheduler.Models;
using System.Collections.Generic;

namespace Scheduler.Repositories
{
    public interface ICustomerRepository
    {
        void Add(Customer customer);
        void DeleteCustomer(int id);
        List<Customer> GetAll();
        Customer GetCustomerByIdWithJobInformation(int id);
        public void UpdateCustomer(Customer customer);
        public Customer GetCustomerByInstanceIdWithJobInformation(int id);
    }
}