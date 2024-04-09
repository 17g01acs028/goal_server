import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted:{
        type:Boolean,
        default:false
      }
});

const Week = mongoose.model('Week', weekSchema);

export default Week;