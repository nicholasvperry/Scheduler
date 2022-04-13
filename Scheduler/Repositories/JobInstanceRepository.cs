using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;
using System.Linq;

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
                        SELECT ji.Id, ji.JobId, ji.CompletedDate, ji.Price, ji.CurrentRouteOrderNumber, ji.ScheduleDate, ji.IsPaid, ji.CompletedUserId,
                          u.FirstName, u.LastName
                        FROM JobInstance ji
                        LEFT JOIN [User] u ON ji.CompletedUserId = u.Id
                        WHERE JobId =  @id
                        ORDER BY ScheduleDate";
                    
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var jobInstances = new List<JobInstance>();

                    while (reader.Read())
                    {
                        jobInstances.Add(new JobInstance()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                JobId = reader.GetInt32(reader.GetOrdinal("JobId")),
                                CompletedDate = DbUtils.GetNullableDateTime(reader, "CompletedDate"),
                                Price = DbUtils.GetNullableDecimal(reader, "Price"),
                                CurrentRouteOrderNumber = DbUtils.GetNullableInt(reader, "CurrentRouteOrderNumber"),
                                ScheduleDate = DbUtils.GetNullableDateTime(reader, "ScheduleDate"),
                                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                                CompletedUserId = DbUtils.GetNullableInt(reader, "CompletedUserId"),
                                User = new User()
                                {
                                    FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                                    LastName = DbUtils.GetNullableString(reader, "LastName")
                                }
                            }
                        );
                    }

                    reader.Close();

                    return jobInstances;
                }
            }
        }

        public void Add(JobInstance jobInstance)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@JobId, @CompletedDate, @Price, 
                                                @CurrentRouteOrderNumber, @ScheduleDate, @IsPaid, @CompletedUserId)";
                    
                    DbUtils.AddParameter(cmd, "@JobId", jobInstance.JobId);
                    DbUtils.AddParameter(cmd, "@CompletedDate", jobInstance.CompletedDate);
                    DbUtils.AddParameter(cmd, "@Price", jobInstance.Price);
                    DbUtils.AddParameter(cmd, "@CurrentRouteOrderNumber", jobInstance.CurrentRouteOrderNumber);
                    DbUtils.AddParameter(cmd, "@ScheduleDate", jobInstance.ScheduleDate);
                    DbUtils.AddParameter(cmd, "@IsPaid", jobInstance.IsPaid);
                    DbUtils.AddParameter(cmd, "@CompletedUserId", jobInstance.CompletedUserId);

                    jobInstance.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        private JobInstance NewInstanceFromReader(SqlDataReader reader)
        {
            return new JobInstance()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                JobId = reader.GetInt32(reader.GetOrdinal("JobId")),
                CompletedDate = DbUtils.GetNullableDateTime(reader, "CompletedDate"),
                Price = DbUtils.GetNullableDecimal(reader, "Price"),
                CurrentRouteOrderNumber = DbUtils.GetNullableInt(reader, "CurrentRouteOrderNumber"),
                ScheduleDate = DbUtils.GetNullableDateTime(reader, "ScheduleDate"),
                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                CompletedUserId = DbUtils.GetNullableInt(reader, "CompletedUserId")
            };
        }
    }
}
