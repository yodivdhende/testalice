-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Gegenereerd op: 18 jul 2025 om 19:34
-- Serverversie: 8.0.32
-- PHP-versie: 8.2.8

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
-- Tabelstructuur voor tabel `Admins`
--

CREATE TABLE `Admins` (
  `UserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Admins`
--

INSERT INTO `Admins` (`UserId`) VALUES
(1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Characters`
--

CREATE TABLE `Characters` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL,
  `Owner` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Characters`
--

INSERT INTO `Characters` (`Id`, `Name`, `Owner`) VALUES
(1, 'Bob', 2),
(2, 'Alice', 3),
(3, 'Eve', 4),
(4, 'Mallory', 2),
(5, 'Patric', 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Character_Implants`
--

CREATE TABLE `Character_Implants` (
  `Id` int NOT NULL,
  `Character` int DEFAULT NULL,
  `Implant` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Character_Implants`
--

INSERT INTO `Character_Implants` (`Id`, `Character`, `Implant`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Character_Items`
--

CREATE TABLE `Character_Items` (
  `Id` int NOT NULL,
  `Character` int DEFAULT NULL,
  `Item` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Character_Items`
--

INSERT INTO `Character_Items` (`Id`, `Character`, `Item`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 1),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Events`
--

CREATE TABLE `Events` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Events`
--

INSERT INTO `Events` (`Id`, `Name`, `StartTime`, `EndTime`) VALUES
(1, 'Event 1', '2023-10-01 10:00:00', '2023-10-03 12:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Event_Participants`
--

CREATE TABLE `Event_Participants` (
  `Event` int NOT NULL,
  `User` int NOT NULL,
  `Character` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Event_Participants`
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
-- Tabelstructuur voor tabel `Implants`
--

CREATE TABLE `Implants` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Implants`
--

INSERT INTO `Implants` (`Id`, `Name`, `Description`) VALUES
(1, 'Mantis Blades', 'Mantis Blades allow you to slice and dice your enemies with swift. deadly slashes. You can also leap at a target to deal massive damage. To do so. hold and release left mouse.'),
(2, 'Gorilla Arms', 'Gorilla Arms are lightweight, efficient and hard-hitting arm replacement cyberware.'),
(3, 'Monowire', 'Monowire is arm replacement cyberware that allows you to whip multiple enemies at once from a distance.');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Items`
--

CREATE TABLE `Items` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Items`
--

INSERT INTO `Items` (`Id`, `Name`, `Description`) VALUES
(1, 'Blood Pack', 'The bloodpack is an IV bag of blood.'),
(2, 'Robot Repair Kit', 'It is used to repair downed robot followers, similar to using a Stimpak on downed human or canine followers.'),
(3, 'Stimpak', 'This item consists of a syringe for containing and delivering the medication and a gauge for measuring the status of the stimpaks contents. When injected, it provides fast healing of injuries including crippled limbs.');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Messages`
--

CREATE TABLE `Messages` (
  `Id` int NOT NULL,
  `Sender` int DEFAULT NULL,
  `Recipient` int NOT NULL,
  `Subject` varchar(512) NOT NULL,
  `Message` text NOT NULL,
  `Attachment` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Party`
--

CREATE TABLE `Party` (
  `Id` int NOT NULL,
  `Name` varchar(254) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Party`
--

INSERT INTO `Party` (`Id`, `Name`) VALUES
(1, 'Party 1'),
(2, 'Party 2');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Party_Members`
--

CREATE TABLE `Party_Members` (
  `Party` int NOT NULL,
  `Member` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Party_Members`
--

INSERT INTO `Party_Members` (`Party`, `Member`) VALUES
(1, 1),
(1, 2),
(2, 4);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Sessions`
--

CREATE TABLE `Sessions` (
  `Token` varchar(255) NOT NULL,
  `UserId` int DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Start` datetime NOT NULL,
  `End` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Sessions`
--

INSERT INTO `Sessions` (`Token`, `UserId`, `Description`, `Start`, `End`) VALUES
('7114b7ae-bec8-4af9-aefe-e44585709041', 1, 'cmd yodi.vandenhende@gmail.com', '2025-06-16 16:50:59', NULL),
('b8152d21-1517-454b-998a-dc93b6e5553d', 1, 'api login yodi.vandenhende@gmail.com', '2025-06-16 16:50:06', '2025-06-17 16:50:06');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Session_Roles`
--

CREATE TABLE `Session_Roles` (
  `Token` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Session_Roles`
--

INSERT INTO `Session_Roles` (`Token`, `Role`) VALUES
('7114b7ae-bec8-4af9-aefe-e44585709041', 'player'),
('b8152d21-1517-454b-998a-dc93b6e5553d', 'admin'),
('b8152d21-1517-454b-998a-dc93b6e5553d', 'user');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Skills`
--

CREATE TABLE `Skills` (
  `Id` int NOT NULL,
  `Group` int DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Skills`
--

INSERT INTO `Skills` (`Id`, `Group`, `Name`, `Description`) VALUES
(1, 1, 'Mechanic', 'I\'m The Machine'),
(2, 1, 'Electronic', 'Zap'),
(3, 2, 'Medical Trauma', 'Recet my leg'),
(4, 2, 'Pharmacology', 'Bollen'),
(5, 2, 'Toxicology', 'Toad licker');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Skill_Groups`
--

CREATE TABLE `Skill_Groups` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Skill_Groups`
--

INSERT INTO `Skill_Groups` (`Id`, `Name`, `Description`) VALUES
(1, 'Enginerring', 'Creating and repairing stuf'),
(2, 'Medicen', 'Healing stuf'),
(3, 'Infromatics', 'Computer stuf'),
(4, 'Research', 'looking into stuf'),
(5, 'Servival', 'Keep on living');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Users`
--

CREATE TABLE `Users` (
  `Id` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `Users`
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
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`UserId`);

--
-- Indexen voor tabel `Characters`
--
ALTER TABLE `Characters`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Owner` (`Owner`);

--
-- Indexen voor tabel `Character_Implants`
--
ALTER TABLE `Character_Implants`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Character` (`Character`),
  ADD KEY `Implant` (`Implant`);

--
-- Indexen voor tabel `Character_Items`
--
ALTER TABLE `Character_Items`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Character` (`Character`),
  ADD KEY `Item` (`Item`);

--
-- Indexen voor tabel `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Event_Participants`
--
ALTER TABLE `Event_Participants`
  ADD PRIMARY KEY (`Event`,`User`),
  ADD KEY `User` (`User`);

--
-- Indexen voor tabel `Implants`
--
ALTER TABLE `Implants`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Party`
--
ALTER TABLE `Party`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Party_Members`
--
ALTER TABLE `Party_Members`
  ADD PRIMARY KEY (`Party`,`Member`),
  ADD KEY `Member` (`Member`);

--
-- Indexen voor tabel `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`Token`);

--
-- Indexen voor tabel `Session_Roles`
--
ALTER TABLE `Session_Roles`
  ADD PRIMARY KEY (`Token`,`Role`);

--
-- Indexen voor tabel `Skills`
--
ALTER TABLE `Skills`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Group` (`Group`);

--
-- Indexen voor tabel `Skill_Groups`
--
ALTER TABLE `Skill_Groups`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `Characters`
--
ALTER TABLE `Characters`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `Character_Implants`
--
ALTER TABLE `Character_Implants`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `Character_Items`
--
ALTER TABLE `Character_Items`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `Events`
--
ALTER TABLE `Events`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `Implants`
--
ALTER TABLE `Implants`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `Items`
--
ALTER TABLE `Items`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `Messages`
--
ALTER TABLE `Messages`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `Party`
--
ALTER TABLE `Party`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `Skills`
--
ALTER TABLE `Skills`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `Skill_Groups`
--
ALTER TABLE `Skill_Groups`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `Characters`
--
ALTER TABLE `Characters`
  ADD CONSTRAINT `Characters_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`Id`);

--
-- Beperkingen voor tabel `Character_Implants`
--
ALTER TABLE `Character_Implants`
  ADD CONSTRAINT `Character_Implants_ibfk_1` FOREIGN KEY (`Character`) REFERENCES `Characters` (`Id`),
  ADD CONSTRAINT `Character_Implants_ibfk_2` FOREIGN KEY (`Implant`) REFERENCES `Implants` (`Id`);

--
-- Beperkingen voor tabel `Character_Items`
--
ALTER TABLE `Character_Items`
  ADD CONSTRAINT `Character_Items_ibfk_1` FOREIGN KEY (`Character`) REFERENCES `Characters` (`Id`),
  ADD CONSTRAINT `Character_Items_ibfk_2` FOREIGN KEY (`Item`) REFERENCES `Items` (`Id`);

--
-- Beperkingen voor tabel `Event_Participants`
--
ALTER TABLE `Event_Participants`
  ADD CONSTRAINT `Event_Participants_ibfk_1` FOREIGN KEY (`Event`) REFERENCES `Events` (`Id`),
  ADD CONSTRAINT `Event_Participants_ibfk_2` FOREIGN KEY (`User`) REFERENCES `Users` (`Id`);

--
-- Beperkingen voor tabel `Party_Members`
--
ALTER TABLE `Party_Members`
  ADD CONSTRAINT `Party_Members_ibfk_1` FOREIGN KEY (`Party`) REFERENCES `Party` (`Id`),
  ADD CONSTRAINT `Party_Members_ibfk_2` FOREIGN KEY (`Member`) REFERENCES `Characters` (`Id`);

--
-- Beperkingen voor tabel `Session_Roles`
--
ALTER TABLE `Session_Roles`
  ADD CONSTRAINT `Session_Roles_ibfk_1` FOREIGN KEY (`Token`) REFERENCES `Sessions` (`Token`);

--
-- Beperkingen voor tabel `Skills`
--
ALTER TABLE `Skills`
  ADD CONSTRAINT `Skills_ibfk_1` FOREIGN KEY (`Group`) REFERENCES `Skill_Groups` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
