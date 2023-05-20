--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14
-- Dumped by pg_dump version 12.14

-- Started on 2023-05-19 21:03:34

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

DROP DATABASE db_study_app;
--
-- TOC entry 2863 (class 1262 OID 16704)
-- Name: db_study_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_study_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE db_study_app OWNER TO postgres;

\connect db_study_app

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16718)
-- Name: themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    name character varying,
    create_date timestamp without time zone,
    description character varying,
    keywords character varying,
    owner_user_id integer
);


ALTER TABLE public.themes OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16716)
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_id_seq OWNER TO postgres;

--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 204
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- TOC entry 209 (class 1259 OID 16740)
-- Name: themes_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes_properties (
    id integer NOT NULL,
    theme_id integer,
    property_name character varying,
    property_value character varying
);


ALTER TABLE public.themes_properties OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16738)
-- Name: themes_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_properties_id_seq OWNER TO postgres;

--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 208
-- Name: themes_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_properties_id_seq OWNED BY public.themes_properties.id;


--
-- TOC entry 207 (class 1259 OID 16729)
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name character varying,
    create_date timestamp without time zone,
    "order" integer,
    priority integer,
    color character varying,
    owner_user_id integer
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16727)
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO postgres;

--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 206
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- TOC entry 203 (class 1259 OID 16707)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    last_name character varying,
    email character varying,
    password character varying,
    avatar character varying,
    deleted boolean,
    token character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16705)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2710 (class 2604 OID 16721)
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 16743)
-- Name: themes_properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties ALTER COLUMN id SET DEFAULT nextval('public.themes_properties_id_seq'::regclass);


--
-- TOC entry 2711 (class 2604 OID 16732)
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- TOC entry 2709 (class 2604 OID 16710)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2853 (class 0 OID 16718)
-- Dependencies: 205
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.themes VALUES (3, 'Administracion I', NULL, 'El tema contiene todas las unidades de administracion I', 'adm, organizacion, empresa, admin, ord', 2);
INSERT INTO public.themes VALUES (1, 'Administracion IV Khe', '2023-03-18 00:00:00', 'El tema contiene todas las unidades de administracion IV', 'adm, organizacion, empresa, admin, ord', 1);
INSERT INTO public.themes VALUES (5, 'Sistemas Operativos', '2023-03-18 00:00:00', 'El tema contiene todas las unidades de sistemas operativos', 'so, sistemas, unidades, windows, linux', 4);


--
-- TOC entry 2857 (class 0 OID 16740)
-- Dependencies: 209
-- Data for Name: themes_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.themes_properties VALUES (3, 5, 'Visited', 'true');
INSERT INTO public.themes_properties VALUES (1, 3, 'Share_by', 'Mirtha T');
INSERT INTO public.themes_properties VALUES (5, 5, 'Percent_complete', '60');
INSERT INTO public.themes_properties VALUES (6, 5, 'Notification_date', '2023-03-31');


--
-- TOC entry 2855 (class 0 OID 16729)
-- Dependencies: 207
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.topics VALUES (1, 'Unidad I', '2023-03-17 00:00:00', 1, 2, 'azul', 1);
INSERT INTO public.topics VALUES (3, 'Unidad siguiente del IV', '2023-03-17 00:00:00', 3, 5, 'amarillo', 1);
INSERT INTO public.topics VALUES (5, 'unidad 6', '2023-05-15 00:00:00', NULL, NULL, 'negro', 1);
INSERT INTO public.topics VALUES (6, 'Unidad 9', '2023-05-25 00:00:00', NULL, NULL, 'azul', 1);
INSERT INTO public.topics VALUES (7, 'Unidad 8', '2023-05-20 00:00:00', NULL, NULL, 'azul', 7);
INSERT INTO public.topics VALUES (8, 'Resumen', '2023-05-20 00:00:00', NULL, NULL, 'negro', 1);


--
-- TOC entry 2851 (class 0 OID 16707)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'Aure', 'Bernal', 'aure@gmail.com', 'auresa123', NULL, true, NULL);
INSERT INTO public.users VALUES (4, 'Luz', 'Torres Serena', 'luztorre@gmail.com', 'serenita123', NULL, true, NULL);
INSERT INTO public.users VALUES (5, 'Michito', 'Torres', 'elmichito@gmail.com', 'michitoto', NULL, false, NULL);
INSERT INTO public.users VALUES (7, 'Simon', 'Torres', 'simon@gmail.com', 'sisimon', NULL, false, NULL);
INSERT INTO public.users VALUES (6, 'Nina', 'Torres', 'nina@gmail.com', 'ninaaaaa', NULL, false, '');
INSERT INTO public.users VALUES (1, 'Mirtha Eli', 'Torres Diaz', 'mirtha@gmail.com', 'mirmir23', NULL, false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1pcnRoYSBFbGkiLCJsYXN0X25hbWUiOiJUb3JyZXMgRGlheiIsImVtYWlsIjoibWlydGhhQGdtYWlsLmNvbSIsImlhdCI6MTY4NDU0MzIyMX0.oDCICiOwSWTXYwurIHWZC4ognj_38mvAQm1VY4wKEuM');
INSERT INTO public.users VALUES (2, 'Luz', 'Torres', 'luztorre@gmail.com', 'serenita123', NULL, false, NULL);


--
-- TOC entry 2869 (class 0 OID 0)
-- Dependencies: 204
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_id_seq', 5, true);


--
-- TOC entry 2870 (class 0 OID 0)
-- Dependencies: 208
-- Name: themes_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_properties_id_seq', 6, true);


--
-- TOC entry 2871 (class 0 OID 0)
-- Dependencies: 206
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 8, true);


--
-- TOC entry 2872 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 2716 (class 2606 OID 16726)
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 16748)
-- Name: themes_properties themes_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_pkey PRIMARY KEY (id);


--
-- TOC entry 2718 (class 2606 OID 16737)
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- TOC entry 2714 (class 2606 OID 16715)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2721 (class 2606 OID 16749)
-- Name: themes themes_owner_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);


--
-- TOC entry 2723 (class 2606 OID 16759)
-- Name: themes_properties themes_properties_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id);


--
-- TOC entry 2722 (class 2606 OID 16754)
-- Name: topics topics_owner_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);


-- Completed on 2023-05-19 21:03:34

--
-- PostgreSQL database dump complete
--

