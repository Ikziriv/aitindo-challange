const express = require('express');
const router = express.Router();
const databaseUrl = "https://crud-app-using-svelte.vercel.app/adduser";
const todosData = require('../model/model');

router.get('/api/todos', (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        todosData.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: `Todo not found with id = ${id}` })
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({ message: `Error occured while rertriving todo with id=${id} ` })
        })

    } else {
        todosData.find().then(todo => {
            res.send(todo)
        }).catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving todo information" })
        })
    }

})

router.post('/api/todos', (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Cannot be empty" })
        return;
    }
    //new user 
    const todo = new todosData({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        })
        //save todo to the database
    todo.save(todo).then(() => res.redirect(databaseUrl)).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while creating operation" })
    })

})

router.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    todosData.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot delelte with the ${id}.Maybe id is wrong` });
        } else {
            res.send({ message: "Todo deleted successfully !..." });
        }
    }).catch(err => {
        res.status(500).send({ message: `Could not delete Todo with id=${id}` });
    })
})

router.put('/api/todos/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update not be empty" })
    }
    const id = req.params.id;
    console.log(req.body);
    todosData.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update todo with ${id}. Maybe todo not found !` })
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({ message: "Error update todo information" })
        })
})

module.exports = router;