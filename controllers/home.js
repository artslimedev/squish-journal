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
                entry: req.body.entryItem, 
                userId: req.user.id,
                title: req.body.titleItem,
                date: req.body.dateItem           
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