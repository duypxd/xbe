-- Add new [Columns] to Table with [Default] value
ALTER TABLE category
    ADD COLUMN price INT DEFAULT 0,
    ADD COLUMN note VARCHAR(100) DEFAULT '',

-- Delete Columns
ALTER TABLE category
    DROP COLUMN price,
    DROP COLUMN note,

-- rename column
ALTER TABLE category RENAME product_type TO category_type

-- rename colum type
ALTER TABLE category ALTER COLUMN category_type TYPE VARCHAR(25);

-- Find all categories whose value is in the value list:
SELECT * FROM category WHERE price IN (10, 20, 40)

-- Find all categories with a value between 10 and 50:
SELECT * FROM category WHERE price BETWEEN 10 AND 50

-- Find all relative search
SELECT * FROM category WHERE LOWER(TRIM(name)) LIKE '%iphone%'

-- Find all relative search with multiple column (OR)
SELECT * FROM category
    WHERE LOWER(TRIM(name))
    Like '%iPhone%'
    OR price BETWEEN 10 AND 20

-- Find all relative search with multiple column (AND)
SELECT * FROM category
    WHERE LOWER(TRIM(name))
    Like '%iPhone%'
    AND price > 50

-- Find ALL category
SELECT * FROM category

-- Find category By Id
SELECT * FROM category WHERE category_id=1

-- Insert new category
INSERT INTO category (name)
VALUES('iPhone 14 ProMax')

-- Insert Multiple categories
INSERT INTO category (name)
VALUES('iPhone 8'), ('iPhone 8 Plus'), ('iPhone 10')

-- Insert Into new category with custom [category_id]: 
-- Multiple values are listed using SELECT statement and then these values combined and fed to the table using SQL UNION ALL set operator.
INSERT INTO category
    SELECT 1, 
        'iPhone X'
    UNION ALL
       SELECT 4, 
              'iPhone 13 ProMax'

-- UPDATE
UPDATE category
    SET name='iPhone 15'
    where category_id=1

-- DELETE
DELETE FROM category  where category_id=1

-- SUM PRICE & GROUP BY 
SELECT category_type, SUM(price) as total_price
    FROM category
    GROUP BY category_type