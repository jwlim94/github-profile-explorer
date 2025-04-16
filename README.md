# GitHub Profile Explorer

This project is a single-page web application built with React, TypeScript, and Vite.  
It allows users to search for GitHub profiles and view their public repositories, including support for filtering and sorting.

## 🚀 Features

- Search for GitHub users
- View user profile information (avatar, bio, location, followers, etc.)
- View list of public repositories
- Filter repositories by name
- Sort repositories by:
  - Name (A–Z)
  - Most stars
  - Last updated
- Responsive layout for mobile and desktop
- Loading and error states for API interactions

## 🧠 Technologies Used

- React with functional components and hooks
- TypeScript with proper type safety (interface, useParams generic, etc.)
- Tailwind CSS for styling and responsive design
- React Router for routing between pages
- GitHub REST API (https://api.github.com/users/:username)

## 🌐 Live Demo

🔗 View the deployed project here: https://github-profile-explorer-ten.vercel.app/

## 📦 Getting Started

1. Clone the repository:

```js
   git clone https://github.com/your-username/github-profile-explorer.git
   cd github-profile-explorer
```

2. Install dependencies:

```js
   npm install
```

3. Run the development server:

```js
   npm run dev
```

## 📡 API Used

This app uses the GitHub REST API to fetch:

- User profile data: https://api.github.com/users/:username
- Repositories list: https://api.github.com/users/:username/repos

No authentication is required for this project.

## 👨‍💻 Author

Jongwoo Lim  
GitHub: https://github.com/jwlim94
