-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Jul 03, 2025 at 11:18 AM
-- Server version: 8.0.32
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testaliceDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `UserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`UserId`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `Characters`
--

CREATE TABLE `Characters` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL,
  `Owner` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Characters`
--

INSERT INTO `Characters` (`Id`, `Name`, `Owner`) VALUES
(1, 'Bob', 2),
(2, 'Alice', 3),
(3, 'Eve', 4),
(4, 'Mallory', 2),
(5, 'Patric', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Character_Implants`
--

CREATE TABLE `Character_Implants` (
  `Character` int NOT NULL,
  `Event` int NOT NULL,
  `Implant` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Character_Items`
--

CREATE TABLE `Character_Items` (
  `Character` int NOT NULL,
  `Event` int NOT NULL,
  `Item` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Character_Skills`
--

CREATE TABLE `Character_Skills` (
  `Character` int NOT NULL,
  `Event` int NOT NULL,
  `Skill` int NOT NULL,
  `Value` int DEFAULT NULL,
  `Group` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`Id`, `Name`, `StartTime`, `EndTime`) VALUES
(1, 'Event 1', '2023-10-01 10:00:00', '2023-10-03 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Event_Participants`
--

CREATE TABLE `Event_Participants` (
  `Event` int NOT NULL,
  `User` int NOT NULL,
  `Character` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Event_Participants`
--

INSERT INTO `Event_Participants` (`Event`, `User`, `Character`) VALUES
(1, 1, NULL),
(1, 2, 1),
(1, 3, 2),
(1, 5, NULL),
(1, 6, NULL),
(1, 7, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Implants`
--

CREATE TABLE `Implants` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Party`
--

CREATE TABLE `Party` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Party`
--

INSERT INTO `Party` (`Id`, `Name`) VALUES
(1, 'Party 1'),
(2, 'Party 2');

-- --------------------------------------------------------

--
-- Table structure for table `Party_Members`
--

CREATE TABLE `Party_Members` (
  `Party` int NOT NULL,
  `Member` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Party_Members`
--

INSERT INTO `Party_Members` (`Party`, `Member`) VALUES
(1, 1),
(1, 2),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE `Sessions` (
  `Token` varchar(255) NOT NULL,
  `UserId` int DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Start` datetime NOT NULL,
  `End` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Sessions`
--

INSERT INTO `Sessions` (`Token`, `UserId`, `Description`, `Start`, `End`) VALUES
('7114b7ae-bec8-4af9-aefe-e44585709041', NULL, 'cmd', '2025-06-16 16:50:59', NULL),
('b8152d21-1517-454b-998a-dc93b6e5553d', 1, 'api login yodi.vandenhende@gmail.com', '2025-06-16 16:50:06', '2025-06-17 16:50:06');

-- --------------------------------------------------------

--
-- Table structure for table `Session_Roles`
--

CREATE TABLE `Session_Roles` (
  `Token` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Session_Roles`
--

INSERT INTO `Session_Roles` (`Token`, `Role`) VALUES
('7114b7ae-bec8-4af9-aefe-e44585709041', 'player'),
('b8152d21-1517-454b-998a-dc93b6e5553d', 'admin'),
('b8152d21-1517-454b-998a-dc93b6e5553d', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `Skills`
--

CREATE TABLE `Skills` (
  `Id` int NOT NULL,
  `Group` int DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Skill_Groups`
--

CREATE TABLE `Skill_Groups` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `Id` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`Id`, `Name`, `Email`, `Password`) VALUES
(1, 'Yodi', 'yodi.vandenhende@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(2, 'Player2', 'yodi.vandenhende+player2@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(3, 'Player3', 'yodi.vandenhende+player3@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(4, 'Player4', 'yodi.vandenhende+player4@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(5, 'Extra5', 'yodi.vandenhende+extra5@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(6, 'Extra6', 'yodi.vandenhende+extra6@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW'),
(7, 'Extra7', 'yodi.vandenhende+extra7@gmail.com', '$2b$13$evbfN7v/BJgCDtmdftgnyOgHvoUt3JZuZZnqvBjne6YMbXHLS9ReW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`UserId`);

--
-- Indexes for table `Characters`
--
ALTER TABLE `Characters`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Owner` (`Owner`);

--
-- Indexes for table `Character_Implants`
--
ALTER TABLE `Character_Implants`
  ADD PRIMARY KEY (`Character`,`Event`,`Implant`),
  ADD KEY `Event` (`Event`),
  ADD KEY `Implant` (`Implant`);

--
-- Indexes for table `Character_Items`
--
ALTER TABLE `Character_Items`
  ADD PRIMARY KEY (`Character`,`Event`,`Item`),
  ADD KEY `Event` (`Event`),
  ADD KEY `Item` (`Item`);

--
-- Indexes for table `Character_Skills`
--
ALTER TABLE `Character_Skills`
  ADD PRIMARY KEY (`Character`,`Event`,`Skill`),
  ADD KEY `Event` (`Event`),
  ADD KEY `Skill` (`Skill`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Event_Participants`
--
ALTER TABLE `Event_Participants`
  ADD PRIMARY KEY (`Event`,`User`),
  ADD KEY `User` (`User`);

--
-- Indexes for table `Implants`
--
ALTER TABLE `Implants`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Party`
--
ALTER TABLE `Party`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Party_Members`
--
ALTER TABLE `Party_Members`
  ADD PRIMARY KEY (`Party`,`Member`),
  ADD KEY `Member` (`Member`);

--
-- Indexes for table `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`Token`);

--
-- Indexes for table `Session_Roles`
--
ALTER TABLE `Session_Roles`
  ADD PRIMARY KEY (`Token`,`Role`);

--
-- Indexes for table `Skills`
--
ALTER TABLE `Skills`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Group` (`Group`);

--
-- Indexes for table `Skill_Groups`
--
ALTER TABLE `Skill_Groups`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Characters`
--
ALTER TABLE `Characters`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Party`
--
ALTER TABLE `Party`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Characters`
--
ALTER TABLE `Characters`
  ADD CONSTRAINT `Characters_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`Id`);

--
-- Constraints for table `Character_Implants`
--
ALTER TABLE `Character_Implants`
  ADD CONSTRAINT `Character_Implants_ibfk_1` FOREIGN KEY (`Character`) REFERENCES `Characters` (`Id`),
  ADD CONSTRAINT `Character_Implants_ibfk_2` FOREIGN KEY (`Event`) REFERENCES `Events` (`Id`),
  ADD CONSTRAINT `Character_Implants_ibfk_3` FOREIGN KEY (`Implant`) REFERENCES `Implants` (`Id`);

--
-- Constraints for table `Character_Items`
--
ALTER TABLE `Character_Items`
  ADD CONSTRAINT `Character_Items_ibfk_1` FOREIGN KEY (`Character`) REFERENCES `Characters` (`Id`),
  ADD CONSTRAINT `Character_Items_ibfk_2` FOREIGN KEY (`Event`) REFERENCES `Events` (`Id`),
  ADD CONSTRAINT `Character_Items_ibfk_3` FOREIGN KEY (`Item`) REFERENCES `Items` (`Id`);

--
-- Constraints for table `Character_Skills`
--
ALTER TABLE `Character_Skills`
  ADD CONSTRAINT `Character_Skills_ibfk_1` FOREIGN KEY (`Character`) REFERENCES `Characters` (`Id`),
  ADD CONSTRAINT `Character_Skills_ibfk_2` FOREIGN KEY (`Event`) REFERENCES `Events` (`Id`),
  ADD CONSTRAINT `Character_Skills_ibfk_3` FOREIGN KEY (`Skill`) REFERENCES `Skills` (`Id`);

--
-- Constraints for table `Event_Participants`
--
ALTER TABLE `Event_Participants`
  ADD CONSTRAINT `Event_Participants_ibfk_1` FOREIGN KEY (`Event`) REFERENCES `Events` (`Id`),
  ADD CONSTRAINT `Event_Participants_ibfk_2` FOREIGN KEY (`User`) REFERENCES `Users` (`Id`);

--
-- Constraints for table `Party_Members`
--
ALTER TABLE `Party_Members`
  ADD CONSTRAINT `Party_Members_ibfk_1` FOREIGN KEY (`Party`) REFERENCES `Party` (`Id`),
  ADD CONSTRAINT `Party_Members_ibfk_2` FOREIGN KEY (`Member`) REFERENCES `Characters` (`Id`);

--
-- Constraints for table `Session_Roles`
--
ALTER TABLE `Session_Roles`
  ADD CONSTRAINT `Session_Roles_ibfk_1` FOREIGN KEY (`Token`) REFERENCES `Sessions` (`Token`);

--
-- Constraints for table `Skills`
--
ALTER TABLE `Skills`
  ADD CONSTRAINT `Skills_ibfk_1` FOREIGN KEY (`Group`) REFERENCES `Skill_Groups` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

