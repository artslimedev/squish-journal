const Entry = require("../models/Entry")

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getDashboard: (req,res)=>{
        res.render('dashboard.ejs')
    },
    getJournal: (req,res)=>{
        res.render('journal.ejs')
    },
    createEntry: async (req, res)=>{
        try{
            await Entry.create({
                userId: req.user.id,
                date: req.body.dateItem,  
                mood: req.body.moodItem,
                title: req.body.titleItem,
                entry: req.body.entryItem       
            })

            console.log('Entry has been added!')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    deleteEntry: async (req, res)=>{
        console.log(req.body.entryIdFromJSFile)
        try{
            await Entry.findOneAndDelete({
                _id:req.body.entryIdFromJSFile
            })

            console.log('Deleted Entry')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}