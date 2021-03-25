from app.models import db, Frequency, Languages, Profile, Expertise, User


def seed_frequency():
    frequency_list = ["less than 10 hours per week", "10 to 20 hours per week",
                      "20 to 40 hours per week", "more than 40 hours per week"]
    for frequency in frequency_list:
        frequency_type = Frequency(type=frequency)
        db.session.add(frequency_type)

    db.session.commit()


def undo_frequency():
    db.session.execute('TRUNCATE frequencies CASCADE;')
    db.session.commit()

def seed_profile():
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

    expertises = ["Frontend", "Backend", "UX/UI Design", "AI", "Data Analysis"]
    frontend_expertise = Expertise(type=expertises[0])
    backend_expertise = Expertise(type=expertises[1])
    ux_ui_expertise = Expertise(type=expertises[2])
    ai_expertise = Expertise(type=expertises[3])
    data_analysis_expertise = Expertise(type=expertises[4])
    

    db.session.add(frontend_expertise)
    db.session.add(backend_expertise)
    db.session.add(ux_ui_expertise)
    db.session.add(ai_expertise)
    db.session.add(data_analysis_expertise)
    
    db.session.commit()
    
    users = [{
        "username": 'MotherofPythons',
        "firstName": 'Daenerys',
        "lastName": 'Snow',
        "imageUrl": 'https://s2.r29static.com/bin/entry/3a8/720x864,85/2170880/image.webp',
        "bio": "I'm new to the world of developers! I would like to find friends and mentors!",
        "locationId": 1,
        "inPerson": True,
        "level": 1,
        "frequencyId": 1,
        "mentorship": True,
        "morning": False,
        "personality": True,
        "languages": [html_lang],
        "expertises": [frontend_expertise]
        },
        {
        "username": 'Minuoki',
        "firstName": 'Anna',
        "lastName": 'Bullard',
        "imageUrl": 'https://avatars.githubusercontent.com/u/70282021?s=460&u=203359870d6d3c5753f5bd4d42fd8d4a88efae57&v=4',
        "bio": 'App Academy Grad',
        "locationId": 1,
        "inPerson": True,
        "level": 1,
        "frequencyId": 4,
        "mentorship": False,
        "morning": False,
        "personality": True,
        "languages": [python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise]
        },
        {
        "username": 'anarain248',
        "firstName": 'Arjun',
        "lastName": 'Narain',
        "imageUrl": 'https://avatars.githubusercontent.com/u/70171739?s=460&u=862128cc2a0e9872fc7325b460553f83531c496d&v=4',
        "bio": 'App Academy Grad',
        "locationId": 2,
        "inPerson": True,
        "level": 1,
        "frequencyId": 4,
        "mentorship": False,
        "morning": False,
        "personality": False,
        "languages": [python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise]
        },
        {
        "username": 'King-Kode',
        "firstName": 'Mishe',
        "lastName": 'Yi',
        "imageUrl": 'https://avatars.githubusercontent.com/u/68613271?s=460&u=0046967abd47704ba4d9ca042e23a56ece6d07b1&v=4',
        "bio": 'App Academy Grad',
        "locationId": 3,
        "inPerson": False,
        "level": 1,
        "frequencyId": 1,
        "mentorship": False,
        "morning": False,
        "personality": False,
        "languages": [python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise]
        },
        {
        "username": 'TawnThanh',
        "firstName": 'Thanh',
        "lastName": 'Nguyen',
        "imageUrl": 'https://avatars.githubusercontent.com/u/68927247?s=460&u=4f907d4fc48e1274271950f46a3e1879242bb6e8&v=4',
        "bio": 'App Academy Instructor',
        "locationId": 4,
        "inPerson": False,
        "level": 1,
        "frequencyId": 1,
        "mentorship": False,
        "morning": False,
        "personality": True,
        "languages": [python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise]
        },
        {
        "username": 'BubbleBop',
        "firstName": 'Joe',
        "lastName": 'Alves',
        "imageUrl": 'https://avatars.githubusercontent.com/u/22030849?s=460&u=571cadbddfe7507dd7e2e8d3a597291b4f4f7c08&v=4',
        "bio": 'PTM at App Academy Sept. cohort. Penny furrever',
        "locationId": 5,
        "inPerson": True,
        "level": 3,
        "frequencyId": 1,
        "mentorship": True,
        "morning": True,
        "personality": True,
        "languages": [c_plus_plus_lang, ruby_lang, java_lang, php_lang, swift_lang, go_lang, c_sharp_lang, rust_lang, python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise, ai_expertise, data_analysis_expertise]
        },
        {
        "username": 'notThatJesse',
        "firstName": 'Jesse',
        "lastName": 'Warren',
        "imageUrl": 'https://avatars.githubusercontent.com/u/56173793?s=460&u=4190799bd53f56e91a64c66772d87544e7fa75ab&v=4',
        "bio": "Lead Instructional Assistant at App Academy. If you don't like Python you're wrong",
        "locationId": 6,
        "inPerson": True,
        "level": 3,
        "frequencyId": 1,
        "mentorship": True,
        "morning": False,
        "personality": False,
        "languages": [c_plus_plus_lang, ruby_lang, java_lang, php_lang, swift_lang, go_lang, c_sharp_lang, rust_lang, python_lang, flask_lang, postgres_psql_lang, sql_alchemy_lang],
        "expertises": [backend_expertise, ai_expertise, data_analysis_expertise]
        },
        {
        "username": 'sauceKnight',
        "firstName": 'Alfredo',
        "lastName": 'Capuletti',
        "imageUrl": None,
        "bio": None,
        "locationId": None,
        "inPerson": False,
        "level": 2,
        "frequencyId": 2,
        "mentorship": True,
        "morning": True,
        "personality": None,
        "languages": [c_plus_plus_lang, ruby_lang, java_lang, php_lang, swift_lang, go_lang, c_sharp_lang, rust_lang, python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise, ai_expertise, data_analysis_expertise]
        },
        {
        "username": 'GoPackers',
        "firstName": 'Jeff',
        "lastName": 'Granof',
        "imageUrl": 'https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Bay_Packers_logo.svg',
        "bio": 'Bucks && Packers',
        "locationId": None,
        "inPerson": False,
        "level": 2,
        "frequencyId": 3,
        "mentorship": True,
        "morning": False,
        "personality": None,
        "languages": [ruby_lang, python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [frontend_expertise, backend_expertise]
        },
        {
        "username": 'Romeo',
        "firstName": 'Juliet',
        "lastName": 'Montague',
        "imageUrl": None,
        "bio": None,
        "locationId": None,
        "inPerson": False,
        "level": 2,
        "frequencyId": 1,
        "mentorship": True,
        "morning": True,
        "personality": None,
        "languages": [ruby_lang, python_lang, javascript_lang, css_lang, react_redux_lang, flask_lang, sequelize_lang, postgres_psql_lang, sql_alchemy_lang, express_lang, html_lang],
        "expertises": [ux_ui_expertise, data_analysis_expertise]
        },
        {
        "username": 'Cat',
        "firstName": 'Tom',
        "lastName": 'Kruze',
        "imageUrl": None,
        "bio": None,
        "locationId": None,
        "inPerson": True,
        "level": 2,
        "frequencyId": 2,
        "mentorship": True,
        "morning": True,
        "personality": None,
        "languages": [ruby_lang, python_lang, postgres_psql_lang, sql_alchemy_lang],
        "expertises": [ai_expertise, data_analysis_expertise]
        }
    ]
    for user in users:
        newUser = User(username=user["username"], email=user["firstName"]+"@"+user["lastName"]+".test",
                          password=user["username"]+"password")
        db.session.add(newUser)
        db.session.commit()
        
        newProfile = Profile(
            firstName=user["firstName"],
            lastName=user["lastName"],
            imageUrl=user["imageUrl"],
            bio=user["bio"],
            locationId=user["locationId"],
            inPerson=user["inPerson"],
            level=user["level"],
            frequencyId=user["frequencyId"],
            mentorship=user["mentorship"],
            morning=user["morning"],
            personality=user["personality"]
            )

        newProfile.user = newUser

        for lang in user["languages"]:
            newProfile.languages.append(lang)

        for expert in user["expertises"]:
            newProfile.expertises.append(expert)

        db.session.add(newProfile)

        db.session.commit()

    db.session.commit()


def undo_profile():
    db.session.execute('TRUNCATE profiles CASCADE;')
    db.session.execute('TRUNCATE languages CASCADE;')
    db.session.execute('TRUNCATE expertise CASCADE;')
    db.session.commit()
