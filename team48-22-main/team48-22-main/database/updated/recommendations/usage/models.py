from django.db import models
from django.db import connection
# Create your models here.

def movietop(rank):
    cursor=connection.cursor()
    query='SELECT movieID FROM movie WHERE rank=%s'
    queryphoto='SELECT photopath FROM photo WHERE movieID=%s AND isheading=true'
    cursor.execute(query, (rank,))
    movieID=cursor.fetchone()
    