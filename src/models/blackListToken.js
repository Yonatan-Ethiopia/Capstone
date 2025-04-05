const mongoose = require('mongoose');
const blacklistSchema = new mongoose.schema(
    {
        token: { type: string, required: true, unique: true },
        expires: { type: Date, required: true }
    });
const blackList = new mongoose.model('blackList' , blacklistSchema);
module.export = blacklist;