import psycopg2
import config
from functions import *

def connect():
    try:
        print("Connecting to database of PSQL")
        conn=psycopg2.connect(
        host="localhost",
        database="movies",
        user="moviesmanager",
        password="movie"
        )

        cur = conn.cursor()
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error:",error)
    finally:
        if conn is not None:
            conn.close()
            print("Posted")

if __name__ == "__main__":
    imgwrite(20,'The Lost City',"C:/Users/Public/Pic/Thelostcity/licensed-image.jpg",'jpg','-3.4635058880658702, -62.21562318164939')
    imgwrite(21,'The Lost City',"C:/Users/Public/Pic/Thelostcity/The_Lost_City_of_Z_film_poster.jpg",'jpg','POSTER')
    #imgwrite(2,'Guardian of Galaxy',"C:/Users/Public/Pic/Guardiansofgalaxy/Guardians_of_the_galaxy_ver2.jpg",'jpg','POSTER')
    #imgwrite(3,'Guardian of Galaxy',"C:/Users/Public/Pic/Guardiansofgalaxy/licensed-image.jpg",'jpg','POSTER')
    #retrieve file
    #imgread('1','Guardian of Galaxy',"C:/Users/Public/PicRead/")
    #imgread('2','Guardian of Galaxy',"C:/Users/Public/PicRead/")