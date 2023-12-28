import psycopg2 
import config

def connect():
    try:
        print("Connecting to database of PSQL")
        

        cur = conn.cursor()

        print("PSQL current version:")
        cur.execute("SELECT version()")

        db_version = cur.fetchone()
        print(db_version)
        
        #query="""SELECT image FROM images WHERE id= %s """
        #cur1=conn.cursor()
        #cur1.execute(query, ('TST-1',))
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error:",error)
    finally:
        if conn is not None:
            conn.close()
            print("Session ended")

def imgwrite(imgid, filmname, filelocate, filetype, location):        
        conn = None
        try:
            image=open(filelocate, 'rb').read()
            conn=psycopg2.connect(
            host="localhost",
            database="movies",
            user="moviesmanager",
            password="movie"
            )

            cur=conn.cursor()
            queryinsert="INSERT INTO images(imgid, filmname, filedata, filetype, location)"
            queryback="VALUES(%s,%s,%s,%s,%s)"
            filedata=psycopg2.Binary(image)
            cur.execute(queryinsert+queryback, (imgid, filmname, filedata, filetype, location))
            conn.commit()
            cur.close()

        except(Exception, psycopg2.DataError) as Error:
            print("Error:",Error)

        finally:
            if conn is not None:
                conn.close()
                print("Session ended")

def imgread(imgid, filmname, savelocate):
    conn=None;
    try:
        conn=psycopg2.connect(
            host="localhost",
            database="movies",
            user="moviesmanager",
            password="movie"
        )
        cur=conn.cursor()
        query="""SELECT filedata, filetype, location FROM images WHERE imgid=%s AND filmname=%s"""
        cur.execute(query,(imgid,filmname))
        imgdata=cur.fetchone()
        open(savelocate + filmname + imgid + '.' + imgdata[1], 'wb').write(imgdata[0])
        print("location of this file",imgdata[2])
        cur.close()

    except(Exception, psycopg2.DataError) as Error:
        print("Error:",Error)

    finally:
        if conn is not None:
            conn.close()
            print("Session ended")
    
    