# คู่มือตั้งค่าและ Deploy DII-CAMT ShowPro ขึ้น VPS พร้อม Domain

คู่มือนี้ครอบคลุมตั้งแต่ตั้งค่าเครื่อง local, เตรียม database, build ระบบ, อัปโหลดไฟล์ขึ้น VPS, รัน backend ด้วย PM2, serve frontend ด้วย Nginx, ผูก domain, เปิด HTTPS และวิธีอัปเดตระบบหลังเปิดใช้งาน

ตัวอย่างในคู่มือนี้ใช้ domain `showpro.example.com` ให้เปลี่ยนเป็น domain จริงของคุณทุกจุด

## 1. โครงสร้างระบบ

- Frontend: React + Vite อยู่ที่ root project
- Backend: Express + Prisma + PostgreSQL อยู่ที่ `backend/`
- API base path: `/api`
- Realtime: Socket.IO ใช้ path `/socket.io`
- Frontend production build อยู่ที่ `dist/`
- Backend production build อยู่ที่ `backend/dist/`

พอร์ตมาตรฐาน:

- Frontend dev: `http://localhost:8080`
- Backend dev/prod: `http://localhost:4000`
- PostgreSQL: `localhost:5432`

## 2. สิ่งที่ต้องมีบนเครื่อง local

ติดตั้ง:

- Node.js 20 LTS หรือใหม่กว่า
- npm
- Git
- Docker Desktop หรือ PostgreSQL local

ตรวจสอบ:

```powershell
node -v
npm -v
git --version
docker --version
```

## 3. ตั้งค่าโปรเจกต์บนเครื่อง local

ติดตั้ง dependency ฝั่ง frontend:

```powershell
npm install
```

ติดตั้ง dependency ฝั่ง backend:

```powershell
npm run backend:install
```

สร้างไฟล์ env:

```powershell
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env
```

ตั้งค่า `.env` ที่ root:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

ตั้งค่า `backend/.env`:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/showpro?schema=public"
JWT_SECRET="replace-with-a-long-random-secret-at-least-16-chars"
JWT_EXPIRES_IN=7d
CORS_ORIGIN="http://localhost:8080,http://localhost:5173,http://127.0.0.1:8080,http://127.0.0.1:5173"
UPLOAD_DIR="storage/uploads"
PRIVATE_FILE_TTL_MINUTES=30
AUTOMATION_POLL_SECONDS=60
PDF_FONT_PATH=
```

สร้าง `JWT_SECRET` ใหม่:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

นำค่าที่ได้ไปแทน `JWT_SECRET`

## 4. เปิด PostgreSQL ตอนพัฒนา

ใช้ Docker Compose ที่อยู่ใน `backend/`:

```powershell
cd backend
docker compose up -d
cd ..
```

สร้าง Prisma Client และ push schema:

```powershell
npm run backend:generate
npm run backend:push
```

ใส่ข้อมูลตัวอย่าง:

```powershell
npm run backend:seed
```

บัญชี demo ใช้รหัสผ่าน `Password123!`

- `admin@showpro.local`
- `staff@showpro.local`
- `narin@showpro.local`
- `talent@northernsoft.local`
- `alice@student.showpro.local`

## 5. รันระบบบนเครื่อง local

เปิด backend:

```powershell
npm run backend:dev
```

เปิด frontend อีก terminal:

```powershell
npm run dev -- --host 0.0.0.0 --port 8080
```

ตรวจสอบ:

- Frontend: `http://localhost:8080`
- Backend health: `http://localhost:4000/health`
- API root: `http://localhost:4000/api`

## 6. ตรวจระบบก่อน deploy

รันคำสั่งนี้ทุกครั้งก่อนอัปขึ้น VPS:

```powershell
npm run typecheck
npm run lint
npm run build
npm run backend:validate
```

หรือรันรวม:

```powershell
npm run check
```

## 7. เตรียม VPS

ตัวอย่างนี้ใช้ Ubuntu 22.04/24.04

SSH เข้าเครื่อง:

```bash
ssh root@YOUR_VPS_IP
```

อัปเดตเครื่อง:

```bash
apt update && apt upgrade -y
apt install -y curl git ufw unzip nginx postgresql postgresql-contrib certbot python3-certbot-nginx
```

ตั้ง timezone:

```bash
timedatectl set-timezone Asia/Bangkok
```

สร้าง user สำหรับ deploy:

```bash
adduser deploy
usermod -aG sudo deploy
```

ตั้ง firewall:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

## 8. ติดตั้ง Node.js และ PM2 บน VPS

