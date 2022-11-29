const { User, Thought } = require("../models");
const reactionSchema = require("../models/Reaction");

module.exports = {
  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-_v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create a new thought and add it to associated user.
  async createThought(req, res) {
    //create a thought
    try {
      const newThought = await Thought.create(req.body);
      console.log(req.body.userId);
      const user = await User.findOne({ _id: req.body.userId });
      console.log(user);
      console.log(user.thoughts);
      user.thoughts.push(newThought);
      await user.save();
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //create a reaction
  async createReaction(req, res) {
    try {
      const thoughtDoc = await Thought.findOne({ _id: req.params.thoughtId });
      console.log(thoughtDoc);
      thoughtDoc.reactions.push({
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      });
      await thoughtDoc.save();
      console.log(thoughtDoc.reactions);
      console.log(thoughtDoc.reactions.length);
      res.json(thoughtDoc.reactions[thoughtDoc.reactions.length - 1]);
    } catch (err) {
      res.status(404).json({ message: "Reaction cannot be saved" });
    }
  },

  //delete a reaction
  async deleteReaction(req, res) {
    try {
      const thoughtDoc = await Thought.findOne({ _id: req.params.thoughtId });
      const reactionIndex = thoughtDoc.reactions.findIndex((r) =>
        r.reactionId.equals(req.params.reactionId)
      );
      thoughtDoc.reactions.splice(reactionIndex, 1);
      await thoughtDoc.save();
      res.json(thoughtDoc);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
