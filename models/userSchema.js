const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["NORMAL", "ADMIN"],
        default: "NORMAL"  
    },
}, { timestamps: true });

userSchema.pre('save', async function(next){
        if(!this.isModified('password'))return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
});

userSchema.methods.comparePassword = function(inputPassword){
    return bcrypt.compare(inputPassword, this.password,);
}

const User = mongoose.model("user", userSchema);

module.exports = User;