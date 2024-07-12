const db = require('../BDD/BDD.js');

const getAllActors = (req, res) => {
    const sql = 'SELECT * FROM actores';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getActorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM actores WHERE id_actor = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json(result[0]);
    });
};

const addActor = (req, res) => {
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const sql = 'INSERT INTO actores (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellido, fecha_nacimiento], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id_actor: result.insertId, ...req.body });
    });
};

const updateActor = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const sql = 'UPDATE actores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id_actor = ?';
    db.query(sql, [nombre, apellido, fecha_nacimiento, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json({ message: 'Actor actualizado' });
    });
};

const deleteActor = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM actores WHERE id_actor = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json({ message: 'Actor eliminado' });
    });
};

module.exports = {
    getAllActors,
    getActorById,
    addActor,
    updateActor,
    deleteActor
};
