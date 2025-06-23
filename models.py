# -*- coding: utf-8 -*-
# models.py

from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# يتم تمرير كائن db من app.py لاحقًا
db = SQLAlchemy() # سيتم تهيئة db لاحقًا في app.py

class User(db.Model, UserMixin):
    """
    نموذج المستخدمين (للأدمن)
    يحتوي على اسم المستخدم وكلمة المرور المشفرة.
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        """يشفر كلمة المرور ويحفظها."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """يتحقق من كلمة المرور المدخلة مقابل الكلمة المشفرة."""
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"User('{self.username}')"

class ContactMessage(db.Model):
    """
    نموذج رسائل الاتصال
    يحفظ بيانات نموذج الاتصال.
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow) # وقت إرسال الرسالة

    def __repr__(self):
        return f"ContactMessage('{self.name}', '{self.email}')"

class Visitor(db.Model):
    """
    نموذج تتبع الزوار
    يسجل زيارات الموقع (يمكن تحسينه لتتبع الزوار الفريدين بدقة أكبر).
    """
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=True) # يمكن تخزين عنوان IP
    timestamp = db.Column(db.DateTime, default=datetime.utcnow) # وقت الزيارة

    def __repr__(self):
        return f"Visitor('{self.ip_address}', '{self.timestamp}')"
