--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_registrations (
    id integer NOT NULL,
    user_id integer,
    event_id integer
);


ALTER TABLE public.event_registrations OWNER TO postgres;

--
-- Name: event_registrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_registrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_registrations_id_seq OWNER TO postgres;

--
-- Name: event_registrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_registrations_id_seq OWNED BY public.event_registrations.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    capacity integer NOT NULL,
    status character varying,
    date timestamp without time zone
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    event_id integer,
    title character varying NOT NULL,
    speaker character varying,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    hashed_password character varying NOT NULL,
    name character varying,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: event_registrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations ALTER COLUMN id SET DEFAULT nextval('public.event_registrations_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
134b7c765949
\.


--
-- Data for Name: event_registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_registrations (id, user_id, event_id) FROM stdin;
5	3	3
6	3	2
7	\N	1
8	4	17
9	4	6
10	4	8
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, name, description, capacity, status, date) FROM stdin;
2	CyberSecurity Talk	Evento sobre Ciberseguridad	4	finished	2024-09-15 14:00:00
3	DevOps Conference	Evento sobre DevOps y CI/CD	4	finished	2024-10-20 10:30:00
5	Bases de Datos NoSQL	Modelos de bases de datos modernas	5	finished	2024-12-12 16:00:00
6	Conferencia de IA	Evento sobre Inteligencia Artificial	5	active	2025-05-10 10:00:00
8	Big Data Expo	Evento sobre an??lisis de datos y Big Data	6	active	2025-07-18 11:00:00
9	Metaverso y VR	Evento sobre Realidad Virtual y el Metaverso	3	canceled	2025-08-08 15:45:00
10	Machine Learning Bootcamp	Evento sobre Machine Learning avanzado	5	active	2025-09-30 09:30:00
11	Computaci??n Cu??ntica	Introducci??n a la computaci??n cu??ntica	6	active	2025-10-25 13:15:00
12	Cloud Computing Forum	??ltimas tendencias en la nube	7	canceled	2025-11-12 12:00:00
13	Redes y Telecomunicaciones	Innovaciones en redes de comunicaci??n	5	active	2025-12-05 10:45:00
14	IoT y Smart Cities	Aplicaciones del Internet de las Cosas	6	active	2026-01-18 14:00:00
15	Desarrollo Web 2025	Tendencias y herramientas modernas	7	canceled	2026-03-02 09:00:00
16	Criptograf??a y Seguridad	??ltimos avances en criptograf??a	4	active	2026-04-22 11:30:00
17	prueb	sda	12	active	2025-03-11 14:01:00
1	Django Conferencia	Conferencia de Django	100	active	2025-03-26 14:25:00
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, event_id, title, speaker, start_time, end_time) FROM stdin;
2	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
3	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
4	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
5	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
8	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
9	1	Introducci├│n a Java	John Doe	2025-05-20 10:00:00	2025-05-20 12:00:00
10	6	Prueba	Miguel	2025-03-13 14:43:00	2025-03-13 19:43:00
11	6	Prueba 2	Andrea	2025-03-07 14:55:00	2025-03-07 14:55:00
12	\N	Nueva	sadasd	2025-03-06 14:55:00	2025-03-07 14:55:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, hashed_password, name, role) FROM stdin;
1	admin@gmail.com	$2b$12$UqNyyjKoOUwWBAl5DZIotuHg/iIxmy8slNbcJhBqQNY8Apa7Dyc6C	John Doe	admin
3	admin1@gmail.com	$2b$12$xQ3Zr.EcmT3WH6RYHW/sAeD88EcYuqiGfKj6lXzBJDHBjlY5cC7AS	John Doe	admin
4	attende@email.com	$2b$12$vxTGa72Gim19pFA4MKa7bOqS0CmDduOMRQh07AzG1XsviL3ufsO5G	Juan Perez	attendee
5	attende2@email.com	$2b$12$.MXWUDYACrlBBPm0DmBZcetfpuMA4rnnMRB.4LT37H3yBFMHsXL2C	Miguel Angel	attendee
6	organizer1@email.com	$2b$12$jmrt0GKnE1QtF2r/YX3zqu.2hk79Js2uNwyG9jPgtBUqE2wFxtYIW	Marcos Alvarez	organizer
7	attende3@email.com	$2b$12$527ZSxNcPF9.JDcCF5VK2.BLRprD0RuO21cCGUPl1VSm0ybqIRp.q	Samuel Sanchez	attendee
\.


--
-- Name: event_registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_registrations_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 16, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_event_registrations_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_event_registrations_id ON public.event_registrations USING btree (id);


--
-- Name: ix_events_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_events_id ON public.events USING btree (id);


--
-- Name: ix_events_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_events_name ON public.events USING btree (name);


--
-- Name: ix_sessions_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_sessions_id ON public.sessions USING btree (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: event_registrations event_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- PostgreSQL database dump complete
--

