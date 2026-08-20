# Project Features

- User Registration and Login
- Google Authentication
- GitHub Authentication
- User-specific Dashboard
- Application Management
  - Create Application
  - Edit Application
  - Delete Application
  - Application Status Management (Drag and Drop)
  - Real-time Application Summary
- Interview Management
  - Schedule Interview
  - Edit and Delete Interview
  - Upcoming Interviews
  - Dashboard Upcoming Interviews
- Settings
  - Update Name
  - Update Email
  - Change Password
- AI Tools page (Work in Progress)
- Documents page (Work in Progress)
- Analytics page (Work in Progress)

---

# Tech Stack

| Technology | Usage |
|------------|-------|
| Next.js | Frontend and full-stack framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| shadcn/ui & Base UI | UI components |
| dnd-kit | Drag and drop functionality |
| MongoDB | Database |
| Mongoose | MongoDB data modeling |
| Better Auth | Authentication |
| Sonner | Toast notifications |

---

# How to Use

### 1. Create an Account
The user can register using email and password or use available social login options (Google and GitHub).

### 2. Login
After logging in, the user can access their personal dashboard. All data is securely tied to the user's account.

### 3. Manage Applications
Users can track their job search progress:
- **Add a new job application** with details like company name, job title, and notes.
- **View applications** visually on the application board.
- **Change application status** using the visual drag-and-drop board.
- **Edit an application** to update details or correct mistakes.
- **Delete an application** if it is no longer needed.

### 4. Manage Interviews
Users can stay organized with their interview schedule:
- **Schedule an interview** and connect it to a specific application.
- **View upcoming interviews** natively in the Interviews tab.
- **Edit an interview** to change meeting links, dates, or format.
- **Delete an interview** if it is canceled.

### 5. Dashboard
The dashboard provides a quick overview where the user can view their application statistics and see their nearest upcoming interviews.

### 6. Settings
The user can manage their account information and security settings, including:
- Name
- Email
- Password