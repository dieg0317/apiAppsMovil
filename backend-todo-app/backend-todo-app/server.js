const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes'); // Importa las rutas de tareas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

// Rutas básicas
app.get('/', (req, res) => {
    res.send('API está funcionando');
});

// Rutas de tareas
app.use('/api', taskRoutes); // Usa el router de tareas

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

