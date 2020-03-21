const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    email: String,
    event_id: {type: Schema.Types.ObjectId, ref:"event"},
    attending: Boolean,
});

const Invitation = mongoose.model('Invitation', invitationSchema);
module.exports = Invitation;