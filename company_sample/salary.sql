-- CREATE TABLE
CREATE TABLE salary(
	salary_id SERIAL PRIMARY KEY,
    user_name VARCHAR (50),
    user_salary MONEY,
    payment_date TIMESTAMP,
	created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP
)

-- ADD FOREIGN KEY [user_id] to table [salary]
ALTER TABLE salary
    ADD COLUMN user_id INT NULL,
    ADD CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
