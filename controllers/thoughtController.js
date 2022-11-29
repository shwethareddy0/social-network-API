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
    /*
      .then((thought) => {
        newThoughtId = thought._id;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    //associate the new created thought to the user
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with this ID" })
          : 
      )
      .;*/
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
  createReaction(req, res) {
    let newReactionid;
    const thoughtDoc = Thought.findOne({ _id: req.params.thoughtId });
    thoughtDoc.reaction.push({
      reactionBody: req.body.reaction,
      userName: thoughtDoc.userName,
    });
    thoughtDoc.save(function (err) {
      if (err) res.status(404).json({ message: "Reaction cannot be saved" });
      res.json(thoughtDoc.reaction[thoughtDoc.reaction.length]);
    });
  },

  //delete a reaction
  deleteReaction(req, res) {
    const thoughtDoc = Thought.findOne({ _id: req.params.thoughtId });
    thoughtDoc.reaction.id(req.params.reactionId).remove();
    thoughtDoc.save(function (err) {
      if (err) res.status(404).json({ message: "Reaction cannot be saved" });
      res.json(thoughtDoc.reaction[thoughtDoc.reaction.length]);
    });
  },
};
