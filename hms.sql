-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2026 at 10:30 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hms`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_code` int(11) DEFAULT NULL,
  `appointmentdate` date DEFAULT NULL,
  `diagnosis` varchar(200) DEFAULT NULL,
  `treatment` varchar(200) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `patient_id`, `doctor_code`, `appointmentdate`, `diagnosis`, `treatment`, `status`) VALUES
(1, 1, 1, '2026-04-04', 'ghjj', 'stomach', 'Pending'),
(2, 2, 1, '2026-05-05', 'hghjk,mn', 'eyes', 'Pending'),
(4, 2, 1, '2026-05-13', 'ghdjmed', 'stomach', 'Pending'),
(5, 1, 1, '2026-05-12', 'malaria', 'pn', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_code` int(11) NOT NULL,
  `doctorname` varchar(100) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `hire_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_code`, `doctorname`, `specialization`, `telephone`, `email`, `hire_date`) VALUES
(1, 'Twayigize Sadick', 'eyes', '3333', 'twayigizesadick@gmail.com', '2026-05-06'),
(3, 'sadiki', 'stomach', '0795885283', 'twayigizesadick@gmail.com', '2025-04-08'),
(4, 'mugwiza', 'eyes', '0786769324', 'mugwiza@gmail.com', '2026-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `registration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `firstname`, `lastname`, `gender`, `telephone`, `address`, `registration_date`) VALUES
(1, 'Twayigize', 'Sadick', 'Male', '079999999999', 'kigali', '2026-05-21'),
(2, 'kellia', 'utese', 'Female', '0735019192', 'kirehe', '2026-05-05'),
(3, 'witness', 'fabrice', 'Male', '078354739', 'kigali', '2026-05-05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `id`) VALUES
('sa', '$2b$10$7INYUWgxVNb2VTV2xhUtYOihj6BWZh.HzinHB1LXm99tPC4p1SYD6', 6),
('mama', '$2b$10$ZQ/mZ/W5m9Jvf41H0oDipe3N7oKjY02wbcsaib8JP4vqK9Bvv0AHu', 7),
('c', '$2b$10$9xyFXB.omDTiiaPzCMl2b.lI8HWIe2F90/PJ92MfZlh2qQh6W/84e', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_code` (`doctor_code`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_code`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_code`) REFERENCES `doctor` (`doctor_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
