from flask import Flask, render_template, redirect, url_for, flash, request
from config import Config
from models import db, ContactMessage, Admin
from forms import ContactForm, LoginForm
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from utils import record_visit, get_visits_count, get_visits_per_day

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = 'admin_login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# --- الصفحة الرئيسية ---
@app.route("/", methods=['GET', 'POST'])
def index():
    form = ContactForm()
    if request.method == 'GET':
        record_visit()
    if form.validate_on_submit():
        msg = ContactMessage(
            full_name=form.full_name.data,
            phone=form.phone.data,
            email=form.email.data,
            message=form.message.data
        )
        db.session.add(msg)
        db.session.commit()
        flash('تم إرسال رسالتك بنجاح!', 'success')
        return redirect(url_for('index'))
    return render_template("index.html", form=form)

# --- إعادة توجيه /admin إلى الداشبورد الحقيقي ---
@app.route('/admin')
def admin():
    return redirect(url_for('admin_dashboard'))

# --- صفحة تسجيل دخول الأدمن ---
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(username=form.username.data).first()
        if admin and admin.check_password(form.password.data):
            login_user(admin)
            return redirect(url_for('admin_dashboard'))
        else:
            flash('اسم المستخدم أو كلمة المرور غير صحيحة', 'danger')
    return render_template('admin_login.html', form=form)

# --- تسجيل خروج الأدمن ---
@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    flash('تم تسجيل الخروج بنجاح', 'info')
    return redirect(url_for('admin_login'))

# --- لوحة تحكم الأدمن (الداشبورد) ---
@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    # اجلب الرسائل الغير مؤرشفة فقط، الأحدث أولاً
    messages = ContactMessage.query.filter_by(archived=False).order_by(ContactMessage.date_sent.desc()).all()
    visits_count = get_visits_count()
    labels, counts = get_visits_per_day()
    return render_template(
        'admin_dashboard.html',
        messages=messages,
        visits_count=visits_count,
        labels=labels,
        counts=counts
    )

# --- حذف رسالة ---
@app.route('/admin/delete_message/<int:msg_id>')
@login_required
def delete_message(msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    db.session.delete(msg)
    db.session.commit()
    flash('تم حذف الرسالة', 'success')
    return redirect(url_for('admin_dashboard'))

# --- أرشفة رسالة ---
@app.route('/admin/archive_message/<int:msg_id>')
@login_required
def archive_message(msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    msg.archived = True
    db.session.commit()
    flash('تمت أرشفة الرسالة', 'info')
    return redirect(url_for('admin_dashboard'))

# --- صفحة خطأ 404 ---
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# --- تهيئة قاعدة البيانات وإنشاء الأدمن أول مرة ---
@app.cli.command("init-db")
def init_db():
    db.create_all()
    print("Database initialized.")

@app.cli.command("create-admin")
def create_admin():
    username = input("Enter admin username: ")
    password = input("Enter admin password: ")
    if Admin.query.filter_by(username=username).first():
        print("Admin already exists.")
        return
    admin = Admin(username=username)
    admin.set_password(password)
    db.session.add(admin)
    db.session.commit()
    print("Admin created.")

# لا تضع app.run هنا، ليعمل التطبيق مع gunicorn تلقائياً عند النشر.