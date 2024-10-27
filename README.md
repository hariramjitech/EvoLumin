# 🎉 **Care Console** - University Hostel Healthcare Management System

**Care Console** is a comprehensive healthcare management system built using the MERN stack and Tailwind CSS, specifically designed to provide a seamless healthcare experience for students in university hostels. The system includes features like ambulance tracking, patient information sharing, isolation alerts, pharmacy delivery, and real-time device monitoring to enhance health accessibility, especially for users with impairments. The project also includes a React Native mobile app for Android, connecting to the backend for a synchronized user experience.

---

## 📑 **Table of Contents**
- [Technologies Used](#technologies-used)
- [Libraries and APIs](#libraries-and-apis)
- [Problem Statement](#problem-statement)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Key Features](#key-features)
- [Future Outcomes](#future-outcomes)

---

## 🛠 **Technologies Used**
- **Frontend**: React (Care Console and Health Care components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Mobile**: React Native (Android) - **CareMate** app
- **Styling**: Tailwind CSS

---

## 📚 **Libraries and APIs**
- **Chart.js**: Data visualization in the clinic management dashboard.
- **Tesseract OCR**: Optical character recognition for text processing in patient records.
- **Gemini AI API**: AI-based analysis for patient care.
- **Twilio API**: Call and SMS automation for healthcare notifications and reminders.
- **Jitsi**: Video consultancy integration for doctor-patient interactions.

---

## 💡 **Problem Statement**
Develop a university hostel healthcare system with essential functionalities like:

- 🚑 **Ambulance Tracking**
- 🧑‍⚕️ **Patient Information Sharing**
- ⚠️ **Isolation Alerts** (especially for contagious illnesses)
- 💊 **Pharmacy Delivery**
- 🌐 **Access for Users with Impairments** (multi-language and accessibility support)
- ⏱️ **Real-Time Monitoring** of wearable and other health devices

---

## 🧩 **Project Setup**

### Prerequisites
- **Node.js** and **npm** installed on your system.
- **MongoDB** installed locally or access to a MongoDB server.
- **Chocolatey** installed for deploying the backend worldwide.



📲 Running the Project
The project is organized into three main components:

Care Console (React): The primary healthcare management dashboard.
Health Care (React): Focuses on patient information and doctor interactions.
CareMate (React Native): Mobile app for Android for on-the-go access.
Run both the frontend and backend by executing the initial commands mentioned in Project Setup. Health Console requires the additional Ngrok setup for backend deployment to be accessible globally.

✨ Key Features
Feature	Description
🚑 Ambulance Tracking	Track and monitor ambulance locations for emergency responses
🧑‍⚕️ Patient Info Sharing	Secure sharing of patient information among medical professionals
⚠️ Isolation Alerts	Notifies about contagious illness cases and helps manage isolation measures
💊 Pharmacy Delivery	Facilitates medication delivery directly to the university hostel
🌐 Accessibility	Supports users with impairments, offering multi-language options and accessibility tools
⏱️ Real-Time Monitoring	Wearable device integration for health monitoring and record updates
📹 Video Consultancy	Allows patients to book video consultations with doctors through Jitsi integration
🔮 Future Outcomes
We are planning to implement the following features in future versions:

Wearable Integration: Connect with health wearables to capture real-time data.
Multi-Language & Accessibility Support: Additional languages and enhanced accessibility features.
Blockchain Security: Integrate blockchain for secure and tamper-proof health data storage.
By setting up and running Care Console, you’ll enable students and staff in a university hostel environment to access timely healthcare, with automation, real-time monitoring, and secure patient management. This solution aims to enhance the quality of healthcare accessibility and responsiveness in university hostels.

🌍 Impact
Care Console brings responsive and accessible healthcare to university hostels, empowering students and staff with immediate health management tools, real-time monitoring, and automation for a safer and healthier campus life.


📽 Demo Video
Catch the demo on YouTube

Replace `"YOUR_AUTH_TOKEN"` with your actual Ngrok token, and update any other placeholders or links as needed. This README is ready for your GitHub repository, and GitHub will automatically render it nicely when viewed.

### Installation
To install dependencies and start the development environment:




```bash
# Install dependencies
npm install

# Start the development environment
npm run dev
#other dependents
choco install ngrok
ngrok config add-authtoken YOUR_AUTH_TOKEN
ngrok http http://localhost:3000
