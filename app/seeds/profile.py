from app.models import db, Frequency, Languages, Profile, Expertise


def seed_frequency():
    frequency_list = ["less than 10 hour per week", "10 to 20 hours per week",
                      "20 to 40 hours per week", "more that 40 hours per week"]
    for frequency in frequency_list:
        frequency_type = Frequency(type=frequency)
        db.session.add(frequency_type)

    db.session.commit()


def undo_frequency():
    db.session.execute('TRUNCATE frequencies;')
    db.session.commit()


def seed_profile():

    expertises = ["Frontend", "Backend", "UX/UI Design", "AI", "Data Analysis"]
    frontend_expertise = Expertise(type="Frontend")
    backend_expertise = Expertise(type=expertises[1])
    ux_ui_expertise = Expertise(type=expertises[2])
    ai_expertise = Expertise(type=expertises[3])
    data_analysis_expertise = Expertise(type=expertises[4])
    db.session.add(frontend_expertise)
    db.session.add(backend_expertise)
    db.session.add(ux_ui_expertise)
    db.session.add(ai_expertise)
    db.session.add(data_analysis_expertise)

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
        "Dothraki",
        "Valyrian"
    ]

    python_lang = Languages(type=languages[0])
    javascript_lang = Languages(type=languages[1])
    c_plus_plus_lang = Languages(type=languages[2])
    ruby_lang = Languages(type=languages[3])
    java_lang = Languages(type=languages[4])
    php_lang = Languages(type=languages[5])
    swift_lang = Languages(type=languages[6])
    go_lang = Languages(type=languages[7])
    c_sharp_lang = Languages(type=languages[8])
    rust_lang = Languages(type=languages[9])
    css_lang = Languages(type=languages[10])
    react_redux_lang = Languages(type=languages[11])
    flask_lang = Languages(type=languages[12])
    sequelize_lang = Languages(type=languages[13])
    postgres_psql_lang = Languages(type=languages[14])
    sql_alchemy_lang = Languages(type=languages[15])
    express_lang = Languages(type=languages[16])
    html_lang = Languages(type=languages[17])
    dothraki_lang = Languages(type=languages[18])
    valyrian_lang = Languages(type=languages[19])

    db.session.add(python_lang)
    db.session.add(javascript_lang)
    db.session.add(c_plus_plus_lang)
    db.session.add(ruby_lang)
    db.session.add(java_lang)
    db.session.add(php_lang)
    db.session.add(swift_lang)
    db.session.add(go_lang)
    db.session.add(c_sharp_lang)
    db.session.add(rust_lang)
    db.session.add(css_lang)
    db.session.add(react_redux_lang)
    db.session.add(flask_lang)
    db.session.add(sequelize_lang)
    db.session.add(postgres_psql_lang)
    db.session.add(sql_alchemy_lang)
    db.session.add(express_lang)
    db.session.add(html_lang)
    db.session.add(dothraki_lang)
    db.session.add(valyrian_lang)

    daenerys = Profile(userId=1, firstName="Daenerys", lastName="Targaryen", imageUrl="https://s2.r29static.com/bin/entry/3a8/720x864,85/2170880/image.webp",
                   bio="Daenerys Stormborn of House Targaryen, the First of Her Name, Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains", 
                   locationId=1, inPerson=True, level=1, frequencyId=1, mentorship=True, morning=False, personality=True)
    db.session.add(daenerys)
    daenerys.languages.append(dothraki_lang)
    daenerys.languages.append(valyrian_lang)

    anna = Profile(userId=2, firstName="Anna", lastName="Bullard", imageUrl="https://secure.gravatar.com/avatar/e4a93f356f91b40827d7c45367b8f369?secure=true&size=300",
                   bio="app academy student", locationId=1, inPerson=True, level=1, frequencyId=4, mentorship=False, morning=False, personality=True)
    db.session.add(anna)
    anna.languages.append(python_lang)
    anna.languages.append(javascript_lang)
    anna.languages.append(css_lang)
    anna.languages.append(react_redux_lang)
    anna.languages.append(flask_lang)
    anna.languages.append(sequelize_lang)
    anna.languages.append(postgres_psql_lang)
    anna.languages.append(sql_alchemy_lang)
    anna.languages.append(express_lang)
    anna.languages.append(html_lang)
    anna.expertises.append(frontend_expertise)
    anna.expertises.append(backend_expertise)
    anna.expertises.append(ux_ui_expertise)
    anna.expertises.append(ai_expertise)
    anna.expertises.append(data_analysis_expertise)

    arjun = Profile(userId=3, firstName="Arjun", lastName="Narain", imageUrl="https://ca.slack-edge.com/T03GU501J-U01A6PB6YV6-da16e7c3889a-512", bio="app academy student",
                    locationId=2, inPerson=True, level=1, frequencyId=4,  mentorship=False, morning=False,	personality=False)
    db.session.add(arjun)
    arjun.languages.append(python_lang)
    arjun.languages.append(javascript_lang)
    arjun.languages.append(css_lang)
    arjun.languages.append(react_redux_lang)
    arjun.languages.append(flask_lang)
    arjun.languages.append(sequelize_lang)
    arjun.languages.append(postgres_psql_lang)
    arjun.languages.append(sql_alchemy_lang)
    arjun.languages.append(express_lang)
    arjun.languages.append(html_lang)
    arjun.expertises.append(frontend_expertise)
    arjun.expertises.append(backend_expertise)
    arjun.expertises.append(ux_ui_expertise)
    arjun.expertises.append(ai_expertise)
    arjun.expertises.append(data_analysis_expertise)

    mishe = Profile(userId=4, firstName="Mishe", lastName="Yi", imageUrl="https://ca.slack-edge.com/T03GU501J-U018PAJPU6S-a0efd069413a-512",	bio="app academy student",
                    locationId=3, inPerson=False, level=1, frequencyId=1, mentorship=False, morning=False,	personality=False)
    db.session.add(mishe)
    mishe.languages.append(python_lang)
    mishe.languages.append(javascript_lang)
    mishe.languages.append(css_lang)
    mishe.languages.append(react_redux_lang)
    mishe.languages.append(flask_lang)
    mishe.languages.append(sequelize_lang)
    mishe.languages.append(postgres_psql_lang)
    mishe.languages.append(sql_alchemy_lang)
    mishe.languages.append(express_lang)
    mishe.languages.append(html_lang)
    mishe.expertises.append(frontend_expertise)
    mishe.expertises.append(backend_expertise)
    mishe.expertises.append(ux_ui_expertise)
    mishe.expertises.append(ai_expertise)
    mishe.expertises.append(data_analysis_expertise)

    thanh = Profile(userId=5, firstName="Thanh", lastName="Nguyen", imageUrl="https://ca.slack-edge.com/T03GU501J-U017YNCPZGS-8c0b5b57c2eb-512",	bio="app academy student",
                    locationId=4, inPerson=False, level=1, frequencyId=1, mentorship=False, morning=False,	personality=True)
    db.session.add(thanh)
    thanh.languages.append(python_lang)
    thanh.languages.append(javascript_lang)
    thanh.languages.append(css_lang)
    thanh.languages.append(react_redux_lang)
    thanh.languages.append(flask_lang)
    thanh.languages.append(sequelize_lang)
    thanh.languages.append(postgres_psql_lang)
    thanh.languages.append(sql_alchemy_lang)
    thanh.languages.append(express_lang)
    thanh.languages.append(html_lang)
    thanh.expertises.append(frontend_expertise)
    thanh.expertises.append(backend_expertise)
    thanh.expertises.append(ux_ui_expertise)
    thanh.expertises.append(ai_expertise)
    thanh.expertises.append(data_analysis_expertise)

    joe = Profile(userId=6, firstName="Joe", lastName="Alves", imageUrl="https://ca.slack-edge.com/T03GU501J-U019SPWMYQG-168bee67ba0f-512",
                  bio="PTM at App Academy Sept. cohort. Penny furrever", locationId=5, inPerson=True, level=3, frequencyId=1, mentorship=True, morning=True, personality=True)
    db.session.add(joe)
    joe.languages.append(c_plus_plus_lang)
    joe.languages.append(ruby_lang)
    joe.languages.append(java_lang)
    joe.languages.append(php_lang)
    joe.languages.append(swift_lang)
    joe.languages.append(go_lang)
    joe.languages.append(c_sharp_lang)
    joe.languages.append(rust_lang)
    joe.languages.append(python_lang)
    joe.languages.append(javascript_lang)
    joe.languages.append(css_lang)
    joe.languages.append(react_redux_lang)
    joe.languages.append(flask_lang)
    joe.languages.append(sequelize_lang)
    joe.languages.append(postgres_psql_lang)
    joe.languages.append(sql_alchemy_lang)
    joe.languages.append(express_lang)
    joe.languages.append(html_lang)
    joe.expertises.append(frontend_expertise)
    joe.expertises.append(backend_expertise)
    joe.expertises.append(ux_ui_expertise)
    joe.expertises.append(ai_expertise)
    joe.expertises.append(data_analysis_expertise)

    jesse = Profile(userId=7, firstName="Jesse", lastName="Warren", imageUrl="https://ca.slack-edge.com/T03GU501J-UMWJ7RREK-9ed96c27ad42-512",
                    bio="Lead Instructional Assistant at App Academy. If you don't like Python you're  wrong", locationId=6, inPerson=True, level=3, frequencyId=1, mentorship=True, morning=False, personality=False)
    db.session.add(jesse)
    jesse.languages.append(c_plus_plus_lang)
    jesse.languages.append(ruby_lang)
    jesse.languages.append(java_lang)
    jesse.languages.append(php_lang)
    jesse.languages.append(swift_lang)
    jesse.languages.append(go_lang)
    jesse.languages.append(c_sharp_lang)
    jesse.languages.append(rust_lang)
    jesse.languages.append(python_lang)
    jesse.languages.append(javascript_lang)
    jesse.languages.append(css_lang)
    jesse.languages.append(react_redux_lang)
    jesse.languages.append(flask_lang)
    jesse.languages.append(sequelize_lang)
    jesse.languages.append(postgres_psql_lang)
    jesse.languages.append(sql_alchemy_lang)
    jesse.languages.append(express_lang)
    jesse.languages.append(html_lang)
    jesse.expertises.append(frontend_expertise)
    jesse.expertises.append(backend_expertise)
    jesse.expertises.append(ux_ui_expertise)
    jesse.expertises.append(ai_expertise)
    jesse.expertises.append(data_analysis_expertise)

    alfredo = Profile(userId=8, firstName="Alfredo", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                      inPerson=False, level=2, frequencyId=2,   mentorship=True, morning=True, personality=None)
    db.session.add(alfredo)
    alfredo.languages.append(c_plus_plus_lang)
    alfredo.languages.append(ruby_lang)
    alfredo.languages.append(java_lang)
    alfredo.languages.append(php_lang)
    alfredo.languages.append(swift_lang)
    alfredo.languages.append(go_lang)
    alfredo.languages.append(c_sharp_lang)
    alfredo.languages.append(rust_lang)
    alfredo.languages.append(python_lang)
    alfredo.languages.append(javascript_lang)
    alfredo.languages.append(css_lang)
    alfredo.languages.append(react_redux_lang)
    alfredo.languages.append(flask_lang)
    alfredo.languages.append(sequelize_lang)
    alfredo.languages.append(postgres_psql_lang)
    alfredo.languages.append(sql_alchemy_lang)
    alfredo.languages.append(express_lang)
    alfredo.languages.append(html_lang)
    alfredo.expertises.append(frontend_expertise)
    alfredo.expertises.append(backend_expertise)
    alfredo.expertises.append(ux_ui_expertise)
    alfredo.expertises.append(ai_expertise)
    alfredo.expertises.append(data_analysis_expertise)

    granof = Profile(userId=9, firstName="Granof", lastName="Johnson", imageUrl="https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Bay_Packers_logo.svg",
                     bio="Bucks && Packers", locationId=None, inPerson=False, level=2, frequencyId=3,  mentorship=True, morning=False, personality=None)
    db.session.add(granof)
    granof.languages.append(ruby_lang)
    granof.languages.append(python_lang)
    granof.languages.append(javascript_lang)
    granof.languages.append(css_lang)
    granof.languages.append(react_redux_lang)
    granof.languages.append(flask_lang)
    granof.languages.append(sequelize_lang)
    granof.languages.append(postgres_psql_lang)
    granof.languages.append(sql_alchemy_lang)
    granof.languages.append(express_lang)
    granof.languages.append(html_lang)
    granof.expertises.append(frontend_expertise)
    granof.expertises.append(backend_expertise)
    granof.expertises.append(ux_ui_expertise)
    granof.expertises.append(ai_expertise)
    granof.expertises.append(data_analysis_expertise)

    juliet = Profile(userId=10, firstName="Juliet", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                     inPerson=False, level=2, frequencyId=1, mentorship=True, morning=True, personality=None)
    db.session.add(juliet)
    juliet.languages.append(ruby_lang)
    juliet.languages.append(python_lang)
    juliet.languages.append(javascript_lang)
    juliet.languages.append(css_lang)
    juliet.languages.append(react_redux_lang)
    juliet.languages.append(flask_lang)
    juliet.languages.append(sequelize_lang)
    juliet.languages.append(postgres_psql_lang)
    juliet.languages.append(sql_alchemy_lang)
    juliet.languages.append(express_lang)
    juliet.languages.append(html_lang)
    juliet.expertises.append(frontend_expertise)
    juliet.expertises.append(backend_expertise)
    juliet.expertises.append(ux_ui_expertise)
    juliet.expertises.append(ai_expertise)
    juliet.expertises.append(data_analysis_expertise)

    tom = Profile(userId=11, firstName="Tom", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                  inPerson=True, level=2, frequencyId=2,  mentorship=True, morning=True, personality=None)
    db.session.add(tom)
    tom.languages.append(ruby_lang)
    tom.languages.append(python_lang)
    tom.languages.append(javascript_lang)
    tom.languages.append(css_lang)
    tom.languages.append(react_redux_lang)
    tom.languages.append(flask_lang)
    tom.languages.append(sequelize_lang)
    tom.languages.append(postgres_psql_lang)
    tom.languages.append(sql_alchemy_lang)
    tom.languages.append(express_lang)
    tom.languages.append(html_lang)
    tom.expertises.append(frontend_expertise)
    tom.expertises.append(backend_expertise)
    tom.expertises.append(ux_ui_expertise)
    tom.expertises.append(ai_expertise)
    tom.expertises.append(data_analysis_expertise)

    prof1 = Profile(userId=12, firstName="Dobby", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                    inPerson=False, level=1, frequencyId=1,  mentorship=False, morning=True, personality=None)
    db.session.add(prof1)
    prof1.languages.append(javascript_lang)
    prof1.expertises.append(data_analysis_expertise)

    prof2 = Profile(userId=13, firstName="Ruth", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                    inPerson=True, level=1, frequencyId=4,  mentorship=True, morning=False, personality=False)
    db.session.add(prof2)
    prof2.languages.append(python_lang)
    prof2.languages.append(html_lang)
    prof2.expertises.append(ai_expertise)

    prof3 = Profile(userId=14, firstName="Arlene", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                    inPerson=True, level=1, frequencyId=4,  mentorship=True, morning=False, personality=False)
    db.session.add(prof3)
    prof3.languages.append(html_lang)
    prof3.languages.append(css_lang)
    prof3.expertises.append(frontend_expertise)

    prof4 = Profile(userId=15, firstName="Billie", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                    inPerson=True, level=2, frequencyId=2,  mentorship=True, morning=True, personality=None)
    db.session.add(prof4)
    prof4.languages.append(ruby_lang)
    prof4.languages.append(python_lang)
    prof4.languages.append(css_lang)

    prof5 = Profile(userId=16, firstName="Basil", lastName="Johnson", imageUrl=None, bio=None, locationId=None,
                    inPerson=True, level=2, frequencyId=2,  mentorship=True, morning=True, personality=None)
    db.session.add(prof5)
    prof5.languages.append(python_lang)
    prof5.languages.append(javascript_lang)
    prof5.languages.append(css_lang)
    prof5.languages.append(react_redux_lang)
    prof5.languages.append(postgres_psql_lang)
    prof5.languages.append(sql_alchemy_lang)
    prof5.expertises.append(backend_expertise)
    db.session.commit()


def undo_profile():
    db.session.execute('TRUNCATE profiles;')
    db.session.commit()
