import { Router } from "express";
import Journal from "../models/journal";
import { authenticateToken } from "../middleware/auth";
import {  Request, Response } from "express";
const router = Router();

router.post('/', authenticateToken, async (req:Request, res:Response) => {
    const { title, content, category, date} = req.body;
    const userId = req.user?.id;

    try {
        const journal = await Journal.create({ title, content, category, date, userId})
        res.status(201).json({success:true, journal})
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get('/', authenticateToken, async (req:Request, res:Response) => {
    const userId = req.user?.id;
    try {
        const journals = await Journal.findAll({where: {userId}});
        res.json(journals)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.put('/:id', authenticateToken, async (req:Request,res:Response) => {
    const { id } = req.params;
    const { title, content, category, date} = req.body;
    const userId = req.user?.id;
    try {
        const journal = await Journal.findOne({where: {id, userId}});
        if (journal) {
            journal.update({ title, content, category, date}).then(()=>{
                res.status(200).json({success:true})
            })
      
        } else {
            res.status(404).json({error: 'Journal entry not found'})
        }
    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/:id', authenticateToken, async(req:Request, res:Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
      const journal = await Journal.findOne({where: {id:id, userId:userId}}) ;
      if (journal) {
        journal.destroy();
        res.status(200).json({success:true,message:"Journal entry deleted"});
      } else {
        res.status(404).json({error:"Journal entry not found"});
      }
    } catch (error) {
      res.status(400).json(error)
    }
})

export default router;
