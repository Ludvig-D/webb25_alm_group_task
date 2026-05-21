const { default: Accommondation } = require('../models/Accommondation.js');
const User = require('../models/User.js');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const { address, city, country, zipCode, rent, rooms, userId } = req.body;
  try {
    const user = await User.findById(userId);

    const acc = await Accommondation.create({
      address,
      city,
      country,
      zipCode,
      rent,
      rooms,
      userId: user._id,
    });
    res.status(201).json(acc);
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
