# -*- coding: utf-8 -*-
# forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo, ValidationError

# تعريف نموذج الاتصال
class ContactForm(FlaskForm):
    name = StringField('الاسم', validators=[DataRequired('الاسم مطلوب.')])
    phone = StringField('رقم الجوال', validators=[DataRequired('رقم الجوال مطلوب.'), Length(min=8, max=20, message='يجب أن يكون رقم الجوال بين 8 و 20 رقم.')])
    email = StringField('البريد الإلكتروني', validators=[DataRequired('البريد الإلكتروني مطلوب.'), Email('صيغة البريد الإلكتروني غير صحيحة.')])
    message = TextAreaField('الرسالة', validators=[DataRequired('الرسالة مطلوبة.'), Length(min=10, message='يجب أن تكون الرسالة 10 أحرف على الأقل.')])
    submit = SubmitField('إرسال الرسالة')

# تعريف نموذج تسجيل دخول الأدمن
class AdminLoginForm(FlaskForm):
    username = StringField('اسم المستخدم', validators=[DataRequired('اسم المستخدم مطلوب.')])
    password = PasswordField('كلمة المرور', validators=[DataRequired('كلمة المرور مطلوبة.')])
    submit = SubmitField('تسجيل الدخول')

# تعريف نموذج تعديل بيانات الأدمن
class EditAdminForm(FlaskForm):
    new_username = StringField('اسم المستخدم الجديد', validators=[DataRequired('اسم المستخدم الجديد مطلوب.')])
    new_password = PasswordField('كلمة المرور الجديدة', validators=[DataRequired('كلمة المرور الجديدة مطلوبة.'), Length(min=6, message='يجب أن تكون كلمة المرور 6 أحرف على الأقل.')])
    confirm_password = PasswordField('تأكيد كلمة المرور الجديدة', validators=[DataRequired('تأكيد كلمة المرور مطلوب.'), EqualTo('new_password', message='كلمتا المرور غير متطابقتين.')])
    submit = SubmitField('تحديث بيانات الأدمن')
