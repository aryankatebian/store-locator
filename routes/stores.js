const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

//get store route
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);
    res.status(500), json({ error: 'server error' });
  }
});

//add to store route
router.post('/', async (req, res) => {
  try {
    const store = await Store.create(req.body);
    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'this store is alredy exist'
      });
    }
    res.status(500), json({ error: 'server error' });
  }
});

module.exports = router;
