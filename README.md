# **Fintech Project Idea Manager (FPI Manager)**



## **Overview**
The **Fintech Project Idea Manager (FPI Manager)** is an innovative web application designed for fintech professionals such as **project managers**, **data analysts**, and **business administrators** to manage project ideas, organize teams, and track progress. The app helps users by automating role assignments, storing data, and generating reports, all powered by advanced AI models like **Gemini API** and real-time services like **Firebase Firestore**.

---

## **Tech Stack**

### **Frontend**
- **React**: A JavaScript framework used for building the user interface, providing fast and interactive user experiences.
- **Tailwind CSS**: A utility-first CSS framework for styling the app, allowing quick and responsive design.
- **Formik + Yup**: 
  - **Formik**: Manages the form state efficiently, ensuring smooth user input and submission processes.
  - **Yup**: Handles form validation, ensuring that user data is accurate before being processed.
  - Together, Formik and Yup make it easy to create, validate, and submit forms.
- **React Beautiful DnD**: A drag-and-drop library used for organizing team roles, project ideas, and tasks, allowing users to visually manage their projects.

### **Backend**
- **Firebase Authentication**: Secure login and registration system to manage users such as project managers, analysts, and administrators.
- **Firebase Firestore**: A real-time NoSQL database for storing project ideas, user roles, tasks, and analytics.
- **Firebase Cloud Functions**: Executes backend logic to handle complex business processes, such as automating role assignments and tracking progress.
- **Gemini APIs**: Leverages embedded and pro models to handle queries and generate responses, enhancing user interaction and project ideation.

---

## **How It Works**

### 1. **Create a New Project**
Start by creating a new fintech-related project, whether it's for **financial modeling**, **data analysis**, or **business administration**.

### 2. **Assign Roles**
Use a custom questionnaire to determine team members' skill sets and assign roles accordingly. You can drag and drop tasks and roles to ensure a clear structure.

### 3. **Track Progress**
Monitor real-time updates on project progress, view detailed reports on the time spent on tasks, and track project health with built-in analytics.

### 4. **Generate Reports**
Automatically generate detailed reports summarizing key business insights, project deliverables, and task completion rates, making it easy to present the results to stakeholders or clients.

### 5. **Export to Firestore / Adobe Express as PDF**
Export important project details, task breakdowns, and business reports directly to Firestore or Adobe Express as a PDF for future reference or presentation.

---

## **Project Setup**

### 1. **Setup Firebase**
- Use **Firebase** for authentication and real-time data storage.
- Set up a **user-authenticated login page** for new and returning users.

### 2. **Create Project Functionality**
- After signing up or logging in, users are redirected to the home page where they can create new projects.
- Utilize the **Gemini API** to ask users questions about the project, which are stored in **Firestore**.

### 3. **Firestore Structure**
The database will be structured into different collections:
- **Users**: Store roles and skill sets for each user.
- **Gemini Queries**: Store past user queries and project ideas. This data can be fetched later to help refine project ideas and user stories.
- **Project Storage**: Once a project is created, it is saved as a document in this collection. Sub-documents include:
  - **Project**: Core project details.
  - **Team Members**: The roles and skills assigned to team members.
  - **User Stories**: Documented user stories generated from user input.

---

## **Potential Features**

### 1. **Documentation / Progress Bar Feature**
Track the progress of project tasks with a visual progress bar to help entrepreneurs or project managers stay on track.

### 2. **Domain Name Integration**
Consider integrating a domain registry via **GoDaddy** for entrepreneurs to generate a domain name for their project.

---

## **Reach Goals**

- **Adobe Express Add-On**: Generate PDFs of the project summaries and reports using **Adobe Express**, making it easy for users to download and share project results.
- **AI-Powered Role Suggestions**: Use machine learning to suggest roles for team members based on their past performance or project requirements.

## **How to Setup**

1. npm create vite@latest -> React -> Javascript
2. cd hackumbc
3. npm install
4. npm run dev

---
