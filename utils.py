from models import db, Visit
from datetime import datetime

def record_visit():
    visit = Visit()
    db.session.add(visit)
    db.session.commit()

def get_visits_count():
    return Visit.query.count()

def get_visits_per_day():
    from sqlalchemy import func
    data = db.session.query(
        func.strftime('%Y-%m-%d', Visit.timestamp), func.count(Visit.id)
    ).group_by(func.strftime('%Y-%m-%d', Visit.timestamp)).all()
    labels = [r[0] for r in data]
    counts = [r[1] for r in data]
    return labels, counts