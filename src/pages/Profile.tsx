import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOption, setSortOption] = useState<"name" | "stars" | "updated">(
    "name"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(false);

        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !repoRes.ok) throw new Error("Data fetch failed");

        const userData = await userRes.json();
        const repoData = await repoRes.json();

        setUser(userData);
        setRepos(repoData);
      } catch (error) {
        console.log("error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  // CALCULATED
  const filteredRepos = [...repos]
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "stars")
        return b.stargazers_count - a.stargazers_count;
      if (sortOption === "updated")
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      return 0;
    })
    .filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Loading state
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    );

  // Error state
  if (error || !user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85L21 19V5c0-1.054-.816-1.918-1.85-1.994L19 3H5c-1.054 0-1.918.816-1.994 1.85L3 5v14c0 1.054.816 1.918 1.85 1.994L5 21z"
          />
        </svg>
        <p className="text-lg font-semibold text-red-500 mt-2">
          User not found
        </p>
        <p className="text-gray-400 mt-2">
          We couldn't find a GitHub user with that username.
        </p>
        <p className="text-gray-400">
          Please check the spelling and try again.
        </p>
      </div>
    );

  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 text-white">
      {/* User Info Section */}
      <div className="flex flex-col">
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-2"
        />
        <h2 className="text-2xl text-center font-bold">
          {user.name || user.login}
        </h2>
        <p className="text-center text-gray-400">{user.bio}</p>
        <div className="mt-4 text-center">
          <p>Location: {user.location || "N/A"}</p>
          <p>Public Repos: {user.public_repos}</p>
          <p>
            Followers: {user.followers} | Following: {user.following}
          </p>
        </div>
      </div>

      {/* User Repository Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Repositories</h3>
        {repos.length === 0 ? (
          <p className="text-sm mt-2">No public repositories found.</p>
        ) : (
          <div className="flex flex-col">
            <div className="relative flex justify-end gap-x-3 mt-4">
              {/* Filtering Section */}
              <input
                type="text"
                placeholder="Filter by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white"
              />

              {/* Sorting Section */}
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as "name" | "stars" | "updated")
                }
                className="appearance-none bg-gray-800 border border-gray-600 rounded pl-2 pr-8 py-1 text-sm"
              >
                <option value="name">Name (A–Z)</option>
                <option value="stars">Most Stars</option>
                <option value="updated">Last Updated</option>
              </select>

              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-sm">
                ▼
              </div>
            </div>

            {/* Info Section */}
            <ul className="space-y-3 mt-3">
              {filteredRepos.length === 0 ? (
                <li className="text-sm text-gray-400 text-center py-4">
                  No matching repositories found.
                </li>
              ) : (
                filteredRepos.map((repo) => (
                  <li
                    key={repo.id}
                    className="p-3 border rounded bg-gray-800 bg-opacity-5"
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm text-gray-400 mt-2">
                      {repo.description || "No description"}
                    </p>
                    <div className="text-sm text-gray-500 mt-1">
                      ⭐ {repo.stargazers_count} — Updated:{" "}
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
