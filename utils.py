from models import db, Visit
from sqlalchemy import func, cast, Date

def record_visit():
    visit = Visit()
    db.session.add(visit)
    db.session.commit()

def get_visits_count():
    return Visit.query.count()

def get_visits_per_day():
    data = db.session.query(
        cast(Visit.timestamp, Date), func.count(Visit.id)
    ).group_by(cast(Visit.timestamp, Date)).all()
    labels = [r[0].isoformat() if hasattr(r[0], "isoformat") else str(r[0]) for r in data]
    counts = [r[1] for r in data]
    return labels, counts