import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

export const AddFriendForm = props => {
    const initialState = {
        id: Math.random(),
        name: "",
        age: "",
        email: ""
      }
  const [newFriend, setNewFriend] = useState(initialState);

  const handleChange = e => {
    // console.log(newFriend)
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", newFriend)
      .then(res => {
        console.log(res);
        props.updateFriendsList();
      })
      .catch(err => console.log("Error Post", err));
      setNewFriend(initialState)
  };

  return (
    <div>
      <h2>Add Friend Form:</h2>
      <form className="addFriend-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newFriend.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age">Age:</label>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newFriend.age}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newFriend.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Homie</button>
      </form>
    </div>
  );
};