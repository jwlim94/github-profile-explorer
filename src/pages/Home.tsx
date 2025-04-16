import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== "") {
      navigate(`/profile/${username.trim()}`);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-2xl sm:text-3xl font-semibold text-center text-white">
          GitHub Profile Explorer
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
