from flask import Blueprint, jsonify, session, request
from app.models import db, Question, Request, Answer, Profile
from flask_login import current_user

match_routes = Blueprint('match', __name__)

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
    (SELECT array_agg("languagesId") FROM "userLanguages" AS l WHERE l."profileId" = p."id" GROUP BY l."profileId") as "langs"
    FROM profiles AS p 
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
            "q1": item[12],
            "q2": item[13],
            "q3": item[14],
            "q4": item[15],
            "q5": item[16],
            "q6": item[17],
            "q7": item[18],
            "q8": item[19],
            "q9": item[20],
            "languages": item[21],
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

    return {
        "matches": all_users,
        "this_user": this_user}
