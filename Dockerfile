# استخدام نسخة Node كاملة ومستقرة
FROM node:20

# تحديد مسار العمل
WORKDIR /app

# نسخ ملفات الحزم
COPY package*.json ./

# تسطيب الاعتمادات
RUN npm install --legacy-peer-deps

# فتح الرامات لعملية البناء
ENV NODE_OPTIONS="--max-old-space-size=8192"

# نسخ باقي ملفات المشروع
COPY . .

# بناء واجهة الـ React
RUN npm run build

# فتح البورت 
EXPOSE 3000

# تشغيل السيرفر بناءً على ملف package.json بتاعك
CMD ["npm", "run", "start"]