using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;
using System.Linq;

namespace Scheduler.Repositories
{
    public class CustomerLocationReposirory : BaseReposiroty, ICustomerLocationReposirory
    {
        public CustomerLocationReposirory(IConfiguration configuration) : base(configuration) { }

        public void Add(CustomerLocation customerLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @CustomerId, @StreetAddress, @City, @State, @Zip)";

                    DbUtils.AddParameter(cmd, "@Name", customerLocation.Name);
                    DbUtils.AddParameter(cmd, "@CustomerId", customerLocation.CustomerId);
                    DbUtils.AddParameter(cmd, "@StreetAddress", customerLocation.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", customerLocation.City);
                    DbUtils.AddParameter(cmd, "@State", customerLocation.State);
                    DbUtils.AddParameter(cmd, "@Zip", customerLocation.Zip);

                    customerLocation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
