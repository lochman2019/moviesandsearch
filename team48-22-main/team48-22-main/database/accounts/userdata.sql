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
-- Name: follows; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.follows (
    followerid integer,
    followingid integer,
    followdatetime timestamp without time zone
);


ALTER TABLE public.follows OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    tag smallint NOT NULL,
    email character varying(255) NOT NULL,
    dateofbirth date NOT NULL,
    accountcreated timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.follows (followerid, followingid, followdatetime) FROM stdin;
12345	67890	2023-04-03 19:35:51
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, username, tag, email, dateofbirth, accountcreated) FROM stdin;
12345	blorpo	5893	blorpo@hotmail.com	2001-12-04	2020-03-23 00:00:00
67890	zerg	6348	zerg@gmail.com	1999-07-15	2018-04-03 00:00:00
\.


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: follows fkfollower; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT fkfollower FOREIGN KEY (followerid) REFERENCES public.users(id);


--
-- Name: follows fkfollowing; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT fkfollowing FOREIGN KEY (followingid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

