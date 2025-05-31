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
            let filterQuery = { userId: req.user.id };

            if (req.query.mood) {
                if (typeof req.query.mood === 'string') {
                    filterQuery.mood = req.query.mood;
                } else if (Array.isArray(req.query.mood)) {
                    filterQuery.mood = { $in: req.query.mood };
                }
            }

            const entryItems = await Entry.find(filterQuery)
            const itemsTotal = await Entry.countDocuments(filterQuery)

            let currentMoods = req.query.mood || [];
            if (typeof currentMoods === 'string') {
                currentMoods = [currentMoods];
            }

            res.render('dashboard.ejs', {
                entries: entryItems,
                total: itemsTotal,
                user: req.user,
                currentMoods: currentMoods
            })
        }catch(err){
            console.log(err)
        }
    }

}