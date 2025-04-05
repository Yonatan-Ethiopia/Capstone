const mongoose= require('mongoose');

const userSchema = new mongoose.schema({
    name: { type: string, required: true},
    email: { type: string, required: true, unique: true},
    password: {type: string, required: true}
    },
    {timetaps: true}
;);

const users= mongoose.model('users', userSchema);
module.export= users;