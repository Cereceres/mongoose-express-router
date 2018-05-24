const express = require('express')


module.exports = (mongo)=> express.Router().all('/:Model/:id?', (req,res,next) => {
        const Model = mongo.models[req.params.Model]
        const query = req.params.id ? {_id: req.params.id} : req.query;

        const data = req.body || {};
        if(!Model) return res.status(404).send()

        if (req.method==='GET')  return Model.find(query).lean().exec()
            .then(result => res.json(result))
            .catch(error => res.status(400).json(error))

        if (req.method==='POST')  return Model.create(data, (err, result) => {
            if (err) return res.status(400).json(err)
            res.json(result)
        })

        if (req.method==='PUT')  return Model.update(query,{$set: data},{new: true}).lean().exec()
            .then(result => res.json(result))
            .catch(error => res.status(400).json(error))

        if (req.method==='DELETE')  return Model.deleteMany(query).lean().exec()
            .then(result => res.json(result))
            .catch(error => res.status(400).json(error))

        res.status(404).send()
})