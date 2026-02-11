# 🎓 DII CAMT ShowPro Group

### ระบบบริหารข้อมูลสาขา Digital Industry Integration (DII)

> A comprehensive Academic Management System for the Digital Industry Integration (DII) program at CAMT, Chiang Mai University.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-49_components-000000?logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.24-FF0055?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Page Documentation](#-page-documentation)
  - [Public Pages](#-public-pages)
  - [Dashboards](#-dashboards)
  - [Academic System](#-academic-system)
  - [Activities & Portfolio](#-activities--portfolio)
  - [Internship & Career](#-internship--career)
  - [Administration](#-administration)
  - [Reports & Monitoring](#-reports--monitoring)
  - [System Utilities](#-system-utilities)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Authentication System](#-authentication-system)
- [UI/UX Design System](#-uiux-design-system)
- [Component Library](#-component-library)
- [Type System](#-type-system)
- [Mock Data](#-mock-data)
- [Available Scripts](#-available-scripts)
- [Configuration Files](#-configuration-files)
- [Environment & Build](#-environment--build)
- [Future Roadmap](#-future-roadmap)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Project Overview

**DII CAMT ShowPro Group** is a full-featured, role-based academic management web application built for the Digital Industry Integration (DII) program at the College of Arts, Media and Technology (CAMT), Chiang Mai University.

The system serves **5 distinct user roles** — Student, Lecturer, Staff, Company, and Admin — each with a dedicated dashboard, tailored navigation, and role-specific features. It covers the entire academic lifecycle: course management, grading, activity tracking, internship coordination, career placement, and administrative operations.

### ✨ Highlights

- 🏫 **5 Role-Based Dashboards** — Personalized experience for each user type
- 🌐 **Bilingual (Thai/English)** — Full i18n system with 1,600+ translation keys
- 🎮 **Gamification** — XP, badges, coins, quests, and leaderboards for student engagement
- 📊 **Rich Data Visualization** — Charts, progress rings, radar charts, and analytics
- 🎨 **Modern UI** — Glassmorphism, gradient animations, Framer Motion transitions
- 🌙 **Dark/Light Mode** — Class-based dark mode support via Tailwind CSS
- 📱 **Fully Responsive** — Mobile-first design with collapsible sidebar
- 🧩 **49 UI Components** — Built on shadcn/ui + Radix UI primitives

---

## 🌟 Key Features

| Category | Features |
|----------|----------|
| **Academic** | Course management, scheduling (weekly timetable), grading system, assignment tracking, attendance monitoring |
| **Student Life** | Activity registration with gamification (XP/badges), online portfolio builder, personal dashboard with GPA history & skill radar |
| **Career** | Job/internship postings, applicant tracking, student profile search, intern performance monitoring |
| **Training** | MMORPG-style quest system with main/side quests, XP rewards, company/lecturer-assigned missions |
| **Administration** | User management, budget/procurement tracking, personnel management, document issuance, cooperation network (MOU) |
| **Communication** | In-app messaging, notification center, appointment scheduling, announcement management |
| **Analytics** | Reports & statistics, audit logs, workload tracking, degree progress visualization |
| **System** | Role-based access control, bilingual support, theme switching, privacy/terms pages |

---

## 🛠 Tech Stack

### Core Framework & Build

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev) | 18.3 | UI library for building component-based interfaces |
| [TypeScript](https://www.typescriptlang.org) | 5.8 | Type-safe JavaScript with compile-time checks |
| [Vite](https://vitejs.dev) | 5.4 | Lightning-fast build tool and dev server (SWC-powered) |
| [React Router DOM](https://reactrouter.com) | 6.30 | Client-side routing with nested routes and auth guards |

### UI & Styling

| Technology | Purpose |
|-----------|---------|
| [Tailwind CSS](https://tailwindcss.com) 3.4 | Utility-first CSS framework with custom design tokens |
| [shadcn/ui](https://ui.shadcn.com) | 49 accessible, customizable UI components |
| [Radix UI](https://www.radix-ui.com) | 20+ headless UI primitives (Dialog, Dropdown, Tabs, etc.) |
| [Framer Motion](https://www.framer.com/motion) 12.24 | Declarative animations and page transitions |
| [Lucide React](https://lucide.dev) 0.462 | 1000+ beautiful and consistent SVG icons |
| [class-variance-authority](https://cva.style) | Variant-based component styling |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Intelligent Tailwind class merging |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | Animation utilities for Tailwind |

### Data & State Management

| Technology | Purpose |
|-----------|---------|
| [TanStack React Query](https://tanstack.com/query) 5.83 | Server state management, caching, and synchronization |
| React Context API | Client state management (Auth, Language, Theme) |
| [Recharts](https://recharts.org) 2.15 | Composable charting library for data visualization |

### Forms & Validation

| Technology | Purpose |
|-----------|---------|
| [React Hook Form](https://react-hook-form.com) 7.61 | Performant form handling with minimal re-renders |
| [Zod](https://zod.dev) 3.25 | TypeScript-first schema validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Zod + React Hook Form integration |

### Utilities

| Technology | Purpose |
|-----------|---------|
| [date-fns](https://date-fns.org) 3.6 | Modern JavaScript date utility library |
| [cmdk](https://cmdk.paco.me) | Command palette / search component |
| [Sonner](https://sonner.emilkowal.dev) | Elegant toast notifications |
| [Vaul](https://vaul.emilkowal.dev) | Drawer component for mobile-friendly modals |
| [Embla Carousel](https://www.embla-carousel.com) | Lightweight carousel/slider |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Resizable panel layouts |
| [react-day-picker](https://react-day-picker.js.org) | Calendar date picker |
| [input-otp](https://input-otp.rodz.dev) | One-time password input component |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management (dark/light mode) |

### Fonts

| Font | Usage |
|------|-------|
| **IBM Plex Sans Thai** | Primary font for Thai language content |
| **IBM Plex Sans Thai Looped** | Secondary Thai font variant |
| **Titan One** | Display/heading font (cursive) |

### Dev Dependencies

| Technology | Purpose |
|-----------|---------|
| [ESLint](https://eslint.org) 9.32 | Code linting with React Hooks & Refresh plugins |
| [PostCSS](https://postcss.org) 8.5 | CSS transformations (Tailwind processing) |
| [Autoprefixer](https://autoprefixer.github.io) | Automatic vendor prefixes |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | Prose styling for content-rich pages |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, or **bun** (bun.lockb included)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/dii-camt-showprogroup.git
cd dii-camt-showprogroup

# 2. Install dependencies
npm install
# or
bun install

# 3. Start the development server
npm run dev
```

The app will be available at **`http://localhost:8080`**

### Quick Demo

1. Open `http://localhost:8080` → Landing Page
2. Click **"เข้าสู่ระบบ"** / **"Login"**
3. Select any role (Student, Lecturer, Staff, Company, Admin)
4. Enter any email/password (mock authentication)
5. Explore the role-specific dashboard and features

---

## 📁 Project Structure

```
dii-camt-showprogroup/
├── public/                          # Static assets
│   └── robots.txt                   # Search engine crawl rules
├── src/
│   ├── components/                  # React Components
│   │   ├── common/                  # Shared/reusable components
│   │   │   ├── GlassCard.tsx        # Glassmorphism card component
│   │   │   ├── NotificationCenter.tsx # Notification dropdown
│   │   │   ├── PageHeader.tsx       # Standard page header
│   │   │   ├── ProgressRing.tsx     # Circular progress indicator
│   │   │   ├── RoleCard.tsx         # Role selection card
│   │   │   ├── StatsCard.tsx        # Statistics display card
│   │   │   ├── StudentTimeline.tsx  # Student activity timeline
│   │   │   ├── ThemedCard.tsx       # Theme-aware card
│   │   │   ├── ThemedPageHeader.tsx # Theme-aware page header
│   │   │   ├── ThemedStatCard.tsx   # Theme-aware stat card
│   │   │   └── Timetable.tsx        # Weekly timetable (bilingual)
│   │   ├── dashboard/               # Dashboard-specific components
│   │   │   ├── CourseGradesCard.tsx  # Course grades widget
│   │   │   ├── DegreeProgressCard.tsx # Degree completion tracker
│   │   │   ├── GPAHistoryCard.tsx   # GPA history chart
│   │   │   ├── SkillsRadarCard.tsx  # Skills radar chart
│   │   │   ├── SoftSkillsCard.tsx   # Soft skills assessment
│   │   │   ├── SoftSkillsRubricCard.tsx # Soft skills rubric
│   │   │   ├── TechnicalSkillsCard.tsx  # Technical skills display
│   │   │   └── TechnicalSkillsRubricCard.tsx # Tech skills rubric
│   │   ├── layout/                  # Layout components
│   │   │   ├── DashboardLayout.tsx  # Main layout with sidebar + header
│   │   │   ├── Header.tsx           # Top navigation bar
│   │   │   └── Sidebar.tsx          # Role-based sidebar navigation
│   │   ├── schedule/                # Schedule components
│   │   │   ├── DraggableSchedule.tsx # Drag-and-drop schedule
│   │   │   └── RescheduleDialog.tsx # Reschedule confirmation dialog
│   │   └── ui/                      # 49 shadcn/ui components
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
│   │       ├── tooltip.tsx
│   │       └── ... (49 total)
│   ├── contexts/                    # React Context providers
│   │   ├── AuthContext.tsx          # Authentication & role management
│   │   ├── LanguageContext.tsx      # i18n language switching (TH/EN)
│   │   └── ThemeContext.tsx         # Theme configuration
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx           # Mobile breakpoint detection
│   │   └── use-toast.ts             # Toast notification hook
│   ├── i18n/                        # Internationalization
│   │   └── translations/
│   │       ├── th.ts                # Thai translations (~1,600 lines)
│   │       └── en.ts                # English translations (~1,600 lines)
│   ├── lib/                         # Utility libraries
│   │   ├── mockData.ts              # Mock data for development
│   │   └── utils.ts                 # Helper functions (cn, etc.)
│   ├── pages/                       # Page components (40+ pages)
│   │   ├── dashboards/              # Role-specific dashboards
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CompanyDashboard.tsx
│   │   │   ├── LecturerDashboard.tsx
│   │   │   ├── StaffDashboard.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   └── TeacherDashboard.tsx
│   │   ├── LandingPage.tsx          # Public landing page
│   │   ├── LoginPage.tsx            # Login with role selection
│   │   ├── RegisterPage.tsx         # User registration
│   │   ├── PrivacyPolicy.tsx        # Privacy policy page
│   │   ├── TermsOfService.tsx       # Terms of service page
│   │   ├── Dashboard.tsx            # Dashboard router (role → dashboard)
│   │   ├── PersonalDashboard.tsx    # Student personal overview
│   │   ├── Courses.tsx              # Course management
│   │   ├── Schedule.tsx             # Schedule viewer
│   │   ├── Grades.tsx               # Grade management
│   │   ├── Activities.tsx           # Student activities (gamified)
│   │   ├── Portfolio.tsx            # Online portfolio builder
│   │   ├── Internships.tsx          # Internship search & tracking
│   │   ├── InternTracking.tsx       # Intern performance monitoring
│   │   ├── Training.tsx             # MMORPG quest system
│   │   ├── SkillsRequirement.tsx    # Company skill profiles
│   │   ├── Requests.tsx             # Student requests/petitions
│   │   ├── Messages.tsx             # In-app messaging
│   │   ├── Settings.tsx             # User settings & preferences
│   │   ├── Students.tsx             # Student directory
│   │   ├── Assignments.tsx          # Assignment management
│   │   ├── Appointments.tsx         # Appointment scheduling
│   │   ├── Attendance.tsx           # Attendance tracking
│   │   ├── Workload.tsx             # Workload overview
│   │   ├── WorkloadTracking.tsx     # Workload analytics
│   │   ├── Users.tsx                # User management (Admin)
│   │   ├── Reports.tsx              # Reports & statistics
│   │   ├── Notifications.tsx        # Notification center
│   │   ├── Audit.tsx                # Audit logs (Admin)
│   │   ├── Budget.tsx               # Budget management
│   │   ├── Network.tsx              # Network/connections
│   │   ├── Documents.tsx            # Document management
│   │   ├── Personnel.tsx            # Personnel management
│   │   ├── ScheduleManagement.tsx   # Schedule admin
│   │   ├── ActivitiesManagement.tsx # Activity admin
│   │   ├── JobPostings.tsx          # Job posting management
│   │   ├── Applicants.tsx           # Applicant tracking
│   │   ├── StudentProfiles.tsx      # Student profile search
│   │   ├── Cooperation.tsx          # MOU & cooperation
│   │   ├── Subscription.tsx         # Company subscription plans
│   │   └── NotFound.tsx             # 404 page
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                 # All interfaces & types (825 lines)
│   ├── App.tsx                      # Main app with routing
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind directives & CSS variables
│   ├── main.tsx                     # React entry point
│   └── vite-env.d.ts                # Vite environment types
├── components.json                  # shadcn/ui configuration
├── eslint.config.js                 # ESLint flat config
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript base config
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Node-specific TS config
├── vite.config.ts                   # Vite configuration
└── bun.lockb                        # Bun lockfile
```

---

## 👥 User Roles & Permissions

The system implements **5 distinct roles**, each with its own dashboard, navigation, and feature set:

### 🎓 Student

| Feature | Description |
|---------|-------------|
| Dashboard | GPA overview, credit progress, current courses, upcoming activities |
| Courses | Browse enrolled courses, search available courses, view progress |
| Schedule | Weekly timetable with course details (time, room, building) |
| Grades | View grades per course, GPA per semester, cumulative GPAX |
| Activities | Gamified activities with XP, badges, coins, and leaderboards |
| Portfolio | Build online portfolio with projects, skills, and links |
| Internships | Search and apply for internships, daily logging |
| Training | MMORPG-style quests assigned by companies/lecturers |
| Requests | Submit petitions (certificates, leave, course requests) |
| Personal Dashboard | GPA history, skill radar, soft skills, degree progress |

**Navigation Color:** Blue → Indigo gradient

### 👨‍🏫 Lecturer

| Feature | Description |
|---------|-------------|
| Dashboard | Teaching stats, advisee list, workload, upcoming appointments |
| Course Management | Manage taught courses, student enrollment |
| Grading | Record and modify grades, view class statistics |
| Assignments | Create/manage assignments, track submissions, provide feedback |
| Advisee Students | Monitor advisee academic progress and well-being |
| Attendance | Track student attendance and behavior |
| Appointments | Schedule and manage student meetings |
| Workload Report | View teaching hours vs. maximum hours |
| Schedule | Teaching schedule management |

**Navigation Color:** Emerald → Teal gradient

### 👔 Staff

| Feature | Description |
|---------|-------------|
| Dashboard | System stats, at-risk students, pending requests, quick actions |
| User Management | Manage all users across roles |
| Budget & Procurement | Budget tracking with pie charts, expense categories |
| Cooperation Network | MOU management with partner organizations |
| Document Issuance | Generate and manage official documents |
| Personnel Management | Staff and faculty personnel records |
| Schedule/Room Management | Drag-and-drop schedule builder with room allocation |
| Activity Management | Create and manage student activities |
| Workload Tracking | Monitor faculty workload distribution |
| Reports & Statistics | Generate and view system-wide reports |
| Audit Logs | View system activity logs |
| Announcement Management | Create and manage announcements |

**Navigation Color:** Purple → Fuchsia gradient

### 🏢 Company

| Feature | Description |
|---------|-------------|
| Dashboard | Recruitment stats, active job postings, recent applicants |
| Job Postings | Create and manage job/internship postings |
| Skills Requirement | Define skill requirement profiles for positions |
| Search Students | Browse student profiles filtered by skills, year |
| Applicants | Track applicant status (pending → interview → accepted/rejected) |
| Intern Tracking | Monitor intern performance with weekly reports |
| Cooperation MOU | View and manage MOU agreements |
| Subscription | Choose subscription plans for extended access |

**Navigation Color:** Orange → Amber gradient

### ⚙️ Admin

| Feature | Description |
|---------|-------------|
| Dashboard | System overview, user counts by role, system status, activity log |
| All Staff Features | Full access to all staff-level features |
| System Overview | Comprehensive system health and statistics |
| User Management | Create, modify, deactivate user accounts |
| Curriculum/Courses | Manage all courses across the program |
| Audit Logs | Detailed system activity and security logs |
| System Settings | Global configuration and settings |
| Plus 11 more... | Full admin access to all modules |

**Navigation Color:** Red → Rose gradient

---

## 📖 Page Documentation

### 🏠 Public Pages

#### Landing Page (`/`)
The public-facing home page introducing the DII CAMT system.
- **Bento grid layout** with animated feature cards
- Role selection with visual cards (5 roles)
- Feature highlights with icons and descriptions
- Responsive design with Framer Motion animations
- Language toggle (Thai/English) in header
- Links to Login and Register

#### Login Page (`/login`)
Role-based authentication page.
- **Role selector** — Choose role before logging in
- Email and password form with validation
- "Remember Me" checkbox
- Mock authentication with 1-second simulated delay
- Language toggle support
- Link to Register and Forgot Password

#### Register Page (`/register`)
New user registration form.
- Role-based registration fields
- Form validation with React Hook Form + Zod
- Terms & Privacy policy agreement
- Language toggle support

#### Privacy Policy (`/privacy-policy`)
Comprehensive privacy policy with 6 content sections.
- Hero section with gradient background
- Collapsible sections (data collection, usage, sharing, security, rights, contact)
- Fully bilingual content (1,600+ translated keys)
- Animated page transitions

#### Terms of Service (`/terms-of-service`)
Full terms of service with 7 content sections.
- Hero section with gradient background
- Role-specific terms (4 user roles)
- Collapsible sections with summaries
- Contact information
- Fully bilingual content

---

### 📊 Dashboards

#### Dashboard Router (`/dashboard`)
Automatically routes to the appropriate dashboard based on the authenticated user's role.

#### 🎓 Student Dashboard
| Widget | Description |
|--------|-------------|
| Profile Card | Name, student ID, program, year, avatar |
| GPA Overview | Current GPA, GPAX, credit progress ring |
| Current Courses | List of enrolled courses with status |
| Upcoming Activities | Activities available for registration |
| Gamification | XP points, level, badge collection |
| Quick Actions | Links to frequently used features |

#### 👨‍🏫 Lecturer Dashboard
| Widget | Description |
|--------|-------------|
| Teaching Stats | Courses taught, total students, avg class size |
| Advisee List | Advisee names, status, GPA indicators |
| Workload Meter | Teaching hours vs. maximum hours |
| Upcoming Appointments | Scheduled student meetings |
| Tab Navigation | Courses, Students, Grades, Schedule |

#### 👔 Staff Dashboard
| Widget | Description |
|--------|-------------|
| System Stats | Student count, pending requests, active courses |
| At-Risk Students | Low GPA or flagged students |
| Recent Requests | Latest pending petitions |
| Quick Actions | Common administrative tasks |

#### 🏢 Company Dashboard
| Widget | Description |
|--------|-------------|
| Recruitment Stats | Job postings, applicant count, positions filled |
| Active Postings | Currently open job/internship positions |
| Recent Applicants | Latest applications received |
| Student Access | Profiles accessible via subscription |

#### ⚙️ Admin Dashboard
| Widget | Description |
|--------|-------------|
| User Statistics | Total users broken down by role |
| System Status | Server health, uptime indicators |
| Activity Log | Recent system-wide activities |
| Quick Actions | User management, system settings |

#### 🧑 Personal Dashboard (`/personal-dashboard`)
Student-specific overview combining multiple widgets:
- **GPA History Chart** — Semester-by-semester trend (Recharts line chart)
- **Degree Progress** — Credit completion with animated progress ring
- **Skills Radar** — Technical and soft skills visualization (Recharts radar)
- **Soft Skills Assessment** — Leadership, discipline, responsibility, communication
- **Technical Skills Rubric** — Detailed skill level breakdown
- **Peer Feedback** — Project-based feedback with team size and ratings

---

### 📚 Academic System

#### Courses (`/courses`)
Course management page with role-specific views.
- **Student**: Browse enrolled courses, search available courses, view prerequisites
- **Lecturer**: Manage taught courses, view enrollment numbers
- **Staff/Admin**: Full CRUD operations, statistics, course configuration
- Filter by category, search by name/code
- Course cards with instructor, schedule, room, credits
- Bilingual course information

#### Schedule (`/schedule`)
Weekly timetable viewer.
- Monday–Friday grid layout
- Color-coded course blocks
- Course details: time, room, building, instructor
- Credit summary and total hours
- Bilingual day names and labels

#### Schedule Management (`/schedule-management`)
Administrative schedule builder.
- **Drag-and-drop interface** for scheduling courses
- Room allocation and conflict detection
- Reschedule dialog with confirmation
- Semester and academic year selection

#### Grades (`/grades`)
Grade management system.
- **Student View**: Grades per course, semester GPA, cumulative GPAX
- **Lecturer View**: Record grades, modify grades, class statistics
- Grade distribution charts
- Academic status indicators

#### Assignments (`/assignments`)
Assignment management for lecturers.
- Create new assignments (individual/group)
- Set due dates, max scores, descriptions
- Track submission status and counts
- Grade submissions with feedback
- Submission statistics and analytics

#### Attendance (`/attendance`)
Student attendance tracking.
- Course-based attendance records
- Check-in/check-out tracking
- Attendance percentage calculation
- Absence alerts and notifications

---

### 🎪 Activities & Portfolio

#### Activities (`/activities`)
Gamified student activity system.
- **XP Points** — Earn experience points from activities
- **Badges** — Collectible achievement badges with tiers
- **Activity Coins** — Virtual currency from participation
- **Activity Hours** — Total hours accumulated
- **Available Activities** — Browse and register for events
- **Completed Activities** — History with earned rewards
- **Activity Timeline** — Chronological participation history
- **Leaderboard** — Compare rankings with peers

#### Activities Management (`/activities-management`)
Administrative activity management for staff.
- Create and configure activities
- Set capacity limits, categories, reward values
- Track registration and attendance
- View participation statistics
- Manage activity status (upcoming/active/completed)

#### Portfolio (`/portfolio`)
Online portfolio builder for students.
- **Personal Info**: Bio, headline, contact details
- **Projects**: Project gallery with descriptions, tech stack, links
- **Skills**: Categorized skills (Programming, Frameworks, Tools, Soft Skills)
- **External Links**: GitHub, LinkedIn, Personal Website
- **Privacy Settings**: Control which companies can view portfolio
- **Export**: Share portfolio via link

#### Training (`/training`)
**MMORPG-style quest system** for skill development.
- **Quest Types**: Main quests (storyline) and side quests (optional)
- **Rewards**: XP points, coins, achievement badges
- **Difficulty Levels**: Easy, Medium, Hard, Expert
- **Categories**: Design, Development, Data, Communication
- **Quest Assigners**: Companies and lecturers can create quests
- **Progress Tracking**: Task checklists within each quest
- **Deadlines**: Time-limited quests with countdown timers
- **Bilingual**: Full Thai/English quest content

---

### 💼 Internship & Career

#### Internships (`/internships`)
Internship search and management for students.
- Search by company, location, required skills
- Detailed position descriptions
- One-click application with cover letter
- Application status tracking (pending → interview → accepted)
- Daily log during internship period
- Company reviews and ratings

#### Intern Tracking (`/intern-tracking`)
Intern performance monitoring for companies.
- **Intern Cards**: Avatar, name, position, company, overall progress
- **Performance Metrics**: Technical, communication, teamwork, punctuality, initiative
- **Weekly Reports**: Submission status, scores, summaries
- **Progress Visualization**: Completion percentage, weeks completed
- **Rating System**: Star ratings for overall performance
- Bilingual intern data (name/nameEn, summary/summaryEn)

#### Job Postings (`/job-postings`)
Job/internship posting management for companies.
- Create detailed job postings
- Set requirements, qualifications, salary range
- Manage posting status (open/closed/filled)
- View applicant count per posting
- Featured and urgent posting options

#### Skills Requirement (`/skills-requirement`)
Skill requirement profile management for companies.
- Define position skill profiles (e.g., "Full-Stack Developer")
- Specify required skills with proficiency levels
- Set skill priorities (critical/important/nice-to-have)
- View matched student count and average match percentage
- Skill categories: Code, Design, Database, ML, Communication, Security, Analytics
- CRUD operations via dialogs

#### Applicants (`/applicants`)
Applicant tracking system for companies.
- View all applicants across job postings
- Filter by position, status, date
- Status workflow: Pending → Interview → Accepted/Rejected
- View applicant details, resume, portfolio
- Communication with applicants

#### Student Profiles (`/student-profiles`)
Student directory for companies.
- Search students by skills, year, GPA
- View academic records, skills, portfolio
- Contact students (with permission)
- Save/bookmark interesting profiles
- Also accessible as "Talent Search" (`/talent-search`)

#### Subscription (`/subscription`)
Company subscription plans.
- Tiered subscription packages
- Access to additional student profiles
- Premium features and analytics
- Plan comparison and upgrade options

---

### 👥 Administration

#### Users (`/users`)
User management for admins.
- List all users across all roles
- Add, edit, deactivate user accounts
- Assign and modify roles/permissions
- Search and filter by role, status, department
- Account activation/deactivation

#### Students (`/students`)
Student directory for staff and admin.
- Complete student roster
- Search by name, student ID, year, status
- View detailed student profiles
- At-risk student identification
- Academic status tracking

#### Requests (`/requests`)
Student petition system.
- **Student**: Submit new requests (5 types):
  - Over-registration request
  - Certificate request
  - Leave of absence
  - Resignation request
  - General request
- **Staff**: Approve/reject requests with notes
- Status tracking with timeline
- Document attachment support
- FAQ section (bilingual)

#### Appointments (`/appointments`)
Meeting scheduling system.
- Book advisor/lecturer appointments
- View available time slots
- Meeting room booking
- Confirm/cancel appointments
- Calendar view integration

#### Documents (`/documents`)
Document management system.
- Official document issuance
- Document templates and generation
- Download and print support
- Document history and tracking

#### Budget (`/budget`)
Budget and procurement tracking.
- Budget overview with pie charts
- Expense categories: Computer Equipment, Office Supplies, Service Charges, Others
- Transaction history
- Budget allocation and remaining balance
- Procurement request management

#### Personnel (`/personnel`)
Personnel management for staff and admin.
- Faculty and staff records
- Position and department management
- Contact information directory
- Work assignment tracking

#### Cooperation (`/cooperation`)
MOU and cooperation network management.
- Partner organization directory
- MOU agreement management
- Activity history with partners
- Coordinator contact information
- Bilingual partner data

---

### 📈 Reports & Monitoring

#### Reports (`/reports`)
Comprehensive reporting system.
- Student statistics overview
- Academic performance reports
- Activity participation reports
- Internship placement reports
- Export to PDF/Excel

#### Notifications (`/notifications`)
Notification center.
- All notifications in one place
- Category filters: Info, Important, Urgent
- Mark as read/unread
- Direct links to relevant pages
- Real-time notification count

#### Audit (`/audit`)
System audit logs for admin.
- Login/logout history
- Data modification logs
- Filter by user, date, action type
- Security monitoring
- IP address tracking

#### Workload (`/workload`)
Workload overview for lecturers.
- Teaching hours summary
- Course load distribution
- Maximum hours compliance
- Semester comparison

#### Workload Tracking (`/workload-tracking`)
Detailed workload analytics for staff.
- Faculty workload distribution charts
- Department-level analytics
- Overtime and underload alerts
- Historical comparison

---

### ⚙️ System Utilities

#### Messages (`/messages`)
In-app messaging system.
- Inbox/outbox management
- Search messages by content or sender
- File attachment support
- Conversation threading
- Unread count badges

#### Settings (`/settings`)
User preferences and configuration.
- Edit personal information
- Change password
- Notification preferences
- Privacy settings
- Theme selection (Light/Dark)
- Language selection (Thai/English)

#### Network (`/network`)
Professional network and connections.
- Connection management
- Professional contact directory
- Network visualization

#### Not Found (`/404`)
Custom 404 error page.
- Animated illustration
- Helpful navigation links
- Return to dashboard button

---

## 🌐 Internationalization (i18n)

The system implements a **complete bilingual experience** (Thai 🇹🇭 / English 🇬🇧) with a custom-built i18n system.

### Architecture

```
src/contexts/LanguageContext.tsx    → React Context provider
src/i18n/translations/th.ts       → Thai translations (~1,600 lines)
src/i18n/translations/en.ts       → English translations (~1,600 lines)
```

### How It Works

1. **LanguageContext** provides `{ language, setLanguage, toggleLanguage, t }` via React Context
2. Components use `const { t, language } = useLanguage()` hook to access translations
3. Translation keys are organized by page/section: `t.dashboard.title`, `t.coursesPage.searchPlaceholder`
4. Language preference is persisted in `localStorage` (`app_language` key)
5. The `<html lang>` attribute is automatically updated when language changes
6. Default language is Thai (`th`)

### Translation Structure

```typescript
// Example: en.ts
export const en = {
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    export: "Export",
    // ... 30+ common keys
  },
  roles: {
    student: "Student",
    lecturer: "Lecturer",
    staff: "Staff",
    company: "Company",
    admin: "Admin",
  },
  header: {
    dashboard: "Dashboard",
    notifications: "Notifications",
    switchRole: "Switch Role",
    logout: "Logout",
    language: "Language",
    // ...
  },
  // 40+ page-specific sections
  coursesPage: { /* ... */ },
  activitiesPage: { /* ... */ },
  privacyPolicyPage: { /* ... */ },
  termsOfServicePage: { /* ... */ },
  // ...
};
```

### Language Toggle

- **Landing/Login/Register Pages**: Globe icon button in the top navigation
- **Dashboard Pages**: Language switcher in the Header component
- **Instant switching**: No page reload required, all content updates reactively

### Coverage

| Area | Status |
|------|--------|
| Navigation (Sidebar + Header) | ✅ Fully translated |
| All 40+ page UI labels | ✅ Fully translated |
| Dashboard widgets | ✅ Fully translated |
| Common components | ✅ Fully translated |
| Form labels & placeholders | ✅ Fully translated |
| Error messages | ✅ Fully translated |
| Mock data (names, dates) | 📌 Kept in Thai (content data) |

---

## 🔐 Authentication System

### Architecture

```
src/contexts/AuthContext.tsx    → Auth state management
src/lib/mockData.ts            → Mock user database
```

### Features

| Feature | Description |
|---------|-------------|
| **Role-Based Login** | Select role before authenticating |
| **Email/Password** | Standard credential-based login |
| **Mock Authentication** | 1-second simulated API delay |
| **Session Persistence** | Stored in `localStorage` (`auth_user` key) |
| **Role Switching** | Demo feature: switch between roles without re-login |
| **Auth Guard** | `DashboardLayout` redirects unauthenticated users to `/login` |
| **Auto Restore** | Session restored from localStorage on app mount |

### User Object Shape

```typescript
interface BaseUser {
  id: string;
  email: string;
  name: string;
  nameThai: string;
  role: 'student' | 'lecturer' | 'staff' | 'company' | 'admin';
  avatar: string;
  phone: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}
```

### Context API

```typescript
const { user, login, logout, isAuthenticated, switchRole } = useAuth();
```

---

## 🎨 UI/UX Design System

### Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Glassmorphism** | Frosted glass effect on cards with `backdrop-blur` |
| **Gradient System** | Role-specific gradients (Blue/Emerald/Purple/Orange/Red) |
| **Micro-interactions** | Framer Motion hover/tap animations on all interactive elements |
| **Consistent Spacing** | Tailwind spacing scale for uniform gaps and padding |
| **Color Tokens** | HSL CSS variables for light/dark theme compatibility |

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, hamburger menu, stacked cards |
| Tablet | 768px – 1024px | Two columns, collapsible sidebar |
| Desktop | > 1024px | Full sidebar, multi-column grid, max-width 1400px |

### Animation System

```typescript
// Framer Motion page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

| Animation Type | Usage |
|---------------|-------|
| Page Transitions | Fade-in with upward slide on every page |
| Card Hover | Scale up (1.02) with shadow elevation |
| Staggered Lists | Sequential fade-in for list items |
| Progress Rings | Animated circular progress indicators |
| Gradient Backgrounds | Subtle moving gradient blurs (decorative) |

### Color Palette

| Role | Primary | Gradient |
|------|---------|----------|
| Student | Blue (#3B82F6) | Blue → Indigo |
| Lecturer | Emerald (#10B981) | Emerald → Teal |
| Staff | Purple (#8B5CF6) | Purple → Fuchsia |
| Company | Orange (#F97316) | Orange → Amber |
| Admin | Red (#EF4444) | Red → Rose |

### Dark Mode

- Implemented via Tailwind's `class` strategy (`darkMode: "class"`)
- Uses `next-themes` for theme management
- CSS variables in `:root` and `.dark` for seamless switching
- All custom components support dark mode

---

## 🧩 Component Library

### shadcn/ui Components (49 total)

The project uses **49 shadcn/ui components** built on Radix UI primitives:

<details>
<summary>Click to expand full component list</summary>

| Component | Radix Primitive | Description |
|-----------|----------------|-------------|
| Accordion | ✅ | Collapsible content sections |
| Alert Dialog | ✅ | Confirmation dialogs with actions |
| Alert | — | Status/info alert banners |
| Aspect Ratio | ✅ | Maintain element aspect ratio |
| Avatar | ✅ | User profile images |
| Badge | — | Status/category labels |
| Breadcrumb | — | Navigation breadcrumbs |
| Button | — | Primary action buttons (multiple variants) |
| Calendar | — | Date picker calendar |
| Card | — | Content container cards |
| Carousel | — | Image/content carousel (Embla) |
| Chart | — | Chart container (Recharts) |
| Checkbox | ✅ | Toggle checkboxes |
| Collapsible | ✅ | Show/hide content sections |
| Command | — | Command palette (cmdk) |
| Context Menu | ✅ | Right-click context menus |
| Dialog | ✅ | Modal dialogs |
| Drawer | — | Mobile bottom drawer (vaul) |
| Dropdown Menu | ✅ | Dropdown menus |
| Form | — | Form wrapper with validation |
| Hover Card | ✅ | Hover-triggered info cards |
| Input OTP | — | One-time password input |
| Input | — | Text input fields |
| Label | ✅ | Form field labels |
| Menubar | ✅ | Horizontal menu bar |
| Navigation Menu | ✅ | Site navigation |
| Pagination | — | Page navigation |
| Popover | ✅ | Popup content panels |
| Progress | ✅ | Progress bars |
| Radio Group | ✅ | Radio button groups |
| Resizable | — | Resizable panels |
| Scroll Area | ✅ | Custom scrollbar containers |
| Select | ✅ | Dropdown select inputs |
| Separator | ✅ | Visual dividers |
| Sheet | — | Side panel overlay |
| Skeleton | — | Loading placeholders |
| Slider | ✅ | Range slider inputs |
| Sonner | — | Toast notifications |
| Switch | ✅ | Toggle switches |
| Table | — | Data tables |
| Tabs | ✅ | Tabbed content |
| Textarea | — | Multi-line text input |
| Toast | ✅ | Toast notifications |
| Toaster | — | Toast container |
| Toggle | ✅ | Toggle buttons |
| Toggle Group | ✅ | Grouped toggles |
| Tooltip | ✅ | Hover tooltips |
| Use Toast | — | Toast hook |

</details>

### Custom Components

| Component | Path | Description |
|-----------|------|-------------|
| GlassCard | `common/GlassCard.tsx` | Glassmorphism card with blur effect |
| ThemedCard | `common/ThemedCard.tsx` | Role-theme-aware card container |
| ThemedPageHeader | `common/ThemedPageHeader.tsx` | Gradient page header with breadcrumbs |
| ThemedStatCard | `common/ThemedStatCard.tsx` | Statistic card with themed styling |
| StatsCard | `common/StatsCard.tsx` | Simple statistics display card |
| PageHeader | `common/PageHeader.tsx` | Standard page header |
| ProgressRing | `common/ProgressRing.tsx` | SVG circular progress indicator |
| RoleCard | `common/RoleCard.tsx` | Role selection card for login |
| StudentTimeline | `common/StudentTimeline.tsx` | Timeline of student events |
| NotificationCenter | `common/NotificationCenter.tsx` | Notification dropdown panel |
| Timetable | `common/Timetable.tsx` | Bilingual weekly timetable grid |
| DraggableSchedule | `schedule/DraggableSchedule.tsx` | Drag-and-drop schedule builder |
| RescheduleDialog | `schedule/RescheduleDialog.tsx` | Reschedule confirmation dialog |

### Dashboard Widgets

| Widget | Description |
|--------|-------------|
| DegreeProgressCard | Credit completion progress ring |
| GPAHistoryCard | GPA trend line chart (Recharts) |
| CourseGradesCard | Current course grades list |
| SkillsRadarCard | Radar chart of student skills |
| SoftSkillsCard | Soft skill assessment scores |
| SoftSkillsRubricCard | Detailed soft skill rubric |
| TechnicalSkillsCard | Technical skill levels |
| TechnicalSkillsRubricCard | Detailed technical skill rubric |

---

## 📐 Type System

The project defines comprehensive TypeScript interfaces in `src/types/index.ts` (**825 lines**):

### Core Types

```typescript
type UserRole = 'student' | 'lecturer' | 'staff' | 'company' | 'admin';
```

### Key Interfaces

| Interface | Key Fields |
|-----------|-----------|
| `BaseUser` | id, email, name, nameThai, role, avatar, phone, isActive |
| `Student` | studentId, major, program, year, GPA, GPAX, totalCredits, earnedCredits, badges, gamificationPoints, portfolio, internship |
| `Lecturer` | lecturerId, department, position (instructor → professor), courses, teachingHours, advisees |
| `Staff` | staffId, department, position, permissions |
| `Company` | companyId, industry, description, jobPostings |
| `Admin` | adminLevel, permissions |
| `Course` | code, name, credits, instructor, schedule, prerequisites |
| `Grade` | course, semester, score, letterGrade |
| `Assignment` | title, dueDate, maxScore, submissions |
| `Activity` | name, category, XP, hours, capacity |
| `Badge` | name, tier, icon, requirement |
| `JobPosting` | title, requirements, salary, status |
| `Internship` | company, position, period, status |

---

## 📊 Mock Data

The system uses comprehensive mock data (`src/lib/mockData.ts`) for development and demonstration:

| Data Type | Count | Description |
|-----------|-------|-------------|
| Students | 3+ | Full student profiles with grades, activities, badges |
| Lecturers | 2+ | Faculty with courses, advisees, teaching hours |
| Staff | 1+ | Administrative staff with permissions |
| Companies | 2+ | Partner companies with job postings |
| Admin | 1+ | System administrator |
| Courses | 3+ | Full course details with enrollment |
| Activities | 4+ | Various activity types with gamification |
| Job Postings | 2+ | Open positions with requirements |
| Notifications | 3+ | Different notification types |
| Quests | 3+ | Training quests with tasks and rewards |
| Intern Records | 4+ | Intern performance data with weekly reports |

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start Vite dev server on port 8080 |
| **Build** | `npm run build` | Production build with TypeScript check |
| **Build (Dev)** | `npm run build:dev` | Development mode build |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Run ESLint with React Hooks rules |

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite config: SWC plugin, port 8080, `@` path alias |
| `tailwind.config.ts` | Tailwind: dark mode (class), custom fonts, HSL color tokens, container (max 1400px) |
| `tsconfig.json` | TypeScript: base config with path aliases |
| `tsconfig.app.json` | TypeScript: app-specific strict settings |
| `tsconfig.node.json` | TypeScript: Node.js environment settings |
| `postcss.config.js` | PostCSS: Tailwind + Autoprefixer plugins |
| `eslint.config.js` | ESLint: flat config with React Hooks & Refresh plugins |
| `components.json` | shadcn/ui: component registry and style config |
| `index.html` | HTML: entry point with root div |

### Vite Configuration

```typescript
export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react()],  // SWC-powered React plugin
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
});
```

### Tailwind Configuration

```typescript
{
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", maxWidth: "1400px" },
    fontFamily: {
      heading: ["Titan One", "cursive"],
      thai: ["IBM Plex Sans Thai", "sans-serif"],
      sans: ["IBM Plex Sans Thai", "sans-serif"],
    }
  }
}
```

---

## 🏗 Environment & Build

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js     (~1,650 KB)
│   └── index-[hash].css
└── index.html
```

| Metric | Value |
|--------|-------|
| **Build tool** | Vite 5.4 with SWC |
| **Build time** | ~9 seconds |
| **Modules transformed** | ~3,800+ |
| **Output type** | Single-page application (SPA) |
| **Dev server port** | 8080 |
| **Hot reload** | ✅ HMR via Vite |

### Path Aliases

| Alias | Resolves To |
|-------|-------------|
| `@/` | `src/` |
| `@/components/*` | `src/components/*` |
| `@/contexts/*` | `src/contexts/*` |
| `@/hooks/*` | `src/hooks/*` |
| `@/lib/*` | `src/lib/*` |
| `@/pages/*` | `src/pages/*` |
| `@/types/*` | `src/types/*` |

---

## 🔮 Future Roadmap

- [ ] 🔌 **Backend API Integration** — Connect to real REST/GraphQL API
- [ ] 🔑 **Real Authentication** — JWT-based auth with refresh tokens
- [ ] 📱 **Push Notifications** — Web push and mobile notifications
- [ ] 📄 **PDF Export** — Generate reports, transcripts, certificates as PDF
- [ ] 💬 **Real-time Chat** — WebSocket-based messaging system
- [ ] 📲 **Mobile App** — React Native companion app
- [ ] 🧪 **Testing** — Unit tests (Vitest), E2E tests (Playwright)
- [ ] ♿ **Accessibility** — WCAG 2.1 AA compliance audit
- [ ] 🚀 **CI/CD** — GitHub Actions pipeline for automated deployment
- [ ] 📈 **Analytics** — Usage analytics and performance monitoring
- [ ] 🔍 **Full-text Search** — Elasticsearch integration
- [ ] 🗄️ **Database** — PostgreSQL/MongoDB backend storage

---

## 👥 Team

**DII ShowPro Group**
Digital Industry Integration (DII) Program
College of Arts, Media and Technology (CAMT)
Chiang Mai University 🏔️

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

**Built with ❤️ by DII CAMT ShowPro Group**

[🏠 Home](/) · [📖 Documentation](#-page-documentation) · [🚀 Getting Started](#-getting-started) · [🛠 Tech Stack](#-tech-stack)

</div>
