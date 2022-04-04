using Scheduler.Models;
using System.Collections.Generic;

namespace Scheduler.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Deactivate(int id);
        List<User> GetAdminProfiles();
        List<User> GetAll();
        User GetByEmail(string email);
        User GetById(int id);
        List<UserType> GetUserTypes();
        void Reactivate(int id);
        void UpdateUserType(User user);
    }
}