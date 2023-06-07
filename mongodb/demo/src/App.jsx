import { useState, useEffect } from "react";

import UserIcon from "./assets/svg/UserIcon";
import Modal from './components/Modal'

import { app, user, collection } from "./utils/mongo.client";

function App() {
  const [users, setUsers] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const listOfUsers = await user.functions.fetchAllUsers();
      setUsers(listOfUsers);

      //streaming changes, watch() add the changes to the list
      for await (const change of collection.watch()) {
        change.operationType === "update"
      }
    }
    getAllUsers();
  }, [])

  const handleModalClose = () => {
    setModal(false);
    setIsEdit(false);
  };

  const handleDelete = async (id) => {
    await user.functions.deleteUser(id)
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log("handleDelete: ", err)
      })
  }

  return (
    <>
      <header className="h-16 w-full bg-slate-900 px-6 flex justify-between items-center">
        {/* <h1 className="text-x1 text-slate-200">User List - {user.id}</h1> */}
        <button
          className="text-lg text-slate capitalize px-6 py-2 bg-slate-200 rounded-md"
          onClick={() => setModal(true)}
        >
          create
        </button>
      </header>
      <section className="mt-10 flex justify-center px-6">
        <ul className="w-full">
          {users &&
            users.map((user) => (
              <li
                key={user._id}
                className="border-2 p-6 mp-3 rounded-lg flex items-center"
              >
                <section className="h-10 w-10 bg-slate-100 rounded-md flex justify-center items-center mr-4">
                  <UserIcon />
                </section>
                <section>
                  <h2 className="capitalize font-semibold mb-1">{user.name}</h2>
                  <p className="capitalize text-gray-500 mb-1">
                    {user.location}
                  </p>
                  <p className="text-slate-500 font-medium text-sm mb-2">
                    {user.email}
                  </p>
                  <div className="flex">
                    <button
                      className="text-sm text-red-500 capitalize px-4 py-2 mr-4 border border-red-500 rounded-md"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm text-white capitalize px-4 py-2 bg-slate-900 rounded-md"
                      onClick={() => {
                        setModal(true);
                        setIsEdit(true);
                        setEditingId(user._id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </section>
              </li>
            ))}
        </ul>
      </section>

      <Modal
        isOpen={modal}
        isEdit={isEdit}
        closeModal={handleModalClose}
        editingId={editingId}
      />
    </>
  );
}

export default App
