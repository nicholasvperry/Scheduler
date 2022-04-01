CREATE TABLE [User] (
  [id] int PRIMARY KEY,
  [email] nvarchar(255),
  [name] nvarchar(255),
  [userTypeId] int
)
GO

CREATE TABLE [UserType] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255)
)
GO

CREATE TABLE [Customer] (
  [id] int PRIMARY KEY,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [phoneNumber] int,
  [email] nvarchar(255)
)
GO

CREATE TABLE [CustomerLocation] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [customerId] int,
  [streetAddress] nvarchar(255),
  [city] nvarchar(255),
  [state] nvarchar(255),
  [zip] int,
  [isBilling] bit
)
GO

CREATE TABLE [Job] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [details] nvarchar(255),
  [CustomerLocationId] int,
  [billingTypeId] int,
  [routeOrderNumber] int
)
GO

CREATE TABLE [JobInstance] (
  [id] int PRIMARY KEY,
  [jobId] int,
  [completedDate] datetime,
  [price] int,
  [currentRouteOrderNumber] int,
  [scheduleDate] datetime,
  [isPaid] bit,
  [completedUserId] int
)
GO

CREATE TABLE [UserJobInstance] (
  [id] int PRIMARY KEY,
  [JobInstanceId] int,
  [UserId] int,
  [timeIn] datetime,
  [timeOut] datetime
)
GO

CREATE TABLE [TimeSheet] (
  [id] int PRIMARY KEY,
  [JobInstanceId] int,
  [UserId] int,
  [timeIn] datetime,
  [timeOut] datetime
)
GO

ALTER TABLE [CustomerLocation] ADD FOREIGN KEY ([customerId]) REFERENCES [Customer] ([id])
GO

ALTER TABLE [Job] ADD FOREIGN KEY ([CustomerLocationId]) REFERENCES [CustomerLocation] ([id])
GO

ALTER TABLE [JobInstance] ADD FOREIGN KEY ([jobId]) REFERENCES [Job] ([id])
GO

ALTER TABLE [User] ADD FOREIGN KEY ([userTypeId]) REFERENCES [UserType] ([id])
GO

ALTER TABLE [UserJobInstance] ADD FOREIGN KEY ([JobInstanceId]) REFERENCES [JobInstance] ([id])
GO

ALTER TABLE [UserJobInstance] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([id])
GO

ALTER TABLE [TimeSheet] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([id])
GO
