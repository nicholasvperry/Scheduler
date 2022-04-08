using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Scheduler.Utils;
using Scheduler.Models;
using System.Linq;

namespace Scheduler.Repositories
{
    public class CustomerRepository : BaseReposiroty, ICustomerRepository
    {
        public CustomerRepository(IConfiguration config) : base(config) { }

        public List<Customer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  Id AS CustomerId, FirstName, LastName, PhoneNumber, Email, CreateDateTime 
                        FROM Customer
                        ORDER BY LastName";
                    var reader = cmd.ExecuteReader();

                    var customers = new List<Customer>();

                    while (reader.Read())
                    {
                        customers.Add(NewCustomerFromReader(reader));
                    }

                    reader.Close();

                    return customers;
                }
            }
        }

        public Customer GetCustomerByIdWithJobInformation(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email, c.CreateDateTime, 
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          j.Id AS JobId, j.[Name] AS JobName, j.Details AS JobDetails, j.CustomerLocationId, j.RouteOrderNumber, j.JobStatusId, j.Price, j.BillingTypeId,
                       ji.Id as InstanceId, ji.CompletedDate, ji.Price, ji.CurrentRouteOrderNumber, ji.ScheduleDate, ji.IsPaid, ji.CompletedUserId
                       FROM Customer c
                       LEFT JOIN CustomerLocation cl ON c.Id = cl.CustomerId
                       LEFT JOIN Job j ON cl.Id = j.CustomerLocationId
                       LEFT JOIN JobInstance ji ON j.Id = ji.JobId
                        WHERE c.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    //Make a customer variable
                    Customer customer = null;

                    //Has to be a while loop for adding multiple things
                    while (reader.Read())
                    {

                        //Customer value is null to start. If customer is null add a customer
                        //Once a customer is added and is no longer null got to add locations to list
                        if (customer == null)
                        {
                            customer = new Customer()
                            {
                                Id = id,
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                //while loop if (customerlocationid not null add to customerlocaqtion list
                                CustomerLocations = new List<CustomerLocation>()

                            };

                        }

                            //Query pulls back customers, locations, jobs, and job instances
                            //Check to see if there is a locationId for the customer. Some customer may not have a locations which will return a null value 
                            //int? needs ? in case the value is null
                            //GetNullibleInt will check for int but also allow a null value to be returned without causing a database issue
                            int? locationId = DbUtils.GetNullableInt(reader, "LocationId");
                            
                            //Looks through the CustomerLocations list to see if the l.id value is already in the CustomerLocations list. If it is then move to next location
                            //Ask Jordan what exactly this is doing
                            CustomerLocation existingLocation = customer.CustomerLocations.FirstOrDefault(l => l.Id == locationId);

                            //Check to see if the value for LocationId is null
                            //Check to see if there is a value in existingLocation
                            if (DbUtils.IsNotDbNull(reader, "LocationId") && existingLocation == null)
                            {
                                //Make a location to add the the list
                                existingLocation = new CustomerLocation()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("LocationId")),
                                    Name = reader.GetString(reader.GetOrdinal("LocationName")),
                                    StreetAddress = reader.GetString(reader.GetOrdinal("StreetAddress")),
                                    City = reader.GetString(reader.GetOrdinal("City")),
                                    State = reader.GetString(reader.GetOrdinal("State")),
                                    Zip = reader.GetString(reader.GetOrdinal("Zip")),
                                    CustomerId = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                                    Jobs = new List<Job>()
                                };
                                //Add this location to CustomerLocations list in customer object
                                customer.CustomerLocations.Add(existingLocation);
                            }

                                //Look for JobId int value which can be null. 
                                //int? needs ? in case there is no int value but a null value. If there is no ? it will throw an error. Also needs GetNullableInt method.                             
                                int? jobId = DbUtils.GetNullableInt(reader, "JobId");
                                
                                //Look through jobs list in the location object to see if the list contains a job with the same id
                                Job existingJob = existingLocation.Jobs.FirstOrDefault(j => j.Id == jobId);
                                
                                if (DbUtils.IsNotDbNull(reader, "JobId") && existingJob == null)
                                {
                                    
                                    existingJob = new Job()
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("JobId")),
                                        Name = reader.GetString(reader.GetOrdinal("JobName")),
                                        Details = reader.GetString(reader.GetOrdinal("JobDetails")),
                                        CustomerLocationId = reader.GetInt32(reader.GetOrdinal("CustomerLocationId")),
                                        RouteOrderNumber = reader.GetInt32(reader.GetOrdinal("RouteOrderNumber")),
                                        JobStatusId = reader.GetInt32(reader.GetOrdinal("JobStatusId")),
                                        Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                        BillingTypeId = reader.GetInt32(reader.GetOrdinal("BillingTypeId")),
                                        JobInstances = new List<JobInstance>()

                                    };
                                    //once existingJob is make add to existingLocation Jobs list
                                    existingLocation.Jobs.Add(existingJob);
                                }

                                //Check to see if the InstanceId is null. If it is not the make ovject and add to the job instance list on the existingJob object
                                if (DbUtils.IsNotDbNull(reader, "InstanceId"))
                                {
                                    existingJob.JobInstances.Add(new JobInstance()
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("InstanceId")),
                                        JobId = reader.GetInt32(reader.GetOrdinal("JobId")),
                                        CompletedDate = DbUtils.GetNullableDateTime(reader, "CompletedDate"),
                                        Price = DbUtils.GetNullableDecimal(reader, "Price"),
                                        CurrentRouteOrderNumber = DbUtils.GetNullableInt(reader, "CurrentRouteOrderNumber"),
                                        ScheduleDate = DbUtils.GetNullableDateTime(reader, "ScheduleDate"),
                                        IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                                        CompletedUserId = DbUtils.GetNullableInt(reader, "CompletedUserId"),

                                    });
                                }
                    }
                    reader.Close();

                    return customer;
                }
            }
        }

        public Customer GetCustomerByInstanceIdWithJobInformation(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  c.Id AS CustomerId, c.FirstName, c.LastName, c.PhoneNumber, c.Email, c.CreateDateTime, 
                          cl.Id AS LocationId, cl.Name AS LocationName, cl.StreetAddress, cl.City, cl.State, cl.Zip,
                          j.Id AS JobId, j.[Name] AS JobName, j.Details AS JobDetails, j.CustomerLocationId, j.RouteOrderNumber, j.JobStatusId, j.Price, j.BillingTypeId,
                       ji.Id as InstanceId, ji.CompletedDate, ji.Price, ji.CurrentRouteOrderNumber, ji.ScheduleDate, ji.IsPaid, ji.CompletedUserId,
                       u.FirstName, u.LastName
                       FROM Customer c
                       LEFT JOIN CustomerLocation cl ON c.Id = cl.CustomerId
                       LEFT JOIN Job j ON cl.Id = j.CustomerLocationId
                       LEFT JOIN JobInstance ji ON j.Id = ji.JobId
                       LEFT JOIN [User] u on ji.CompletedUserId = u.Id
                        WHERE ji.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    //Make a customer variable
                    Customer customer = null;

                    //Has to be a while loop for adding multiple things
                    while (reader.Read())
                    {

                        //Customer value is null to start. If customer is null add a customer
                        //Once a customer is added and is no longer null got to add locations to list
                        if (customer == null)
                        {
                            customer = new Customer()
                            {
                                Id = id,
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                //while loop if (customerlocationid not null add to customerlocaqtion list
                                CustomerLocations = new List<CustomerLocation>()

                            };

                        }

                        //Query pulls back customers, locations, jobs, and job instances
                        //Check to see if there is a locationId for the customer. Some customer may not have a locations which will return a null value 
                        //int? needs ? in case the value is null
                        //GetNullibleInt will check for int but also allow a null value to be returned without causing a database issue
                        int? locationId = DbUtils.GetNullableInt(reader, "LocationId");

                        //Looks through the CustomerLocations list to see if the l.id value is already in the CustomerLocations list. If it is then move to next location
                        //Ask Jordan what exactly this is doing
                        CustomerLocation existingLocation = customer.CustomerLocations.FirstOrDefault(l => l.Id == locationId);

                        //Check to see if the value for LocationId is null
                        //Check to see if there is a value in existingLocation
                        if (DbUtils.IsNotDbNull(reader, "LocationId") && existingLocation == null)
                        {
                            //Make a location to add the the list
                            existingLocation = new CustomerLocation()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("LocationId")),
                                Name = reader.GetString(reader.GetOrdinal("LocationName")),
                                StreetAddress = reader.GetString(reader.GetOrdinal("StreetAddress")),
                                City = reader.GetString(reader.GetOrdinal("City")),
                                State = reader.GetString(reader.GetOrdinal("State")),
                                Zip = reader.GetString(reader.GetOrdinal("Zip")),
                                CustomerId = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                                Jobs = new List<Job>()
                            };
                            //Add this location to CustomerLocations list in customer object
                            customer.CustomerLocations.Add(existingLocation);
                        }

                        //Look for JobId int value which can be null. 
                        //int? needs ? in case there is no int value but a null value. If there is no ? it will throw an error. Also needs GetNullableInt method.                             
                        int? jobId = DbUtils.GetNullableInt(reader, "JobId");

                        //Look through jobs list in the location object to see if the list contains a job with the same id
                        Job existingJob = existingLocation.Jobs.FirstOrDefault(j => j.Id == jobId);

                        if (DbUtils.IsNotDbNull(reader, "JobId") && existingJob == null)
                        {

                            existingJob = new Job()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("JobId")),
                                Name = reader.GetString(reader.GetOrdinal("JobName")),
                                Details = reader.GetString(reader.GetOrdinal("JobDetails")),
                                CustomerLocationId = reader.GetInt32(reader.GetOrdinal("CustomerLocationId")),
                                RouteOrderNumber = reader.GetInt32(reader.GetOrdinal("RouteOrderNumber")),
                                JobStatusId = reader.GetInt32(reader.GetOrdinal("JobStatusId")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                BillingTypeId = reader.GetInt32(reader.GetOrdinal("BillingTypeId")),
                                JobInstances = new List<JobInstance>()

                            };
                            //once existingJob is make add to existingLocation Jobs list
                            existingLocation.Jobs.Add(existingJob);
                        }

                        //Check to see if the InstanceId is null. If it is not the make ovject and add to the job instance list on the existingJob object
                        if (DbUtils.IsNotDbNull(reader, "InstanceId"))
                        {
                            existingJob.JobInstances.Add(new JobInstance()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("InstanceId")),
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
                            });
                        }
                    }
                    reader.Close();

                    return customer;
                }
            }
        }

        public void Add(Customer customer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Customer (FirstName, LastName, PhoneNumber, Email)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @PhoneNumber, @Email)";

                    DbUtils.AddParameter(cmd, "@FirstName", customer.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", customer.LastName);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", customer.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Email", customer.Email);

                    customer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void DeleteCustomer(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Comment WHERE CustomerId = @Id
                                        
                                        DELETE FROM Customer WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Customer NewCustomerFromReader(SqlDataReader reader)
        {
            return new Customer()
            {
                Id = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"))
            };
        }

        
        public void UpdateCustomer(Customer customer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           UPDATE Customer
                            SET FirstName = @firstName, 
                            LastName = @LastName,
                            PhoneNumber = @PhoneNumber,
                            Email = @Email,
                            CreateDateTime = @CreateDateTime
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@FirstName", customer.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", customer.LastName);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", customer.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Email", customer.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", customer.CreateDateTime);

                    DbUtils.AddParameter(cmd, "@id", customer.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
