# Dog Adoption App 🐶

<div align="center">
  <a href="https://github.com/404pandas/PARSR">
    <img src="./src/assets/breed-hunter-logo.png" alt="Logo" width="80" height="80">
  </a>
</div>

Welcome to the Dog Adoption App! This React + TypeScript project allows users to search for adoptable dogs, filter by breed, mark favorites, and find their perfect match.

## 🚀 Features

👉 User authentication with name & email  
👉 Browse, filter, and sort adoptable dogs  
👉 Select favorite dogs and generate a match  
👉 Pagination for search results  
👉 Fully responsive UI

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS (for styling)
- **State Management:** React Context or Redux
- **API Calls:** Fetch API with credentials included
- **Component Library:** Material UI (optional)

## 📦 Installation

1. **Clone the repository:**

   ```sh
   git clone git@github.com:404pandas/dog-adoption-app.git
   cd dog-adoption-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

## 🔑 API Authentication

This app interacts with the Fetch API. Authentication is required for all requests beyond login. The login process sets an **HttpOnly auth cookie**, automatically included in future requests.

## 📌 Project Structure

```
dog-adoption-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/             # Login, Search, Favorites, Match pages
│   ├── hooks/             # Custom hooks for API calls
│   ├── context/           # Global state management
│   ├── services/          # API functions
│   ├── utils/             # Helper functions
│   ├── App.tsx            # Main app entry point
│   ├── main.tsx           # React DOM render
│   ├── routes.tsx         # Route definitions
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript interfaces
│   ├── .env.example       # Environment variables template
│   └── README.md          # You're reading this!
```

## 🌍 Deployment

To ensure app availability, it has been hosted at two locations:

- **Render:** [Dog Adoption App on Render](https://dog-adoption-app-pztt.onrender.com/)
- **Netlify:** [Dog Adoption App on Netlify](https://dog-adoption-app-fetch.netlify.app/)

## 💜 License

This project is open-source under the MIT License.

---

🐾 **Built with love for dog lovers!** 🐾

<!-- Correct:
https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji&breeds=Beagle&size=25&sort=breed:asc&from=25

Incorrect:
https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji,Beagle&size=25&sort=breed:asc&from=25
https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%2CBeagle&size=25&sort=breed:asc&from=25
https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%26Beagle&size=25&sort=breed:asc&from=25
https://frontend-take-home-service.fetch.com/dogs/search?breeds=Basenji%2CBeagle%2CBulldog&size=25&sort=breed:asc&from=25 -->
