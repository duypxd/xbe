-- ADD USER
INSERT INTO users (full_name, phone_number)
VALUES('Donal Trump', '+840123456789')
-- GET ALL USERS
SELECT * FROM USERS
-- FIND USER BY ID
SELECT * FROM USERS WHERE USER_ID=1

-- CREATE TABLE
CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
    username VARCHAR(64) unique,
    email VARCHAR(50) unique,
    full_name VARCHAR (50),
    phone_number VARCHAR (50),
    password VARCHAR(25),
	created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP
)

-- Add Column [username] support login
ALTER TABLE users ADD COLUMN username VARCHAR(25) unique
-- Add CHECK constraint to check username contains only letters and numbers
ALTER TABLE users ADD CONSTRAINT chk_valid_username CHECK (username ~ '^[a-zA-Z0-9]+$');
UPDATE users SET username = lower(users.full_name || '_' || users.user_id) WHERE username IS NULL;

-- Add & Update Column [password] support login
ALTER TABLE users ADD COLUMN password VARCHAR(64)
UPDATE users SET password = md5(gen_random_uuid()::text)