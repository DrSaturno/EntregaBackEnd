const db = require('../BDD/BDD.js');

const getAllDirectors = (req, res) => {
    const sql = 'SELECT * FROM directores';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getDirectorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM directores WHERE id_director = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }
        res.json(result[0]);
    });
};

const addDirector = (req, res) => {
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const sql = 'INSERT INTO directores (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellido, fecha_nacimiento], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id_director: result.insertId, ...req.body });
    });
};

const updateDirector = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const sql = 'UPDATE directores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id_director = ?';
    db.query(sql, [nombre, apellido, fecha_nacimiento, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }
        res.json({ message: 'Director actualizado' });
    });
};

const deleteDirector = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM directores WHERE id_director = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }
        res.json({ message: 'Director eliminado' });
    });
};

module.exports = {
    getAllDirectors,
    getDirectorById,
    addDirector,
    updateDirector,
    deleteDirector
};
