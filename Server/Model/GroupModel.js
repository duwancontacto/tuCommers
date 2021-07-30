const mongoose = require("mongoose");

const GroupModel = mongoose.Schema({

    users: {
        type: Array,
        default: []
    },
    register: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = mongoose.model("Group", GroupModel);
