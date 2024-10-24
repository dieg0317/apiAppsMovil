const express = require('express');
const Task = require('../models/Task'); // Asegúrate de que el modelo esté correcto
const router = express.Router();

// Crear una nueva tarea
router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({ title, description });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
});

// Obtener todas las tareas
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

// Actualizar una tarea
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title, description, completed
        }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

// Eliminar una tarea
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

module.exports = router;
