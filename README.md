# Social Network API

## Description

Social Network back-end is an application that provides APIs to create, update, delete and view all the users, friends with the associated thoughts and reactions.

This application uses the MongoDB to store the data, Mongoose as an ODM application and Express.js to develop the RESTful APIs.

Here is a walkthrough [video](https://drive.google.com/file/d/1RkmIKHQXH4rXHWklZTgQ9sOvSwHlN55V/view) demonstrating the functionality of the application.

### Features

- Easy to modify
- Provides APIs to view, add, update and delete the users,,friends,thoughts and reactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

- Create a new repository on your GitHub account.
- Clone this repository.
- Run `npm i`
- Run `npm run seed`
- Run `npm start`
- Use Insomnia or any REST API client to interact with the application.

## Usage

This project can be used in any Node.js environment.

Following is a code snippet of the application page.

Here it refers to the API GET Route to get a single user by its `id` value.

```Node.js

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


```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Insomnia
- Git
- GitHub

## Credits

- npmjs.com
- MDN / W3Schools

## License

This project is licensed under the [MIT](./LICENSE) license.
