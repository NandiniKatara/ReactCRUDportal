import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };
    fetchdata();
  }, []);

  const deleteUser = async (userId) => {
    console.log("user Id is", userId)
    await axios
      .post(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        console.log("response is", response)
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      }).catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th> S.No.</th>
            <th> User Name</th>
            <th> User Email</th>
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {users.fanme}
                </td>
                <td>{user.email}</td>
                <td className="actionsButton">
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  <Link to={"/edit?id=" + user._id}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
