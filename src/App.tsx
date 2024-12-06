import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { clearUsers } from "./state/user/userSlice";
import { addUser } from "./state/user/actions/addUser";

function App() {
  const { users, error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [simulateError, setSimulateError] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: "",
    age: 30,
  });

  const handleAddUser = () => {
    dispatch(addUser({ newUser, shouldFail: simulateError }));
    // Reset form
    setNewUser({ name: "", email: "", company: "", age: 0 });
  };

  const handleClearUsers = () => {
    dispatch(clearUsers());
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="simulateError"
            checked={simulateError}
            onChange={() => setSimulateError(!simulateError)}
            className="mr-2"
          />
          <label htmlFor="simulateError">Simulate API Error</label>
        </div>
        <div className="mb-4">
          <button
            onClick={handleClearUsers}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear All Users
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={newUser.company}
            onChange={(e) =>
              setNewUser({ ...newUser, company: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age}
            onChange={(e) =>
              setNewUser({ ...newUser, age: parseInt(e.target.value) || 0 })
            }
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded col-span-2 disabled:cursor-not-allowed"
            disabled={!newUser.name || !newUser.email || loading}
          >
            {loading ? "Adding user..." : "Add User"}
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Users List</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found</p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Company:</strong> {user.company}
                    </p>
                    <p>
                      <strong>Age:</strong> {user.age}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
