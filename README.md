# 📚 Notes Arena

**The smart way for university students to share, discover, and learn from academic notes — together.**

![GitHub](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?logo=vite)

---

## 🎯 Overview

Notes Arena is a collaborative platform built for university students to share, browse, and discover academic notes across different branches (BCA, BBA, BCOM, BSc) and semesters. Whether you're looking for study materials or want to help peers learn, Notes Arena makes it easy.

### 🚀 Key Features

- **Browse Notes by Branch & Semester**: Filter notes across BCA, BBA, BCOM, and BSc programs
- **User Authentication**: Secure Firebase-powered login and registration
- **Personalized Dashboard**: Track uploads, downloads, and bookmarks
- **AI Chatbot Assistant**: Ask questions about the platform and get instant help
- **Responsive Design**: Mobile-first UI with smooth animations
- **Dark Theme**: Easy on the eyes with a modern color palette

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Authentication & Database**: Firebase (Auth + Firestore)
- **Icons**: React Icons (Feather)
- **Styling**: CSS3 with CSS Variables
- **AI Integration**: OpenAI API (optional)
- **Deployment**: Vercel

---

## 📦 Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Udaykiran429/notes-arena.git
   cd "notes-arena"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_OPENAI_API_KEY=your_openai_api_key  # Optional
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5177`

---

## 🚀 Usage

### Home Page

- Explore featured notes
- Browse by groups (branches)
- Access the AI chatbot

### Browse Notes

- Filter notes by branch and semester
- View note details and upload metadata
- Download notes directly

### Dashboard

- View your profile and statistics
- Manage your uploads
- Track downloads and bookmarks

### Upload Notes

- Share your study materials
- Organize by branch, semester, and subject
- Help other students learn

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Footer.jsx
│   ├── Chatbot.jsx
│   ├── ChatButton.jsx
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── BrowseNotes.jsx
│   ├── Upload.jsx
│   └── ...
├── context/            # React Context (Auth)
│   └── AuthContext.jsx
├── firebase/           # Firebase config
│   └── config.js
├── styles/             # Global styles
│   └── index.css
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

---

## 🔐 Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Create a **Firestore Database** in test mode (or production with rules)
4. Get your Firebase config from Project Settings
5. Add the config to `.env.local`

---

## 🤖 AI Chatbot (Optional)

To enable the AI chatbot:

1. Get an OpenAI API key from [openai.com](https://openai.com)
2. Add it to `.env.local` as `VITE_OPENAI_API_KEY`
3. The chatbot will use the API for intelligent responses

Without the key, the chatbot provides fallback responses.

---

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## 🎨 Theming

The app uses CSS variables for theming. Customize colors in `src/styles/index.css`:

```css
:root {
  --primary: #070710;
  --accent: #6c63ff;
  --text-primary: #ffffff;
  --text-secondary: #999;
  /* ... more variables ... */
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project" and select your GitHub repo
4. Set:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables in Vercel settings
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

---

## 👨‍💻 About the Creator

**Uday Kiran**

- BCA Student | Aspiring Web Developer | Integrating AI into Web Development
- Email: [boduguudayedu@gmail.com](mailto:boduguudayedu@gmail.com)
- Mobile: +91 93926 62420
- GitHub: [@Udaykiran429](https://github.com/Udaykiran429)
- LinkedIn: [Uday Kiran Bodugu](https://www.linkedin.com/in/udaykiran-bodugu-15001b363)

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Feedback & Support

Have ideas or found a bug? Reach out:

- Email: [boduguudayedu@gmail.com](mailto:boduguudayedu@gmail.com)
- GitHub Issues: [Create an issue](https://github.com/Udaykiran429/notes-arena/issues)

---

## 🙏 Acknowledgments

- React community for amazing tools
- Firebase for backend support
- Vercel for hosting
- All contributors and users

---

**Made with ❤️ for students, by students.**

Happy learning! 📖✨
