-- ADD USER
INSERT INTO projects (project_name, user_id)
VALUES('Grab', 1), ('Uber', 2)
-- GET ALL PROJECT
SELECT * FROM projects
-- FIND PROJECT BY ID
SELECT * FROM projects WHERE PROJECT_ID=1
-- FIND PROJECT [STATUS=DONE]
SELECT * FROM projects WHERE status='done'
-- UPDATE STATUS PROJECTS
UPDATE  projects
SET     status='in progress'
WHERE   project_id = 1

-- Query to get [USER] and [PROJECT] information respectively
SELECT  users.user_id,
        users.full_name,
        projects.project_name,
        projects.status
FROM    users
JOIN    projects on users.user_id = projects.user_id
    




-- CREATE TABLE
CREATE TABLE projects(
	project_id SERIAL PRIMARY KEY,
	project_name VARCHAR (50),
	status VARCHAR(25) DEFAULT 'todo',
	created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP
)
-- Add Column Table
ALTER TABLE projects
    ADD COLUMN project_id SERIAL PRIMARY KEY,
    ADD COLUMN project_name VARCHAR(25),
    ADD COLUMN status VARCHAR(25) DEFAULT 'todo',
    ADD COLUMN created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    ADD COLUMN update_date TIMESTAMP NOT NULL DEFAULT NOW()

-- Add a foreign key column (user_id to Table Projects)
ALTER TABLE projects
    ADD COLUMN user_id INT NULL,
    ADD CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
