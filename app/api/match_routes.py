from flask import Blueprint, jsonify, session, request
from app.models import db, Question, Request, Answer, Profile
from flask_login import current_user

match_routes = Blueprint('match', __name__)

def compare_request_bothway(user1, user2):
    total_weight = 0
    total_match = 0
    questions_query = Question.query.order_by(Question.id.asc()).all()
    questions = [q.to_dict() for q in questions_query]
    # 1 role
    role_question = questions[0]

    is_mentor1 = user1["mentorship"]
    need_mentor1 = user1["needMentor"]
    need_roles1 = set(user1["q1_role"]) if user1["q1_role"] else set()
    need_roles1.discard(0)
    is_mentor2 = user2["mentorship"]
    need_mentor2 = user2["needMentor"]
    need_roles2 = set(user2["q1_role"]) if user2["q1_role"] else set()
    need_roles2.discard(0)

    if (len(need_roles1 | need_roles2) or need_mentor1 or need_mentor2):
        total_weight += role_question["weight"]
        if ((is_mentor1 == need_mentor2 == True) or (is_mentor2 == need_mentor1 == True) or len(need_roles1 & need_roles2)>0):
            total_match += role_question["weight"]
    
    # end of role

    # 2 languages
    lang_question = questions[1]

    lang_owned1 = set(user1["languages"]) if user1["languages"] else set ()
    lang_need1 = set(user1["q2_languages"]) if user1["q2_languages"] else set()
    lang_owned2 = set(user2["languages"]) if user2["languages"] else set ()
    lang_need2 = set(user2["q2_languages"]) if user2["q2_languages"] else set()

    total_lang_needed = len(lang_need1) + len(lang_need2)
    fufilled_for1 = lang_need1 & lang_owned2
    fufilled_for2 = lang_need2 & lang_owned1

    if total_lang_needed > 0:
        total_weight += lang_question["weight"]
        total_match += ((len(fufilled_for1) + len(fufilled_for2)) / total_lang_needed * lang_question["weight"])

    # end of languages

    # 3 level
    level_question = questions[2]

    lvl1 = user1["level"]
    lvl_need1 = int(user1["q3_level"]) if user1["q3_level"] else None
    lvl2 = user2["level"]
    lvl_need2 = int(user2["q3_level"]) if user2["q3_level"] else None

    total_lvl_needed = (1 if lvl_need1 else 0) + (1 if lvl_need2 else 0)

    if total_lvl_needed > 0:
        total_weight += level_question["weight"]
        lvl_matched = (1 if (lvl_need1 and int(lvl_need1)<=lvl2) else 0) + (1 if (lvl_need2 and int(lvl_need2)<=lvl1) else 0)
        total_match += lvl_matched / total_lvl_needed * level_question["weight"]

    # end of level

    # 4 expertise
    expertise_question = questions[3]

    expertise_owned1 = set(user1["expertise"]) if user1["expertise"] else set ()
    expertise_need1 = set(user1["q4_expertise"]) if user1["q4_expertise"] else set()
    expertise_owned2 = set(user2["expertise"]) if user2["expertise"] else set ()
    expertise_need2 = set(user2["q4_expertise"]) if user2["q4_expertise"] else set()

    total_expertise_needed = len(expertise_need1) + len(expertise_need2)
    fufilled_expertise_for1 = expertise_need1 & expertise_owned2
    fufilled_expertise_for2 = expertise_need2 & expertise_owned1

    if total_expertise_needed > 0:
        total_weight += expertise_question["weight"]
        total_match += ((len(fufilled_expertise_for1) + len(fufilled_expertise_for2)) / total_expertise_needed * expertise_question["weight"])
    # end of expertise

    # 5 personality
    personality_question = questions[4]

    personality1 = user1["personality"]
    personality_need1 = user1["q5_personality"]
    personality2 = user2["personality"]
    personality_need2 = user2["q5_personality"]

    total_personality_needed = (1 if personality_need1 != None else 0) + (1 if personality_need2 != None else 0)

    if total_personality_needed > 0:
        total_weight += personality_question["weight"]
        personality_matched = (1 if (personality_need1 != None and personality_need1==personality2) else 0) + (1 if (personality_need2 != None and personality_need2==personality1) else 0)
        total_match += personality_matched / total_personality_needed * personality_question["weight"]
    # end of personality

    # 6 state
    state_question = questions[5]

    state1 = user1["stateId"]
    state_filter1 = user1["q6_filterByState"]
    state2 = user2["stateId"]
    state_filter2 = user2["q6_filterByState"]

    if (state_filter1 or state_filter2):
        total_weight += state_question["weight"]
        if state1 == state2:
            total_match += state_question["weight"]

    # end of state

    # 7 city
    city_question = questions[6]

    city1 = user1["locationId"]
    city_filter1 = user1["q7_filterByCity"]
    city2 = user2["locationId"]
    city_filter2 = user2["q7_filterByCity"]

    if (city_filter1 or city_filter2):
        total_weight += city_question["weight"]
        if city1 == city2:
            total_match += city_question["weight"]
    # end of city

    # 8 morning
    morning_question = questions[7]

    morning1 = user1["morning"]
    morning_need1 = user1["q8_morning"]
    morning2 = user2["morning"]
    morning_need2 = user2["q8_morning"]

    total_morning_needed = (1 if morning_need1 != None else 0) + (1 if morning_need2 != None else 0)

    if total_morning_needed > 0:
        total_weight += morning_question["weight"]
        morning_matched = (1 if (morning_need1 != None and morning_need1==morning2) else 0) + (1 if (morning_need2 != None and morning_need2==morning1) else 0)
        total_match += morning_matched / total_morning_needed * morning_question["weight"]
    # end of morning

    # 9 frequency
    frequency_question = questions[8]

    frequency1 = user1["frequencyId"]
    frequency_need1 = int(user1["q9_frequency"]) if user1["q9_frequency"] else None
    frequency2 = user2["frequencyId"]
    frequency_need2 = int(user2["q9_frequency"]) if user2["q9_frequency"] else None

    total_frequency_needed = (1 if frequency_need1 else 0) + (1 if frequency_need2 else 0)

    if total_frequency_needed > 0:
        total_weight += frequency_question["weight"]
        frequency_matched = (1 if (frequency_need1 and frequency_need1<=frequency2) else 0) + (1 if (frequency_need2 and frequency_need2<=frequency1) else 0)
        total_match += frequency_matched / total_frequency_needed * frequency_question["weight"]

    # end of frequency
    # print(user2["firstName"],": total_weight=",total_weight,", total_match=", total_match)
    total_weight = total_weight if total_weight>0 else 1
    result = total_match / total_weight

    return result

