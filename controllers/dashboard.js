const Entry = require('../models/Entry')
const { encrypt, decrypt } = require('../utils/encryption')

module.exports = {
    createEntry: async (req, res) => {
        try {
            // Input validation
            const { entryItem, dateItem, titleItem, moodItem } = req.body;
            if (!entryItem || !dateItem || !titleItem) {
                return res.status(400).json({ 
                    error: 'Missing required fields' 
                });
            }

            // Encrypt the entry content before saving
            let encryptedEntry;
            try {
                encryptedEntry = encrypt(entryItem);
            } catch (encryptError) {
                console.error('Encryption failed:', encryptError);
                return res.status(500).json({
                    error: 'Encryption failed',
                    message: process.env.NODE_ENV === 'development' ? encryptError.message : 'Internal server error'
                });
            }

            const entry = await Entry.create({
                entry: encryptedEntry,
                date: dateItem,
                title: titleItem,
                mood: moodItem,
                userId: req.user.id
            });

            console.log(`Entry created successfully with ID: ${entry._id}`);
            return res.redirect('/dashboard');

        } catch (err) {
            console.error('Error creating entry:', err);
            return res.status(500).json({
                error: 'Failed to create entry',
                message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
            });
        }
    },
    getEntries: async (req, res) => {
        try {
            let filterQuery = { userId: req.user.id };

            if (req.query.mood) {
                if (typeof req.query.mood === 'string') {
                    filterQuery.mood = req.query.mood;
                } else if (Array.isArray(req.query.mood)) {
                    filterQuery.mood = { $in: req.query.mood };
                }
            }

            const entryItems = await Entry.find(filterQuery);
            const decryptedEntries = entryItems.map(entry => {
                const entryObj = entry.toObject();
                try {
                    // Attempt to decrypt the entry
                    if (entryObj.entry && entryObj.entry.includes(':')) {
                        entryObj.entry = decrypt(entryObj.entry);
                    }
                    // If entry doesn't contain ':' it's likely not encrypted
                    return entryObj;
                } catch (decryptError) {
                    console.error(`Failed to decrypt entry ${entry._id}:`, decryptError);
                    // Return the original entry if decryption fails
                    return entryObj;
                }
            });

            const itemsTotal = await Entry.countDocuments(filterQuery);
            const currentMoods = Array.isArray(req.query.mood) ? req.query.mood : [req.query.mood].filter(Boolean);

            return res.render('dashboard.ejs', {
                entries: decryptedEntries,
                total: itemsTotal,
                user: req.user,
                currentMoods
            });
        } catch (err) {
            console.error('Error fetching entries:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch entries',
                message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
            });
        }
    }
}