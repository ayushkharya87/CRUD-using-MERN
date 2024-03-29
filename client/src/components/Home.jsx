import React, { useEffect, useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom'

const Home = () => {

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.password]: e.target.value,
        })
    };

    // create user submit button
    const handleSubmit = async (e) => {
        e.preventDefault();    // it do not refresh the page
        const res = await axios.post("http://localhost:5000/createuser", inputUser);
        // console.log(res);
        fetchAllUser();
    }


    // data fetching all user
    const [userData, setUserData] = useState([])
    const fetchAllUser = async () => {
        const res = await axios.get("http://localhost:5000/readuser");
        setUserData(res.data)
    }
    useEffect(() => {
        fetchAllUser()
    }, []);

    // delete user
    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/delete/${id}`);
        if (res.status === 200) {
            fetchAllUser()
        }
    }

  return (

    <div className="w-2/3 mx-auto mt-5">

        {/* form */}
        <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
        {/* name */}
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        {/* password */}
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password} onChange={handleChange}/>
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add User
          </button>
        </div>
      </form>

        {/* lists */}
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr key={i} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                {/* name */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                {/* email */}
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.password}</td>

                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"> Read </NavLink>

                    <NavLink to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"> Edit </NavLink>

                    <button onClick={() => handleDelete(item._id)} className="font-medium text-red-500  hover:underline"> Delete </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home