const { default: Accommondation } = require('../models/Accommondation.js');

const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const user = await Accommondation.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Accommondation.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await Accommondation.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
