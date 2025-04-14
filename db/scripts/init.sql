DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(255),
  Email varchar(255),
  Password varchar(255),
  PRIMARY KEY (Id)
)
;

INSERT INTO Users (Name,Email, Password)
VALUES ('Yodi','yodi.vandenhende@gmail.com', 'Tester@123'),
('Player2','yodi.vandenhende+player2@gmail.com', 'Tester@123'),
('Player3','yodi.vandenhende+player3@gmail.com', 'Tester@123'),
('Player4','yodi.vandenhende+player4@gmail.com', 'Tester@123'),
('Extra5','yodi.vandenhende+extra5@gmail.com', 'Tester@123'),
('Extra6','yodi.vandenhende+extra6@gmail.com', 'Tester@123'),
('Extra7','yodi.vandenhende+extra7@gmail.com', 'Tester@123')
;

DROP TABLE IF EXISTS Admins;
CREATE TABLE Admins(
  UserId int,
  PRIMARY KEY (UserId)
)
;

INSERT INTO Admins (UserId)
VALUES (1)
;


DROP TABLE IF EXISTS Characters;
CREATE TABLE Characters (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(254),
  Owner int,
  CurrentHp int,
  MaxHp int,
  PRIMARY KEY (Id),
  FOREIGN KEY (Owner) REFERENCES Users(Id)
)
;

INSERT INTO Characters (Name, Owner, CurrentHP, MaxHP)
VALUES ('Bob', 2, 10, 10),
('Alice', 3, 10, 10),
('Eve', 4, 10, 10),
('Mallory', 2, 10, 10),
('Patric', 2, 10, 10)
;

DROP TABLE IF EXISTS Party;
CREATE TABLE Party (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(254),
  PRIMARY KEY (Id)
)
;

INSERT INTO Party (Name)
VALUES ('Party 1'),
('Party 2')
;

DROP TABLE IF EXISTS Party_Members;
CREATE TABLE Party_Members (
  Party int,
  Member int,
  CONSTRAINT PK_Party_Members PRIMARY KEY (Party, Member),
  FOREIGN KEY (Party) REFERENCES Party(Id),
  FOREIGN KEY (Member) REFERENCES Characters(Id)
)
;

INSERT INTO Party_Members (Party, Member)
VALUES (1, 1),
(1, 2),
(2, 4)
;

DROP TABLE IF EXISTS Events;
CREATE TABLE Events (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(254),
  StartTime datetime,
  EndTime datetime,
  PRIMARY KEY (Id)
)
;

INSERT INTO Events (Name, StartTime, EndTime)
VALUES ('Event 1', '2023-10-01 10:00:00', '2023-10-03 12:00:00')
;

DROP TABLE IF EXISTS Event_Participants;
CREATE TABLE Event_Participants (
  `Event` int,
  User int,
  `Character` int DEFAULT NULL,
  CONSTRAINT PK_Event_Participants PRIMARY KEY (Event, User),
  FOREIGN KEY (Event) REFERENCES Events(Id),
  FOREIGN KEY (User) REFERENCES Users(Id)
)
;

INSERT INTO Event_Participants (`Event`, User, `Character`)
VALUES(1,1,NULL),
(1,2,1),
(1,3,2),
(1,5,NULL),
(1,6,NULL),
(1,7,NULL)
;

DROP TABLE IF EXISTS Connections;
CREATE TABLE Connections (
  Token varchar(255) NOT NULL,
  Description varchar(500),
  Start datetime NOT NULL,
  End datetime 
)
;

Drop Table IF EXISTS Connection_Roles;
CREATE TABLE Connection_Roles (
  Token varchar(255) NOT NULL,
  Role varchar(255) NOT NULL,
  FOREIGN KEY (Token) REFERENCES Connections(Token),
  CONSTRAINT PK_Connection_Roles PRIMARY KEY (Token, Role)
)
