import express from 'express';
import axios from 'axios';
import { arcjetProtect } from '../arcjet/arcjet-protect.js';
import { isSpoofedBot } from "@arcjet/inspect";


const router = express.Router();

router.post('/api/validate-email', async (req, res) => {
    const decision = await arcjetProtect.protect(req);
    if(decision.isDenied() || decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            message: `Forbidden`
        });
    }
    
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

