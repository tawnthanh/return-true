from app.models import db, Frequency, Languages, Profile


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

    anna = Profile(userId=1, firstName="Anna", lastName="Bullard", imageUrl="https://secure.gravatar.com/avatar/e4a93f356f91b40827d7c45367b8f369?secure=true&size=300",
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

    arjun = Profile(firstName="Arjun", lastName="Narain", imageUrl="https://ca.slack-edge.com/T03GU501J-U01A6PB6YV6-da16e7c3889a-512", bio="app academy student",
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

    mishe = Profile(firstName="Mishe", lastName="Yi", imageUrl="https://ca.slack-edge.com/T03GU501J-U018PAJPU6S-a0efd069413a-512",	bio="app academy student",
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

    thanh = Profile(firstName="Thanh", lastName="Nguyen", imageUrl="https://ca.slack-edge.com/T03GU501J-U017YNCPZGS-8c0b5b57c2eb-512",	bio="app academy student",
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

    joe = Profile(firstName="Joe", lastName="Alves", imageUrl="https://ca.slack-edge.com/T03GU501J-U019SPWMYQG-168bee67ba0f-512",
                  bio="PTA at App Academy Sept. cohort. Penny furrever", locationId=5, inPerson=True, level=3, frequencyId=1, mentorship=True, morning=True, personality=True)
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

    jesse = Profile(firstName="Jesse", lastName="Warren", imageUrl="https://ca.slack-edge.com/T03GU501J-UMWJ7RREK-9ed96c27ad42-512",
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

    alfredo = Profile(firstName="Alfredo", lastName=None, imageUrl=None, bio=None, locationId=None,
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

    granof = Profile(firstName="Granof", lastName=None, imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AGreen_Bay_Packers_logo.svg&psig=AOvVaw26qbBomLC-Ck_SFLZUGrsG&ust=1611853918452000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJDH8_PNvO4CFQAAAAAdAAAAABAI",
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

    juliet = Profile(firstName="Juliet", lastName=None, imageUrl=None, bio=None, locationId=None,
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

    tom = Profile(firstName="Tom", lastName=None, imageUrl=None, bio=None, locationId=None,
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
    db.session.commit()


def undo_languages():
    db.session.execute('TRUNCATE languages;')
    db.session.commit()


# def seed_profile():
    # anna = Profile(firstName="Anna", lastName="Bullard", imageUrl="https://secure.gravatar.com/avatar/e4a93f356f91b40827d7c45367b8f369?secure=true&size=300",	bio="app academy student",
    #                locationId=1, inPerson=True,     level=1, frequencyId=4, mentorship=False, morning=False, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=True)
    # arjun = Profile(firstName="Arjun", lastName="Narain", imageUrl="https://ca.slack-edge.com/T03GU501J-U01A6PB6YV6-da16e7c3889a-512", bio="app academy student",
    #                 locationId=2, inPerson=True, level=1, frequencyId=4,  mentorship=False, morning=False, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=False)
    # mishe = Profile(firstName="Mishe", lastName="Yi", imageUrl="https://ca.slack-edge.com/T03GU501J-U018PAJPU6S-a0efd069413a-512",	bio="app academy student",
    #                 locationId=3, inPerson=False, level=1, frequencyId=1,    mentorship=False, morning=False, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=False)
    # thanh = Profile(firstName="Thanh", lastName="Nguyen", imageUrl="https://ca.slack-edge.com/T03GU501J-U017YNCPZGS-8c0b5b57c2eb-512",	bio="app academy student",
    #                 locationId=4, inPerson=False, level=1, frequencyId=1,    mentorship=False, morning=False, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=True)
    # joe = Profile(firstName="Joe", lastName="Alves", imageUrl="https://ca.slack-edge.com/T03GU501J-U019SPWMYQG-168bee67ba0f-512", bio="PTA at App Academy Sept. cohort. Penny furrever",
    #               locationId=5, inPerson=True,   level=3, frequencyId=1, mentorship=True, morning=True, languagesId=[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],	personality=True)
    # jesse = Profile(firstName="Jesse", lastName="Warren", imageUrl="https://ca.slack-edge.com/T03GU501J-UMWJ7RREK-9ed96c27ad42-512", bio="Lead Instructional Assistant at App Academy. If you don't like Python you're  wrong",
    #                 locationId=6, inPerson=True, level=3, frequencyId=1, mentorship=True, morning=False, languagesId=[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],	personality=False)
    # alfredo = Profile(firstName="Alfredo", lastName=None, imageUrl=None, bio=None, locationId=None, inPerson=False, level=2,
    #                   frequencyId=2,   mentorship=True, morning=True, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=None)
    # granof = Profile(firstName="Granof", lastName=None, imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AGreen_Bay_Packers_logo.svg&psig=AOvVaw26qbBomLC-Ck_SFLZUGrsG&ust=1611853918452000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJDH8_PNvO4CFQAAAAAdAAAAABAI",
    #                  bio="Bucks && Packers", locationId=None, inPerson=False, level=2, frequencyId=3,  mentorship=True, morning=False, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=None)
    # juliet = Profile(firstName="Juliet", lastName=None, imageUrl=None, bio=None, locationId=None, inPerson=False, level=2,
    #                  frequencyId=1, mentorship=True, morning=True, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=None)
    # tom = Profile(firstName="Tom", lastName=None, imageUrl=None, bio=None, locationId=None, inPerson=True, level=2,
    #               frequencyId=2,  mentorship=True, morning=True, languagesId=[1, 2, 4, 11, 12, 13, 14, 15, 16],	personality=None)

    # db.session.add(anna)
    # db.session.add(arjun)
    # db.session.add(mishe)
    # db.session.add(thanh)
    # db.session.add(joe)
    # db.session.add(jesse)
    # db.session.add(alfredo)
    # db.session.add(granof)
    # db.session.add(juliet)
    # db.session.add(tom)
    # db.session.commit()


# def seed_profile():
#     profile_list = [
#         {
#             "id": 1,
#             "userId": 1,
#             "firstName": "Jonni",
#             "lastName": "Doe",
#             "imageUrl": "https://cdn-media-1.freecodecamp.org/images/1*zX_jJO9HQX5r3WQzQe6xNQ.png",
#             "bio": "full-time barista learning javascript in my spare time.",
#             "locationId": 1,
#             "inPerson": False,
#             "level": 1,
#             "frequencyId": 1,
#             "mentorship": False,
#             "morning": False,
#             "languagesId": 2,
#             "personality": True
#         }, {
#             "id": 1,
#             "userId": 1,
#             "firstName": "Jonni",
#             "lastName": "Doe",
#             "imageUrl": "https://cdn-media-1.freecodecamp.org/images/1*zX_jJO9HQX5r3WQzQe6xNQ.png",
#             "bio": "full-time barista learning javascript in my spare time.",
#             "locationId": 1,
#             "inPerson": False,
#             "level": 1,
#             "frequencyId": 1,
#             "mentorship": False,
#             "morning": False,
#             "languagesId": 2,
#             "personality": True
#         }, {
#             "id": 2,
#             "userId": 2,
#             "firstName": "Arlene",
#             "lastName": "Apple",
#             "imageUrl": "https://cdn-media-1.freecodecamp.org/images/1*zX_jJO9HQX5r3WQzQe6xNQ.png",
#             "bio": "tech nerd looking to collab on projects and find like-minds",
#             "locationId": 2,
#             "inPerson": True,
#             "level": 3,
#             "frequencyId": 4,
#             "mentorship": True,
#             "morning": False,
#             "languagesId": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
#             "personality": False
#         }, {
#             "id": 3,
#             "userId": 3,
#             "firstName": "Gabe",
#             "lastName": "Ruth",
#             "imageUrl": "https://cdn-media-1.freecodecamp.org/images/1*zX_jJO9HQX5r3WQzQe6xNQ.png",
#             "bio": "CS major here for help with projects",
#             "locationId": 3,
#             "inPerson": True,
#             "level": 3,
#             "frequencyId": 4,
#             "mentorship": True,
#             "morning": False,
#             "languagesId": [1, 2, 4, 11, 12, 13, 14, 15, 16],
#             "personality": False
#         },
#     ]
