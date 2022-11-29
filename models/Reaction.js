const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    require: true,
    maxLength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date)
        return date.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
    },
  },
});

module.exports = reactionSchema;
