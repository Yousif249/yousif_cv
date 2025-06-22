from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, Optional

class ContactForm(FlaskForm):
    full_name = StringField(
        'الاسم الكامل',
        validators=[
            DataRequired(message="الاسم مطلوب"),
            Length(max=100, message="الاسم طويل جدًا (100 حرف كحد أقصى)")
        ]
    )
    phone = StringField(
        'رقم الجوال',
        validators=[
            DataRequired(message="رقم الجوال مطلوب"),
            Length(max=30, message="رقم الجوال طويل جدًا (30 رقم كحد أقصى)")
        ]
    )
    email = StringField(
        'البريد الإلكتروني',
        validators=[
            DataRequired(message="البريد الإلكتروني مطلوب"),
            Email(message="صيغة البريد الإلكتروني غير صحيحة"),
            Length(max=120, message="البريد طويل جدًا (120 حرف كحد أقصى)")
        ]
    )
    message = TextAreaField(
        'الرسالة',
        validators=[
            DataRequired(message="نص الرسالة مطلوب")
        ]
    )
    submit = SubmitField('إرسال')

class LoginForm(FlaskForm):
    username = StringField(
        'اسم المستخدم',
        validators=[
            DataRequired(message="اسم المستخدم مطلوب")
        ]
    )
    password = PasswordField(
        'كلمة المرور',
        validators=[
            DataRequired(message="كلمة المرور مطلوبة")
        ]
    )
    submit = SubmitField('دخول')

class EditAdminForm(FlaskForm):
    username = StringField(
        'اسم الأدمن',
        validators=[
            DataRequired(message="اسم الأدمن مطلوب"),
            Length(min=3, max=50, message="الاسم بين 3 و50 حرف")
        ]
    )
    password = PasswordField(
        'كلمة المرور الجديدة',
        validators=[
            Optional(),
            Length(min=6, message="كلمة المرور يجب ألا تقل عن 6 أحرف")
        ]
    )
    submit = SubmitField('حفظ التعديلات')