using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Scheduler.Repositories
{
    public abstract class BaseReposiroty
    {
        private readonly string _connectionString;

        public BaseReposiroty(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}
