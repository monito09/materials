// server.js
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS para permitir solicitudes del frontend (aunque ya no sea necesario si todo está en el mismo servidor)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Ruta para obtener todos los materiales (GET)
app.get("/materials", async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, "materials.json"), "utf8");
        const materials = JSON.parse(data);
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: "Error al leer los materiales" });
    }
});

// Ruta para agregar un material (POST)
app.post("/materials", async (req, res) => {
    try {
        const newMaterial = req.body;
        const data = await fs.readFile(path.join(__dirname, "materials.json"), "utf8");
        const materials = JSON.parse(data);
        
        materials.push(newMaterial);
        
        await fs.writeFile(path.join(__dirname, "materials.json"), JSON.stringify(materials, null, 2));
        res.status(201).json(newMaterial);
    } catch (err) {
        res.status(500).json({ error: "Error al agregar el material" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});