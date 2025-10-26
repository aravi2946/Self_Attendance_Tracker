import mongoose from "mongoose"

const atdSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        
    },
    daily: [{
        date: {
            type: Date,
            required: true
        },
        presents: {
            type: Number,
            default: 0,
            min: 0,
            max:7
        },
        periods: {
            type: Number,
            default: 0,
            max:7
        }
    }],
    totalPeriods: {
        type: Number,
        default: 0
    },
    totalPresents: {
        type: Number,
        default: 0,
        min:0
    },
    result: {
        type: Number,
        default: 0,
        max:100
    }

}, { timestamps: true });

const atdModel = mongoose.models.atdData || mongoose.model('atdData', atdSchema);

export default atdModel;