const Entry = require('../models/Entry')

module.exports = {
    createEntry: async (req, res) => {
        try{
            await Entry.create({entry: req.body.entryItem, date: req.body.dateItem, title: req.body.titleItem, userId: req.user.id})
            console.log('Entry has been added!')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    getEntries: async (req,res)=>{
        console.log(req.user)
        try{
            const entryItems = await Entry.find({userId:req.user.id})
            const itemsTotal = await Entry.countDocuments({userId:req.user.id,entry: true})
            res.render('dashboard.ejs', {entries: entryItems, total: itemsTotal, user: req.user})
        }catch(err){
            console.log(err)
        }
    }

}