const express = require('express');
const app = express();
const cors = require('cors');

// ✅ Usa puerto dinámico para Railway
const port = process.env.PORT || 3000;

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa rutas
const login = require("./src/routes/login");
const teacher = require("./src/routes/teacher.routes");

// Configura CORS igual que antes
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5175'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: false,
}));

// Ruta de prueba
app.get("/api", (req, res) => {
  res.send('SERVIDOR SISTEMA');
});

// Rutas principales
app.use("/api/login", login);
app.use("/api/teacher", teacher);

// Escucha usando el puerto dinámico
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
