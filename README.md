
# 🎓 ZoomBuddy+ - Your Campus Companion for Mental Wellness

**ZoomBuddy+** is an innovative platform designed to foster mental wellness among ASU students by providing real-time peer support. By seamlessly integrating Zoom for live video communication, offering a dynamic buddy matching system, facilitating group discussion rooms, and introducing a guardian crisis mode, ZoomBuddy+ aims to create a supportive community where students can connect and thrive during challenging academic periods.

## 🌟 Key Features

- **🎥 Zoom Integration**: Experience secure and seamless real-time video calls for one-on-one or group support sessions, ensuring face-to-face interaction is just a click away.

- **🤝 Buddy Match**: Our intelligent matching system connects you with peers based on availability, shared interests, and support needs, fostering meaningful connections and mutual support.

- **🗣️ Group Rooms**: Engage in vibrant group discussions on various topics, allowing you to share experiences, seek advice, and build a sense of community.

- **🧠 AI Fallback**: When human support isn't immediately available, our smart AI assistant steps in to provide guidance, resources, and a listening ear.

- **🚨 Guardian Mode**: In moments of crisis, activate Guardian Mode for immediate escalation and access to emergency assistance, prioritizing your safety and well-being.

- **🔐 Firebase Authentication**: Benefit from secure and streamlined user login and session management, ensuring your interactions remain private and protected.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/)
- **Backend**: [Firebase Functions](https://firebase.google.com/docs/functions)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 🗂️ Project Structure

```
ZoomBuddy-main/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components representing different views
│   ├── services/           # API and backend interaction logic
│   └── App.jsx             # Main application component
├── functions/              # Firebase cloud functions
├── index.html              # Main HTML file
├── firebase.json           # Firebase configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project metadata and dependencies
```

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/zoombuddy.git
   cd zoombuddy
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables as specified in `.env.example`.

4. **Run the Application Locally**
   ```bash
   npm run dev
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🔮 Future Features and Updates

- 📱 Mobile Application
- 🌐 Multi-Language Support
- 📅 Event Scheduling
- 🎓 Integration with University Resources
- 📊 Analytics Dashboard

## 🧪 To-Do List

- [ ] Integrate Zoom SDK
- [ ] Finalize Guardian Mode protocols
- [ ] Add tests
- [ ] Mobile responsiveness
- [ ] User feedback system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and open a Pull Request

## 🛡️ License

Licensed under the MIT License.

---

*Empowering students to support each other, one connection at a time.*
