const express = require('express');
const router = express.Router();
import { analyzeSentiment } from "../hf/hf.js";

router.post('/', async (req, res) => {
  const text = req.body.text;

  try {
    const result = await analyzeSentiment(text);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
