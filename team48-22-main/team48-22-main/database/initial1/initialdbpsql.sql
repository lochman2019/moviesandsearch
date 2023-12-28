--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: movie; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.movie (
    movieid integer NOT NULL,
    moviename character varying(200),
    genre character varying(100),
    description character varying(600)
);


ALTER TABLE public.movie OWNER TO moviesmanager;

--
-- Name: passwordencryption; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.passwordencryption (
    userid integer,
    key character varying(100),
    encryptionalgo character varying(20)
);


ALTER TABLE public.passwordencryption OWNER TO moviesmanager;

--
-- Name: phone; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.phone (
    userid integer NOT NULL,
    countrycode integer,
    areacode integer,
    phonenumber integer
);


ALTER TABLE public.phone OWNER TO moviesmanager;

--
-- Name: photo; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.photo (
    photoid integer,
    movieid integer,
    photopath character varying(300),
    description character varying(500),
    uploaddate timestamp with time zone,
    uploaduserid integer,
    isheading boolean,
    locationlatitude double precision,
    locationlongtitude double precision
);


ALTER TABLE public.photo OWNER TO moviesmanager;

--
-- Name: usercomments; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.usercomments (
    commentid integer,
    movieid integer,
    userid integer,
    datetime timestamp with time zone,
    comment character varying(500)
);


ALTER TABLE public.usercomments OWNER TO moviesmanager;

--
-- Name: userpreferences; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.userpreferences (
    userid integer,
    recent1id integer,
    recent2id integer,
    recent3id integer,
    recent4id integer
);


ALTER TABLE public.userpreferences OWNER TO moviesmanager;

--
-- Name: users; Type: TABLE; Schema: public; Owner: moviesmanager
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(100),
    password character varying(100),
    joindate timestamp with time zone,
    displayname character varying(100),
    description character varying(500),
    email character varying(200)
);


ALTER TABLE public.users OWNER TO moviesmanager;

--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.movie (movieid, moviename, genre, description) FROM stdin;
\.


--
-- Data for Name: passwordencryption; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.passwordencryption (userid, key, encryptionalgo) FROM stdin;
\.


--
-- Data for Name: phone; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.phone (userid, countrycode, areacode, phonenumber) FROM stdin;
\.


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.photo (photoid, movieid, photopath, description, uploaddate, uploaduserid, isheading, locationlatitude, locationlongtitude) FROM stdin;
\.


--
-- Data for Name: usercomments; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.usercomments (commentid, movieid, userid, datetime, comment) FROM stdin;
\.


--
-- Data for Name: userpreferences; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.userpreferences (userid, recent1id, recent2id, recent3id, recent4id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: moviesmanager
--

COPY public.users (userid, username, password, joindate, displayname, description, email) FROM stdin;
\.


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (movieid);


--
-- Name: phone phone_pkey; Type: CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT phone_pkey PRIMARY KEY (userid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: photo fk_movieid; Type: FK CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT fk_movieid FOREIGN KEY (movieid) REFERENCES public.movie(movieid);


--
-- Name: photo fk_uploaduserid; Type: FK CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT fk_uploaduserid FOREIGN KEY (uploaduserid) REFERENCES public.users(userid);


--
-- Name: phone fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: moviesmanager
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

