const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://127.0.0.1:27017/todos');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conexión a la base de datos exitosa');
});

connection.on('error', (err) => {
    console.log('Error en la conexión a la BD: ', err);
});

// Model
const Todo = mongoose.model('Todo', {
    text: String,
    completed: Boolean
});

app.post('/add', (req, res) => {
    const todo = new Todo({ text: req.body.text, completed: false })

    todo.save()
        .then(doc => {
            console.log('Dato insertado correctamente...', doc);
            res.json({ Response: 'success' })
        })
        .catch(err => {
            console.log('Error al insertar el dato...', err);
            res.json({ Response: 'error' })
        });
});

app.get('/getAll', (req, res) => {
    Todo.find({}, 'text completed')
        .then(doc => {
            res.json({ response: 'success', data: doc })
        })
        .catch(err => {
            console.log('Error al consultar elementos...', err.message)
            res.json({ response: 'failed' })
        })
});

app.get('/complete/:id/:status', (req, res) => {
    const id = req.params.id;
    const status = req.params.status = true; //Convertir a booleano

    Todo.findByIdAndUpdate({ _id: id }, { $set: { completed: status } })
        .then(doc => {
            res.json({ response: 'sucess' })
        })
        .catch(err => {
            console.log('Error al actualizar dato', err.message)
            res.json({ response: 'failed' })
        })
});

app.get('/delete/:id/:status', (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete({ _id_id })
        .then(doc => {
            res.json({ response: 'success' })
        })
        .catch(err => {
            console.log('Error al eliminar dato ', err.message)
            res.statusCode(400).json({ response: 'failed' })
        })

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
