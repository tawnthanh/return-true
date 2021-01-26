from app.models import db, Frequency, Languages

def seed_frequency():
    frequency_list = ["less than 10 hour per week", "10 to 20 hours per week", "20 to 40 hours per week", "more that 40 hours per week"]
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
        language_type = Languages(type=language)
        db.session.add(language_type)

    db.session.commit()


def undo_languages():
    db.session.execute('TRUNCATE languages;')
    db.session.commit()
