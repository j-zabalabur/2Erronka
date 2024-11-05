-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2024 a las 10:41:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sneakify`
--

DROP DATABASE IF EXISTS `sneakify`;
CREATE DATABASE `sneakify`;
USE `sneakify`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deskontu_kodeak`
--

CREATE TABLE `deskontu_kodeak` (
  `kodea` varchar(255) NOT NULL,
  `deskontua` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `erabiltzaileak`
--

CREATE TABLE `erabiltzaileak` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `izena` varchar(255) NOT NULL,
  `abizena` varchar(255) NOT NULL,
  `pasahitza` varchar(255) NOT NULL,
  `administratzailea` tinyint(4) NOT NULL,
  `helbidea` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eskaerak`
--

CREATE TABLE `eskaerak` (
  `id` int(11) NOT NULL,
  `id_erabiltzailea` int(11) NOT NULL,
  `egoera` enum('Bidalita','Entregatzeke') NOT NULL DEFAULT 'Entregatzeke',
  `data` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eskaera_lerroak`
--

CREATE TABLE `eskaera_lerroak` (
  `id_eskaera` int(11) NOT NULL,
  `id_produktua` int(11) NOT NULL,
  `kopurua` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orga_lerroak`
--

CREATE TABLE `orga_lerroak` (
  `id_erabiltzailea` int(11) NOT NULL,
  `id_produktua` int(11) NOT NULL,
  `kopurua` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produktuak`
--

CREATE TABLE `produktuak` (
  `id` int(11) NOT NULL,
  `izena` varchar(255) NOT NULL,
  `prezioa` double NOT NULL,
  `eragina` varchar(255) NOT NULL,
  `argazkia` longblob NOT NULL,
  `beherapena` int(2) DEFAULT 0,
  `nabarmendua` longblob DEFAULT NULL,
  `deskripzioa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `deskontu_kodeak`
--
ALTER TABLE `deskontu_kodeak`
  ADD PRIMARY KEY (`kodea`);

--
-- Indices de la tabla `erabiltzaileak`
--
ALTER TABLE `erabiltzaileak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `eskaerak`
--
ALTER TABLE `eskaerak`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eskaera_lerroak`
--
ALTER TABLE `eskaera_lerroak`
  ADD KEY `id_produktua` (`id_produktua`),
  ADD KEY `id_eskaera` (`id_eskaera`);

--
-- Indices de la tabla `orga_lerroak`
--
ALTER TABLE `orga_lerroak`
  ADD KEY `id_erabiltzailea` (`id_erabiltzailea`),
  ADD KEY `id_produktua` (`id_produktua`);

--
-- Indices de la tabla `produktuak`
--
ALTER TABLE `produktuak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `izena` (`izena`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `erabiltzaileak`
--
ALTER TABLE `erabiltzaileak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eskaerak`
--
ALTER TABLE `eskaerak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `produktuak`
--
ALTER TABLE `produktuak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eskaera_lerroak`
--
ALTER TABLE `eskaera_lerroak`
  ADD CONSTRAINT `eskaera_lerroak_ibfk_2` FOREIGN KEY (`id_produktua`) REFERENCES `produktuak` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `eskaera_lerroak_ibfk_3` FOREIGN KEY (`id_eskaera`) REFERENCES `eskaerak` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orga_lerroak`
--
ALTER TABLE `orga_lerroak`
  ADD CONSTRAINT `orga_lerroak_ibfk_3` FOREIGN KEY (`id_erabiltzailea`) REFERENCES `erabiltzaileak` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `orga_lerroak_ibfk_4` FOREIGN KEY (`id_produktua`) REFERENCES `produktuak` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
