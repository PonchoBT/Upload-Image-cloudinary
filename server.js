const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;

// Configuración de Cloudinary (reemplaza con tus propias credenciales)
cloudinary.config({
    cloud_name: 'dyoigdvdh', 
    api_key: '831332363759673', 
    api_secret: 'uXG0Iy3RdRMJrC2COTqqS6m9PU8' 
});

// Configuración de Multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Ruta para subir la imagen
app.post('/upload', upload.single('image'), (req, res) => {
    // Subir imagen a Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al subir la imagen a Cloudinary.' });
        }
        // Enviar la URL de la imagen al cliente
        res.json({ imageUrl: result.secure_url });
    }).end(req.file.buffer);
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

