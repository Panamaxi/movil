const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.post('/api/posts', (req, res) => {
    try {
        console.log('Post recibido:', req.body);
        res.status(201).json({
            message: 'Post creado exitosamente',
            post: req.body
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error al crear el post',
            error: error.message
        });
    }
});

app.get('/api/posts', (req, res) => {
    res.json([
        
    ]);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
