using Scheduler.Models;
using System.Collections.Generic;

namespace Scheduler.Repositories
{
    public interface IJobInstanceRepository
    {
        public List<JobInstance> GetAll();
        List<JobInstance> GetAllByJobId(int id);
    }
}