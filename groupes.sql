-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 14 mai 2025 à 17:37
-- Version du serveur : 10.6.22-MariaDB
-- Version de PHP : 8.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cdce5547_SAE_S1`
--

-- --------------------------------------------------------

--
-- Structure de la table `groupes_2025`
--

CREATE TABLE `groupes_2025` (
  `id` int(11) NOT NULL,
  `group` text NOT NULL,
  `nom` text NOT NULL,
  `img` text NOT NULL,
  `url` text NOT NULL,
  `color` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `groupes_2025`
--

INSERT INTO `groupes_2025` (`id`, `group`, `nom`, `img`, `url`, `color`) VALUES
(1, 'A', 'Together Against Bias', 'images/a.png', 'groupe_a/accueil.html', '12,26,59'),
(2, 'B', 'LJAT', 'images/b.png', 'groupe_b/lala.html', '12,26,59'),
(3, 'C', 'ADO', 'images/c.png', 'groupe_c', '12,26,59'),
(4, 'D', 'Beauregard', 'images/d.png', 'groupe_d/accueil.html', '12,26,59'),
(5, 'E', 'Handi\'Capable', 'images/e.png', 'groupe_e/accueil.html', '12,26,59'),
(6, 'F', 'Unigen', 'images/f.png', 'groupe_f/accueil.html', '12,26,59'),
(7, 'G', 'Young & Hope', 'images/g.png', 'groupe_g/index.html', '12,26,59'),
(8, 'H', 'Handiweb', 'images/h.png', 'groupe_h/handiwebsite.html', '12,26,59'),
(9, 'I', 'IJT', 'images/i.png', 'groupe_i/index.html', '12,26,59'),
(10, 'J', 'Main dans la main', 'images/j.png', 'groupe_j/PageAccueil.html', '12,26,59'),
(11, 'K', 'Amélanisme', 'images/k.png', 'groupe_k/amelanisme.html', '12,26,59'),
(12, 'L', 'VUCD', 'images/l.png', 'groupe_l/accueil.html', '12,26,59'),
(13, 'M', 'HVNV', 'images/m.png', 'groupe_m/home.html', '12,26,59'),
(14, 'N', 'JAT', 'images/n.png', 'groupe_n/Accueil.html', '12,26,59'),
(15, 'O', 'DiversiTerre', 'images/o.png', 'groupe_o/', '12,26,59'),
(16, 'P', 'Univers Tous', 'images/p.png', 'groupe_p/page_accueil.html', '12,26,59');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `groupes_2025`
--
ALTER TABLE `groupes_2025`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `groupes_2025`
--
ALTER TABLE `groupes_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
