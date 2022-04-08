CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Email] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [UserTypeId] int
)
GO

CREATE TABLE [UserNote] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [Details] nvarchar(255),
  [CreateDateTime] datetime,
  [UserCreatedId] int
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Customer] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [PhoneNumber] nvarchar(255),
  [Email] nvarchar(255),
  [CreateDateTime] datetime
)
GO

CREATE TABLE [CustomerNote] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [CustomerId] int,
  [Details] nvarchar(255),
  [CreateDateTime] datetime
)
GO

CREATE TABLE [CustomerLocation] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [CustomerId] int,
  [StreetAddress] nvarchar(255),
  [City] nvarchar(255),
  [State] nvarchar(255),
  [Zip] nvarchar(255)
)
GO

CREATE TABLE [Job] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [Details] nvarchar(255),
  [CustomerLocationId] int,
  [RouteOrderNumber] int,
  [JobStatusId] int,
  [Price] decimal,
  [BillingTypeId] int
)
GO

CREATE TABLE [JobStatus] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [JobBillingType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [JobInstance] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [JobId] int,
  [CompletedDate] datetime,
  [Price] decimal,
  [CurrentRouteOrderNumber] int,
  [ScheduleDate] datetime,
  [IsPaid] bit,
  [CompletedUserId] int
)
GO

CREATE TABLE [JobNote] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [JobId] int,
  [Details] nvarchar(255),
  [CreateDateTime] datetime
)
GO

CREATE TABLE [UserJobInstance] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [JobInstanceId] int,
  [UserId] int,
  [TimeIn] datetime,
  [TimeOut] datetime
)
GO

CREATE TABLE [TimeSheet] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [JobInstanceId] int,
  [UserId] int,
  [TimeIn] datetime,
  [TimeOut] datetime
)
GO

ALTER TABLE [CustomerLocation] ADD FOREIGN KEY ([CustomerId]) REFERENCES [Customer] ([Id])
GO

ALTER TABLE [Job] ADD FOREIGN KEY ([CustomerLocationId]) REFERENCES [CustomerLocation] ([Id])
GO

ALTER TABLE [JobInstance] ADD FOREIGN KEY ([JobId]) REFERENCES [Job] ([Id])
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [UserJobInstance] ADD FOREIGN KEY ([JobInstanceId]) REFERENCES [JobInstance] ([Id])
GO

ALTER TABLE [UserJobInstance] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [TimeSheet] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Job] ADD FOREIGN KEY ([JobStatusId]) REFERENCES [JobStatus] ([Id])
GO

ALTER TABLE [UserNote] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [JobNote] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [CustomerNote] ADD FOREIGN KEY ([CustomerId]) REFERENCES [Customer] ([Id])
GO

ALTER TABLE [CustomerNote] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Job] ADD FOREIGN KEY ([BillingTypeId]) REFERENCES [JobBillingType] ([Id])
GO

ALTER TABLE [JobNote] ADD FOREIGN KEY ([JobId]) REFERENCES [Job] ([Id])
GO

ALTER TABLE [UserNote] ADD FOREIGN KEY ([UserCreatedId]) REFERENCES [User] ([Id])
GO
