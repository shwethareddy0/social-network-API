const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const thoughts = async (username) => Thought.find({ username: username });
//const friends = async (username) => Thought.find({ username: username });
module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-_v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "User not found with this ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //update a user by its id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete the user and remove the associated thought.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      console.log(req.body);
      const friend = await User.findOne({ _id: req.params.friendId });
      const user = await User.findOne({ _id: req.params.userId });
      console.log(user.username);
      user.friends.push(friend);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      console.log(req.body);
      const friend = await User.findOne({ _id: req.params.friendId });
      const user = await User.findOne({ _id: req.params.userId });
      console.log(user.username);
      console.log(user.friends);
      const friendIndex = user.friends.findIndex((f) =>
        f._id.equals(friend._id)
      );
      console.log(friendIndex);
      user.friends.splice(friendIndex, 1);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