def compare_request_oneway(user1, user2):
    total_weight = 0
    total_match = 0
    questions_query = Question.query.order_by(Question.id.asc()).all()
    questions = [q.to_dict() for q in questions_query]
    # 1 role
    role_question = questions[0]

    need_mentor1 = user1["needMentor"]
    need_roles1 = set(user1["q1_role"]) if user1["q1_role"] else set()
    need_roles1.discard(0)
    is_mentor2 = user2["mentorship"]
    need_roles2 = set(user2["q1_role"]) if user2["q1_role"] else set()
    need_roles2.discard(0)

    if (need_mentor1 or len(need_roles1)):
        total_weight += role_question["weight"]
        if ((is_mentor2 == need_mentor1 == True) or len(need_roles1 & need_roles2) > 0):
            total_match += role_question["weight"]
    
    # end of role

    # 2 languages
    lang_question = questions[1]

    lang_need1 = set(user1["q2_languages"]) if user1["q2_languages"] else set()
    lang_owned2 = set(user2["languages"]) if user2["languages"] else set ()

    total_lang_needed = len(lang_need1)
    fufilled_for1 = lang_need1 & lang_owned2

    if total_lang_needed > 0:
        total_weight += lang_question["weight"]
        total_match += len(fufilled_for1) / total_lang_needed * lang_question["weight"]

    # end of languages

    # 3 level
    level_question = questions[2]

    lvl_need1 = int(user1["q3_level"]) if user1["q3_level"] else None
    lvl2 = user2["level"]

    if lvl_need1:
        total_weight += level_question["weight"]
        if int(lvl_need1) <= lvl2:
            total_match += level_question["weight"]

    # end of level

    # 4 expertise
    expertise_question = questions[3]

    expertise_need1 = set(user1["q4_expertise"]) if user1["q4_expertise"] else set()
    expertise_owned2 = set(user2["expertise"]) if user2["expertise"] else set ()
    
    total_expertise_needed = len(expertise_need1)
    fufilled_expertise_for1 = expertise_need1 & expertise_owned2

    if total_expertise_needed > 0:
        total_weight += expertise_question["weight"]
        total_match += len(fufilled_expertise_for1) / total_expertise_needed * expertise_question["weight"]
    # end of expertise

    # 5 personality
    personality_question = questions[4]

    personality_need1 = user1["q5_personality"]
    personality2 = user2["personality"]

    if personality_need1 != None:
        total_weight += personality_question["weight"]
        if personality_need1 == personality2:
            total_match += personality_question["weight"]
    # end of personality

    # 6 state
    state_question = questions[5]

    state1 = user1["stateId"]
    state_filter1 = user1["q6_filterByState"]
    state2 = user2["stateId"]

    if state_filter1:
        total_weight += state_question["weight"]
        if state1 == state2:
            total_match += state_question["weight"]

    # end of state

    # 7 city
    city_question = questions[6]

    city1 = user1["locationId"]
    city_filter1 = user1["q7_filterByCity"]
    city2 = user2["locationId"]

    if city_filter1:
        total_weight += city_question["weight"]
        if city1 == city2:
            total_match += city_question["weight"]
    # end of city

    # 8 morning
    morning_question = questions[7]

    morning_need1 = user1["q8_morning"]
    morning2 = user2["morning"]

    if morning_need1 != None:
        total_weight += morning_question["weight"]
        if morning_need1==morning2:
            total_match += morning_question["weight"]
    # end of morning

    # 9 frequency
    frequency_question = questions[8]

    frequency_need1 = int(user1["q9_frequency"]) if user1["q9_frequency"] else None
    frequency2 = user2["frequencyId"]

    if frequency_need1:
        total_weight += frequency_question["weight"]
        if frequency_need1 <= frequency2:
            total_match += frequency_question["weight"]

    # end of frequency
    print(user2["firstName"],": total_weight=",total_weight,", total_match=", total_match)
    total_weight = total_weight if total_weight>0 else 1
    result = total_match / total_weight

    return result

