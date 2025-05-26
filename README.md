# 🚀 FLAM - HR Dashboard

A modern HR Performance Dashboard built with Next.js 14, featuring real-time employee management, analytics, and performance tracking.

## ✨ Features Implemented

### 🔐 Authentication

- Custom login and signup pages 
- Protected routes using NextAuth.js
- Secure session management
- Automatic redirect to login for unauthenticated users

### 🏠 Dashboard

- Dynamic employee list with infinite scroll paginnation
- Custom animated loading states with Flam branding
- Responsive user cards showing:
  - Employee details (name, email, age)
  - Department information
  - Performance ratings
  - Quick action buttons

### 🔍 Search & Filtering

- Real-time search functionality
- Multi-select department filters
- Performance rating filters
- State persistence across sessions
- Filter reset capability

### 📊 Analytics Dashboard

- Interactive charts using Chart.js
- Department-wise performance visualization
- Rating distribution analysis
- Real-time data updates
- Responsive chart layouts

### 📌 Bookmark Management

- Add/remove bookmarks functionality
- Bookmark counter in sidebar
- Persistent bookmark storage
- Quick access to bookmarked employees

### 🎨 UI/UX Features

- Responsive sidebar with minimize/expand functionality
- Dark/Light mode support
- Custom loading animations
- Smooth transitions and animations
- Mobile-friendly design
- Tooltips for better user guidance

### 🔄 State Management

- Redux implementation for global state
- Efficient pagination handling
- Loading state management
- Filter state management
- Bookmark state persistence

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Charts**: Chart.js with React-Chartjs-2
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui
- **API Integration**: DummyJSON

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/cherish2003/flam_ass.git
```

2. Install dependencies:

```bash
cd flam_ass
npm install
```

3. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodatabase url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Screenshots <img width="1432" alt="Screenshot 2025-05-26 at 3 38 30 PM" src="https://github.com/user-attachments/assets/89c8ab9a-a6c0-440b-8ca3-9c5e98a7e02f" />

<img width="1290" alt="Screenshot 2025-05-26 at 3 37 55 PM" src="https://github.com/user-attachments/assets/fd7c68a3-26e5-4e74-851e-4d28021305cc" />

<img width="1440" alt="Screenshot 2025-05-26 at 3 39 04 PM" src="https://github.com/user-attachments/assets/2bd4b315-3cf3-472c-a70f-90e7d6f5125f" />

## Deployed link : [https://flam-ass.vercel.app/](https://flam-ass.vercel.app/)
