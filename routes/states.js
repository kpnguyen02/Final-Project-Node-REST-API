const express = require('express');
const router = express.Router();
const State = require('../States');

// POST
router.post('/:state/funfact', async (req, res) => {
    try {
      const stateCode = req.params.state;
      const { funfacts } = req.body;
      
      const state = await State.findOneAndUpdate(
        { stateCode },
        { $push: { funfacts } },
        { new: true }
      );
  
      res.json(state);
    } catch (error) {
      console.error('Error adding fun fact:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// PATCH
router.patch('/:state/funfact', async (req, res) => {
  try {
    const stateCode = req.params.state;
    const { index, funfact } = req.body;

    if (!index || !funfact) {
      return res.status(400).json({ error: 'Index and funfact are required' });
    }

    const state = await State.findOne({ stateCode });

    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    if (index <= 0 || index > state.funfacts.length) {
      return res.status(400).json({ error: 'Invalid index' });
    }

    state.funfacts[index - 1] = funfact; // Adjust for zero-based array

    await state.save();

    res.json(state);
  } catch (error) {
    console.error('Error updating fun fact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE
router.delete('/:state/funfact', async (req, res) => {
  try {
    const stateCode = req.params.state;
    const { index } = req.body;

    if (!index) {
      return res.status(400).json({ error: 'Index is required' });
    }

    const state = await State.findOne({ stateCode });

    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    if (index <= 0 || index > state.funfacts.length) {
      return res.status(400).json({ error: 'Invalid index' });
    }

    state.funfacts.splice(index - 1, 1); // Adjust for zero-based array

    await state.save();

    res.json(state);
  } catch (error) {
    console.error('Error deleting fun fact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
