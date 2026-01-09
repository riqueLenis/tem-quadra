-- Criação do Banco de Dados
CREATE DATABASE temquadra;

-- Conectar ao banco
\c temquadra;

-- Tabela de Empresas/Donos
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Quadras
CREATE TABLE courts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES companies(id),
    name VARCHAR(100) NOT NULL,
    sport VARCHAR(50) NOT NULL, -- 'futebol', 'volei', 'society', etc.
    price_per_hour DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    court_id INTEGER REFERENCES courts(id),
    user_name VARCHAR(100) NOT NULL,
    user_phone VARCHAR(20) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed', -- 'confirmed', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(court_id, booking_date, booking_time) -- Impede agendamento duplo
);

-- Inserção de dados iniciais para teste (Seed)
INSERT INTO companies (name, email, password_hash, phone) 
VALUES ('Arena Central', 'contato@arenacentral.com', 'hash123', '11999999999');

INSERT INTO courts (owner_id, name, sport, price_per_hour, location, image_url)
VALUES 
(1, 'Arena Central Society', 'society', 150.00, 'Centro', 'https://example.com/society.jpg'),
(1, 'Quadra de Vôlei Areia', 'volei', 100.00, 'Centro', 'https://example.com/volei.jpg');