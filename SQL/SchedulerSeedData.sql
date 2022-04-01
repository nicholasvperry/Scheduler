INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (1, 'Jenny', 'Weasley', '3045555555', 'jenny@weasley.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (2, 'Luna', 'Lovegood', '3046789101', 'luna@lovegood.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (3, 'Cho', 'Chang', '8017835972', 'cho@chang.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (4, 'Albus', 'Dumbledore', '9882829753', 'albus@dumgledore.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (5, 'Neville', 'Longbottom', '3041234567', 'neville@longbottom.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (6, 'Rubeus', 'Hagrid', '3041235678', 'rubeus@hagrid.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (7, 'Minerva', 'McGonagall', '3047654321', 'minerva@mcgonagall.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (8, 'Remus', 'Lupin', '3045887324', 'remus@lupin.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (9, 'Bellatrix', 'Lestrange', '6666666666', 'bellatrix@lestrange.com')

INSERT INTO [Customer] (Id, FirstName, LastName, PhoneNumber, Email)
VALUES (10, 'Alastor', 'Moody', '3041234567', 'alastor@moody.com')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (1, 'Home', 1, '1234 Main Street', 'Barboursville', 'WV', '25504')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (2, 'Home', 2, '6205 Running Street', 'Barboursville', 'WV', '25504')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (3, 'Home', 3, '1992 Big Chimney', 'Charleston', 'WV', '25705')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (4, 'Home', 4, '8667 Lollipop Way', 'Logan', 'UT', '84604')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (5, 'Home', 5, '1 Closet Street', 'Whoville', 'TX', '89634')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (6, 'Home', 6, '3572 Robinhood Road', 'Las Vegas', 'NV', '98327')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (7, 'Home', 7, '259 Oak Tree Hill', 'Rockwell', 'MN', '67321')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (8, 'Home', 8, '1133 Italy Street', 'Little Italy', 'NY', '83483')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (9, 'Home', 9, '3572 Trolly Ln', 'Barboursville', 'WV', '59872')

INSERT INTO CustomerLocation (Id, [Name], CustomerId, StreetAddress, City, [State], Zip)
VALUES (10, 'Home', 10, '82534 Current Road', 'Huntington', 'WV', '25705')

INSERT INTO UserType (Id, Name)
VALUES (1, 'Admin')

INSERT INTO UserType (Id, Name)
VALUES (2, 'Crew Lead')

INSERT INTO UserType (Id, Name)
VALUES (3, 'Tech')

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (1, 'aelin@galathynius.com', 'Aelin', 'Galathynius', 1)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (2, 'rowan@whitethorn.com', 'Rowan', 'Whitethorn', 1)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (3, 'dorian@havillard.com', 'Dorian', 'Havillard', 2)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (4, 'manon@blackbeak.com', 'Manon', 'Blackbeak', 2)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (5, 'chaol@westfall.com', 'Chaol', 'Westfall', 2)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (6, 'aedion@ashryver.com', 'Aedion', 'Ashryver', 3)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (7, 'lorcan@salvaterre.com', 'Lorcan', 'Salvaterre', 3)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (8, 'elide@lochan.com', 'Elide', 'Lochan', 3)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (9, 'murtaugh@allsbrook.com', 'Murtaugh', 'Allsbrook', 3)

INSERT INTO [User] (Id, Email, FirstName, LastName, UserTypeId)
VALUES (10, 'nox@owen.com', 'Nox', 'Owen', 3)