def detailed_user_request (id = 0):
    sql_req = '''SELECT 
    p."userId", 
    p."firstName", 
    p."lastName", 
    p."locationId", 
    l."stateId",
    p."inPerson",
    p."level",
    p."personality",
    p."frequencyId",
    p."mentorship",
    p."morning",
    r."id",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 1) as "q1",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 2) as "q2",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 3) as "q3",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 4) as "q4",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 5) as "q5",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 6) as "q6",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 7) as "q7",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 8) as "q8",
    (SELECT answer FROM answers AS a WHERE a."requestId" = r."id" AND a."questionId" = 9) as "q9",
    (SELECT array_agg("languagesId") FROM "userLanguages" AS l WHERE l."profileId" = p."id" GROUP BY l."profileId") as "languages",
    (SELECT array_agg("expertiseId") FROM "userExpertise" AS e WHERE e."profileId" = p."id" GROUP BY e."profileId") as "expertise",
    u."username",
    p."imageUrl"
    FROM profiles AS p 
    INNER JOIN users AS u ON p."userId"=u."id"
    LEFT JOIN requests AS r ON p."userId"=r."userId"
    INNER JOIN locations AS l ON p."locationId"=l."id"
    '''

    if id != 0:
        sql_req += (' WHERE r."id"='+str(id))

    connection = db.session.connection()
    query_result = connection.execute(sql_req)

    list_of_users_requests = []

    for item in query_result:
        needMentor = True if (item[12] and ("1" in item[12])) else False
        user_request = {
            "userId": item[0],
            "firstName": item[1],
            "lastName": item[2],
            "locationId": item[3],
            "stateId": item[4],
            "inPerson": item[5],
            "level": item[6],
            "personality": item[7],
            "frequencyId": item[8],
            "mentorship": item[9],
            "morning": item[10],
            "requestId": item[11],
            "needMentor": needMentor,
            "q1_role": [int(i) for i in item[12].split(",")] if item[12] else None,
            "q2_languages": [int(i) for i in item[13].split(",")] if item[13] else None,
            "q3_level": item[14],
            "q4_expertise": [int(i) for i in item[15].split(",")] if item[15] else None,
            "q5_personality": item[16],
            "q6_filterByState": item[17],
            "q7_filterByCity": item[18],
            "q8_morning": item[19],
            "q9_frequency": item[20],
            "languages": item[21],
            "expertise": item[22],
            "username": item[23],
            "imageUrl":item[24]
        }
        list_of_users_requests.append(user_request)
    
    if id == 0:
        return list_of_users_requests
    else:
        return list_of_users_requests[0]

@match_routes.route('/<int:id>')
def match(id):
    """
    Match for request
    """

    this_user = detailed_user_request(id)
    all_users = detailed_user_request()
    match_table = []

    for single_user in all_users:
        if this_user["userId"] != single_user["userId"]:
            match_table.append({
                "userId": single_user["userId"],
                "username": single_user["username"],
                "imageUrl": single_user["imageUrl"],
                "both_match": compare_request_bothway(this_user,single_user),
                "solo_match": compare_request_oneway(this_user,single_user)
            })

    return {"matches": match_table}
