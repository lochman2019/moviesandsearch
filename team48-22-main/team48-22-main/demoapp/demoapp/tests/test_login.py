import requests

"""User"""
# r = requests.post("http://localhost:8000/api/signup/",
#                   json={"username": "test", "email": "000@123.com", "password": "test"})
# r = requests.post("http://localhost:8000/api/signup/",
#                   json={"username": "tester", "email": "123@123.com", "password": "test"})
# r = requests.post("http://localhost:8000/api/signup/",
#                   json={"username": "test", "email": "000@123.com", "password": "test"})
r = requests.post("http://localhost:8000/api/login/",
                  json={"username": "test", "password": "test"})
token = r.json()['token']
print(token)

# r = requests.get("http://localhost:8000/api/users/",
#                     headers={'Authorization': f'Token {token}'})
# print(r.json())
# r = requests.get("http://localhost:8000/api/users/1/",
#                     headers={'Authorization': f'Token {token}'})
# print(r.json())
r = requests.put("http://localhost:8000/api/users/1/",
                    json={"password": "testtest"},
                    headers={'Authorization': f'Token {token}'})
print(r.json())



"""Tag"""
# r = requests.get("http://localhost:8000/api/movie_tags/?tag_name=test",
#                  headers={
#                     'Authorization': f'Token {token}'
#                  })
# r = requests.post("http://localhost:8000/api/movie_tags/",
#                     json={"tag_name": "test"},
#                     headers={
#                         'Authorization': f'Token {token}'})
# print(r.json())

# r = requests.post("http://localhost:8000/api/location_tags/",
#                     json={"tag_name": "test_location"},
#                     headers={
#                         'Authorization': f'Token {token}'})
# print(r.json())
# r = requests.get("http://localhost:8000/api/location_tags/",
#                  headers={
#                     'Authorization': f'Token {token}'
#                  })
# print(r.json())


# r = requests.post("http://localhost:8000/api/friends/",
#                     json={"friend": "456@123.com"},
#                     headers={'Authorization': f'Token {token}'})
# if r.status_code == 201:
#     r = requests.get("http://localhost:8000/api/friends/",
#                      headers={'Authorization': f'Token {token}'})
#     print(r.json())
