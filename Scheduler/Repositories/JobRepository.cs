using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;

namespace Scheduler.Repositories
{
    public class JobRepository : BaseReposiroty, IJobRepository
    {
        public JobRepository(IConfiguration config) : base(config) { }
        public List<Job> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              
                        SELECT j.Id AS JobId, j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber,
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email
                       FROM Job j
                       LEFT JOIN CustomerLocation cl ON j.CustomerLocationId = cl.Id
                       LEFT JOIN Customer c ON cl.CustomerId = c.Id";
                    var reader = cmd.ExecuteReader();

                    var jobs = new List<Job>();

                    while (reader.Read())
                    {
                        jobs.Add(NewJobFromReader(reader));
                    }

                    reader.Close();

                    return jobs;
                }
            }
        }

        public Job GetJobById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT j.Id AS JobId, j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber,
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email
                       FROM Job j
                       LEFT JOIN CustomerLocation cl ON j.CustomerLocationId = cl.Id
                       LEFT JOIN Customer c ON cl.CustomerId = c.Id
                        WHERE j.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Job job = null;

                    if (reader.Read())
                    {
                        job = NewJobFromReader(reader);
                    }

                    reader.Close();

                    return job;
                }
            }
        }


        public List<Job> GetAllJobsByLocationWithCustomer(int customerLocationId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT j.Id AS JobId, j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber,
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email
                       FROM Job j
                       LEFT JOIN CustomerLocation cl ON j.CustomerLocationId = cl.Id
                       LEFT JOIN Customer c ON cl.CustomerId = c.Id
                        WHERE cl.id = @customerLocationId";

                    cmd.Parameters.AddWithValue("@customerLocationId", customerLocationId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Job>();

                    while (reader.Read())
                    {
                        posts.Add(NewJobFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        public List<Job> GetAllJobsByCustomer(int customerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT j.Id AS JobId, j.[Name] AS JobName, j.Details, j.CustomerLocationId, j.RouteOrderNumber,
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email
                       FROM Job j
                       LEFT JOIN CustomerLocation cl ON j.CustomerLocationId = cl.Id
                       LEFT JOIN Customer c ON cl.CustomerId = c.Id
                        WHERE c.Id = @customerId";

                    cmd.Parameters.AddWithValue("@customerId", customerId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Job>();

                    while (reader.Read())
                    {
                        posts.Add(NewJobFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }



        public void Add(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Job ([Name], Details, CustomerLocationId, RouteOrderNumber)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Details, @CustomerLocationId, @RouteOrderNumber)";

                    DbUtils.AddParameter(cmd, "@Name", job.Name);
                    DbUtils.AddParameter(cmd, "@Details", job.Details);
                    DbUtils.AddParameter(cmd, "@CustomerLocationId", job.CustomerLocationId);
                    DbUtils.AddParameter(cmd, "@RouteOrderNumber", job.RouteOrderNumber);

                    job.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void DeleteJob(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Comment WHERE JobId = @Id
                                        
                                        DELETE FROM Job WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Job NewJobFromReader(SqlDataReader reader)
        {
            return new Job()
            {
                Id = reader.GetInt32(reader.GetOrdinal("JobId")),
                Name = reader.GetString(reader.GetOrdinal("JobName")),
                Details = reader.GetString(reader.GetOrdinal("Details")),
                CustomerLocationId = reader.GetInt32(reader.GetOrdinal("CustomerLocationId")),
                RouteOrderNumber = reader.GetInt32(reader.GetOrdinal("RouteOrderNumber")),
                CustomerLocation = new CustomerLocation()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("LocationId")),
                    Name = reader.GetString(reader.GetOrdinal("LocationName")),
                    StreetAddress = reader.GetString(reader.GetOrdinal("StreetAddress")),
                    City = reader.GetString(reader.GetOrdinal("City")),
                    State = reader.GetString(reader.GetOrdinal("State")),
                    Zip = reader.GetString(reader.GetOrdinal("Zip")),
                    CustomerId = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                    Customer = new Customer()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                    }
                },

            };
        }
    }
}
