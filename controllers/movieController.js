const db = require('../BDD/BDD.js');

const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getMovieById = (req, res) => {
    const {id} = req.params  
    const sql = 'SELECT * FROM movies WHERE id = ?'
    db.query(sql, id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const addMovie = (req, res) =>{
    const{title,director,year} = req.body
    const sql = 'INSERT INTO movies (title,director,year) VALUES (?,?,?);'
    db.query(sql,[title,director,year],(err,results) => {if (err) throw err;
        res.json({message: 'Pelicula agregada correctamente', movieId: results.insertId});
    });
} 

const updateMovie = (req, res) => {
    const { id } = req.params;
    const {title, director, year} = req.body
    const sql = 'UPDATE movies SET title = ?, director = ?, year = ? WHERE id = ?'
    db.query(sql, [title, director, year, id], (err, results) => {if (err) throw err;
        res.json({message: 'Pelicula Actualizada'});
    });
}

const deleteMovie = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM movies WHERE id = ?'
    db.query(sql, id, (err, results) => {if (err) throw err
        res.json({message: 'Pelicula Eliminada'});
});
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}