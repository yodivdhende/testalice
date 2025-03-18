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
('Player','yodi.vandenhende+player@gmail.com', 'Tester@123'),
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

DROP TABLE IF EXISTS Users_Roles;
CREATE TABLE Users_Roles (
  User int,
  Role int,
  CONSTRAINT PK_Users_Roles PRIMARY KEY (User, Role)
  FOREIN KEY (USER) REFERENSES USES(Id)
  FOREIN KEY (Roles) REFERENSES Roles(Id)
);

INSERT INTO Users_Roles (User, Role)
VALUES (1, 1),
(2, 2),
(3, 3)