ติดตั้ง Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs
node -v
npm -v
```

ติดตั้ง PM2:

```bash
npm install -g pm2
pm2 -v
```

## 9. สร้าง PostgreSQL production database

เข้า PostgreSQL:

```bash
sudo -u postgres psql
```

สร้าง user/database:

```sql
CREATE USER showpro_user WITH PASSWORD 'CHANGE_THIS_STRONG_PASSWORD';
CREATE DATABASE showpro OWNER showpro_user;
GRANT ALL PRIVILEGES ON DATABASE showpro TO showpro_user;
\q
```

DATABASE_URL production จะเป็น:

```env
DATABASE_URL="postgresql://showpro_user:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/showpro?schema=public"
```

## 10. วิธีอัปโหลดไฟล์ขึ้น VPS

เลือกได้ 1 วิธี

### วิธี A: ใช้ Git clone บน VPS

```bash
mkdir -p /var/www
cd /var/www
git clone YOUR_REPOSITORY_URL showpro
cd showpro
```

ถ้า repo เป็น private ให้ตั้ง SSH key หรือใช้ deploy token ก่อน

### วิธี B: อัปโหลดด้วย SCP จาก Windows/PowerShell

ที่เครื่อง local:

```powershell
Compress-Archive -Path .\* -DestinationPath .\showpro.zip -Force
scp .\showpro.zip deploy@YOUR_VPS_IP:/tmp/showpro.zip
```

ที่ VPS:

```bash
sudo mkdir -p /var/www/showpro
sudo chown -R deploy:deploy /var/www/showpro
unzip /tmp/showpro.zip -d /var/www/showpro
cd /var/www/showpro
```

### วิธี C: ใช้ WinSCP

1. เปิด WinSCP
2. Host name: IP ของ VPS
3. User: `deploy`
4. Upload โฟลเดอร์โปรเจกต์ไปที่ `/var/www/showpro`
5. SSH เข้า VPS แล้วรันคำสั่งติดตั้งต่อจากหัวข้อถัดไป

## 11. ตั้งค่า env บน VPS

ไปที่โปรเจกต์:

```bash
cd /var/www/showpro
```

สร้าง `.env` ที่ root:

```bash
nano .env
```

ใส่:

```env
VITE_API_BASE_URL=https://showpro.example.com/api
```

สร้าง `backend/.env`:

```bash
nano backend/.env
```

ใส่:

```env
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://showpro_user:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/showpro?schema=public"
JWT_SECRET="PUT_A_LONG_RANDOM_SECRET_HERE"
JWT_EXPIRES_IN=7d
CORS_ORIGIN="https://showpro.example.com,https://www.showpro.example.com"
UPLOAD_DIR="/var/www/showpro/backend/storage/uploads"
PRIVATE_FILE_TTL_MINUTES=30
AUTOMATION_POLL_SECONDS=60
PDF_FONT_PATH=
```

สร้าง secret บน VPS:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 12. ติดตั้ง dependency และเตรียม database บน VPS

```bash
cd /var/www/showpro
npm ci
npm ci --prefix backend
npm run backend:generate
npm run backend:push
```

ถ้าเป็นระบบใหม่และต้องการข้อมูลเริ่มต้น:

```bash
npm run backend:seed
```

หลัง seed ให้เปลี่ยนรหัสผ่านบัญชี admin ทันที

สร้างโฟลเดอร์ upload:

```bash
mkdir -p /var/www/showpro/backend/storage/uploads
chown -R deploy:deploy /var/www/showpro/backend/storage
chmod -R 750 /var/www/showpro/backend/storage
```

## 13. Build frontend และ backend บน VPS

```bash
cd /var/www/showpro
npm run build
npm run backend:build
```

ตรวจว่ามีไฟล์:

```bash
ls dist
ls backend/dist/src/server.js
```

## 14. รัน backend ด้วย PM2

```bash
cd /var/www/showpro/backend
pm2 start dist/src/server.js --name showpro-api --update-env
pm2 save
pm2 startup
```

คำสั่ง `pm2 startup` จะพิมพ์คำสั่ง `sudo env PATH=...` ออกมา ให้ copy ไปรันอีกครั้งตามที่ PM2 บอก

ตรวจ backend:

```bash
pm2 status
pm2 logs showpro-api
curl http://127.0.0.1:4000/health
```

## 15. ตั้งค่า Nginx

สร้าง config:

```bash
sudo nano /etc/nginx/sites-available/showpro
```

ใส่ config นี้:

```nginx
server {
    listen 80;
    server_name showpro.example.com www.showpro.example.com;

    root /var/www/showpro/dist;
    index index.html;

    client_max_body_size 25m;

    location = /health {
        proxy_pass http://127.0.0.1:4000/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:4000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

เปิดใช้งาน site:

```bash
sudo ln -s /etc/nginx/sites-available/showpro /etc/nginx/sites-enabled/showpro
sudo nginx -t
sudo systemctl reload nginx
```

## 16. ตั้งค่า DNS / Domain

ที่ผู้ให้บริการ domain ให้เพิ่ม record:

```text
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 300 หรือ Auto
```

ถ้าจะใช้ `www`:

```text
Type: CNAME
Name: www
Value: showpro.example.com
TTL: 300 หรือ Auto
```

รอ DNS กระจาย แล้วตรวจ:

```bash
nslookup showpro.example.com
curl -I http://showpro.example.com
```

## 17. เปิด HTTPS ด้วย Let's Encrypt

```bash
sudo certbot --nginx -d showpro.example.com -d www.showpro.example.com
```

เลือก redirect HTTP ไป HTTPS เมื่อ certbot ถาม

ตรวจ auto-renew:

```bash
sudo certbot renew --dry-run
```

## 18. Smoke test หลัง deploy

ทดสอบ frontend:

```bash
curl -I https://showpro.example.com
```

ทดสอบ backend:

```bash
curl https://showpro.example.com/health
curl https://showpro.example.com/api
```

ทดสอบ login:

```bash
curl -X POST https://showpro.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@showpro.local","password":"Password123!"}'
```

หลัง login ได้ token แล้วควรทดสอบ endpoint สำคัญ:

```bash
TOKEN="PASTE_TOKEN_HERE"
curl https://showpro.example.com/api/users -H "Authorization: Bearer $TOKEN"
curl https://showpro.example.com/api/students/stats -H "Authorization: Bearer $TOKEN"
curl https://showpro.example.com/api/jobs -H "Authorization: Bearer $TOKEN"
```

## 19. วิธีอัปเดตระบบรอบต่อไป

ถ้า deploy ด้วย Git:

```bash
cd /var/www/showpro
git pull
npm ci
npm ci --prefix backend
npm run backend:generate
npm run backend:push
npm run build
npm run backend:build
pm2 restart showpro-api --update-env
sudo systemctl reload nginx
```

ถ้า upload zip:

```bash
cd /var/www/showpro
cp -r backend/storage /tmp/showpro-storage-backup
# upload/unzip ไฟล์ใหม่ทับ แล้วค่อย restore storage ถ้าจำเป็น
cp -r /tmp/showpro-storage-backup backend/storage
npm ci
npm ci --prefix backend
npm run backend:generate
npm run backend:push
npm run build
npm run backend:build
pm2 restart showpro-api --update-env
```

## 20. Backup database และไฟล์ upload

สร้างโฟลเดอร์ backup:

```bash
sudo mkdir -p /var/backups/showpro
sudo chown -R deploy:deploy /var/backups/showpro
```

backup database:

```bash
pg_dump "postgresql://showpro_user:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/showpro" > /var/backups/showpro/showpro-$(date +%F).sql
```

backup uploads:

```bash
tar -czf /var/backups/showpro/uploads-$(date +%F).tar.gz -C /var/www/showpro/backend storage
```

ตั้ง cron backup ทุกวัน 02:30:

```bash
crontab -e
```

เพิ่ม:

```cron
30 2 * * * pg_dump "postgresql://showpro_user:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/showpro" > /var/backups/showpro/showpro-$(date +\%F).sql
40 2 * * * tar -czf /var/backups/showpro/uploads-$(date +\%F).tar.gz -C /var/www/showpro/backend storage
```

## 21. Checklist ก่อนเปิดจริง

- เปลี่ยน `JWT_SECRET` เป็นค่าจริงที่ยาวและสุ่ม
- ตั้ง `NODE_ENV=production`
- ตั้ง `CORS_ORIGIN` เป็น domain จริงเท่านั้น
- ตั้ง `VITE_API_BASE_URL=https://showpro.example.com/api`
- เปลี่ยนรหัสผ่าน demo/admin ทุกบัญชี
- ตรวจ `npm run check` ผ่าน
- ตรวจ `npm run backend:validate` ผ่าน
- ตรวจ `curl /health` ผ่าน
- ตรวจ login/register ผ่าน
- ตรวจ upload/download document ผ่าน
- ตรวจหน้า dashboard, courses, grades, activities, jobs, applications, reports, settings
- เปิด HTTPS และบังคับ redirect HTTP ไป HTTPS
- เปิด firewall เฉพาะ SSH/HTTP/HTTPS
- ตั้ง backup database และ upload directory
- เก็บ `.env` ให้ปลอดภัย ห้าม commit ขึ้น repo

## 22. Troubleshooting

Backend ไม่ขึ้น:

```bash
pm2 logs showpro-api
curl http://127.0.0.1:4000/health
```

Nginx config ผิด:

```bash
sudo nginx -t
sudo journalctl -u nginx -n 100 --no-pager
```

Database ต่อไม่ได้:

```bash
psql "postgresql://showpro_user:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/showpro"
```

Frontend เรียก API ไม่ได้:

- ตรวจ `.env` root ว่า `VITE_API_BASE_URL` เป็น HTTPS domain จริง
- build frontend ใหม่หลังแก้ env
- ตรวจ `backend/.env` ว่า `CORS_ORIGIN` มี domain จริง
- restart backend ด้วย `pm2 restart showpro-api --update-env`

SSL ออกไม่ได้:

- ตรวจ DNS ชี้มาที่ IP VPS แล้ว
- ตรวจ port 80/443 เปิด
- รัน `sudo certbot --nginx -d showpro.example.com -d www.showpro.example.com` ใหม่
