create table Users (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(255),
  Email varchar(255),
  Password varchar(255),
  PRIMARY KEY (Id)
)
;
insert into Users (Name,Email, Password)
Values ('Yodi','yodi.vandenhende@gmail.com', 'Tester@123')
;
-- create table Roles (
--   Id: int NOT NULL,
--   Name: varchar(255),
--   PRIMARY KEY (Id),
-- )

-- create table Users_Roles (
--   User: int,
--   Role: int,
--   CONSTRAINT PK_Users_Roles PRIMARY KEY (User, Role)
--   FOREIN KEY (USER) REFERENSES USES(Id)
--   FOREIN KEY (Roles) REFERENSES Roles(Id)
-- )