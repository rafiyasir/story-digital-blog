const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: moment(new Date()).format("MMM DD, YYYY"),
  },
});

module.exports = mongoose.model("post", PostSchema);
