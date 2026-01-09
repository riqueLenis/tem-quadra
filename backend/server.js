/**
 * ARQUIVO: server.js
 * DESCRIÇÃO: Backend em Node.js com Express e PostgreSQL
 */

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Middleware
app.use(cors());
app.use(express.json());

// Configuração do Banco de Dados (PostgreSQL)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'temquadra',
  password: process.env.DB_PASSWORD || 'senha',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// --- Rotas da API ---

// 1. Listar todas as quadras (com filtro opcional por esporte)
app.get('/api/courts', async (req, res) => {
  const { sport } = req.query;
  try {
    let query = 'SELECT * FROM courts WHERE available = true';
    const params = [];

    if (sport) {
      query += ' AND sport = $1';
      params.push(sport);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar quadras' });
  }
});

// 2. Cadastrar uma nova quadra (Para donos de quadras)
app.post('/api/courts', async (req, res) => {
  const { name, sport, price_per_hour, location, owner_id } = req.body;
  
  try {
    const query = `
      INSERT INTO courts (name, sport, price_per_hour, location, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, sport, price_per_hour, location, owner_id];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar quadra' });
  }
});

// 3. Realizar um agendamento
app.post('/api/bookings', async (req, res) => {
  const { court_id, user_name, user_phone, booking_date, booking_time } = req.body;

  try {
    // Verifica se já existe agendamento
    const checkQuery = `
      SELECT * FROM bookings 
      WHERE court_id = $1 AND booking_date = $2 AND booking_time = $3
    `;
    const checkResult = await pool.query(checkQuery, [court_id, booking_date, booking_time]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: 'Horário indisponível' });
    }

    // Cria o agendamento
    const insertQuery = `
      INSERT INTO bookings (court_id, user_name, user_phone, booking_date, booking_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(insertQuery, [court_id, user_name, user_phone, booking_date, booking_time]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao realizar agendamento' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});