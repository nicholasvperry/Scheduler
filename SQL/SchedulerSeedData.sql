INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Jenny', 'Weasley', '3045555555', 'jenny@weasley.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Luna', 'Lovegood', '3046789101', 'luna@lovegood.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Cho', 'Chang', '8017835972', 'cho@chang.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Albus', 'Dumbledore', '9882829753', 'albus@dumgledore.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Neville', 'Longbottom', '3041234567', 'neville@longbottom.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Rubeus', 'Hagrid', '3041235678', 'rubeus@hagrid.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Minerva', 'McGonagall', '3047654321', 'minerva@mcgonagall.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Remus', 'Lupin', '3045887324', 'remus@lupin.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Bellatrix', 'Lestrange', '6666666666', 'bellatrix@lestrange.com', GETDATE())

INSERT INTO [Customer] (FirstName, LastName, PhoneNumber, Email, CreateDateTime)
VALUES ('Alastor', 'Moody', '3041234567', 'alastor@moody.com', GETDATE())

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 1, '1234 Main Street', 'Barboursville', 'WV', '25504')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Farm', 1, '498 Robinhood Way', 'Barboursville', 'WV', '25504')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 2, '6205 Running Street', 'Barboursville', 'WV', '25504')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 3, '1992 Big Chimney', 'Charleston', 'WV', '25705')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 4, '8667 Lollipop Way', 'Logan', 'UT', '84604')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 5, '1 Closet Street', 'Whoville', 'TX', '89634')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 6, '3572 Robinhood Road', 'Las Vegas', 'NV', '98327')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 7, '259 Oak Tree Hill', 'Rockwell', 'MN', '67321')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 8, '1133 Italy Street', 'Little Italy', 'NY', '83483')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 9, '3572 Trolly Ln', 'Barboursville', 'WV', '59872')

INSERT INTO CustomerLocation ([Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES ('Home', 10, '82534 Current Road', 'Huntington', 'WV', '25705')

INSERT INTO UserType (Name)
VALUES ('Admin')

INSERT INTO UserType (Name)
VALUES ('Crew Lead')

INSERT INTO UserType (Name)
VALUES ('Tech')

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('aelin@galathynius.com', 'Aelin', 'Galathynius', 1)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('rowan@whitethorn.com', 'Rowan', 'Whitethorn', 1)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('dorian@havillard.com', 'Dorian', 'Havillard', 2)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('manon@blackbeak.com', 'Manon', 'Blackbeak', 2)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('chaol@westfall.com', 'Chaol', 'Westfall', 2)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('aedion@ashryver.com', 'Aedion', 'Ashryver', 3)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('lorcan@salvaterre.com', 'Lorcan', 'Salvaterre', 3)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('elide@lochan.com', 'Elide', 'Lochan', 3)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('murtaugh@allsbrook.com', 'Murtaugh', 'Allsbrook', 3)

INSERT INTO [User] (Email, FirstName, LastName, UserTypeId)
VALUES ('nox@owen.com', 'Nox', 'Owen', 3)

INSERT INTO JobStatus ([Name])
VALUES ('Active')

INSERT INTO JobStatus ([Name])
VALUES ('InActive')

INSERT INTO JobBillingType ([Name])
VALUES ('Weekly')

INSERT INTO JobBillingType ([Name])
VALUES ('Monthly')

INSERT INTO Job([Name], Details, CustomerLocationId, RouteOrderNumber, JobStatusId, Price, BillingTypeId)
VALUES ('Weekly Mowing 3.5"', 'Mow yard diagonal', 1, 1, 1, 45, 1)

INSERT INTO Job([Name], Details, CustomerLocationId, RouteOrderNumber, JobStatusId, Price, BillingTypeId)
VALUES ('Weekly Mowing 2.5"', 'Watch out for tree stumps', 2, 2, 2, 10000, 2)

INSERT INTO Job([Name], Details, CustomerLocationId, RouteOrderNumber, JobStatusId, Price, BillingTypeId)
VALUES ('Bi-Weekly Mowing 3.25"', 'It gets really tall behind the fence', 2, 2, 1, 55, 1)

INSERT INTO Job([Name], Details, CustomerLocationId, RouteOrderNumber, JobStatusId, Price, BillingTypeId)
VALUES ('Monthly trimming"', 'Trim back hill', 11, 1, 1, 75, 1)

INSERT INTO Job([Name], Details, CustomerLocationId, RouteOrderNumber, JobStatusId, Price, BillingTypeId)
VALUES ('Monthly trimming"', 'Trim back hill', 1, 1, 1, 150, 1)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, GETDATE(), NULL, 1, GETDATE(), 0, 1)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, NULL, NULL, NULL, GETDATE(), 0, NULL)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, NULL, NULL, NULL, NULL, 0, NULL)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, GETDATE(), NULL, NULL, GETDATE(), 0, 2)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, NULL, NULL, NULL, NULL, 0, NULL)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (1, GETDATE(), NULL, NULL, GETDATE(), 0, 1)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (2, NULL, NULL, NULL, NULL, 0, NULL)

INSERT INTO JobInstance(JobId, CompletedDate, Price, CurrentRouteOrderNumber, ScheduleDate, IsPaid, CompletedUserId)
VALUES (2, GETDATE(), NULL, NULL, GETDATE(), 0, 1)

INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (1, 1, null, null)
INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (1, 2, null, null)
INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (1, 3, null, null)
INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (2, 1, null, null)
INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (2, 2, null, null)
INSERT INTO UserJobInstance(JobInstanceId, UserId, TimeIn, [TimeOut])
VALUES (2, 3, null, null)