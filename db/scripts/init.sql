-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Gegenereerd op: 10 jul 2025 om 20:34
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

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `Skill_Groups`
--
ALTER TABLE `Skill_Groups`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `Skill_Groups`
--
ALTER TABLE `Skill_Groups`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
