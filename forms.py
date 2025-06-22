from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    full_name = StringField('الاسم الكامل', validators=[DataRequired(), Length(max=100)])
    phone = StringField('رقم الجوال', validators=[DataRequired(), Length(max=30)])
    email = StringField('البريد الإلكتروني', validators=[DataRequired(), Email(), Length(max=120)])
    message = TextAreaField('الرسالة', validators=[DataRequired()])
    submit = SubmitField('إرسال')

class LoginForm(FlaskForm):
    username = StringField('اسم المستخدم', validators=[DataRequired()])
    password = PasswordField('كلمة المرور', validators=[DataRequired()])
    submit = SubmitField('دخول')