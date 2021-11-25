const { Bio, validateBio } = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/:name', async (req, res) => {
    try {
        const bio = await Bio.find({name: req.params.name});
        return res.send(bio);
    } catch (ex) { 
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {

        const {error} = validateBio(req.body)
        if (error)
        return res.status(400).send(error)

        const bio = new Bio ({
            name: req.body.name,
            proPic: req.body.proPic,
            text: req.body.text
        });

        await bio.save();
        return res.send(bio)
       } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
       }
})

router.get('/', async (req, res) => {
    try{
        const bio = await Bio.find();
        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const bio = await Bio.findByIdAndRemove(req.params.id);

        if (!bio)
            return res.status(400).send(`The post with the id: "${req.params.id}" does not exist`);

            return res.send(bio);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;