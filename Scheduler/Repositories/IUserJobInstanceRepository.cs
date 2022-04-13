using Scheduler.Models;
using System.Collections.Generic;

namespace Scheduler.Repositories
{
    public interface IUserJobInstanceRepository
    {
        void Add(UserJobInstance userJobInstance);
        List<UserJobInstance> GetAll();
        List<UserJobInstance> GetAllByJobId(int id);
        public List<UserJobInstance> GetAllByJobInstanceId(int id);
    }
}