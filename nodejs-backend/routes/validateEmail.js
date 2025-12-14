import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/api/validate-email', async (req, res) => {
    const { email } = req.body;

    const API = process.env.ABSTRACT_API_KEY;
    try {
        const resp = await axios.get(`https://emailreputation.abstractapi.com/v1/?api_key=${API}&email=${email}`);
        console.log(resp.data);

        return res.status(201);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

export default router;