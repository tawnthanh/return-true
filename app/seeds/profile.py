from app.models import db, Frequency, Language

def seed_frequency():
    frequency_list = ["daily", "weekly", "monthly", "yearly"]
    for frequency in frequency_list:
        frequency_type = Frequency(type=frequency)
        db.session.add(frequency_type)
        db.session.commit()

def undo_frequency():
    db.session.execute('TRUNCATE frequencies;')
    db.session.commit()


def seed_languages():
    languages = [
      "Python",
      "Javascript",
      "C++",
      "Ruby",
      "Java",
      "PHP",
      "Swift",
      "Go",
      "C#",
      "Rust",
      "CSS",
      "React/Redux",
      "Flask",
      "Sequelize",
      "Postgres/Psql",
      "SQL Alchemy",
      "Express.js",
      "HTML",
    ]
    for language in languages:
        language_type = Language(type=language)
        db.session.add(language_type)
        db.session.commit()


def undo_languages():
    db.session.execute('TRUNCATE languages;')
    db.session.commit()
