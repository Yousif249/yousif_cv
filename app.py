from flask import Flask, render_template, redirect, url_for, flash, request, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import Config
from models import db, ContactMessage, Admin
from forms import ContactForm, LoginForm, EditAdminForm
from utils import record_visit, get_visits_count, get_visits_per_day
import csv
from io import StringIO

# تهيئة التطبيق
app = Flask(__name__)
app.config.from_object(Config)

# تهيئة قاعدة البيانات
db.init_app(app)

# تهيئة تسجيل الدخول
login_manager = LoginManager()
login_manager.login_view = 'admin_login'
login_manager.init_app(app)

# ===== صفحة تعديل بيانات الأدمن =====
@app.route('/admin/edit', methods=['GET', 'POST'])
@login_required
def edit_admin():
    form = EditAdminForm(obj=current_user)
    if form.validate_on_submit():
        current_user.username = form.username.data
        if form.password.data:
            current_user.set_password(form.password.data)
        db.session.commit()
        flash('تم تحديث بيانات الأدمن بنجاح', 'success')
        return redirect(url_for('admin_dashboard'))
    return render_template('edit_admin.html', form=form)

# تحميل المستخدم (الأدمن)
@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# ===== الصفحة الرئيسية =====
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

# ===== إعادة توجيه /admin إلى الداشبورد =====
@app.route('/admin')
def admin():
    return redirect(url_for('admin_dashboard'))

# ===== صفحة تسجيل دخول الأدمن =====
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

# ===== تسجيل خروج الأدمن =====
@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    flash('تم تسجيل الخروج بنجاح', 'info')
    return redirect(url_for('admin_login'))

# ===== لوحة تحكم الأدمن =====
@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    # جلب الرسائل الغير مؤرشفة
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

# ===== تنزيل جميع الرسائل (CSV) =====
@app.route('/admin/download_messages')
@login_required
def download_messages():
    messages = ContactMessage.query.order_by(ContactMessage.date_sent.desc()).all()
    si = StringIO()
    writer = csv.writer(si)
    writer.writerow(['الاسم', 'الجوال', 'البريد', 'الرسالة', 'التاريخ'])
    for msg in messages:
        writer.writerow([
            msg.full_name,
            msg.phone,
            msg.email,
            msg.message,
            msg.date_sent.strftime('%Y-%m-%d %H:%M') if msg.date_sent else ''
        ])
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=contact_messages.csv"
    output.headers["Content-type"] = "text/csv; charset=utf-8"
    return output

# ===== حذف رسالة =====
@app.route('/admin/delete_message/<int:msg_id>')
@login_required
def delete_message(msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    db.session.delete(msg)
    db.session.commit()
    flash('تم حذف الرسالة', 'success')
    return redirect(url_for('admin_dashboard'))

# ===== أرشفة رسالة =====
@app.route('/admin/archive_message/<int:msg_id>')
@login_required
def archive_message(msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    msg.archived = True
    db.session.commit()
    flash('تمت أرشفة الرسالة', 'info')
    return redirect(url_for('admin_dashboard'))

# ===== صفحة خطأ 404 =====
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# ===== أوامر التهيئة (CLI) =====
@app.cli.command("init-db")
def init_db():
    with app.app_context():
        db.create_all()
        print("Database initialized.")

@app.cli.command("create-admin")
def create_admin():
    with app.app_context():
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

if __name__ == '__main__':
    app.run()