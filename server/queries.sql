-- CREATE TABLE jobTitle (
-- 	jobTitle_id SERIAL PRIMARY KEY,
-- 	jobTitle_name VARCHAR(60) UNIQUE NOT NULL
-- );

-- CREATE TABLE experience( 
-- 	experience_id SERIAL PRIMARY KEY,
-- 	level VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE country (
-- 	country_id SERIAL PRIMARY KEY,
-- 	country_name VARCHAR(100) UNIQUE NOT NULL
-- );

-- CREATE TABLE state (
-- 	state_id SERIAL PRIMARY KEY,
-- 	country_id INTEGER NOT NULL,
-- 	state_name VARCHAR(100) NOT NULL,
-- 	FOREIGN KEY (country_id) REFERENCES country (country_id),
-- 	UNIQUE (country_id, state_name)
-- );

-- CREATE TABLE city (
-- 	city_id SERIAL PRIMARY KEY,
-- 	country_id INTEGER NOT NULL,
-- 	state_id INTEGER NOT NULL,
-- 	city_name VARCHAR(100) NOT NULL,
-- 	FOREIGN KEY (country_id) REFERENCES country (country_id),
-- 	FOREIGN KEY (state_id) REFERENCES state (state_id),
-- 	UNIQUE (country_id, state_id, city_name)
-- );

-- CREATE TABLE company (
-- 	company_id SERIAL PRIMARY KEY,
-- 	city_id INTEGER NOT NULL,
-- 	company_name TEXT NOT NULL,
-- 	FOREIGN KEY (city_id) REFERENCES city (city_id),
-- 	UNIQUE (city_id, company_name)
-- );

-- CREATE TABLE model (
-- 	model_id SERIAL PRIMARY KEY,
-- 	model_name VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE post (
-- 	post_id SERIAL PRIMARY KEY,
-- 	jobTitle_id INTEGER NOT NULL,
-- 	experience_id INTEGER[] NOT NULL,
-- 	company_id INTEGER NOT NULL,
-- 	model_id INTEGER[] NOT NULL,
-- 	date DATE NOT NULL,
-- );

-- CREATE TABLE postDetail (
-- 	postDetail_id SERIAL PRIMARY KEY,
-- 	contact TEXT NOT NULL,
-- 	software TEXT[],
-- 	description TEXT,
-- 	post_id INTEGER UNIQUE,
-- 	FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE
-- );

-- ALTER TABLE post
-- ADD CONSTRAINT fk_jobTitle
-- FOREIGN KEY (jobTitle_id) REFERENCES jobTitle (jobTitle_id);

-- ALTER TABLE post
-- ADD CONSTRAINT fk_company
-- FOREIGN KEY (company_id) REFERENCES company (company_id);
