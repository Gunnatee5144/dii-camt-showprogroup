# 🎯 DII CAMT ShowPro - Talent Matching Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4.svg?logo=tailwindcss)

**แพลตฟอร์มจับคู่ Talent ระหว่างนักศึกษาและบริษัท**

*เชื่อมโยงศักยภาพนักศึกษา สู่โอกาสการทำงานจริง*

[🚀 เริ่มต้นใช้งาน](#-การติดตั้ง) | [📖 เอกสาร](#-สารบัญ) | [🗺️ Roadmap](#️-release-phases)

</div>

---

## 📋 สารบัญ

- [🎯 ภาพรวมแพลตฟอร์ม](#-ภาพรวมแพลตฟอร์ม)
- [✨ ฟีเจอร์หลัก](#-ฟีเจอร์หลัก)
- [👥 ผู้ใช้งานในระบบ](#-ผู้ใช้งานในระบบ)
- [🏗️ สถาปัตยกรรมระบบ](#️-สถาปัตยกรรมระบบ)
- [📦 การติดตั้ง](#-การติดตั้ง)
- [🗺️ Release Phases](#️-release-phases)
- [📊 Database Schema](#-database-schema)
- [🔐 ความปลอดภัย](#-ความปลอดภัย)
- [💰 โมเดลธุรกิจ](#-โมเดลธุรกิจ)
- [📱 API Reference](#-api-reference)
- [🧪 การทดสอบ](#-การทดสอบ)
- [🤝 การมีส่วนร่วม](#-การมีส่วนร่วม)
- [📄 License](#-license)

---

## 🎯 ภาพรวมแพลตฟอร์ม

### วิสัยทัศน์ (Vision)

> สร้างสะพานเชื่อมระหว่างนักศึกษาที่มีศักยภาพกับบริษัทที่กำลังมองหา Talent โดยใช้เทคโนโลยี AI-Powered Matching เพื่อให้เกิดการจับคู่ที่ตรงตามความต้องการมากที่สุด

### พันธกิจ (Mission)

1. **สำหรับนักศึกษา**: มอบโอกาสในการพัฒนาทักษะและเข้าถึงงานที่ตรงกับความสามารถ
2. **สำหรับบริษัท**: ค้นหา Talent คุณภาพสูงจากฐานข้อมูลนักศึกษาที่มีความสามารถ
3. **สำหรับมหาวิทยาลัย**: ติดตามและพัฒนาหลักสูตรให้ตรงกับความต้องการของตลาดแรงงาน

### ปัญหาที่แก้ไข (Problems We Solve)

| ปัญหา | วิธีแก้ไข |
|-------|---------|
| บริษัทหา Talent ยาก | AI-Powered Matching ค้นหานักศึกษาที่ตรงกับ Requirements |
| นักศึกษาไม่รู้ว่าบริษัทต้องการอะไร | แสดง Skill Requirements ของแต่ละบริษัทให้นักศึกษาพัฒนาตาม |
| ไม่มีระบบติดตามพัฒนาการ | Long-term Tracking ติดตามความก้าวหน้าเป็นรายเทอม |
| ข้อมูลกระจัดกระจาย | Centralized Platform รวบรวมข้อมูลทั้งหมดในที่เดียว |
| ขาดการแข่งขันที่เป็นธรรม | Competitive Hiring ระบบจัดลำดับความสำคัญอย่างโปร่งใส |

---

## ✨ ฟีเจอร์หลัก

### 🏢 Enterprise Side (ฝั่งบริษัท)

#### 1. Requirement Submission (การลงประกาศความต้องการ)
```
📝 สร้าง Job Posting พร้อมระบุ:
   ├── Required Skills (ทักษะที่จำเป็น)
   ├── Tech Stack (เทคโนโลยีที่ใช้)
   ├── Experience Level (ระดับประสบการณ์)
   ├── Soft Skills (ทักษะด้านอื่นๆ)
   └── Minimum Requirements (เกณฑ์ขั้นต่ำ)
```

#### 2. Talent Visibility (การมองเห็น Talent)
- **Smart Search**: ค้นหานักศึกษาด้วย Filter หลากหลาย
- **Skill Matching Score**: คะแนนความเข้ากันได้แบบ Real-time
- **Profile Preview**: ดู Preview ก่อนเข้าถึงข้อมูลเต็ม
- **Batch Comparison**: เปรียบเทียบนักศึกษาหลายคนพร้อมกัน

#### 3. Long-term Tracking (การติดตามระยะยาว)
- **Watch List**: เพิ่มนักศึกษาลง Watch List
- **Progress Alerts**: แจ้งเตือนเมื่อนักศึกษามีพัฒนาการ
- **Semester Reports**: รายงานความก้าวหน้ารายเทอม
- **Early Booking**: จองตัวนักศึกษาล่วงหน้า

#### 4. Recruitment Competition (การแข่งขันในการรับสมัคร)
- **Priority Queue**: ลำดับความสำคัญตาม Membership Tier
- **First-mover Advantage**: สิทธิพิเศษสำหรับผู้ยื่นก่อน
- **Bidding System**: ระบบประมูล Talent (Premium Feature)
- **Exclusive Access Period**: ช่วงเวลาเข้าถึงพิเศษ

---

### 🎓 Student Side (ฝั่งนักศึกษา)

#### 1. Self-Development (การพัฒนาตนเอง)
- **Skill Gap Analysis**: วิเคราะห์ช่องว่างทักษะเทียบกับ Requirements
- **Learning Path**: เส้นทางการเรียนรู้ที่แนะนำ
- **Course Recommendations**: แนะนำคอร์สเรียนที่เกี่ยวข้อง
- **Progress Tracking**: ติดตามความก้าวหน้าตนเอง

#### 2. Interest Trigger (การแสดงความสนใจ)
```
🔔 เมื่อนักศึกษากด "สนใจ"
   ↓
📧 ระบบส่ง Notification ไปยังบริษัท
   ↓
👀 บริษัทเข้ามาดู Profile ทันที
   ↓
💬 เปิดช่องทางการสื่อสาร
```

#### 3. Threshold Notification (การแจ้งเตือนเมื่อถึงเกณฑ์)
- **Auto-notification**: แจ้งเตือนอัตโนมัติเมื่อถึง Minimum Requirements
- **Milestone Alerts**: แจ้งเตือนเมื่อถึงจุดสำคัญ
- **Skill Verification**: ยืนยันทักษะผ่าน Certificate/Project
- **Rank Updates**: อัพเดทอันดับในกลุ่ม Skill เดียวกัน

#### 4. Portfolio Management (การจัดการ Portfolio)
- **Project Showcase**: แสดงผลงานโปรเจค
- **GitHub Integration**: เชื่อมต่อ GitHub Repository
- **Skill Endorsements**: รับ Endorsement จากอาจารย์/เพื่อน
- **Achievement Display**: แสดง Badge และรางวัล

---

### 💰 Monetization & Access (การเข้าถึงและสร้างรายได้)

#### 1. Membership System (ระบบสมาชิก)

| Tier | ราคา/เดือน | ฟีเจอร์ |
|------|-----------|--------|
| **Free** | ฟรี | ดู Profile พื้นฐาน, Job Posting 1 ตำแหน่ง |
| **Basic** | ฿2,999 | ดู Profile เต็ม 50 คน/เดือน, Job Posting 5 ตำแหน่ง |
| **Professional** | ฿7,999 | ดู Profile ไม่จำกัด, Priority Matching, Analytics |
| **Enterprise** | ฿19,999 | ทุกอย่างใน Pro + API Access + Dedicated Support |

#### 2. Registration Portal (พอร์ทัลลงทะเบียน)

##### สำหรับนิติบุคคล (Enterprise Register)
```
📋 ขั้นตอนการลงทะเบียน:
   1. กรอกข้อมูลบริษัท
   2. อัพโหลดเอกสารยืนยัน
      ├── หนังสือรับรองบริษัท
      ├── ใบจดทะเบียนภาษี
      └── หนังสือมอบอำนาจ (ถ้ามี)
   3. รอการตรวจสอบ (1-3 วันทำการ)
   4. ยืนยันตัวตนผ่าน OTP
   5. เริ่มใช้งาน
```

##### สำหรับนักศึกษา
```
📋 ขั้นตอนการลงทะเบียน:
   1. ยืนยันตัวตนผ่าน University SSO
   2. กรอกข้อมูลส่วนตัว
   3. สร้าง Portfolio
   4. ตั้งค่าความเป็นส่วนตัว
   5. เริ่มใช้งาน
```

---

### 📊 Analytics & Reporting (การวิเคราะห์และรายงาน)

#### สำหรับบริษัท
- **Talent Pool Analytics**: สถิติกลุ่ม Talent ในระบบ
- **Application Funnel**: ติดตาม Conversion Rate
- **Skill Trends**: เทรนด์ทักษะในตลาด
- **Competitor Analysis**: เปรียบเทียบกับบริษัทอื่น

#### สำหรับมหาวิทยาลัย
- **Employment Rate**: อัตราการจ้างงาน
- **Skill Gap Report**: รายงานช่องว่างทักษะ
- **Industry Demand**: ความต้องการของอุตสาหกรรม
- **Graduate Tracking**: ติดตามบัณฑิต

---

### 🔔 Notification System (ระบบแจ้งเตือน)

| ประเภท | ช่องทาง | ผู้รับ |
|--------|---------|-------|
| Interest Alert | In-app, Email, Push | บริษัท |
| Threshold Met | In-app, Email | บริษัท |
| New Job Match | In-app, Email, Push | นักศึกษา |
| Application Update | In-app, Email | นักศึกษา |
| Profile View | In-app | นักศึกษา |
| Skill Milestone | In-app, Push | นักศึกษา |
| System Announcement | All channels | ทุกคน |

---

## 👥 ผู้ใช้งานในระบบ

### 1. Student (นักศึกษา) 🎓
```typescript
interface Student {
  // ข้อมูลพื้นฐาน
  studentId: string;
  name: string;
  major: string;
  year: number;
  gpa: number;
  
  // ทักษะและ Portfolio
  skills: Skill[];
  portfolio: Portfolio;
  activities: Activity[];
  
  // การจับคู่
  matchingPreferences: MatchingPreference;
  interestedCompanies: string[];
  watchedBy: string[]; // Companies watching
  
  // ความเป็นส่วนตัว
  dataConsent: DataConsent;
  profileVisibility: 'private' | 'university' | 'public';
}
```

**ความสามารถ:**
- สร้างและจัดการ Portfolio
- กดสนใจบริษัท
- พัฒนาทักษะตาม Requirements
- ดูสถิติการถูกค้นหา/ดู Profile
- ตั้งค่าความเป็นส่วนตัว
- สมัครงาน/ฝึกงาน

---

### 2. Company (บริษัท) 🏢
```typescript
interface Company {
  // ข้อมูลบริษัท
  companyId: string;
  companyName: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  
  // Membership
  membershipTier: 'free' | 'basic' | 'professional' | 'enterprise';
  membershipExpiry: Date;
  
  // การค้นหา Talent
  jobPostings: JobPosting[];
  watchList: string[]; // Student IDs
  matchingHistory: MatchingRecord[];
  
  // สถิติ
  viewedProfiles: number;
  contactedStudents: number;
  hiredStudents: number;
}
```

**ความสามารถ:**
- ลงประกาศความต้องการ
- ค้นหาและกรอง Talent
- กด Matching/Watch
- ติดต่อนักศึกษา (ตามสิทธิ์)
- ดู Analytics
- จัดการ Membership

---

### 3. Lecturer (อาจารย์) 👨‍🏫
```typescript
interface Lecturer {
  // ข้อมูลอาจารย์
  lecturerId: string;
  name: string;
  department: string;
  specialization: string[];
  
  // ที่ปรึกษา
  advisees: string[]; // Student IDs
  
  // การ Endorse
  endorsedSkills: Endorsement[];
  recommendations: Recommendation[];
}
```

**ความสามารถ:**
- Endorse ทักษะนักศึกษา
- เขียน Recommendation Letter
- ดู Progress ของนักศึกษาในที่ปรึกษา
- แนะนำนักศึกษาให้บริษัท
- ยืนยัน Project/Activity

---

### 4. Staff (เจ้าหน้าที่) 👔
```typescript
interface Staff {
  staffId: string;
  department: string;
  permissions: Permission[];
  
  // การจัดการ
  canVerifyCompanies: boolean;
  canManageStudents: boolean;
  canViewReports: boolean;
  canHandleDisputes: boolean;
}
```

**ความสามารถ:**
- ตรวจสอบบริษัทที่สมัคร
- จัดการข้อมูลนักศึกษา
- ดูรายงานและสถิติ
- จัดการข้อพิพาท
- สร้างประกาศ

---

### 5. Admin (ผู้ดูแลระบบ) ⚙️
```typescript
interface Admin {
  adminId: string;
  isSuperAdmin: boolean;
  
  // สิทธิ์เต็ม
  permissions: 'all';
  
  // การจัดการระบบ
  systemSettings: SystemSettings;
  automationRules: AutomationRule[];
  auditLogs: AuditLog[];
}
```

**ความสามารถ:**
- จัดการผู้ใช้ทุกประเภท
- ตั้งค่าระบบ
- จัดการ Membership Plans
- ดู Audit Logs
- สร้าง Automation Rules
- จัดการ Content

---

## 🏗️ สถาปัตยกรรมระบบ

### Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                  │
├─────────────────────────────────────────────────────────────────┤
│  React 18.3  │  TypeScript 5.8  │  Vite 5.4  │  TailwindCSS 3.4 │
│  React Router 6  │  TanStack Query 5  │  Zustand  │  Framer     │
│  Shadcn/UI  │  Recharts  │  React Hook Form  │  Zod            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
├─────────────────────────────────────────────────────────────────┤
│  Node.js / Express  │  NestJS (Alternative)  │  GraphQL / REST  │
│  JWT Authentication  │  OAuth 2.0  │  WebSocket (Real-time)     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE                                  │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Primary)  │  Redis (Cache)  │  Elasticsearch      │
│  S3-Compatible (Files)  │  MongoDB (Logs)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE                              │
├─────────────────────────────────────────────────────────────────┤
│  Docker  │  Kubernetes  │  AWS / GCP  │  CloudFlare             │
│  GitHub Actions (CI/CD)  │  Prometheus / Grafana (Monitoring)   │
└─────────────────────────────────────────────────────────────────┘
```

### System Architecture Diagram

```
                    ┌────────────────────────────────────┐
                    │          Load Balancer             │
                    │           (CloudFlare)             │
                    └──────────────┬─────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │  Frontend   │         │  Frontend   │         │  Frontend   │
    │  Server 1   │         │  Server 2   │         │  Server N   │
    │   (React)   │         │   (React)   │         │   (React)   │
    └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │        API Gateway          │
                    │      (Kong / AWS ALB)       │
                    └──────────────┬──────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
 ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
 │   Auth      │           │   Core      │           │   Matching  │
 │  Service    │           │  Service    │           │   Service   │
 └──────┬──────┘           └──────┬──────┘           └──────┬──────┘
        │                          │                          │
        │              ┌───────────┼───────────┐              │
        │              │           │           │              │
        ▼              ▼           ▼           ▼              ▼
 ┌─────────────┐ ┌─────────────┐ ┌───────┐ ┌─────────────┐ ┌─────────────┐
 │ PostgreSQL  │ │   Redis     │ │  S3   │ │ Elasticsearch│ │  MongoDB   │
 │  (Primary)  │ │  (Cache)    │ │(Files)│ │  (Search)    │ │  (Logs)    │
 └─────────────┘ └─────────────┘ └───────┘ └─────────────┘ └─────────────┘
```

### Microservices

| Service | หน้าที่ | Tech |
|---------|--------|------|
| **Auth Service** | Authentication, Authorization | JWT, OAuth |
| **User Service** | จัดการผู้ใช้ทุกประเภท | Node.js |
| **Matching Service** | AI-Powered Matching | Python, ML |
| **Notification Service** | แจ้งเตือนทุกช่องทาง | Node.js, FCM |
| **Analytics Service** | รายงานและสถิติ | Python, Pandas |
| **Payment Service** | จัดการ Membership | Stripe, Omise |
| **File Service** | จัดการไฟล์และเอกสาร | S3, MinIO |
| **Search Service** | Full-text Search | Elasticsearch |

---

## 📦 การติดตั้ง

### Prerequisites

```bash
# Required
node >= 18.0.0
npm >= 9.0.0 หรือ bun >= 1.0.0

# Optional
docker >= 24.0.0
docker-compose >= 2.20.0
```

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/your-org/dii-camt-showprogroup.git
cd dii-camt-showprogroup

# 2. Install dependencies
npm install
# หรือ
bun install

# 3. Setup environment
cp .env.example .env.local
# แก้ไขค่าใน .env.local

# 4. Run development server
npm run dev
# หรือ
bun dev

# 5. เปิด browser
# http://localhost:5173
```

### Environment Variables

```env
# Application
VITE_APP_NAME=DII CAMT ShowPro
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api

# Authentication
VITE_AUTH_PROVIDER=university_sso
VITE_JWT_SECRET=your-secret-key

# Database (Backend)
DATABASE_URL=postgresql://user:pass@localhost:5432/showpro
REDIS_URL=redis://localhost:6379

# Storage
VITE_STORAGE_PROVIDER=s3
AWS_S3_BUCKET=showpro-files
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Payment
STRIPE_SECRET_KEY=sk_test_xxx
OMISE_SECRET_KEY=skey_test_xxx

# Notifications
FCM_SERVER_KEY=your-fcm-key
SMTP_HOST=smtp.example.com
SMTP_USER=noreply@example.com
SMTP_PASS=your-smtp-pass
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t showpro-frontend .
docker run -p 3000:3000 showpro-frontend
```

### Directory Structure

```
dii-camt-showprogroup/
├── public/                  # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/          # Shared components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Shadcn UI components
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internationalization
│   ├── lib/                 # Utilities
│   ├── pages/               # Page components
│   │   ├── dashboards/      # Role-specific dashboards
│   │   └── ...
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🗺️ Release Phases

### 📅 Phase Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RELEASE TIMELINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Phase 1 (MVP)        Phase 2           Phase 3          Phase 4           │
│  ━━━━━━━━━━━━         ━━━━━━━━━         ━━━━━━━━━        ━━━━━━━━          │
│  Q2 2025              Q3 2025           Q4 2025          Q1 2026           │
│  3 months             3 months          3 months         3 months          │
│                                                                             │
│  ▪ Core Features      ▪ Matching AI     ▪ Enterprise     ▪ Scale &         │
│  ▪ Basic Matching     ▪ Analytics       ▪ University     ▪ Ecosystem       │
│  ▪ Authentication     ▪ Communication     Integration    ▪ Advanced AI     │
│  ▪ Profile Mgmt       ▪ Gamification    ▪ API Platform   ▪ Mobile App      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🚀 Phase 1: MVP Foundation (Q2 2025)

> **เป้าหมาย**: เปิดตัวระบบพื้นฐานที่ใช้งานได้จริง

#### 1.1 Core Authentication & Authorization
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| University SSO | เข้าสู่ระบบผ่านระบบมหาวิทยาลัย | 🔴 Critical |
| Company Registration | ลงทะเบียนบริษัทพร้อมยืนยันตัวตน | 🔴 Critical |
| Role-based Access | แยกสิทธิ์ตาม Role (Student, Company, Admin) | 🔴 Critical |
| JWT Authentication | Token-based authentication | 🔴 Critical |
| Password Reset | ระบบรีเซ็ตรหัสผ่าน | 🟡 High |

#### 1.2 Student Profile Management
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Basic Profile | ข้อมูลพื้นฐาน (ชื่อ, สาขา, ชั้นปี, GPA) | 🔴 Critical |
| Skill Management | เพิ่ม/แก้ไข Skills | 🔴 Critical |
| Portfolio Builder | สร้าง Portfolio พื้นฐาน | 🔴 Critical |
| Privacy Settings | ตั้งค่าความเป็นส่วนตัวพื้นฐาน | 🟡 High |
| CV Upload | อัพโหลดไฟล์ CV | 🟡 High |

#### 1.3 Company Portal
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Company Profile | ข้อมูลบริษัท | 🔴 Critical |
| Job Posting | ลงประกาศงาน/ฝึกงาน | 🔴 Critical |
| Requirement Specification | ระบุ Skills/Requirements | 🔴 Critical |
| Basic Search | ค้นหานักศึกษาพื้นฐาน | 🔴 Critical |
| View Profiles | ดู Profile นักศึกษา | 🟡 High |

#### 1.4 Basic Matching System
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Skill Matching | จับคู่ตาม Skills | 🔴 Critical |
| Interest Button | ปุ่ม "สนใจ" สำหรับนักศึกษา | 🔴 Critical |
| Watch Button | ปุ่ม "Matching/Follow" สำหรับบริษัท | 🔴 Critical |
| Basic Notifications | แจ้งเตือน In-app | 🟡 High |

#### 1.5 Admin Dashboard
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| User Management | จัดการผู้ใช้ทุกประเภท | 🔴 Critical |
| Company Verification | ตรวจสอบและอนุมัติบริษัท | 🔴 Critical |
| Basic Reports | รายงานพื้นฐาน | 🟡 High |
| System Settings | ตั้งค่าระบบพื้นฐาน | 🟡 High |

**✅ Phase 1 Deliverables:**
- [ ] Working authentication system
- [ ] Student profile & portfolio
- [ ] Company portal with job posting
- [ ] Basic skill matching
- [ ] Admin dashboard
- [ ] In-app notifications

---

### 📈 Phase 2: Enhanced Matching & Engagement (Q3 2025)

> **เป้าหมาย**: ปรับปรุงระบบ Matching และเพิ่มการมีส่วนร่วม

#### 2.1 AI-Powered Matching
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Compatibility Score | คะแนนความเข้ากันได้ (AI) | 🔴 Critical |
| Smart Recommendations | แนะนำบริษัท/นักศึกษาอัตโนมัติ | 🔴 Critical |
| Skill Gap Analysis | วิเคราะห์ช่องว่างทักษะ | 🟡 High |
| Career Path Prediction | ทำนายเส้นทางอาชีพ | 🟢 Medium |
| Culture Fit Analysis | วิเคราะห์ความเข้ากันได้ด้าน Culture | 🟢 Medium |

#### 2.2 Advanced Search & Filter
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Full-text Search | ค้นหาแบบ Full-text (Elasticsearch) | 🔴 Critical |
| Advanced Filters | Filter หลากหลาย | 🔴 Critical |
| Saved Searches | บันทึกการค้นหา | 🟡 High |
| Batch Actions | ดำเนินการหลายรายการพร้อมกัน | 🟡 High |

#### 2.3 Communication System
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| In-app Messaging | แชทในระบบ | 🔴 Critical |
| Email Notifications | แจ้งเตือนทาง Email | 🔴 Critical |
| Push Notifications | Push notification (Web) | 🟡 High |
| Message Templates | Template ข้อความสำเร็จรูป | 🟢 Medium |

#### 2.4 Gamification System
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Points System | ระบบคะแนน | 🟡 High |
| Achievement Badges | Badge รางวัล | 🟡 High |
| Leaderboard | กระดานผู้นำ | 🟢 Medium |
| Progress Milestones | จุดหมายความก้าวหน้า | 🟢 Medium |

#### 2.5 Analytics Dashboard
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Profile View Stats | สถิติการดู Profile | 🔴 Critical |
| Application Funnel | Funnel การสมัคร | 🟡 High |
| Skill Trends | เทรนด์ทักษะในตลาด | 🟡 High |
| Company Analytics | สถิติสำหรับบริษัท | 🟡 High |

**✅ Phase 2 Deliverables:**
- [ ] AI matching with compatibility score
- [ ] Elasticsearch integration
- [ ] In-app messaging
- [ ] Email & push notifications
- [ ] Gamification system
- [ ] Analytics dashboards

---

### 🏢 Phase 3: Enterprise & Integration (Q4 2025)

> **เป้าหมาย**: ฟีเจอร์สำหรับองค์กรและการเชื่อมต่อระบบภายนอก

#### 3.1 Membership & Monetization
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Tiered Membership | ระบบ Tier (Free/Basic/Pro/Enterprise) | 🔴 Critical |
| Payment Integration | เชื่อมต่อ Stripe/Omise | 🔴 Critical |
| Subscription Management | จัดการ Subscription | 🔴 Critical |
| Invoice & Receipt | ใบแจ้งหนี้และใบเสร็จ | 🟡 High |
| Usage Tracking | ติดตามการใช้งาน | 🟡 High |

#### 3.2 University Integration
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Transcript Import | นำเข้าข้อมูลผลการเรียน | 🟡 High |
| Course Integration | เชื่อมต่อกับระบบลงทะเบียน | 🟡 High |
| University Dashboard | Dashboard สำหรับมหาวิทยาลัย | 🟡 High |
| Graduate Tracking | ติดตามบัณฑิต | 🟢 Medium |

#### 3.3 Competitive Hiring Features
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Priority Queue | ลำดับความสำคัญ | 🔴 Critical |
| Featured Listings | โปรโมทประกาศงาน | 🟡 High |
| Exclusive Access | ช่วงเวลาเข้าถึงพิเศษ | 🟡 High |
| Early Booking | จองตัวล่วงหน้า | 🟢 Medium |

#### 3.4 Long-term Tracking
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Semester Progress | ติดตามรายเทอม | 🔴 Critical |
| Progress Alerts | แจ้งเตือนความก้าวหน้า | 🟡 High |
| Threshold Notifications | แจ้งเตือนเมื่อถึงเกณฑ์ | 🟡 High |
| Historical Data | ประวัติการพัฒนา | 🟢 Medium |

#### 3.5 API Platform
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| REST API | Public REST API | 🔴 Critical |
| GraphQL API | GraphQL endpoint | 🟡 High |
| API Documentation | เอกสาร API (Swagger/OpenAPI) | 🟡 High |
| API Keys Management | จัดการ API Keys | 🟡 High |
| Webhooks | Webhook สำหรับ Events | 🟢 Medium |

#### 3.6 Advanced Security
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| 2FA Authentication | ยืนยันตัวตน 2 ขั้นตอน | 🔴 Critical |
| Audit Logging | บันทึก Activity ทั้งหมด | 🔴 Critical |
| PDPA Compliance | ปฏิบัติตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล | 🔴 Critical |
| Data Export | ส่งออกข้อมูลส่วนตัว | 🟡 High |
| Rate Limiting | จำกัดการเข้าถึง | 🟡 High |

**✅ Phase 3 Deliverables:**
- [ ] Membership tiers with payment
- [ ] University system integration
- [ ] Competitive hiring features
- [ ] Long-term tracking
- [ ] Public API with documentation
- [ ] Enhanced security features

---

### 🌟 Phase 4: Scale & Ecosystem (Q1 2026)

> **เป้าหมาย**: ขยายระบบและสร้าง Ecosystem

#### 4.1 Mobile Application
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| iOS App | แอป iOS (React Native) | 🟡 High |
| Android App | แอป Android (React Native) | 🟡 High |
| Push Notifications | Push notification มือถือ | 🟡 High |
| Offline Mode | ใช้งานออฟไลน์บางส่วน | 🟢 Medium |

#### 4.2 Advanced AI Features
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Resume Analyzer | วิเคราะห์ Resume อัตโนมัติ | 🟡 High |
| Interview AI | ช่วยเตรียมสัมภาษณ์ | 🟢 Medium |
| Skill Verification | ยืนยันทักษะด้วย AI | 🟢 Medium |
| Fraud Detection | ตรวจจับ Profile ปลอม | 🟡 High |

#### 4.3 Event & Workshop Platform
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Event Creation | บริษัทสร้าง Event | 🟡 High |
| Workshop Management | จัดการ Workshop | 🟡 High |
| Hackathon Platform | จัด Hackathon | 🟢 Medium |
| Virtual Events | Event ออนไลน์ | 🟢 Medium |

#### 4.4 Video Interview
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Video Call Integration | สัมภาษณ์วิดีโอในระบบ | 🟡 High |
| Recording | บันทึกการสัมภาษณ์ | 🟢 Medium |
| Scheduling | นัดหมายอัตโนมัติ | 🟡 High |
| AI Interview Analysis | วิเคราะห์การสัมภาษณ์ | 🟢 Medium |

#### 4.5 Multi-University Expansion
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Multi-tenant Support | รองรับหลายมหาวิทยาลัย | 🟡 High |
| White-label Option | Customization สำหรับแต่ละสถาบัน | 🟢 Medium |
| Cross-university Search | ค้นหาข้ามมหาวิทยาลัย | 🟢 Medium |

#### 4.6 Advanced Analytics & Reports
| ฟีเจอร์ | รายละเอียด | Priority |
|---------|------------|----------|
| Custom Reports | รายงาน Custom | 🟡 High |
| Predictive Analytics | วิเคราะห์เชิงทำนาย | 🟢 Medium |
| Market Intelligence | ข้อมูลตลาดแรงงาน | 🟢 Medium |
| Benchmarking | เปรียบเทียบกับมาตรฐาน | 🟢 Medium |

**✅ Phase 4 Deliverables:**
- [ ] iOS & Android mobile apps
- [ ] Advanced AI features
- [ ] Event & workshop platform
- [ ] Video interview integration
- [ ] Multi-university support
- [ ] Advanced analytics

---

### 📊 Phase Summary

| Phase | Timeline | Focus | Key Metric |
|-------|----------|-------|------------|
| **Phase 1** | Q2 2025 | MVP & Core | 100 Students, 10 Companies |
| **Phase 2** | Q3 2025 | Matching & Engagement | 500 Students, 50 Companies |
| **Phase 3** | Q4 2025 | Enterprise & Integration | 2,000 Students, 200 Companies |
| **Phase 4** | Q1 2026 | Scale & Ecosystem | 10,000 Students, 500 Companies |

---

## 📊 Database Schema

### Core Entities

```sql
-- Users (Base table for all user types)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    name_thai VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'lecturer', 'staff', 'company', 'admin')),
    avatar_url TEXT,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Students
CREATE TABLE students (
    id UUID PRIMARY KEY REFERENCES users(id),
    student_id VARCHAR(50) UNIQUE NOT NULL,
    major VARCHAR(100) NOT NULL,
    program VARCHAR(20) CHECK (program IN ('bachelor', 'master', 'doctoral')),
    year INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    gpa DECIMAL(3,2),
    gpax DECIMAL(3,2),
    total_credits INTEGER DEFAULT 0,
    earned_credits INTEGER DEFAULT 0,
    academic_status VARCHAR(20) DEFAULT 'normal',
    advisor_id UUID REFERENCES users(id),
    cv_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_visibility VARCHAR(20) DEFAULT 'university',
    gamification_points INTEGER DEFAULT 0
);

-- Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY REFERENCES users(id),
    company_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_name_thai VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(20) CHECK (size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
    website TEXT,
    address TEXT,
    tax_id VARCHAR(20),
    verification_status VARCHAR(20) DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    membership_tier VARCHAR(20) DEFAULT 'free',
    membership_expires_at TIMESTAMP WITH TIME ZONE,
    can_contact_students BOOLEAN DEFAULT false
);

-- Skills
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Skills (Many-to-Many)
CREATE TABLE student_skills (
    student_id UUID REFERENCES students(id),
    skill_id UUID REFERENCES skills(id),
    level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    evidence_url TEXT,
    PRIMARY KEY (student_id, skill_id)
);

-- Job Postings
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('internship', 'full-time', 'part-time', 'contract')),
    positions INTEGER DEFAULT 1,
    description TEXT,
    responsibilities TEXT[],
    requirements TEXT[],
    preferred_skills TEXT[],
    salary_range VARCHAR(100),
    benefits TEXT[],
    location VARCHAR(255),
    work_type VARCHAR(20) CHECK (work_type IN ('onsite', 'remote', 'hybrid')),
    start_date DATE,
    deadline DATE,
    status VARCHAR(20) DEFAULT 'open',
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Required Skills
CREATE TABLE job_required_skills (
    job_id UUID REFERENCES job_postings(id),
    skill_id UUID REFERENCES skills(id),
    min_level VARCHAR(20),
    is_required BOOLEAN DEFAULT true,
    PRIMARY KEY (job_id, skill_id)
);

-- Applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES job_postings(id) NOT NULL,
    student_id UUID REFERENCES students(id) NOT NULL,
    cover_letter TEXT,
    resume_url TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id)
);

-- Student Interests (Student interested in company)
CREATE TABLE student_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) NOT NULL,
    company_id UUID REFERENCES companies(id) NOT NULL,
    job_id UUID REFERENCES job_postings(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notified_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, company_id, job_id)
);

-- Company Watch List (Company watching student)
CREATE TABLE company_watchlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    student_id UUID REFERENCES students(id) NOT NULL,
    job_id UUID REFERENCES job_postings(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(company_id, student_id)
);

-- Threshold Alerts (For auto-notification when student meets requirements)
CREATE TABLE threshold_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    job_id UUID REFERENCES job_postings(id),
    min_gpa DECIMAL(3,2),
    required_skills JSONB, -- [{skill_id, min_level}]
    min_activity_points INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID REFERENCES users(id) NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_thai VARCHAR(255),
    message TEXT NOT NULL,
    message_thai TEXT,
    priority VARCHAR(20) DEFAULT 'medium',
    channels TEXT[] DEFAULT ARRAY['in-app'],
    action_url TEXT,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_id UUID REFERENCES users(id) NOT NULL,
    to_id UUID REFERENCES users(id) NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memberships
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    tier VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'THB',
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(20) DEFAULT 'success',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_students_major ON students(major);
CREATE INDEX idx_students_year ON students(year);
CREATE INDEX idx_students_gpa ON students(gpa);
CREATE INDEX idx_student_skills_skill ON student_skills(skill_id);
CREATE INDEX idx_job_postings_company ON job_postings(company_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX idx_notifications_unread ON notifications(recipient_id) WHERE is_read = false;
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

### Entity Relationship Diagram

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│      users        │       │     students      │       │    companies      │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id (PK)           │◄──────│ id (PK,FK)        │       │ id (PK,FK)        │──────►│ users │
│ email             │       │ student_id        │       │ company_id        │
│ role              │       │ major             │       │ company_name      │
│ ...               │       │ gpa               │       │ membership_tier   │
└───────────────────┘       │ ...               │       │ ...               │
                            └─────────┬─────────┘       └─────────┬─────────┘
                                      │                           │
                    ┌─────────────────┼─────────────────┐         │
                    │                 │                 │         │
                    ▼                 ▼                 ▼         ▼
          ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────┐
          │ student_skills  │ │student_interests│ │    job_postings         │
          ├─────────────────┤ ├─────────────────┤ ├─────────────────────────┤
          │ student_id (FK) │ │ student_id (FK) │ │ id (PK)                 │
          │ skill_id (FK)   │ │ company_id (FK) │ │ company_id (FK)         │
          │ level           │ │ job_id (FK)     │ │ title                   │
          └────────┬────────┘ └─────────────────┘ │ requirements            │
                   │                               └───────────┬─────────────┘
                   ▼                                           │
          ┌─────────────────┐                                  ▼
          │     skills      │                         ┌─────────────────────┐
          ├─────────────────┤                         │    applications     │
          │ id (PK)         │                         ├─────────────────────┤
          │ name            │                         │ id (PK)             │
          │ category        │                         │ job_id (FK)         │
          └─────────────────┘                         │ student_id (FK)     │
                                                      │ status              │
                                                      └─────────────────────┘
```

---

## 🔐 ความปลอดภัย

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │   Client    │────►│  API Gateway │────►│  Auth       │       │
│  │  (Browser)  │     │  (Rate Limit)│     │  Service    │       │
│  └─────────────┘     └─────────────┘     └──────┬──────┘       │
│                                                  │               │
│                                    ┌─────────────┼──────────┐   │
│                                    │             │          │   │
│                                    ▼             ▼          ▼   │
│                              ┌──────────┐ ┌──────────┐ ┌──────┐ │
│                              │   JWT    │ │  OAuth   │ │ SSO  │ │
│                              │  Tokens  │ │  2.0     │ │      │ │
│                              └──────────┘ └──────────┘ └──────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Security Features

| Feature | Description | Status |
|---------|-------------|--------|
| **JWT Authentication** | Token-based auth with refresh tokens | ✅ Implemented |
| **Role-based Access Control** | Permission by user role | ✅ Implemented |
| **Password Hashing** | bcrypt with salt | ✅ Implemented |
| **Rate Limiting** | API request limiting | ✅ Implemented |
| **2FA** | Two-factor authentication | 🔄 Phase 3 |
| **Audit Logging** | All actions logged | 🔄 Phase 3 |
| **Data Encryption** | AES-256 at rest | ✅ Implemented |
| **HTTPS/TLS** | All traffic encrypted | ✅ Implemented |
| **PDPA Compliance** | Thai data protection law | 🔄 Phase 3 |
| **SQL Injection Prevention** | Parameterized queries | ✅ Implemented |
| **XSS Prevention** | Input sanitization | ✅ Implemented |
| **CSRF Protection** | CSRF tokens | ✅ Implemented |

### Privacy Controls

```typescript
interface PrivacySettings {
  // Profile visibility
  profileVisibility: 'private' | 'university' | 'public';
  
  // Data sharing
  allowDataSharing: boolean;
  allowPortfolioSharing: boolean;
  
  // Company access
  sharedWithCompanies: string[]; // Whitelist
  blockedCompanies: string[]; // Blacklist
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  
  // Leaderboard
  showInLeaderboard: boolean;
  showRealName: boolean;
}
```

### Data Consent Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA CONSENT FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Student                    System                   Company    │
│     │                         │                         │       │
│     │  1. Register            │                         │       │
│     │─────────────────────────►                         │       │
│     │                         │                         │       │
│     │  2. Show Consent Form   │                         │       │
│     │◄─────────────────────────                         │       │
│     │                         │                         │       │
│     │  3. Accept Terms        │                         │       │
│     │─────────────────────────►                         │       │
│     │                         │                         │       │
│     │  4. Set Privacy Level   │                         │       │
│     │─────────────────────────►                         │       │
│     │                         │                         │       │
│     │                         │  5. Company Requests   │       │
│     │                         │◄─────────────────────────       │
│     │                         │                         │       │
│     │  6. Approve/Deny        │                         │       │
│     │◄─────────────────────────                         │       │
│     │                         │                         │       │
│     │─────────────────────────►                         │       │
│     │                         │                         │       │
│     │                         │  7. Grant/Deny Access   │       │
│     │                         │─────────────────────────►       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💰 โมเดลธุรกิจ

### Revenue Streams

```
┌─────────────────────────────────────────────────────────────────┐
│                    REVENUE MODEL                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Subscription  │  │   Transaction   │  │    Premium      │ │
│  │     Revenue     │  │      Fees       │  │    Services     │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ • Membership    │  │ • Hiring Fee    │  │ • Featured      │ │
│  │   Tiers         │  │   (Per hire)    │  │   Listings      │ │
│  │ • Annual Plans  │  │ • API Access    │  │ • Analytics     │ │
│  │                 │  │   (Usage-based) │  │ • Consulting    │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │          │
│           └────────────────────┼────────────────────┘          │
│                                │                               │
│                                ▼                               │
│                    ┌─────────────────────┐                     │
│                    │   TOTAL REVENUE     │                     │
│                    └─────────────────────┘                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Membership Tiers Detail

#### 🆓 Free Tier
- **ราคา**: ฟรี
- **Job Postings**: 1 ตำแหน่ง
- **Profile Views**: 10 คน/เดือน
- **Search**: พื้นฐาน
- **Messages**: 5 ข้อความ/เดือน
- **Support**: Community

#### 💼 Basic Tier (฿2,999/เดือน)
- **Job Postings**: 5 ตำแหน่ง
- **Profile Views**: 50 คน/เดือน
- **Search**: Advanced filters
- **Messages**: 50 ข้อความ/เดือน
- **Analytics**: Basic
- **Support**: Email

#### 🏆 Professional Tier (฿7,999/เดือน)
- **Job Postings**: 20 ตำแหน่ง
- **Profile Views**: ไม่จำกัด
- **Search**: Full-text + AI
- **Messages**: ไม่จำกัด
- **Analytics**: Advanced
- **Priority Queue**: ✅
- **Watch List Alerts**: ✅
- **Support**: Priority Email

#### 🏢 Enterprise Tier (฿19,999/เดือน)
- **Job Postings**: ไม่จำกัด
- **Profile Views**: ไม่จำกัด
- **Search**: Full + Export
- **Messages**: ไม่จำกัด
- **Analytics**: Full + Custom Reports
- **API Access**: ✅
- **Dedicated Account Manager**: ✅
- **White-label Option**: ✅
- **Support**: 24/7 Phone + Chat

### Pricing Calculator

```
Base Price (Tier)
    +
Add-ons:
  - Featured Listing: ฿500/post/week
  - Premium Analytics: ฿2,000/report
  - API Calls: ฿0.10/call (over quota)
  - Extra Job Posts: ฿300/post
    =
Total Monthly Cost
```

---

## 📱 API Reference

### Base URL
```
Production: https://api.showpro.dii.camt.cmu.ac.th/v1
Staging: https://api-staging.showpro.dii.camt.cmu.ac.th/v1
```

### Authentication

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Core Endpoints

#### Students

```http
# Get all students (with filters)
GET /students?major=CS&year=3&skills=react,typescript&min_gpa=3.0

# Get student by ID
GET /students/{id}

# Get student's portfolio
GET /students/{id}/portfolio

# Get student's skills
GET /students/{id}/skills

# Update student profile
PATCH /students/{id}
```

#### Companies

```http
# Get all companies
GET /companies

# Get company by ID
GET /companies/{id}

# Get company's job postings
GET /companies/{id}/jobs

# Get company's watch list
GET /companies/{id}/watchlist
```

#### Job Postings

```http
# Get all job postings
GET /jobs?type=internship&skills=python&location=bangkok

# Create job posting
POST /jobs
{
  "title": "Frontend Developer Intern",
  "type": "internship",
  "description": "...",
  "requirements": ["React", "TypeScript"],
  "preferred_skills": ["Next.js", "TailwindCSS"],
  "location": "Bangkok",
  "work_type": "hybrid"
}

# Get job applications
GET /jobs/{id}/applications
```

#### Matching

```http
# Get matching students for a job
GET /matching/job/{job_id}/students

# Get matching jobs for a student
GET /matching/student/{student_id}/jobs

# Express interest (student → company)
POST /matching/interest
{
  "student_id": "...",
  "company_id": "...",
  "job_id": "..."
}

# Add to watch list (company → student)
POST /matching/watch
{
  "company_id": "...",
  "student_id": "...",
  "notes": "Great candidate for Q3"
}
```

#### Notifications

```http
# Get notifications
GET /notifications?unread=true

# Mark as read
PATCH /notifications/{id}/read

# Get notification settings
GET /notifications/settings

# Update notification settings
PUT /notifications/settings
```

### Webhooks

```http
POST /webhooks/register
{
  "url": "https://your-app.com/webhook",
  "events": [
    "student.interested",
    "application.received",
    "threshold.met"
  ],
  "secret": "your-webhook-secret"
}
```

### Rate Limits

| Tier | Requests/minute | Requests/day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Basic | 120 | 5,000 |
| Professional | 300 | 20,000 |
| Enterprise | 600 | Unlimited |

---

## 🧪 การทดสอบ

### Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/             # Integration tests
│   ├── api/
│   └── services/
├── e2e/                     # End-to-end tests
│   ├── auth.spec.ts
│   ├── matching.spec.ts
│   └── ...
└── fixtures/                # Test data
```

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

### Test Coverage Requirements

| Category | Minimum Coverage |
|----------|-----------------|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

---

## 🤝 การมีส่วนร่วม

### Development Setup

```bash
# 1. Fork repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/dii-camt-showprogroup.git

# 3. Create feature branch
git checkout -b feature/your-feature-name

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev

# 6. Make changes and commit
git commit -m "feat: add new feature"

# 7. Push and create PR
git push origin feature/your-feature-name
```

### Commit Convention

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
- feat(auth): add 2FA support
- fix(matching): correct skill scoring algorithm
- docs(readme): update API documentation
```

### Code Style

- ESLint + Prettier for code formatting
- TypeScript strict mode
- Conventional Commits
- PR reviews required

---

## 📄 License

```
MIT License

Copyright (c) 2025 DII CAMT, Chiang Mai University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

## 📞 Contact & Support

<div align="center">

| Channel | Contact |
|---------|---------|
| 📧 Email | support@showpro.dii.camt.cmu.ac.th |
| 🌐 Website | https://showpro.dii.camt.cmu.ac.th |
| 📱 LINE | @showpro-support |
| 🐛 Bug Reports | GitHub Issues |
| 💡 Feature Requests | GitHub Discussions |

</div>

---

<div align="center">

**Made with ❤️ by DII CAMT Team**

*Digital Innovation and Intelligence, College of Arts, Media and Technology*

*Chiang Mai University*

</div>
