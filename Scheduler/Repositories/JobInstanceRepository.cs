using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;

namespace Scheduler.Repositories
{
    public class JobInstanceRepository : BaseReposiroty, IJobInstanceRepository
    {
        public JobInstanceRepository(IConfiguration config) : base(config) { }

        public List<JobInstance> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId
                        FROM JobInstance";
                    var reader = cmd.ExecuteReader();

                    var jobInstances = new List<JobInstance>();

                    while (reader.Read())
                    {
                        jobInstances.Add(NewInstanceFromReader(reader));
                    }

                    reader.Close();

                    return jobInstances;
                }
            }
        }

        public List<JobInstance> GetAllByJobId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId
                        FROM JobInstance
                        WHERE JobId = @id";
                    
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var jobInstances = new List<JobInstance>();

                    while (reader.Read())
                    {
                        jobInstances.Add(NewInstanceFromReader(reader));
                    }

                    reader.Close();

                    return jobInstances;
                }
            }
        }





        private JobInstance NewInstanceFromReader(SqlDataReader reader)
        {
            return new JobInstance()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                JobId = reader.GetInt32(reader.GetOrdinal("JobId")),
                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                CurrentRouteOrderNumber = reader.GetInt32(reader.GetOrdinal("CurrentRouteOrderNumber")),
                ScheduleDate = reader.GetDateTime(reader.GetOrdinal("ScheduleDate")),
                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                CompletedUserId = reader.GetInt32(reader.GetOrdinal("CompletedUserId"))
            };
        }
    }
}
