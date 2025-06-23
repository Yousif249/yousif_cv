# -*- coding: utf-8 -*-
# config.py

import os

class Config:
    """
    إعدادات تطبيق Flask.
    """
    # المفتاح السري لتأمين جلسات Flask وتوقيع ملفات تعريف الارتباط.
    # ***مهم: يجب تغيير هذا إلى مفتاح سري قوي ومعقد في بيئة الإنتاج.***
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_super_secret_key_here_for_production_use_only'

    # إعدادات قاعدة البيانات SQLAlchemy.
    # استخدام SQLite لقاعدة بيانات بسيطة.
    # يمكنك تغيير هذا إلى PostgreSQL أو MySQL في بيئة الإنتاج.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # تعطيل تتبع تعديلات الكائنات (يقلل استخدام الذاكرة)

    # يمكنك إضافة إعدادات أخرى هنا
    # UPLOAD_FOLDER = 'path/to/upload/folder'