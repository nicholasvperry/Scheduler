using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;
using System.Linq;

namespace Scheduler.Repositories
{
    public class UserJobInstanceRepository : BaseReposiroty, IUserJobInstanceRepository
    {
        public UserJobInstanceRepository(IConfiguration config) : base(config) { }

        public List<UserJobInstance> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT uj.id AS UserInstanceId, uj.JobInstanceId, uj.UserId, uj.TimeIn, uj.[TimeOut]
                        FROM UserJobInstance uj";
                    var reader = cmd.ExecuteReader();

                    var userJobInstances = new List<UserJobInstance>();

                    while (reader.Read())
                    {
                        userJobInstances.Add(new UserJobInstance()
                        {
                            Id = DbUtils.GetInt(reader, "UserInstanceId"),
                            JobInstanceId = DbUtils.GetInt(reader, "JobInstanceId"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            TimeIn = DbUtils.GetNullableDateTime(reader, "TimeIn"),
                            TimeOut = DbUtils.GetNullableDateTime(reader, "TimeOut")
                        }
                        );
                    }

                    reader.Close();

                    return userJobInstances;
                }
            }
        }

        public List<UserJobInstance> GetAllByJobId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT uj.Id AS UserInstanceId, uj.JobInstanceId, uj.UserId, uj.TimeIn, uj.[TimeOut],
                        ji.JobId, ji.CompletedDate, ji.Price AS InstancePrice, ji.CurrentRouteOrderNumber, ji.ScheduleDate, ji.IsPaid, ji.CompletedUserId,
                        j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber, j.JobStatusId, j.Price AS JobPrice, j.BillingTypeId,
                        u.FirstName, u.LastName
                        FROM UserJobInstance uj
                        LEFT JOIN JobInstance ji ON uj.JobInstanceId = ji.Id
                        LEFT JOIN Job j ON ji.JobId = j.Id
                        LEFT JOIN [User] u ON uj.UserId = u.Id
                        WHERE JobId =  @id
                        ORDER BY ScheduleDate";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    var userJobInstances = new List<UserJobInstance>();

                    while (reader.Read())
                    {
                        userJobInstances.Add(new UserJobInstance()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("UserInstanceId")),
                            JobInstanceId = DbUtils.GetInt(reader, "JobInstanceId"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            TimeIn = DbUtils.GetNullableDateTime(reader, "TimeIn"),
                            TimeOut = DbUtils.GetNullableDateTime(reader, "TimeOut"),
                            User = new User()
                            {
                                FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                                LastName = DbUtils.GetNullableString(reader, "LastName")
                            },
                            JobInstance = new JobInstance()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("JobInstanceId")),
                                CompletedDate = DbUtils.GetNullableDateTime(reader, "CompletedDate"),
                                Price = DbUtils.GetNullableDecimal(reader, "InstancePrice"),
                                CurrentRouteOrderNumber = DbUtils.GetNullableInt(reader, "CurrentRouteOrderNumber"),
                                ScheduleDate = DbUtils.GetNullableDateTime(reader, "ScheduleDate"),
                                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                                CompletedUserId = DbUtils.GetNullableInt(reader, "CompletedUserId"),
                            },
                            Job = new Job()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("JobId")),
                                Name = reader.GetString(reader.GetOrdinal("JobName")),
                                Details = reader.GetString(reader.GetOrdinal("Details")),
                                CustomerLocationId = reader.GetInt32(reader.GetOrdinal("CustomerLocationId")),
                                RouteOrderNumber = reader.GetInt32(reader.GetOrdinal("RouteOrderNumber")),
                                JobStatusId = reader.GetInt32(reader.GetOrdinal("JobStatusId")),
                                Price = DbUtils.GetNullableDecimal(reader, "JobPrice"),
                                BillingTypeId = reader.GetInt32(reader.GetOrdinal("BillingTypeId"))
                            }
                        }
                        );
                    }

                    reader.Close();

                    return userJobInstances;
                }
            }
        }

        public List<UserJobInstance> GetAllByJobInstanceId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT uj.Id AS UserInstanceId, uj.JobInstanceId, uj.UserId, uj.TimeIn, uj.[TimeOut],
                        ji.JobId, ji.CompletedDate, ji.Price AS InstancePrice, ji.CurrentRouteOrderNumber, ji.ScheduleDate, ji.IsPaid, ji.CompletedUserId,
                        j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber, j.JobStatusId, j.Price AS JobPrice, j.BillingTypeId,
                        u.Id AS UserId, u.FirstName, u.LastName
                        FROM UserJobInstance uj
                        LEFT JOIN JobInstance ji ON uj.JobInstanceId = ji.Id
                        LEFT JOIN Job j ON ji.JobId = j.Id
                        LEFT JOIN [User] u ON uj.UserId = u.Id
                        WHERE JobInstanceId =  @id
                        ORDER BY ScheduleDate";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    var userJobInstances = new List<UserJobInstance>();

                    while (reader.Read())
                    {
                        userJobInstances.Add(new UserJobInstance()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("UserInstanceId")),
                            JobInstanceId = DbUtils.GetInt(reader, "JobInstanceId"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            TimeIn = DbUtils.GetNullableDateTime(reader, "TimeIn"),
                            TimeOut = DbUtils.GetNullableDateTime(reader, "TimeOut"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                                LastName = DbUtils.GetNullableString(reader, "LastName")
                            },
                            JobInstance = new JobInstance()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("JobInstanceId")),
                                CompletedDate = DbUtils.GetNullableDateTime(reader, "CompletedDate"),
                                Price = DbUtils.GetNullableDecimal(reader, "InstancePrice"),
                                CurrentRouteOrderNumber = DbUtils.GetNullableInt(reader, "CurrentRouteOrderNumber"),
                                ScheduleDate = DbUtils.GetNullableDateTime(reader, "ScheduleDate"),
                                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                                CompletedUserId = DbUtils.GetNullableInt(reader, "CompletedUserId"),
                            },
                            Job = new Job()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("JobId")),
                                Name = reader.GetString(reader.GetOrdinal("JobName")),
                                Details = reader.GetString(reader.GetOrdinal("Details")),
                                CustomerLocationId = reader.GetInt32(reader.GetOrdinal("CustomerLocationId")),
                                RouteOrderNumber = reader.GetInt32(reader.GetOrdinal("RouteOrderNumber")),
                                JobStatusId = reader.GetInt32(reader.GetOrdinal("JobStatusId")),
                                Price = DbUtils.GetNullableDecimal(reader, "JobPrice"),
                                BillingTypeId = reader.GetInt32(reader.GetOrdinal("BillingTypeId"))
                            }
                        }
                        );
                    }

                    reader.Close();

                    return userJobInstances;
                }
            }
        }

        public void Add(UserJobInstance userJobInstance)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
                                        OUTPUT INSERTED.ID
                                        VALUES (@JobInstanceId, @UserId, @TimeIn, @TimeOut)";
                    
                    DbUtils.AddParameter(cmd, "@JobInstanceId", userJobInstance.JobInstanceId);
                    DbUtils.AddParameter(cmd, "@UserId", userJobInstance.UserId);
                    DbUtils.AddParameter(cmd, "@TimeIn", userJobInstance.TimeIn);
                    DbUtils.AddParameter(cmd, "@TimeOut", userJobInstance.TimeOut);

                    userJobInstance.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
