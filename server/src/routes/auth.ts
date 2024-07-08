import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user";

const router = Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
       const user = await User.create({username, password:hashPassword});
       res.status(201).json({success:true, user})
    } catch (error) {
       res.status(400).json({error:error})
    }
});

router.post('/login', async(req, res) => {
   try {
      const {username, password} = req.body;
      const user = await User.findOne({where: { username } })
      if (!user || !await bcrypt.compare(password,user.password)) {
         res.status(401).json({error:'Invalid credentials'})
      }
      const token = jwt.sign({ id: user?.id}, 'secret', {expiresIn: '1h'});
      res.json({token})
   } catch (error) {
      res.json(error)
   }
 
});

export default router;