const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  const thoughts = [
    {
      thoughtText: "Want to learn React!",
      username: "John Smith",
      reactions: [
        {
          reactionBody: "It is good thought",
          username: "Henry Williams",
        },
      ],
    },
    {
      thoughtText: "Go for a walk tomorrow",
      username: "Sarah Parkar",
      reactions: [
        {
          reactionBody: "It is great thought",
          username: "John Smith",
        },
      ],
    },
    {
      thoughtText: "Learn more coding skills",
      username: "Henry Williams",
      reactions: [
        {
          reactionBody: "Awesome!",
          username: "Sarah Parkar",
        },
      ],
    },
  ];

  const users = [
    {
      username: "John Smith",
      email: "jsmith@abc.com",
      thoughts: [thoughts[0]],
    },
    {
      username: "Sarah Parkar",
      email: "sparkar@abc.com",
      thoughts: [thoughts[1]],
    },
    {
      username: "Henry Williams",
      email: "hwilliams@abc.com",
      thoughts: [thoughts[2]],
    },
  ];

  // Add users to the collection
  await User.collection.insertMany(users);

  // Add thoughts to the collection
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.info("Seeding complete");
  process.exit(0);
});
