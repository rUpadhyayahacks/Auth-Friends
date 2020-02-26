import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { AddFriendForm } from './AddFriendForm'
export const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  const initialState = {
    isEditing: false,
    id: "",
    name: "",
    age: "",
    email: ""
  }

  const [edit, setEdit] = useState(initialState);

  // this variable gets the friends data from the api
  const updateFriendsList = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        console.log(res);
        setFriends(res.data);
      });
  };

  // This is managing the state for the component
  useEffect(() => {
    updateFriendsList();
  }, []);

  const handleDelete = id => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then(res => {
        updateFriendsList();
      })
      .catch(err => console.log(err));
  };

  const handleEdit = friend => {
    setEdit({
      isEditing: true,
      id: friend.id,
      name: friend.name,
      age: friend.age,
      email: friend.email
    });
  };

  const handleChange = e => {
    // console.log(newFriend)
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("edit", edit);
    const changedFriend = {
      id: edit.id,
      name: edit.name,
      age: edit.age,
      email: edit.email
    };
    axiosWithAuth()
      .put(`/api/friends/${edit.id}`, changedFriend)
      .then(res => {
        updateFriendsList();
        setEdit({
          ...edit,
          isEditing: false
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="friendslist-container">
      <AddFriendForm updateFriendsList={updateFriendsList} />
      {edit.isEditing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={edit.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="age">Age:</label>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={edit.age}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={edit.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Homie</button>
        </form>
      ) : (
        friends.map(friend => {
          return (
            <div className="card-container">
              <div className="card">
                <h1>{friend.name}</h1>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
                <button onClick={() => handleEdit(friend)}>Edit Homie</button>
                <button onClick={() => handleDelete(friend.id)}>
                  Delete Homie
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};