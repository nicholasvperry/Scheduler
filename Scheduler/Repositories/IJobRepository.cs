using Scheduler.Models;
using System.Collections.Generic;

namespace Scheduler.Repositories
{
    public interface IJobRepository
    {
        void Add(Job job);
        void DeleteJob(int id);
        List<Job> GetAll();
        List<Job> GetAllJobsByLocationWithCustomer(int customerLocation);
        Job GetJobById(int id);
        public List<Job> GetAllJobsByCustomer(int customerId);
        public void UpdateJob(Job job);
    }
}