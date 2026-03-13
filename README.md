# 🎓 DII CAMT ShowPro Group

**ระบบบริหารจัดการสาขาบูรณาการอุตสาหกรรมดิจิทัล (Digital Industry Integration)**  
College of Arts, Media and Technology (CAMT) — Chiang Mai University

> A comprehensive, role-based academic management web application covering the full student lifecycle — from enrollment to career placement.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.24-FF0055?logo=framer&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-49_components-000000)
![i18n](https://img.shields.io/badge/i18n-TH%20%2F%20EN-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 สารบัญ / Table of Contents

- [ภาพรวมโปรเจค](#-ภาพรวมโปรเจค)
- [ระบบทั้งหมดในเว็บ](#-ระบบทั้งหมดในเว็บ)
- [5 บทบาทผู้ใช้งาน](#-5-บทบาทผู้ใช้งาน)
- [รายละเอียดแต่ละระบบ](#-รายละเอียดแต่ละระบบ)
  - [ระบบ Authentication](#1-ระบบ-authentication)
  - [ระบบ Dashboard](#2-ระบบ-dashboard)
  - [ระบบการเรียน (Academic)](#3-ระบบการเรียน-academic)
  - [ระบบกิจกรรมและ Gamification](#4-ระบบกิจกรรมและ-gamification)
  - [ระบบ Portfolio](#5-ระบบ-portfolio)
  - [ระบบฝึกงานและอาชีพ (Career)](#6-ระบบฝึกงานและอาชีพ-career)
  - [ระบบ Training Quest (MMORPG)](#7-ระบบ-training-quest-mmorpg)
  - [ระบบบริหารจัดการ (Admin)](#8-ระบบบริหารจัดการ-admin)
  - [ระบบการสื่อสาร (Communication)](#9-ระบบการสื่อสาร-communication)
  - [ระบบรายงานและ Analytics](#10-ระบบรายงานและ-analytics)
  - [ระบบ Internationalization (i18n)](#11-ระบบ-internationalization-i18n)
  - [ระบบ Theme (Dark/Light)](#12-ระบบ-theme-darklight)
  - [หน้า Public / Legal](#13-หน้า-public--legal)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [การติดตั้งและรันโปรเจค](#-การติดตั้งและรันโปรเจค)
- [โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
- [Design System](#-design-system)
- [Component Library](#-component-library)
- [แผนพัฒนาในอนาคต](#-แผนพัฒนาในอนาคต)

---

## 🎯 ภาพรวมโปรเจค

**DII CAMT ShowPro Group** คือ Web Application ครบวงจรที่ให้บริการ **5 กลุ่มผู้ใช้** ในสาขา DII ได้แก่ นักศึกษา, อาจารย์, เจ้าหน้าที่, บริษัท, และผู้ดูแลระบบ โดยแต่ละ Role จะมี Dashboard, Navigation, และฟีเจอร์เฉพาะของตัวเอง

ระบบครอบคลุมทุกมิติของวงจรการศึกษา ตั้งแต่การลงทะเบียนเรียน → การวัดผล → กิจกรรมนักศึกษา → ฝึกงาน → หางาน

### ✨ จุดเด่น

| จุดเด่น | รายละเอียด |
|---------|-----------|
| 🏫 **5 Role-Based Dashboards** | แต่ละ Role มี Dashboard และ Navigation เฉพาะตัว |
| 🌐 **Bilingual (TH/EN)** | i18n ครบ 1,600+ translation keys รองรับทั้งภาษาไทยและอังกฤษ |
| 🎮 **Gamification System** | XP, Badges, Coins, Level, Leaderboard สำหรับนักศึกษา |
| ⚔️ **MMORPG Quest System** | ระบบ Quest แบบเกมสำหรับฝึกทักษะ |
| 📊 **Rich Analytics** | Recharts: Line chart, Radar chart, Pie chart, Progress rings |
| 🎨 **Glassmorphism UI** | Framer Motion, Gradient, Backdrop blur animations |
| 🌙 **Dark/Light Mode** | Class-based dark mode ผ่าน Tailwind + next-themes |
| 📱 **Mobile Responsive** | Collapsible sidebar, stacked cards บน mobile |
| 🧩 **49 UI Components** | shadcn/ui + Radix UI primitives |

---

## 🗂️ ระบบทั้งหมดในเว็บ

เว็บนี้ประกอบด้วย **13 ระบบหลัก** รวม **44 หน้า** (routes):

| # | ระบบ | จำนวนหน้า | กลุ่มผู้ใช้ |
|---|------|-----------|-----------|
| 1 | [Authentication (เข้าสู่ระบบ)](#1-ระบบ-authentication) | 3 | ทุกคน |
| 2 | [Dashboard (แดชบอร์ด)](#2-ระบบ-dashboard) | 7 | ทุกคน (แยกตาม Role) |
| 3 | [Academic (การเรียน)](#3-ระบบการเรียน-academic) | 6 | นักศึกษา, อาจารย์, Staff |
| 4 | [Gamification (กิจกรรม)](#4-ระบบกิจกรรมและ-gamification) | 2 | นักศึกษา, Staff |
| 5 | [Portfolio (พอร์ตโฟลิโอ)](#5-ระบบ-portfolio) | 1 | นักศึกษา |
| 6 | [Career (ฝึกงาน/งาน)](#6-ระบบฝึกงานและอาชีพ-career) | 6 | นักศึกษา, บริษัท |
| 7 | [Training Quest (MMORPG)](#7-ระบบ-training-quest-mmorpg) | 1 | นักศึกษา |
| 8 | [Administration (บริหาร)](#8-ระบบบริหารจัดการ-admin) | 10 | Staff, Admin |
| 9 | [Communication (สื่อสาร)](#9-ระบบการสื่อสาร-communication) | 3 | ทุกคน |
| 10 | [Analytics (รายงาน)](#10-ระบบรายงานและ-analytics) | 4 | Staff, Admin, อาจารย์ |
| 11 | [i18n (ภาษา)](#11-ระบบ-internationalization-i18n) | — | ทุกคน |
| 12 | [Theme (สีสัน)](#12-ระบบ-theme-darklight) | — | ทุกคน |
| 13 | [Public / Legal](#13-หน้า-public--legal) | 2 | สาธารณะ |

---

## 👥 5 บทบาทผู้ใช้งาน

### 🎓 นักศึกษา (Student) — สีฟ้า (Blue → Indigo)

| เมนู | URL | คำอธิบาย |
|------|-----|----------|
| Dashboard | `/dashboard` | ภาพรวม GPA, เครดิต, กิจกรรม |
| Personal Dashboard | `/personal-dashboard` | สถิติส่วนตัวเชิงลึก |
| Courses | `/courses` | รายวิชาที่ลงทะเบียน |
| Schedule | `/schedule` | ตารางเรียนรายสัปดาห์ |
| Grades | `/grades` | เกรดและ GPA/GPAX |
| Activities | `/activities` | กิจกรรม + Gamification |
| Portfolio | `/portfolio` | พอร์ตโฟลิโอออนไลน์ |
| Internships | `/internships` | ค้นหาและสมัครฝึกงาน |
| Requests | `/requests` | ยื่นคำร้องต่างๆ |
| Training | `/training` | Quest system MMORPG |
| Messages | `/messages` | ข้อความ |
| Settings | `/settings` | ตั้งค่าส่วนตัว |

### 👨‍🏫 อาจารย์ (Lecturer) — สีเขียว (Emerald → Teal)

| เมนู | URL | คำอธิบาย |
|------|-----|----------|
| Dashboard | `/dashboard` | สถิติการสอน, ลูกศิษย์ |
| Teaching Schedule | `/schedule` | ตารางสอน |
| Advisee Students | `/students` | รายชื่อนักศึกษาที่ปรึกษา |
| Course Management | `/courses` | จัดการรายวิชา |
| Attendance/Behavior | `/attendance` | ติดตามการเข้าเรียน |
| Grading | `/grades` | บันทึกและแก้ไขเกรด |
| Appointments | `/appointments` | นัดพบนักศึกษา |
| Workload Report | `/workload` | รายงานภาระงานสอน |
| Messages | `/messages` | ข้อความ |
| Settings | `/settings` | ตั้งค่าส่วนตัว |

### 👔 เจ้าหน้าที่ (Staff) — สีม่วง (Purple → Fuchsia)

| เมนู | URL | คำอธิบาย |
|------|-----|----------|
| Dashboard | `/dashboard` | ภาพรวมระบบ |
| Users | `/users` | จัดการผู้ใช้ |
| Budget/Procurement | `/budget` | งบประมาณ |
| Cooperation Network | `/network` | เครือข่ายความร่วมมือ |
| Issue Documents | `/documents` | ออกเอกสาร |
| Personnel Mgmt | `/personnel` | จัดการบุคลากร |
| Schedule/Room Mgmt | `/schedule-management` | จัดตารางเรียน + ห้อง |
| Activity Management | `/activities-management` | จัดการกิจกรรม |
| Workload Tracking | `/workload-tracking` | ติดตามภาระงาน |
| Reports & Stats | `/reports` | รายงานสถิติ |
| Audit | `/audit` | Audit logs |
| Announcement Mgmt | `/notifications` | จัดการประกาศ |
| Settings | `/settings` | ตั้งค่า |

### 🏢 บริษัท (Company) — สีส้ม (Orange → Amber)

| เมนู | URL | คำอธิบาย |
|------|-----|----------|
| Dashboard | `/dashboard` | สถิติการรับสมัคร |
| Job Postings | `/job-postings` | ประกาศงาน/ฝึกงาน |
| Skills Requirement | `/skills-requirement` | กำหนด Profile ทักษะ |
| Search Students | `/student-profiles` | ค้นหานักศึกษา |
| Applicants | `/applicants` | ติดตามผู้สมัคร |
| Intern Tracking | `/intern-tracking` | ติดตามผลนักศึกษาฝึกงาน |
| Cooperation MOU | `/cooperation` | สัญญาความร่วมมือ |
| Subscription | `/subscription` | แพ็กเกจสมาชิก |
| Settings | `/settings` | ตั้งค่า |

### ⚙️ ผู้ดูแลระบบ (Admin) — สีแดง (Red → Rose)

เข้าถึงได้ทุก route ของ Staff + เพิ่มเติม:

| เมนู | URL | คำอธิบาย |
|------|-----|----------|
| System Overview | `/dashboard` | ภาพรวมระบบทั้งหมด |
| User Management | `/users` | จัดการผู้ใช้ทุก Role |
| Curriculum/Courses | `/courses` | จัดการหลักสูตร |
| Teaching Schedule | `/schedule-management` | จัดตารางสอน |
| Budget/Procurement | `/budget` | งบประมาณ |
| Personnel | `/personnel` | บุคลากร |
| Documents/Requests | `/documents` | เอกสาร |
| Cooperation Network | `/network` | เครือข่าย |
| Activity Admin | `/activities-management` | กิจกรรม |
| Jobs/Internships | `/job-postings` | งานและฝึกงาน |
| Student Database | `/student-profiles` | ฐานข้อมูลนักศึกษา |
| Partner Companies | `/cooperation` | บริษัทพันธมิตร |
| Announcements | `/notifications` | ประกาศ |
| Reports & Stats | `/reports` | รายงาน |
| Audit Logs | `/audit` | Audit logs |
| System Settings | `/settings` | ตั้งค่าระบบ |

---

## 📖 รายละเอียดแต่ละระบบ

---

### 1. ระบบ Authentication

**หน้าที่เกี่ยวข้อง:** `/` (Landing), `/login`, `/register`

#### Landing Page (`/`)
- Bento Grid layout แบบ animated (Framer Motion)
- แนะนำฟีเจอร์หลัก 8 รายการด้วย icon cards
- เลือก Role เพื่อดูตัวอย่าง (5 roles)
- ปุ่ม "เริ่มต้นใช้งาน" และ "สาธิตระบบ"
- Language toggle (TH/EN) ใน header

#### Login Page (`/login`)
- เลือก Role ก่อน Login (5 role cards แบบมี animation)
- กรอก Email + Password
- "Remember me" checkbox
- Mock authentication (delay 1 วินาที, รับ email/password ใดก็ได้)
- Session บันทึกลง `localStorage` (key: `auth_user`)
- Link ไป Register และ Forgot Password
- Language toggle

#### Register Page (`/register`)
- ฟอร์มสมัครสมาชิกแบบ Role-based
- Validation ด้วย React Hook Form + Zod
- ยืนยัน Terms & Privacy Policy
- Language toggle

#### AuthContext (`src/contexts/AuthContext.tsx`)

```typescript
const { user, login, logout, isAuthenticated, switchRole } = useAuth();

// user type:
interface BaseUser {
  id: string
  email: string
  name: string          // ภาษาอังกฤษ
  nameThai: string      // ภาษาไทย
  role: 'student' | 'lecturer' | 'staff' | 'company' | 'admin'
  avatar: string
  phone: string
  isActive: boolean
}
```

---

### 2. ระบบ Dashboard

**Route:** `/dashboard` → auto-route ตาม Role ของผู้ใช้

#### 🎓 Student Dashboard
| Widget | รายละเอียด |
|--------|-----------|
| Profile Card | ชื่อ, รหัสนักศึกษา, สาขา, ชั้นปี, avatar |
| GPA Progress Ring | GPA ปัจจุบัน, GPAX สะสม (animated ProgressRing) |
| Credit Progress | หน่วยกิตที่สะสม / ทั้งหมด (progress bar) |
| Current Courses | รายวิชาเทอมนี้พร้อมสถานะ |
| Upcoming Activities | กิจกรรมที่เปิดรับสมัคร |
| Gamification Stats | XP, Level, Coins, จำนวน Badge |
| Quick Actions | Link ไปหน้าที่ใช้บ่อย |

#### 🧑 Personal Dashboard (`/personal-dashboard`) — ของนักศึกษา
| Widget/Component | รายละเอียด |
|-----------------|-----------|
| **GPAHistoryCard** | กราฟเส้น GPA รายเทอม (Recharts LineChart) |
| **DegreeProgressCard** | วงแหวน progress หน่วยกิต (SVG ProgressRing) |
| **TechnicalSkillsCard** | รายการทักษะเทคนิคพร้อม level bar |
| **SoftSkillsCard** | คะแนน Peer Feedback (Leadership, Discipline, Responsibility, Communication) |
| **CourseGradesCard** | เกรดรายวิชาเทอมปัจจุบัน |
| **Timetable** | ตารางเรียนรายสัปดาห์ (bilingual) |
| Profile Info | ข้อมูล contact, badge ที่ได้รับ |

#### 👨‍🏫 Lecturer Dashboard
| Widget | รายละเอียด |
|--------|-----------|
| Teaching Stats | จำนวนวิชาที่สอน, นักศึกษาทั้งหมด |
| Advisee List | รายชื่อนักศึกษาที่ปรึกษาพร้อมสถานะ GPA |
| Workload Meter | ชั่วโมงสอน vs. สูงสุด (progress) |
| Upcoming Appointments | ตารางนัดพบนักศึกษา |
| Tabs | Courses / Students / Grades / Schedule |

#### 👔 Staff Dashboard
| Widget | รายละเอียด |
|--------|-----------|
| System Stats | นักศึกษาทั้งหมด, คำร้องรอดำเนินการ |
| At-Risk Students | นักศึกษา GPA ต่ำ หรือมีปัญหา |
| Pending Requests | คำร้องล่าสุดที่ต้องอนุมัติ |
| Quick Actions | ลิงก์ไปงานที่ใช้บ่อย |

#### 🏢 Company Dashboard
| Widget | รายละเอียด |
|--------|-----------|
| Recruitment Stats | ตำแหน่งงาน, ผู้สมัคร, รับเข้าทำงานแล้ว |
| Active Postings | ประกาศงานที่กำลังเปิดรับ |
| Recent Applicants | ผู้สมัครล่าสุด |
| Student Access | โปรไฟล์นักศึกษาที่เข้าถึงได้ตาม Subscription |

#### ⚙️ Admin Dashboard
| Widget | รายละเอียด |
|--------|-----------|
| User Statistics | จำนวนผู้ใช้แยกตาม Role |
| System Status | สถานะ server, uptime |
| Recent Activity Log | กิจกรรมในระบบล่าสุด |
| Quick Actions | User management, ตั้งค่าระบบ |

---

### 3. ระบบการเรียน (Academic)

#### Courses (`/courses`)
- **Student**: ดูวิชาที่ลงทะเบียน, ค้นหาวิชา, ดู prerequisites
- **Lecturer**: จัดการวิชาที่สอน, ดูจำนวนนักศึกษา
- **Staff/Admin**: CRUD เต็มรูปแบบ, สถิติ, ตั้งค่าวิชา
- Filter ตาม category, ค้นหาด้วยชื่อ/รหัสวิชา
- Card แสดงผู้สอน, เวลาเรียน, ห้อง, หน่วยกิต (bilingual)

#### Schedule (`/schedule`)
ตารางเรียน/ตารางสอนรายสัปดาห์:
- Grid จันทร์–ศุกร์ + คาบเรียน
- Color-coded blocks ตามวิชา
- รายละเอียดแต่ละบล็อก: เวลา, ห้อง, อาคาร, ผู้สอน
- สรุปหน่วยกิต + ชั่วโมงเรียนรวม
- ใช้ component **Timetable.tsx** (bilingual: ชื่อวัน/วิชา ภาษาไทย-อังกฤษ)

#### Schedule Management (`/schedule-management`) — Staff/Admin
- **DraggableSchedule** component: Drag-and-drop จัดตาราง
- จัดห้องเรียน, ตรวจสอบ conflict
- **RescheduleDialog**: dialog ยืนยันการย้ายคาบ
- เลือกเทอมและปีการศึกษา

#### Grades (`/grades`)
- **Student**: เกรดรายวิชา, GPA แต่ละเทอม, GPAX สะสม
- **Lecturer**: บันทึก/แก้ไขเกรด, สถิติชั้นเรียน, distribution chart

#### Assignments (`/assignments`) — Lecturer
- สร้างงาน (เดี่ยว/กลุ่ม), กำหนดวันส่ง, คะแนนเต็ม
- ติดตามสถานะการส่ง, จำนวนที่ส่งแล้ว
- ให้คะแนนและ Feedback รายนักศึกษา
- สถิติการส่งงาน

#### Attendance (`/attendance`) — Lecturer
- บันทึกการเข้าเรียนรายวิชา
- Check-in/check-out tracking
- คำนวณ % การเข้าเรียน
- แจ้งเตือนนักศึกษาขาดเรียนเกินกำหนด

---

### 4. ระบบกิจกรรมและ Gamification

#### Activities (`/activities`) — นักศึกษา
ระบบกิจกรรมแบบ Gamified เต็มรูปแบบ:

| องค์ประกอบ | รายละเอียด |
|-----------|-----------|
| **XP Points** | คะแนนประสบการณ์สะสมจากกิจกรรม |
| **Badges** | เหรียญรางวัลแบ่งตามระดับ (Bronze, Silver, Gold, Platinum) |
| **Activity Coins** | เหรียญเสมือนจากการเข้าร่วม |
| **Activity Hours** | ชั่วโมงกิจกรรมสะสม |
| **Leaderboard** | อันดับเทียบกับเพื่อน |
| **Available Activities** | รายการกิจกรรมที่เปิดรับสมัคร พร้อม XP reward preview |
| **Completed Activities** | ประวัติกิจกรรมที่เสร็จสิ้น + รางวัลที่ได้ |
| **Timeline** | ประวัติการเข้าร่วมแบบ timeline |
| **Next Badge Progress** | Progress bar สู่ badge ถัดไป |

#### Activities Management (`/activities-management`) — Staff
- สร้างและกำหนดค่ากิจกรรม (ชื่อ, ประเภท, ที่นั่ง, XP reward)
- ติดตามการลงทะเบียนและจำนวนผู้เข้าร่วม
- จัดการสถานะ: Upcoming / Active / Completed
- สถิติการมีส่วนร่วมรวม

---

### 5. ระบบ Portfolio

#### Portfolio (`/portfolio`) — นักศึกษา
พอร์ตโฟลิโอออนไลน์ครบวงจร:

| ส่วน | รายละเอียด |
|------|-----------|
| **Personal Info** | Bio, headline, contact (email, phone, location) |
| **Projects** | Gallery ผลงาน + description, tech stack, link |
| **Skills** | ทักษะแบ่งหมวด: Programming, Frameworks, Tools, Soft Skills |
| **Certifications** | ใบรับรองและ certificate |
| **External Links** | GitHub, LinkedIn, Personal Website |
| **Privacy Settings** | กำหนดว่าบริษัทใดเห็นพอร์ตโฟลิโอได้บ้าง |
| **Share Link** | แชร์พอร์ตโฟลิโอผ่านลิงก์ |

---

### 6. ระบบฝึกงานและอาชีพ (Career)

#### Internships (`/internships`) — นักศึกษา
- ค้นหาตำแหน่งฝึกงาน (ตามบริษัท, สถานที่, ทักษะที่ต้องการ)
- ดูรายละเอียดตำแหน่ง (ค่าตอบแทน, เวลา, requirement)
- สมัครพร้อม Cover Letter
- ติดตามสถานะ: Pending → Interview → Accepted / Rejected
- บันทึก Daily/Weekly Log ระหว่างฝึกงาน

#### Intern Tracking (`/intern-tracking`) — Company
ติดตามผลการปฏิบัติงานของนักศึกษาฝึกงาน:

| องค์ประกอบ | รายละเอียด |
|-----------|-----------|
| **Intern Cards** | Avatar, ชื่อ (bilingual), ตำแหน่ง, บริษัท, % ความคืบหน้า |
| **Performance Metrics** | Technical (0-100), Communication, Teamwork, Punctuality, Initiative |
| **Progress Bar** | สัปดาห์ที่ผ่านไป / ทั้งหมด |
| **Star Rating** | คะแนนภาพรวม |
| **Weekly Reports** | รายงานรายสัปดาห์: submitted/pending, คะแนน, สรุปงาน (bilingual) |
| **Detail View** | กดดูรายละเอียดทุก metric แบบ dialog |

#### Job Postings (`/job-postings`) — Company
- สร้างประกาศรับสมัครงาน/ฝึกงาน
- กำหนดรายละเอียด: ตำแหน่ง, คุณสมบัติ, เงินเดือน, สวัสดิการ
- จัดการสถานะ: Open / Closed / Filled
- ดูจำนวนผู้สมัครแต่ละตำแหน่ง
- Featured / Urgent posting

#### Skills Requirement (`/skills-requirement`) — Company
กำหนด Skill Profile สำหรับแต่ละตำแหน่ง:
- สร้าง Position Profile (เช่น "Full-Stack Developer")
- กำหนดทักษะที่ต้องการ + ระดับความชำนาญ (1–5)
- Priority: Critical / Important / Nice-to-have
- หมวดทักษะ: Code, Design, Database, ML, Communication, Security, Analytics
- ดู Matched Students count + avg match %
- CRUD ผ่าน Dialog

#### Applicants (`/applicants`) — Company
- รายการผู้สมัครทั้งหมดแยกตามตำแหน่ง
- Filter: ตำแหน่ง, สถานะ, วันที่สมัคร
- Status workflow: Pending → Interview → Accepted / Rejected
- ดูรายละเอียด: Resume, Portfolio, ทักษะ
- ติดต่อผู้สมัคร

#### Student Profiles (`/student-profiles`, `/talent-search`) — Company
- ค้นหานักศึกษาตามทักษะ, ชั้นปี, GPA
- ดู academic records, ทักษะ, portfolio preview
- ติดต่อนักศึกษา (ถ้าได้รับอนุญาต)
- Bookmark ผู้ที่สนใจ

#### Subscription (`/subscription`) — Company
- แพ็กเกจสมาชิกแบบ Tiered
- เข้าถึง Student Profiles จำนวนมากขึ้น
- Features เพิ่มเติม: Analytics, Priority listing
- เปรียบเทียบแผนและ Upgrade

---

### 7. ระบบ Training Quest (MMORPG)

#### Training (`/training`) — นักศึกษา

ระบบฝึกทักษะแบบ Quest Game สไตล์ MMORPG ที่ไม่เหมือนใคร:

| องค์ประกอบ | รายละเอียด |
|-----------|-----------|
| **Quest Types** | Solo Quest (เดี่ยว) และ Group Quest (ทีม) |
| **Quest Status** | Available, In-Progress, Completed, Locked |
| **Difficulty** | Easy 🟢 / Normal 🔵 / Hard 🔴 / Expert ⚫ |
| **Rewards** | XP Points, Coins, Achievement Badges (แตกต่างกันตาม difficulty) |
| **Categories** | Design, Development (Backend/Frontend), Data, Communication |
| **Assigners** | บริษัท (company icon) หรือ อาจารย์ (lecturer icon) สิ่งที่กำหนด Quest |
| **Task Checklist** | รายการ task ย่อยใน Quest พร้อม progress bar |
| **Deadline** | นับถอยหลัง countdown หมดเวลา |
| **Group Members** | แสดง avatar ชื่อสมาชิกทีม |
| **Progress** | % completion ของแต่ละ Quest |
| **Bilingual** | ชื่อ Quest, description, tasks ทั้งภาษาไทยและอังกฤษ |

**Quest Detail Dialog:**
- ดูรายละเอียด Quest ทั้งหมดใน modal
- เช็ค task ย่อยแต่ละอัน
- ดู XP / Coins / Badge reward ที่จะได้รับ
- Progress bar รวม

---

### 8. ระบบบริหารจัดการ (Admin)

#### Users (`/users`) — Staff/Admin
- รายการผู้ใช้ทุก Role ในระบบ
- เพิ่ม / แก้ไข / ปิดใช้งานบัญชี
- กำหนดสิทธิ์และ Role
- ค้นหาตาม Role, สถานะ, department

#### Students (`/students`) — Lecturer/Staff/Admin
- ทะเบียนนักศึกษาทั้งหมด
- ค้นหาตามชื่อ, รหัสนักศึกษา, ชั้นปี, สถานะ
- ดู Profile นักศึกษาแบบละเอียด
- ระบุนักศึกษาที่มีความเสี่ยง (GPA ต่ำ, ขาดเรียนมาก)

#### Requests (`/requests`) — นักศึกษา/Staff

คำร้อง 5 ประเภท (bilingual):
- Over-registration request (ขอเพิ่มวิชา)
- Certificate request (ขอเอกสาร/ใบรับรอง)
- Leave of absence (ลาพักการเรียน)
- Resignation request (ลาออก)
- General request (คำร้องทั่วไป)

ฟีเจอร์เพิ่มเติม:
- **Staff**: อนุมัติ/ปฏิเสธ พร้อมบันทึกหมายเหตุ
- ติดตามสถานะแบบ Timeline
- แนบเอกสารประกอบ
- FAQ section (bilingual)

#### Budget (`/budget`) — Staff/Admin
- ภาพรวมงบประมาณ + Pie chart
- หมวดค่าใช้จ่าย (bilingual): Computer Equipment, Office Supplies, Service Charges, Others
- ประวัติรายการ transaction
- งบที่ใช้ไป vs. คงเหลือ
- จัดการคำขอจัดซื้อจัดจ้าง

#### Documents (`/documents`) — Staff/Admin
- ออกเอกสารราชการ (Certificate, Transcript)
- Template เอกสารและ generate
- ดาวน์โหลด/พิมพ์
- ประวัติการออกเอกสาร

#### Personnel (`/personnel`) — Staff/Admin
- บันทึกข้อมูลคณาจารย์และบุคลากร
- ตำแหน่ง, department, สังกัด
- ไดเรกทอรีติดต่อ
- การมอบหมายงาน

#### Network (`/network`) — Staff/Admin
- บริหารเครือข่ายความร่วมมือ
- รายชื่อองค์กรพันธมิตร
- การจัดการ connection

#### Cooperation (`/cooperation`) — Company/Staff/Admin
- บริหารสัญญา MOU กับองค์กรพันธมิตร
- ประวัติกิจกรรมความร่วมมือ (bilingual)
- ข้อมูลผู้ประสานงาน (bilingual)
- ดูสถานะ MOU (Active/Expired/Pending)

#### Appointments (`/appointments`)
- นักศึกษา: จองนัดพบอาจารย์ที่ปรึกษา
- ดู time slot ที่ว่าง
- จองห้องประชุม/ห้องปฏิบัติการ
- ยืนยัน/ยกเลิกนัดหมาย
- Calendar view

---

### 9. ระบบการสื่อสาร (Communication)

#### Messages (`/messages`)
- Inbox / Outbox
- ค้นหาข้อความตาม sender หรือ content
- แนบไฟล์
- Conversation threading
- ตัวนับ unread badge บน icon

#### Notifications (`/notifications`)
- ศูนย์การแจ้งเตือนทั้งหมด
- Filter: Info, Important, Urgent
- Mark as read / Unread all
- Link ตรงไปหน้าที่เกี่ยวข้อง
- Real-time count badge บน Header
- **NotificationCenter** component: dropdown miniview บน Header

#### Announcements (ผ่าน `/notifications` — Staff/Admin)
- สร้างและเผยแพร่ประกาศ
- กำหนด target audience ตาม Role
- ตั้งเวลาเผยแพร่

---

### 10. ระบบรายงานและ Analytics

#### Reports (`/reports`) — Staff/Admin
- สถิตินักศึกษาภาพรวม
- รายงานผลการเรียน
- สถิติกิจกรรม
- รายงานฝึกงาน
- Export PDF/Excel

#### Audit (`/audit`) — Admin
- Log การ Login/Logout
- Log การแก้ไขข้อมูล
- Filter: ผู้ใช้, วันที่, ประเภทกิจกรรม
- IP address tracking
- Security monitoring

#### Workload (`/workload`) — Lecturer
- สรุปชั่วโมงสอน
- การกระจาย course load
- ตรวจสอบว่าเกิน max hours หรือไม่
- เปรียบเทียบเทอม

#### Workload Tracking (`/workload-tracking`) — Staff/Admin
- กราฟการกระจายภาระงานอาจารย์
- Analytics ระดับ Department
- แจ้งเตือน Overload / Underload
- เปรียบเทียบ historical data

---

### 11. ระบบ Internationalization (i18n)

#### สถาปัตยกรรม
```
src/contexts/LanguageContext.tsx     ← React Context provider
src/i18n/translations/th.ts         ← ภาษาไทย (~1,600 บรรทัด)
src/i18n/translations/en.ts         ← ภาษาอังกฤษ (~1,600 บรรทัด)
```

#### วิธีใช้งาน
```typescript
const { t, language, toggleLanguage } = useLanguage();

// ใช้งาน:
<h1>{t.coursesPage.title}</h1>
<p>{language === 'en' ? 'Course Code' : 'รหัสวิชา'}</p>
```

#### Key ที่ครอบคลุม (40+ sections)
- `common` — ปุ่มทั่วไป (Save, Cancel, Delete, Search...)
- `roles` — ชื่อ Role
- `nav` — เมนู navigation ทุกตัว
- `header` — Header component
- `sidebar` — Sidebar labels
- `landingPage` — Landing page
- `loginPage` — Login page
- `registerPage` — Register page
- `dashboard` — Dashboard widgets
- `coursesPage` — หน้า Courses
- `schedulePage` — ตารางเรียน
- `gradesPage` — เกรด
- `activitiesPage` — กิจกรรม + Gamification
- `activitiesManagementPage` — จัดการกิจกรรม
- `portfolioPage` — Portfolio
- `internshipsPage` — ฝึกงาน
- `requestsPage` — คำร้อง
- `trainingPage` — Quest system
- `skillsRequirementPage` — Skill profiles
- `messagesPage` — ข้อความ
- `notificationsPage` — การแจ้งเตือน
- `settingsPage` — การตั้งค่า
- `studentsPage` — นักศึกษา
- `usersPage` — ผู้ใช้ระบบ
- `reportsPage` — รายงาน
- `auditPage` — Audit logs
- `budgetPage` — งบประมาณ
- `cooperationPage` — ความร่วมมือ MOU
- `documentsPage` — เอกสาร
- `personnelPage` — บุคลากร
- `assignmentsPage` — งานมอบหมาย
- `appointmentsPage` — นัดพบ
- `workloadPage` — ภาระงาน
- `jobPostingsPage` — ประกาศงาน
- `applicantsPage` — ผู้สมัคร
- `subscriptionPage` — แพ็กเกจ
- `placeholderPage` — หน้า placeholder
- `privacyPolicyPage` — 38 keys
- `termsOfServicePage` — 46 keys
- `degreeProgress` — Progress widgets (3 keys)
- `scheduleComponent` — Day names (5 keys)

#### Language Persistence
- เก็บใน `localStorage` (key: `app_language`)
- Default: `th` (ภาษาไทย)
- อัปเดต `<html lang="...">` อัตโนมัติ
- Toggle ทันทีโดยไม่ต้อง reload หน้า

#### Language Toggle Locations
- Landing Page, Login Page, Register Page → Globe button ใน header
- Dashboard Pages → Header component (ทุกหน้า)

---

### 12. ระบบ Theme (Dark/Light)

#### สถาปัตยกรรม
```
src/contexts/ThemeContext.tsx    ← Theme Context
tailwind.config.ts               ← darkMode: "class"
src/index.css                    ← CSS variables (:root และ .dark)
```

#### Features
- Dark Mode และ Light Mode
- ใช้ `next-themes` สำหรับ theme management
- CSS variables แบบ HSL (`--background`, `--foreground`, `--primary`, ...)
- Toggle ผ่าน Settings page (`/settings`)
- persist ใน localStorage

#### Role-Specific Color Themes
| Role | Primary | Gradient | Active Item |
|------|---------|----------|-------------|
| Student | Blue #3B82F6 | Blue → Indigo | `bg-blue-600` |
| Lecturer | Emerald #10B981 | Emerald → Teal | `bg-emerald-600` |
| Staff | Purple #8B5CF6 | Purple → Fuchsia | `bg-purple-600` |
| Company | Orange #F97316 | Orange → Amber | `bg-orange-600` |
| Admin | Red #EF4444 | Red → Rose | `bg-red-600` |

---

### 13. หน้า Public / Legal

#### Privacy Policy (`/privacy-policy`)
Privacy policy ฉบับสมบูรณ์ 6 หัวข้อ (bilingual):
1. การเก็บรวบรวมข้อมูล
2. การใช้ข้อมูล
3. การเปิดเผยข้อมูล
4. ความปลอดภัย
5. สิทธิ์ของผู้ใช้
6. ช่องทางติดต่อ

#### Terms of Service (`/terms-of-service`)
เงื่อนไขการใช้งาน 7 หัวข้อ + เงื่อนไขเฉพาะ 4 Role (bilingual)

#### Not Found (`/404`)
- หน้า 404 แบบ custom animated
- ปุ่ม "กลับหน้าหลัก" และ "ไปยัง Dashboard"

---

## 🛠 เทคโนโลยีที่ใช้

### Core

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|-----------|---------|--------|
| React | 18.3 | UI Library |
| TypeScript | 5.8 | Type safety |
| Vite | 5.4 | Build tool + Dev server (SWC) |
| React Router DOM | 6.30 | Client-side routing |

### UI & Animation

| เทคโนโลยี | หน้าที่ |
|-----------|--------|
| Tailwind CSS 3.4 | Utility-first CSS |
| shadcn/ui | 49 accessible components |
| Radix UI | 20+ headless primitives |
| Framer Motion 12.24 | Animations + transitions |
| Lucide React 0.462 | Icons (1000+) |
| class-variance-authority | Variant styling |
| tailwind-merge | Intelligent class merging |

### State & Data

| เทคโนโลยี | หน้าที่ |
|-----------|--------|
| TanStack React Query 5.83 | Server state management |
| React Context API | Auth, Language, Theme |
| Recharts 2.15 | Charts (Line, Radar, Pie, Bar) |

### Forms & Validation

| เทคโนโลยี | หน้าที่ |
|-----------|--------|
| React Hook Form 7.61 | Form handling |
| Zod 3.25 | Schema validation |
| @hookform/resolvers | Integration |

### Utilities

| เทคโนโลยี | หน้าที่ |
|-----------|--------|
| date-fns 3.6 | Date utilities |
| Sonner | Toast notifications |
| Vaul | Drawer (mobile) |
| Embla Carousel | Carousel/slider |
| next-themes | Dark/light mode |
| cmdk | Command palette |

### Fonts

| Font | หน้าที่ |
|------|--------|
| IBM Plex Sans Thai | ฟอนต์หลักภาษาไทย |
| IBM Plex Sans Thai Looped | ฟอนต์ variant ภาษาไทย |
| Titan One | Display/heading (cursive) |

---

## 🚀 การติดตั้งและรันโปรเจค

### Requirements

- **Node.js** 18.x หรือสูงกว่า
- **npm** / **yarn** / **bun**

### ขั้นตอน

```bash
# 1. Clone
git clone https://github.com/<your-org>/dii-camt-showprogroup.git
cd dii-camt-showprogroup

# 2. Install dependencies
npm install
# หรือ
bun install

# 3. Start dev server
npm run dev
```

เปิดเบราว์เซอร์ที่ **`http://localhost:8080`**

### Scripts ทั้งหมด

| Script | Command | คำอธิบาย |
|--------|---------|----------|
| Dev | `npm run dev` | Dev server port 8080 (HMR) |
| Build | `npm run build` | Production build + TypeScript check |
| Build Dev | `npm run build:dev` | Development mode build |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | ESLint (React Hooks + Refresh) |

### ทดสอบระบบ

1. ไปที่ `http://localhost:8080`
2. คลิก **"เข้าสู่ระบบ"**
3. เลือก Role ใดก็ได้ (5 roles)
4. กรอก **email** และ **password** อะไรก็ได้ (Mock auth)
5. สำรวจ Dashboard และฟีเจอร์ของแต่ละ Role

---

## 📁 โครงสร้างโปรเจค

```
dii-camt-showprogroup/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── GlassCard.tsx           # Glassmorphism card
│   │   │   ├── NotificationCenter.tsx  # Notification dropdown
│   │   │   ├── PageHeader.tsx          # Standard page header
│   │   │   ├── ProgressRing.tsx        # SVG circular progress
│   │   │   ├── RoleCard.tsx            # Role selection card
│   │   │   ├── StatsCard.tsx           # Statistics card
│   │   │   ├── StudentTimeline.tsx     # Activity timeline
│   │   │   ├── ThemedCard.tsx          # Role-themed card
│   │   │   ├── ThemedPageHeader.tsx    # Gradient page header
│   │   │   ├── ThemedStatCard.tsx      # Themed stat card
│   │   │   └── Timetable.tsx           # Weekly timetable (bilingual)
│   │   ├── dashboard/
│   │   │   ├── CourseGradesCard.tsx
│   │   │   ├── DegreeProgressCard.tsx  # Credit progress ring
│   │   │   ├── GPAHistoryCard.tsx      # GPA line chart
│   │   │   ├── SkillsRadarCard.tsx     # Radar chart
│   │   │   ├── SoftSkillsCard.tsx      # Peer feedback scores
│   │   │   ├── SoftSkillsRubricCard.tsx
│   │   │   ├── TechnicalSkillsCard.tsx
│   │   │   └── TechnicalSkillsRubricCard.tsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx     # Main layout (sidebar + header)
│   │   │   ├── Header.tsx              # Top navigation bar
│   │   │   └── Sidebar.tsx             # Role-based sidebar
│   │   ├── schedule/
│   │   │   ├── DraggableSchedule.tsx   # Drag-and-drop scheduler
│   │   │   └── RescheduleDialog.tsx    # Reschedule confirm dialog
│   │   └── ui/                         # 49 shadcn/ui components
│   │       └── (accordion, button, card, dialog, form, ...)
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx             # Authentication state
│   │   ├── LanguageContext.tsx         # i18n (TH/EN)
│   │   └── ThemeContext.tsx            # Dark/Light theme
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx              # Mobile breakpoint hook
│   │   └── use-toast.ts               # Toast notification hook
│   │
│   ├── i18n/translations/
│   │   ├── th.ts                       # ภาษาไทย (~1,600 lines)
│   │   └── en.ts                       # English (~1,600 lines)
│   │
│   ├── lib/
│   │   ├── mockData.ts                 # Mock data for dev
│   │   └── utils.ts                    # Helpers (cn, etc.)
│   │
│   ├── pages/
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CompanyDashboard.tsx
│   │   │   ├── LecturerDashboard.tsx
│   │   │   ├── StaffDashboard.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   └── TeacherDashboard.tsx
│   │   │
│   │   ├── LandingPage.tsx             # Public home
│   │   ├── LoginPage.tsx               # Login + role select
│   │   ├── RegisterPage.tsx            # Registration
│   │   ├── PrivacyPolicy.tsx           # Privacy policy
│   │   ├── TermsOfService.tsx          # Terms of service
│   │   ├── Dashboard.tsx               # Dashboard router
│   │   ├── PersonalDashboard.tsx       # Student personal stats
│   │   │
│   │   ├── Courses.tsx                 # [Academic] รายวิชา
│   │   ├── Schedule.tsx                # [Academic] ตารางเรียน
│   │   ├── Grades.tsx                  # [Academic] เกรด
│   │   ├── Assignments.tsx             # [Academic] งานมอบหมาย
│   │   ├── Attendance.tsx              # [Academic] การเข้าเรียน
│   │   │
│   │   ├── Activities.tsx              # [Gamification] กิจกรรม
│   │   ├── ActivitiesManagement.tsx    # [Gamification] จัดการกิจกรรม
│   │   ├── Portfolio.tsx               # [Portfolio] พอร์ตโฟลิโอ
│   │   │
│   │   ├── Internships.tsx             # [Career] ฝึกงาน
│   │   ├── InternTracking.tsx          # [Career] ติดตามนักศึกษาฝึกงาน
│   │   ├── JobPostings.tsx             # [Career] ประกาศงาน
│   │   ├── SkillsRequirement.tsx       # [Career] กำหนด Skill Profile
│   │   ├── Applicants.tsx              # [Career] ผู้สมัคร
│   │   ├── StudentProfiles.tsx         # [Career] โปรไฟล์นักศึกษา
│   │   ├── Subscription.tsx            # [Career] แพ็กเกจบริษัท
│   │   │
│   │   ├── Training.tsx                # [Training] Quest MMORPG
│   │   │
│   │   ├── Users.tsx                   # [Admin] จัดการผู้ใช้
│   │   ├── Students.tsx                # [Admin] ทะเบียนนักศึกษา
│   │   ├── Requests.tsx                # [Admin] คำร้อง
│   │   ├── Budget.tsx                  # [Admin] งบประมาณ
│   │   ├── Documents.tsx               # [Admin] เอกสาร
│   │   ├── Personnel.tsx               # [Admin] บุคลากร
│   │   ├── Network.tsx                 # [Admin] เครือข่าย
│   │   ├── Cooperation.tsx             # [Admin] MOU
│   │   ├── ScheduleManagement.tsx      # [Admin] จัดตาราง
│   │   ├── Appointments.tsx            # [Admin] นัดพบ
│   │   │
│   │   ├── Messages.tsx                # [Communication] ข้อความ
│   │   ├── Notifications.tsx           # [Communication] การแจ้งเตือน
│   │   ├── Settings.tsx                # [System] การตั้งค่า
│   │   │
│   │   ├── Reports.tsx                 # [Analytics] รายงาน
│   │   ├── Audit.tsx                   # [Analytics] Audit logs
│   │   ├── Workload.tsx                # [Analytics] ภาระงาน
│   │   ├── WorkloadTracking.tsx        # [Analytics] ติดตามภาระงาน
│   │   │
│   │   ├── PlaceholderPage.tsx         # หน้า placeholder
│   │   └── NotFound.tsx                # 404
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces (825 lines)
│   │
│   ├── App.tsx                         # Root component + routing
│   ├── index.css                       # Tailwind + CSS variables
│   └── main.tsx                        # Entry point
│
├── index.html
├── package.json
├── vite.config.ts                      # Port 8080, '@' alias
├── tailwind.config.ts                  # darkMode: "class", fonts
├── tsconfig.json / tsconfig.app.json
├── postcss.config.js
├── eslint.config.js
├── components.json                     # shadcn/ui config
└── bun.lockb
```

---

## 🎨 Design System

### Animations (Framer Motion)

```typescript
// Page transitions (ทุกหน้า)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Staggered list items
containerVariants = { visible: { transition: { staggerChildren: 0.08 } } }
itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

// Card hover
whileHover={{ scale: 1.02 }}
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768–1024px | 2 columns, collapsible sidebar |
| Desktop | > 1024px | Full sidebar, multi-column, max 1400px |

### CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --card: 0 0% 100%;
  /* ... */
}
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

---

## 🧩 Component Library

### Custom Components สำคัญ

| Component | ไฟล์ | คำอธิบาย |
|-----------|------|----------|
| `GlassCard` | common/ | Glassmorphism card + backdrop-blur |
| `ThemedCard` | common/ | Card ที่ใช้สี gradient ตาม Role |
| `ThemedPageHeader` | common/ | Page header พร้อม gradient animation |
| `ProgressRing` | common/ | SVG วงกลมแสดง % (animated) |
| `Timetable` | common/ | ตารางเรียน bilingual (TH/EN) |
| `DraggableSchedule` | schedule/ | Drag-and-drop จัดตาราง |
| `DegreeProgressCard` | dashboard/ | Progress หน่วยกิต |
| `GPAHistoryCard` | dashboard/ | Line chart GPA รายเทอม |
| `SkillsRadarCard` | dashboard/ | Radar chart ทักษะ |
| `SoftSkillsCard` | dashboard/ | Peer feedback + bar scores |

### shadcn/ui (49 components)

Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input OTP, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, Toggle Group, Tooltip...

---

## 🔮 แผนพัฒนาในอนาคต

- [ ] 🔌 **Backend API** — เชื่อมต่อ REST/GraphQL API จริง
- [ ] 🔑 **Real Authentication** — JWT + refresh tokens
- [ ] 📱 **Push Notifications** — Web push / mobile notifications
- [ ] 📄 **PDF Export** — Transcript, Certificate, Report
- [ ] 💬 **Real-time Chat** — WebSocket messaging
- [ ] 📲 **Mobile App** — React Native
- [ ] 🧪 **Testing** — Vitest (unit) + Playwright (E2E)
- [ ] ♿ **Accessibility** — WCAG 2.1 AA
- [ ] 🚀 **CI/CD** — GitHub Actions
- [ ] 🗄️ **Database** — PostgreSQL backend

---

## 👥 ทีมพัฒนา

**DII ShowPro Group**  
สาขาบูรณาการอุตสาหกรรมดิจิทัล (Digital Industry Integration)  
วิทยาลัยศิลปะ สื่อ และเทคโนโลยี (CAMT)  
มหาวิทยาลัยเชียงใหม่ 🏔️

---

## 📄 License

MIT License — นำไปใช้และพัฒนาต่อได้อย่างอิสระ

---

<div align="center">

Built with ❤️ by DII CAMT ShowPro Group · [Getting Started](#-การติดตั้งและรันโปรเจค) · [Systems](#-ระบบทั้งหมดในเว็บ) · [Tech Stack](#-เทคโนโลยีที่ใช้)

</div>
