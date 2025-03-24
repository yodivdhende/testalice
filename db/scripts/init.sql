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
('Player1','yodi.vandenhende+player1@gmail.com', 'Tester@123'),
('Player2','yodi.vandenhende+player2@gmail.com', 'Tester@123'),
('Player3','yodi.vandenhende+player3@gmail.com', 'Tester@123'),
('Player4','yodi.vandenhende+player4@gmail.com', 'Tester@123'),
('Player5','yodi.vandenhende+player5@gmail.com', 'Tester@123'),
('Player6','yodi.vandenhende+player6@gmail.com', 'Tester@123'),
('Player7','yodi.vandenhende+player7@gmail.com', 'Tester@123'),
('Extra','yodi.vandenhende+extra@gmail.com', 'Tester@123')
;

DROP TABLE IF EXISTS Roles;
CREATE TABLE Roles (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(255),
  PRIMARY KEY (Id)
)
;

INSERT INTO Roles (Name)
VALUES ('Admin'),
('Player'),
('Extra')
;

DROP TABLE IF EXISTS Users_Roles;
CREATE TABLE Users_Roles (
  User int,
  Role int,
  CONSTRAINT PK_Users_Roles PRIMARY KEY (User, Role),
  FOREIGN KEY (USER) REFERENCES Users(Id),
  FOREIGN KEY (Role) REFERENCES Roles(Id)
);

INSERT INTO Users_Roles (User, Role)
VALUES (1, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 3) 
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
VALUES ('Bob', 2, 100, 100),
('Alice', 3, 100, 100),
('Eve', 4, 100, 100),
('Mallory', 5, 100, 100),
('Trent', 6, 100, 100),
('Carol', 7, 100, 100),

DROP TABLE IF EXISTS Party;
CREATE TABLE Party (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(254),
  PRIMARY KEY (Id)
)

INSERT INTO Party (Name)
VALUES ('Party 1'),
('Party 2')

DROP TABLE IF EXISTS Party_Members;
CREATE TABLE Party_Members (
  Party int,
  Member int,
  CONSTRAINT PK_Party_Members PRIMARY KEY (Party, Member),
  FOREIGN KEY (Party) REFERENCES Party(Id),
  FOREIGN KEY (Member) REFERENCES Characters(Id)
)

INSERT INTO Party_Members (Party, Member)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),








