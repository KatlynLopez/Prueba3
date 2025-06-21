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

// Ruta base para utilizar el servicio
app.get("/api", function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('SERVIDOR SISTEMA');
});

app.use("/api/login", login);
app.use("/api/teacher", teacher);
