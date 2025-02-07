# Dog Adoption App 🐶  

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
   git clone https://github.com/YOUR_USERNAME/fetch-dog-adoption-app.git  
   cd fetch-dog-adoption-app  
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
This app interacts with the Fetch API at `https://frontend-take-home-service.fetch.com`. Authentication is required for all requests beyond login. The login process sets an **HttpOnly auth cookie**, automatically included in future requests.  

## 📌 Project Structure  
```
fetch-dog-adoption-app/
├── src/
│   ├── components/        # Reusable UI components  
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
This app will be deployed using **Vercel** or **Netlify** for easy access.  

## 💜 License  
This project is open-source under the MIT License.  

---  
🐾 **Built with love for dog lovers!** 🐾  

