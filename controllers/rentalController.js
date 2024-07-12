const db = require('../BDD/BDD.js');

const getAllRentals = (req, res) => {
    const sql = 'SELECT * FROM alquileres';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getRentalById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM alquileres WHERE id_alquiler = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        res.json(result[0]);
    });
};

const addRental = (req, res) => {
    const { id_cliente, id_pelicula, fecha_alquiler } = req.body;
    const sql = 'INSERT INTO alquileres (id_cliente, id_pelicula, fecha_alquiler) VALUES (?, ?, ?)';
    db.query(sql, [id_cliente, id_pelicula, fecha_alquiler], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id_alquiler: result.insertId, ...req.body });
    });
};

const updateRental = (req, res) => {
    const { id } = req.params;
    const { id_cliente, id_pelicula, fecha_alquiler } = req.body;
    const sql = 'UPDATE alquileres SET id_cliente = ?, id_pelicula = ?, fecha_alquiler = ? WHERE id_alquiler = ?';
    db.query(sql, [id_cliente, id_pelicula, fecha_alquiler, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        res.json({ message: 'Alquiler actualizado' });
    });
};

const deleteRental = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM alquileres WHERE id_alquiler = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        res.json({ message: 'Alquiler eliminado' });
    });
};

module.exports = {
    getAllRentals,
    getRentalById,
    addRental,
    updateRental,
    deleteRental
};

