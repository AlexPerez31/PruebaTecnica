INSERT INTO users (email, hashed_password, role) VALUES 
('admin@email.com', 'hashed_123456', 'admin'),
('organizer1@email.com', 'hashed_123456', 'organizer'),
('organizer2@email.com', 'hashed_123456', 'organizer'),
('attendee1@email.com', 'hashed_123456', 'attendee'),
('attendee2@email.com', 'hashed_123456', 'attendee'),
('attendee3@email.com', 'hashed_123456', 'attendee'),
('attendee4@email.com', 'hashed_123456', 'attendee'),
('attendee5@email.com', 'hashed_123456', 'attendee'),
('attendee6@email.com', 'hashed_123456', 'attendee'),
('attendee7@email.com', 'hashed_123456', 'attendee'),
('attendee8@email.com', 'hashed_123456', 'attendee'),
('attendee9@email.com', 'hashed_123456', 'attendee'),
('attendee10@email.com', 'hashed_123456', 'attendee');

INSERT INTO events (name, description, capacity, status, date) VALUES 
('Conferencia de IA', 'Evento sobre Inteligencia Artificial', 5, 'active', NOW()),
('Blockchain Summit', 'Evento sobre blockchain y criptografía', 7, 'canceled', NOW()),
('CyberSecurity Talk', 'Evento sobre Ciberseguridad', 4, 'finished', NOW()),
('Big Data Expo', 'Evento sobre análisis de datos y Big Data', 6, 'active', NOW()),
('Metaverso y VR', 'Evento sobre Realidad Virtual y el Metaverso', 3, 'canceled', NOW()),
('Machine Learning Bootcamp', 'Evento sobre Machine Learning avanzado', 5, 'active', NOW()),
('DevOps Conference', 'Evento sobre DevOps y CI/CD', 4, 'finished', NOW()),
('Computación Cuántica', 'Introducción a la computación cuántica', 6, 'active', NOW()),
('Cloud Computing Forum', 'Últimas tendencias en la nube', 7, 'canceled', NOW()),
('Redes y Telecomunicaciones', 'Innovaciones en redes de comunicación', 5, 'active', NOW()),
('Arquitectura de Software', 'Buenas prácticas en arquitectura de software', 3, 'finished', NOW()),
('IoT y Smart Cities', 'Aplicaciones del Internet de las Cosas', 6, 'active', NOW()),
('Desarrollo Web 2025', 'Tendencias y herramientas modernas', 7, 'canceled', NOW()),
('Criptografía y Seguridad', 'Últimos avances en criptografía', 4, 'active', NOW()),
('Bases de Datos NoSQL', 'Modelos de bases de datos modernas', 5, 'finished', NOW());