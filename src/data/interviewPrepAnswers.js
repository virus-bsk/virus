export const interviewPrepAnswers = {
  sql: {
    important: [
      {
        description:
          "SQL does not execute a query exactly from top to bottom. It follows a logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. First, SQL gets the data, filters individual rows, groups the data, filters groups, selects the required columns and finally sorts the result. This is why a SELECT alias usually cannot be used in WHERE.",
        example:
          "Imagine a teacher checking exam results. First, the teacher collects all student records (FROM). Then removes students who did not attend the exam (WHERE). Next, groups students by class (GROUP BY), selects classes with more than 30 students (HAVING), prepares the final report (SELECT) and sorts it by class name (ORDER BY).",
        code: "SELECT dept, COUNT(*) AS total\nFROM emp\nWHERE salary > 1000\nGROUP BY dept\nHAVING COUNT(*) > 2\nORDER BY total DESC;\n\n-- Execution order:\n-- FROM -> WHERE -> GROUP BY -> HAVING\n-- -> SELECT -> ORDER BY",
      },
      {
        description:
          "WHERE and HAVING are both used to filter data, but they work at different stages. WHERE filters individual rows before GROUP BY. HAVING filters groups after GROUP BY. Use WHERE when you want to remove individual records and HAVING when you want to filter grouped results.",
        example:
          "Imagine a company manager preparing a department report. First, the manager selects employees whose salary is above ₹50,000 (WHERE). Then groups those employees by department (GROUP BY). Finally, the manager displays only departments having more than five such employees (HAVING).",
        code: "SELECT dept, COUNT(*) AS total\nFROM emp\nWHERE salary > 50000\nGROUP BY dept\nHAVING COUNT(*) > 5;\n\n-- WHERE filters employees before grouping.\n-- HAVING filters departments after grouping.",
      },
      {
        description:
          "JOIN is used to combine related data from two or more tables. INNER JOIN returns only matching records from both tables. LEFT JOIN returns every record from the left table, even if there is no matching record on the right. RIGHT JOIN returns every record from the right table. FULL OUTER JOIN returns all records from both tables, whether they match or not.",
        example:
          "Imagine a shopping application with Customers and Orders lists. INNER JOIN shows only customers who placed orders. LEFT JOIN shows every customer, including people who never ordered. FULL OUTER JOIN shows all customers and all orders, including records without a match.",
        code: "-- INNER JOIN: Only customers who placed orders\nSELECT c.name, o.amount\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;\n\n-- LEFT JOIN: All customers, including those without orders\nSELECT c.name, o.amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n\n-- RIGHT JOIN: All orders and matching customers\nSELECT c.name, o.amount\nFROM customers c\nRIGHT JOIN orders o ON c.id = o.customer_id;\n\n-- FULL OUTER JOIN: All records from both tables\nSELECT c.name, o.amount\nFROM customers c\nFULL OUTER JOIN orders o ON c.id = o.customer_id;",
      },
      {
        description:
          "A Primary Key uniquely identifies each row in a table. It cannot contain NULL or duplicate values. A UNIQUE constraint prevents duplicate values in a column or group of columns. A Foreign Key connects two tables and ensures that the referenced record exists in the parent table. The way UNIQUE constraints handle NULL values depends on the database.",
        example:
          "Imagine a college. Every student has a unique student ID (Primary Key). No two students should have the same registered email address (Unique). When recording student marks, the student ID must belong to an existing student (Foreign Key).",
        code: "CREATE TABLE students (\n  student_id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100) UNIQUE\n);\n\nCREATE TABLE marks (\n  mark_id INT PRIMARY KEY,\n  student_id INT,\n  score INT,\n  FOREIGN KEY (student_id)\n    REFERENCES students(student_id)\n);\n\n-- student_id identifies each student.\n-- email cannot be duplicated.\n-- marks.student_id must refer to an existing student.",
      },
      {
        description:
          "An index helps the database find records faster without checking every row. A clustered index organizes the table data using the index key. A non-clustered index stores a separate lookup structure that points to the actual records. The exact implementation and number of clustered indexes depend on the database.",
        example:
          "Imagine a phone book sorted alphabetically by name. You can directly find a person's name because the book itself is arranged in order. This is similar to a clustered index. A book's index at the end tells you which page contains a topic. This is similar to a non-clustered index.",
        code: "-- Create an index on the last_name column\nCREATE INDEX idx_students_lastname\nON students(last_name);\n\n-- This query can use the index\nSELECT *\nFROM students\nWHERE last_name = 'Kumar';\n\n-- Clustered index creation syntax depends on the database.",
      },
      {
        description:
          "A B-tree is a balanced tree structure commonly used by database indexes. It stores values in an organized way so the database can search, insert and delete records efficiently. Instead of checking every row, the database can follow the tree to find the required value.",
        example:
          "Imagine searching for a word in a dictionary. You do not read every page from the beginning. You open a page near the middle, decide whether the word is before or after it, and continue narrowing down the search. A B-tree helps the database search in a similar way.",
        code: "-- Create an index on email\nCREATE INDEX idx_users_email\nON users(email);\n\n-- Search for a user using the indexed column\nSELECT id, name, email\nFROM users\nWHERE email = 'test@example.com';\n\n-- The database may use the B-tree index\n-- instead of scanning every row.",
      },
      {
        description:
          "ACID represents four properties that make database transactions reliable. Atomicity means all operations succeed or all fail. Consistency means data follows database rules before and after a transaction. Isolation means concurrent transactions should not interfere incorrectly. Durability means committed changes remain saved even after a failure.",
        example:
          "Imagine transferring ₹500 from Account A to Account B. The money must be deducted from A and added to B together. If adding money to B fails, the deduction from A must also be cancelled (Atomicity). Account balance rules must remain valid (Consistency). Other transfers should not create incorrect results (Isolation). Once completed, the transfer must remain saved (Durability).",
        code: "-- Start a transaction\nBEGIN;\n\n-- Deduct money from Account A\nUPDATE accounts\nSET balance = balance - 500\nWHERE id = 1;\n\n-- Add money to Account B\nUPDATE accounts\nSET balance = balance + 500\nWHERE id = 2;\n\n-- Save both changes together\nCOMMIT;\n\n-- If an error occurs, use ROLLBACK\n-- instead of COMMIT.",
      },
      {
        description:
          "Normalization is the process of organizing database tables to reduce repeated data and avoid data-related problems. First Normal Form (1NF) means each column should contain a single value. Second Normal Form (2NF) means non-key columns should depend on the complete primary key. Third Normal Form (3NF) means non-key columns should not depend on other non-key columns.",
        example:
          "Imagine an online shopping application. If every order record stores the customer's name, phone number and address, the same customer information is repeated many times. If the customer changes their address, many records must be updated. Instead, store customer details once in the Customers table and store only customer_id in the Orders table.",
        code: "-- Customer information is stored once\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  address VARCHAR(200)\n);\n\n-- Orders refer to customers using customer_id\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  total DECIMAL(10,2),\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\n-- Customer details are not repeated in every order.",
      },
      {
        description:
          "A subquery is a SQL query written inside another query. It helps us get a result that the main query needs. A CTE (Common Table Expression) is a temporary named result written using WITH before the main query. CTEs make complex queries easier to read and maintain. A derived table is a subquery used inside the FROM clause.",
        example:
          "Imagine asking a manager: first, find the average salary of each department. Then show employees whose salaries are higher than their department average. The first calculation is a smaller question, and the second query uses its result. A CTE gives that smaller calculation a meaningful name.",
        code: "-- Find employees earning more than their department average\nWITH dept_avg AS (\n  SELECT dept, AVG(salary) AS avg_salary\n  FROM emp\n  GROUP BY dept\n)\nSELECT e.name, e.dept, e.salary, d.avg_salary\nFROM emp e\nJOIN dept_avg d ON e.dept = d.dept\nWHERE e.salary > d.avg_salary;",
      },
      {
        description:
          "A Window Function performs calculations using related rows without removing the original rows. Unlike GROUP BY, it keeps each employee record in the result. Common window functions include ROW_NUMBER(), RANK(), DENSE_RANK(), SUM() and AVG(). PARTITION BY divides records into groups, and ORDER BY decides the order of calculation inside each group.",
        example:
          "Imagine an HR manager ranking employees based on salary in every department. The manager wants to see every employee along with their rank. A window function provides the rank while keeping all employee records in the report.",
        code: "-- Rank employees by salary inside each department\nSELECT\n  name,\n  dept,\n  salary,\n  RANK() OVER (\n    PARTITION BY dept\n    ORDER BY salary DESC\n  ) AS salary_rank\nFROM emp;",
      },
      {
        description:
          "UNION combines the results of two SELECT queries and removes duplicate rows. UNION ALL combines the results but keeps duplicates. UNION may take more time because the database must check for duplicates. Use UNION ALL when duplicate removal is not required.",
        example:
          "Imagine combining two employee lists. UNION gives you one list without repeated employees. UNION ALL combines both lists exactly as they are, even if the same employee appears in both lists.",
        code: "-- UNION removes duplicate names\nSELECT name FROM customers\nUNION\nSELECT name FROM prospects;\n\n-- UNION ALL keeps duplicate names\nSELECT name FROM customers\nUNION ALL\nSELECT name FROM prospects;\n\n-- Both queries must return the same number\n-- of columns with compatible data types.",
      },
      {
        description:
          "DELETE, TRUNCATE and DROP are used to remove data, but they do different things. DELETE removes selected rows or all rows while keeping the table. TRUNCATE removes all rows but keeps the table structure. DROP removes the complete table, including its structure. Transaction, logging and identity-reset behavior can differ between databases.",
        example:
          "Imagine a notebook. DELETE is like removing selected pages. TRUNCATE is like removing all the written pages while keeping the notebook. DROP is like throwing away the entire notebook.",
        code: "-- Delete only employees from Sales department\nDELETE FROM emp\nWHERE dept = 'Sales';\n\n-- Remove every row but keep the table\nTRUNCATE TABLE emp;\n\n-- Remove the complete table\nDROP TABLE emp;",
      },
      {
        description:
          "GROUP BY combines rows that have the same value in one or more columns and returns one result row for each group. It is commonly used with aggregate functions such as COUNT(), SUM(), AVG(), MIN() and MAX(). NULL values are treated as a separate group.",
        example:
          "Imagine a company with 100 employees working in different departments. The HR team wants to know how many employees work in each department and their average salary. GROUP BY creates one group for each department so these calculations can be performed.",
        code: "-- Find employee count and average salary by department\nSELECT\n  dept,\n  COUNT(*) AS total_employees,\n  AVG(salary) AS average_salary\nFROM emp\nGROUP BY dept;",
      },
      {
        description:
          "EXPLAIN shows the steps the database plans to follow when executing a query. EXPLAIN ANALYZE actually executes the query and shows the real execution time and row counts. It helps developers understand whether the database uses an index, scans the whole table or performs expensive joins. A full table scan is not always bad; it depends on the query and amount of data.",
        example:
          "Imagine travelling to an office. A route map shows the planned path, while checking the actual journey tells you how long it really took. EXPLAIN shows the planned database operations, and EXPLAIN ANALYZE shows what happened during execution.",
        code: "-- Check the actual execution plan in PostgreSQL\nEXPLAIN ANALYZE\nSELECT id, total\nFROM orders\nWHERE customer_id = 123;\n\n-- Check whether the database uses an index,\n-- how many rows it reads and how long it takes.",
      },
      {
        description:
          "SQL Injection is a security problem where an attacker enters SQL commands through an input field. If an application directly adds user input to a SQL query, the attacker may change the query and access or modify data. Prepared Statements prevent this by treating user input as data instead of executable SQL.",
        example:
          "Imagine a login page asking for a username. A normal user enters Ravi. An attacker may enter special SQL text such as ' OR 1=1 --. If the application directly joins this input into the SQL query, the attacker may bypass the login check. Prepared Statements prevent the input from changing the SQL command.",
        code: '// Unsafe: Never build SQL using user input\nString sql = "SELECT * FROM users WHERE username = \'" + username + "\'";\n\n// Safe: Use PreparedStatement\nString safeSql = "SELECT * FROM users WHERE username = ?";\n\nPreparedStatement stmt = conn.prepareStatement(safeSql);\nstmt.setString(1, username);\n\nResultSet rs = stmt.executeQuery();',
      },
      {
        description:
          "A Self Join means joining a table with itself. It is useful when records in the same table are related to other records in that table. A Recursive CTE is a query that refers to itself repeatedly to retrieve hierarchical data, such as employees and their reporting managers.",
        example:
          "Imagine a company employee list where every employee has a manager_id. Both employees and managers are stored in the same table. A Self Join helps find each employee's manager. A Recursive CTE can start from the CEO and find all employees reporting under the CEO at every level.",
        code: "-- Self Join: Find each employee and manager\nSELECT\n  e.name AS employee,\n  m.name AS manager\nFROM employees e\nLEFT JOIN employees m\n  ON e.manager_id = m.employee_id;\n\n-- Recursive CTE: Display the company hierarchy\nWITH RECURSIVE org AS (\n  SELECT employee_id, name, manager_id, 0 AS level\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  SELECT e.employee_id, e.name, e.manager_id, o.level + 1\n  FROM employees e\n  JOIN org o ON e.manager_id = o.employee_id\n)\nSELECT * FROM org;",
      },
      {
        description:
          "Isolation levels control how much one database transaction can see changes made by other transactions running at the same time. The standard levels are READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ and SERIALIZABLE. Higher isolation generally prevents more concurrency problems but can reduce performance. Exact behavior depends on the database.",
        example:
          "Imagine two bank employees updating the same account at the same time. One employee may see the other employee's unfinished changes, or may have to wait until the other finishes. Isolation levels decide how these simultaneous transactions interact.",
        code: "-- Example: PostgreSQL transaction using SERIALIZABLE\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\nUPDATE accounts\nSET balance = balance - 500\nWHERE id = 1;\n\nCOMMIT;\n\n-- Other standard isolation levels:\n-- READ UNCOMMITTED\n-- READ COMMITTED\n-- REPEATABLE READ\n-- SERIALIZABLE",
      },
      {
        description:
          "An index helps the database find data faster, but some query conditions make a normal index difficult to use. For example, applying a function such as UPPER() to an indexed column or searching with a leading wildcard such as LIKE '%son' may prevent a normal index from being used efficiently. A matching expression index or another specialized index may help.",
        example:
          "Imagine a book arranged alphabetically by name. Finding a name starting with 'John' is easy because you can go directly to that section. Finding a name that contains 'son' anywhere is harder because you may need to check many pages.",
        code: "-- Create a normal index\nCREATE INDEX idx_users_name\nON users(name);\n\n-- A function on the column may prevent normal index usage\nSELECT *\nFROM users\nWHERE UPPER(name) = 'JOHN';\n\n-- A leading wildcard may also prevent normal B-tree usage\nSELECT *\nFROM users\nWHERE name LIKE '%son';\n\n-- Prefix search may use the index depending on database\n-- and collation settings\nSELECT *\nFROM users\nWHERE name LIKE 'John%';",
      },
      {
        description:
          "GROUP BY and DISTINCT can both produce unique values, but they are used for different purposes. GROUP BY creates groups and is commonly used with aggregate functions such as COUNT(), SUM() and AVG(). DISTINCT simply removes duplicate rows from the result. Use DISTINCT when you only need unique values.",
        example:
          "Imagine an employee list containing many employees from the same department. If you only want the list of department names without repetition, use DISTINCT. If you want to count employees in every department, use GROUP BY with COUNT().",
        code: "-- DISTINCT: Get unique department names\nSELECT DISTINCT dept\nFROM emp;\n\n-- GROUP BY: Count employees in each department\nSELECT dept, COUNT(*) AS total\nFROM emp\nGROUP BY dept;",
      },
      {
        description:
          "ON DELETE CASCADE and ON DELETE SET NULL are foreign key options that decide what happens to child records when a parent record is deleted. CASCADE automatically deletes related child records. SET NULL keeps the child records but changes their foreign key value to NULL. The foreign key column must allow NULL for SET NULL to work.",
        example:
          "Imagine a customer who has placed several orders. With ON DELETE CASCADE, deleting the customer also deletes their orders. With ON DELETE SET NULL, the orders remain in the system, but the customer_id becomes NULL.",
        code: "-- Option 1: Automatically delete related orders\nCREATE TABLE orders_cascade (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(id)\n    ON DELETE CASCADE\n);\n\n-- Option 2: Keep orders but remove customer reference\nCREATE TABLE orders_setnull (\n  id INT PRIMARY KEY,\n  customer_id INT NULL,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(id)\n    ON DELETE SET NULL\n);",
      },
    ],

    scenarios: [
      {
        description:
          "Find the second highest salary in an employee table. There are multiple ways to solve this problem, such as LIMIT with OFFSET, DENSE_RANK() and a subquery. We must consider duplicate salaries. If two employees have the highest salary, the second highest salary should be the next different salary, not the same highest salary again.",
        example:
          "Imagine a running competition. Two runners share first place, and another runner comes next. The second highest salary means the second different salary value, not simply the salary of the second employee in the sorted list.",
        code: "-- Method 1: LIMIT and OFFSET (PostgreSQL/MySQL)\nSELECT DISTINCT salary\nFROM emp\nORDER BY salary DESC\nLIMIT 1 OFFSET 1;\n\n-- Method 2: DENSE_RANK()\nSELECT salary\nFROM (\n  SELECT salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS rn\n  FROM (SELECT DISTINCT salary FROM emp) s\n) t\nWHERE rn = 2;\n\n-- Method 3: Subquery\nSELECT MAX(salary) AS second_highest_salary\nFROM emp\nWHERE salary < (SELECT MAX(salary) FROM emp);",
      },
      {
        description:
          "Find customers who have never placed an order. The Customers table contains all customers, and the Orders table contains customer purchases. Use LEFT JOIN with IS NULL or NOT EXISTS to find customers who do not have a matching order. INNER JOIN cannot solve this directly because it only returns matching records.",
        example:
          "Imagine an online shopping company with 1,000 registered customers. Only 600 customers have purchased something. The business team wants the remaining 400 customers so they can send promotional offers.",
        code: "-- Method 1: LEFT JOIN\nSELECT c.id, c.name\nFROM customers c\nLEFT JOIN orders o\n  ON c.id = o.customer_id\nWHERE o.id IS NULL;\n\n-- Method 2: NOT EXISTS\nSELECT c.id, c.name\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.customer_id = c.id\n);",
      },
      {
        description:
          "Find duplicate records and delete the extra copies while keeping one record. First, use GROUP BY with HAVING COUNT(*) > 1 to identify duplicates. Then use ROW_NUMBER() to number records having the same email and phone. Keep the first record and delete the remaining records. Always check the records before deleting them.",
        example:
          "Imagine a company has a customer list where the same person was registered three times with the same email and phone number. The company wants to keep one customer record and remove the other two duplicate records.",
        code: "-- Step 1: Find duplicate customers\nSELECT email, phone, COUNT(*) AS total\nFROM customers\nGROUP BY email, phone\nHAVING COUNT(*) > 1;\n\n-- Step 2: Preview records that will be deleted (PostgreSQL)\nSELECT *\nFROM (\n  SELECT id, email, phone,\n         ROW_NUMBER() OVER (\n           PARTITION BY email, phone\n           ORDER BY id\n         ) AS rn\n  FROM customers\n) t\nWHERE rn > 1;\n\n-- Step 3: Delete extra records (PostgreSQL)\nDELETE FROM customers\nWHERE id IN (\n  SELECT id\n  FROM (\n    SELECT id,\n           ROW_NUMBER() OVER (\n             PARTITION BY email, phone\n             ORDER BY id\n           ) AS rn\n    FROM customers\n  ) t\n  WHERE rn > 1\n);",
      },
      {
        description:
          "When a query takes too much time on a table containing 10 million records, do not immediately add indexes. First check the execution plan using EXPLAIN ANALYZE. Identify full table scans, expensive joins and incorrect row estimates. Then check indexes on WHERE and JOIN columns, avoid selecting unnecessary columns, rewrite inefficient conditions and consider partitioning or caching when appropriate.",
        example:
          "Imagine a shopping company's dashboard takes 30 seconds to display customer orders. The database has 10 million order records. Instead of checking every record manually, the developer checks the database execution plan, identifies the slow operation and improves the query or adds a suitable index.",
        code: "-- Step 1: Check the execution plan (PostgreSQL)\nEXPLAIN ANALYZE\nSELECT id, total\nFROM orders\nWHERE customer_id = 123;\n\n-- Step 2: Create an index if the plan shows it is useful\nCREATE INDEX idx_orders_customer\nON orders(customer_id);\n\n-- Step 3: Select only required columns\nSELECT id, total\nFROM orders\nWHERE customer_id = 123;\n\n-- Step 4: Check the execution plan again\nEXPLAIN ANALYZE\nSELECT id, total\nFROM orders\nWHERE customer_id = 123;",
      },
      {
        description:
          "Month-over-month revenue growth means comparing the current month's revenue with the previous month's revenue. First calculate monthly revenue, then use the LAG() window function to get the previous month's revenue. Finally, calculate the percentage change. LAG() helps us compare rows without joining the table to itself.",
        example:
          "Imagine a company earned ₹10 lakh in January and ₹12 lakh in February. The finance manager wants to know how much revenue increased in February compared with January. The growth is 20%.",
        code: "-- PostgreSQL example\nWITH monthly_revenue AS (\n  SELECT\n    DATE_TRUNC('month', order_date) AS month,\n    SUM(amount) AS revenue\n  FROM orders\n  GROUP BY DATE_TRUNC('month', order_date)\n),\nrevenue_comparison AS (\n  SELECT\n    month,\n    revenue,\n    LAG(revenue) OVER (ORDER BY month) AS previous_revenue\n  FROM monthly_revenue\n)\nSELECT\n  month,\n  revenue,\n  previous_revenue,\n  ROUND(\n    (revenue - previous_revenue) * 100.0\n    / NULLIF(previous_revenue, 0),\n    2\n  ) AS growth_percentage\nFROM revenue_comparison\nORDER BY month;",
      },
      {
        description:
          "Find the top N highest-paid employees in every department. ROW_NUMBER() assigns a unique number to employees inside each department. PARTITION BY dept starts the numbering separately for every department. ORDER BY salary DESC places the highest salary first. Finally, filter the result to keep only the required number of employees.",
        example:
          "Imagine HR wants to give bonuses to the three highest-paid employees in every department. The HR team should not select only three employees from the entire company. They need the top three from IT, the top three from Finance and the top three from HR separately.",
        code: "-- Find the top 3 employees in every department\nSELECT name, dept, salary\nFROM (\n  SELECT\n    name,\n    dept,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY dept\n      ORDER BY salary DESC\n    ) AS rn\n  FROM emp\n) t\nWHERE rn <= 3;\n\n-- Use DENSE_RANK() instead of ROW_NUMBER()\n-- when employees with the same salary should share a rank.",
      },
      {
        description:
          "A running total is the cumulative sum of values from the first record up to the current record. SUM() with an OVER() clause calculates this without using loops or joining the table to itself. ORDER BY decides the sequence in which the values are added.",
        example:
          "Imagine a bank passbook. The first transaction adds ₹1,000, the next adds ₹500 and the next adds ₹200. The running balance becomes ₹1,000, ₹1,500 and ₹1,700. A running total works in the same way.",
        code: "-- Calculate running total of transaction amounts\nSELECT\n  day,\n  amount,\n  SUM(amount) OVER (\n    ORDER BY day\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM transactions\nORDER BY day;",
      },
      {
        description:
          "When moving data from one database to another, insert parent records before child records because foreign keys require the parent record to exist. For example, load Customers first, then Orders, and finally Order Items. Load large data in batches and validate record counts and foreign key relationships before switching the application to the new database.",
        example:
          "Imagine moving customer and order information from an old shopping application to a new application. An order belongs to a customer, and order items belong to an order. Therefore, customers must be migrated first, orders second and order items last. Otherwise, the new database may reject records because their parent records do not exist.",
        code: "-- Step 1: Migrate parent records first\nINSERT INTO customers\nSELECT * FROM legacy.customers;\n\n-- Step 2: Migrate orders\nINSERT INTO orders\nSELECT * FROM legacy.orders;\n\n-- Step 3: Migrate order items\nINSERT INTO order_items\nSELECT * FROM legacy.order_items;\n\n-- Step 4: Check for orders without customers\n-- This query should return zero rows.\nSELECT o.id\nFROM orders o\nLEFT JOIN customers c\n  ON o.customer_id = c.id\nWHERE c.id IS NULL;\n\n-- In production, migrate in batches and compare\n-- source and target record counts.",
      },
      {
        description:
          "OFFSET and keyset pagination are two ways to fetch records page by page. OFFSET tells the database how many earlier rows to skip. This can become slow for very large page numbers because the database may need to process many rows before returning the requested page. Keyset pagination uses the last record's sorting values to fetch the next set of records. It can be faster with a suitable index and a stable sorting order.",
        example:
          "Imagine a shopping application with 10 lakh products. A user opens page 1 and then page 50,000. OFFSET may require the database to skip a very large number of records. With keyset pagination, the application remembers the last product's date and ID and directly asks for the next records.",
        code: "-- Method 1: OFFSET pagination\nSELECT id, title, created_at\nFROM posts\nORDER BY created_at DESC, id DESC\nLIMIT 20 OFFSET 100000;\n\n-- Method 2: Keyset pagination\n-- Pass the last row's created_at and id\nSELECT id, title, created_at\nFROM posts\nWHERE (created_at, id) < (:last_ts, :last_id)\nORDER BY created_at DESC, id DESC\nLIMIT 20;\n\n-- Supporting index (PostgreSQL)\nCREATE INDEX idx_posts_created_id\nON posts(created_at DESC, id DESC);",
      },
      {
        description:
          "The order of columns in a composite index matters. A composite index contains more than one column. If a query filters using brand and in_stock and sorts by price, an index on (brand, in_stock, price) may help the database filter and sort efficiently. The best column order depends on the query conditions, data distribution and database execution plan.",
        example:
          "Imagine an online shopping application. A customer selects Nike products, chooses only products that are in stock and sorts them by price. An index on brand, in_stock and price may help the database find those products more efficiently.",
        code: "-- Create a composite index\nCREATE INDEX idx_product_brand_stock_price\nON products(brand, in_stock, price);\n\n-- Query using the indexed columns\nEXPLAIN ANALYZE\nSELECT id, name, price\nFROM products\nWHERE brand = 'Nike'\n  AND in_stock = TRUE\nORDER BY price ASC;\n\n-- Check the execution plan to see whether\n-- the database uses the index effectively.",
      },
    ],
  },

  java: {
    important: [
      {
        description:
          "OOP has four main concepts. Encapsulation means protecting data inside a class. Inheritance means reusing code from a parent class. Polymorphism means one method can behave differently. Abstraction means showing only necessary details and hiding internal implementation.",
        example:
          "Think about a payment application. You click Pay without knowing how the payment happens internally. Credit Card and UPI payments work differently, but both provide the same payment operation.",
        code: `abstract class Payment {
    abstract void pay(double amount);
}

class UpiPayment extends Payment {
    @Override
    void pay(double amount) {
        System.out.println("Paid using UPI: " + amount);
    }
}

class CardPayment extends Payment {
    @Override
    void pay(double amount) {
        System.out.println("Paid using Card: " + amount);
    }
}

Payment payment = new UpiPayment();
payment.pay(500);`,
      },
      {
        description:
          "== checks whether two object references point to the same object. equals() checks whether their contents are equal. hashCode() returns a number used by HashMap and HashSet to find objects quickly. If two objects are equal using equals(), they must have the same hashCode().",
        example:
          "Two people can have the same name but are different people. Similarly, two String objects can contain the same text but be different objects in memory.",
        code: `String a = new String("Java");
String b = new String("Java");

System.out.println(a == b);       // false
System.out.println(a.equals(b));  // true
System.out.println(a.hashCode() == b.hashCode()); // true

// Important rule:
// If a.equals(b) is true,
// a.hashCode() must equal b.hashCode().`,
      },
      {
        description:
          "String cannot be changed after creation. StringBuilder can be changed and is best when one thread builds text. StringBuffer is also changeable, but its methods are synchronized, making individual operations thread-safe.",
        example:
          "When joining 1,000 names into one message, using String creates many temporary objects. StringBuilder keeps adding text to the same object, making it more efficient.",
        code: `String name = "Java";
name.concat(" Developer");
System.out.println(name); // Java: String is immutable

StringBuilder builder = new StringBuilder("Java");
builder.append(" Developer");
System.out.println(builder); // Java Developer

StringBuffer buffer = new StringBuffer("Hello");
buffer.append(" World");
System.out.println(buffer); // Hello World`,
      },
      {
        description:
          "final is a keyword that prevents reassignment, overriding, or inheritance depending on where it is used. finally is a block used for cleanup after try/catch. finalize() was an old cleanup method and is deprecated; do not use it.",
        example:
          "A final variable is like a fixed ticket number that cannot be changed. A finally block is like making sure a room is cleaned after an activity, whether the activity succeeds or fails.",
        code: `final int MAX_LIMIT = 100;

// finally executes after try/catch
try {
    int result = 10 / 2;
    System.out.println(result);
} catch (Exception e) {
    System.out.println("Error occurred");
} finally {
    System.out.println("Cleanup completed");
}

// Avoid using finalize() for cleanup.`,
      },
      {
        description:
          "An abstract class is useful when related classes need common fields, constructors, and shared methods. An interface is useful when different classes need to follow the same contract. A class can extend only one class but can implement multiple interfaces. Interfaces can also have default and static methods.",
        example:
          "Different employees may share common employee details, so an abstract Employee class is useful. But different classes such as Employee and Robot can both implement a Workable interface.",
        code: `abstract class Employee {
    String name;

    Employee(String name) {
        this.name = name;
    }

    abstract void work();
}

interface Payable {
    void calculateSalary();

    default void printPayment() {
        System.out.println("Payment processed");
    }
}

class Developer extends Employee implements Payable {
    Developer(String name) {
        super(name);
    }

    void work() {
        System.out.println(name + " writes code");
    }

    public void calculateSalary() {
        System.out.println("Salary calculated");
    }
}`,
      },
      {
        description:
          "Overloading means using the same method name with different parameters. The compiler decides which overloaded method to call. Overriding means a child class provides its own implementation of a parent class method. The actual object decides which overridden method runs.",
        example:
          "A calculator can have add(int, int) and add(double, double). That is overloading. A parent Vehicle class may have start(), and Car can provide its own start() implementation. That is overriding.",
        code: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}

class Vehicle {
    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {
    @Override
    void start() {
        System.out.println("Car starts");
    }
}

// Overloading
Calculator calculator = new Calculator();
System.out.println(calculator.add(10, 20));

// Overriding
Vehicle vehicle = new Car();
vehicle.start();`,
      },
      {
        description:
          "Checked exceptions are checked by the compiler. You must handle them using try/catch or declare them using throws. Unchecked exceptions happen at runtime and do not require mandatory handling. Use meaningful exceptions and handle errors where you can take useful action.",
        example:
          "A file may not exist, so reading it can cause IOException, a checked exception. Passing a negative age to a method is an invalid input, so IllegalArgumentException is suitable.",
        code: `// Checked exception
try {
    String content = Files.readString(Path.of("data.txt"));
} catch (IOException e) {
    System.out.println("Unable to read file");
}

// Unchecked exception
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException(
            "Age cannot be negative"
        );
    }
}`,
      },
      {
        description:
          "The stack stores method calls and their local variables for each thread. The heap stores objects created by the application and is shared between threads. Static class information and metadata are stored in JVM-managed areas such as Metaspace. Actual storage can be optimized by the JVM.",
        example:
          "When you call a method to create an order, the method's current execution is tracked on the thread's stack. The Order object is generally created on the heap and can be used by other code that has a reference to it.",
        code: `class Order {
    String orderId;
}

void createOrder() {
    int quantity = 2;       // local variable
    Order order = new Order(); // object generally on heap

    order.orderId = "ORD101";
}

// Each thread has its own stack.
// Objects on the heap can be shared.`,
      },
      {
        description:
          "Garbage Collection automatically removes objects that the application can no longer reach. This helps free heap memory. Different collectors provide different balances between application speed and pause time. The best collector depends on your application and JDK configuration.",
        example:
          "Imagine a shopping cart object created for a request. Once nobody uses that cart and no reference points to it, the garbage collector can reclaim its memory. But an object kept forever in a cache cannot be collected.",
        code: `class Demo {
    public static void main(String[] args) {
        Order order = new Order();

        order = null;
        // The previous Order object may now be
        // eligible for garbage collection.

        System.gc(); // Request GC; not guaranteed
    }
}

// Enable GC logs on modern JDKs:
// java -Xlog:gc* -jar app.jar`,
      },
      {
        description:
          "List stores elements in order and allows duplicates. Set stores unique elements. Map stores key-value pairs, where each key is unique. Common implementations include ArrayList, HashSet, HashMap, LinkedHashMap, and TreeMap.",
        example:
          "A shopping list can contain the same product more than once, so use List. A list of unique email addresses can use Set. To find a product using its product ID, use Map.",
        code: `List<String> names = new ArrayList<>();
names.add("Ravi");
names.add("Ravi"); // duplicates allowed

Set<String> emails = new HashSet<>();
emails.add("a@gmail.com");
emails.add("a@gmail.com"); // duplicate ignored

Map<Integer, String> employees = new HashMap<>();
employees.put(101, "Ravi");
employees.put(102, "Kumar");

System.out.println(employees.get(101)); // Ravi`,
      },
      {
        description:
          "HashMap stores data as key-value pairs. It uses the key's hashCode() to identify a bucket. If multiple keys reach the same bucket, a collision occurs. HashMap handles collisions using a linked structure and can convert a heavily populated bucket into a tree. It also resizes when its capacity threshold is crossed.",
        example:
          "Think of a library where books are arranged using shelf numbers. A hash helps find the shelf quickly. If multiple books are assigned to the same shelf, the library needs another way to distinguish them.",
        code: `Map<Integer, String> employees = new HashMap<>();

employees.put(101, "Ravi");
employees.put(102, "Kumar");

System.out.println(employees.get(101));

// Simplified HashMap concepts:
// 1. key.hashCode() helps calculate a bucket.
// 2. equals() identifies the correct key.
// 3. Collisions are handled inside a bucket.
// 4. The map can resize as it grows.
// Default load factor is commonly 0.75.`,
      },
      {
        description:
          "ArrayList uses a dynamic array. It is fast when accessing elements by index, but inserting or deleting in the middle requires shifting elements. LinkedList uses connected nodes. Reaching an element by index takes more time. For most normal list operations, ArrayList is a good default choice.",
        example:
          "A numbered contact list where you frequently open contact number 500 is suitable for ArrayList. A queue where you frequently add and remove from the beginning or end can use ArrayDeque.",
        code: `List<String> arrayList = new ArrayList<>();
arrayList.add("Java");
arrayList.add("Spring");

System.out.println(arrayList.get(0)); // Fast index access

List<String> linkedList = new LinkedList<>();
linkedList.add("Java");
linkedList.add("Spring");

// LinkedList must traverse nodes for index access.

// For queue/stack operations:
Deque<String> queue = new ArrayDeque<>();
queue.addLast("Task 1");
queue.addLast("Task 2");
System.out.println(queue.removeFirst());`,
      },
      {
        description:
          "synchronized allows only one thread at a time to enter a protected block and also provides visibility guarantees. volatile makes the latest value visible across threads, but does not make operations such as count++ atomic. Lock provides more control, such as tryLock() and interruptible locking.",
        example:
          "If one thread updates a shared configuration flag and other threads only read it, volatile may be enough. If many threads update a bank balance, use synchronized, Lock, or an atomic operation to avoid lost updates.",
        code: `volatile boolean running = true;

// Protect multiple steps as one operation
synchronized void withdraw(int amount) {
    balance -= amount;
}

// Lock gives additional control
Lock lock = new ReentrantLock();

lock.lock();
try {
    balance -= 100;
} finally {
    lock.unlock();
}

// volatile does not make count++ atomic.`,
      },
      {
        description:
          "Deadlock happens when threads wait forever for locks held by each other. Livelock happens when threads keep reacting to each other but make no progress. Starvation happens when a thread rarely gets the resource it needs. Prevent these by using consistent lock ordering, timeouts, and fair resource management where appropriate.",
        example:
          "Two people each hold one key and wait for the other person's key. Nobody can continue. This is similar to deadlock when two threads hold different locks and wait for each other.",
        code: `// Example of consistent lock ordering
Object first = lockA;
Object second = lockB;

// Always acquire locks in the same order
synchronized (first) {
    synchronized (second) {
        System.out.println("Work completed");
    }
}

// With ReentrantLock, tryLock with timeout
if (lock.tryLock(2, TimeUnit.SECONDS)) {
    try {
        // Critical work
    } finally {
        lock.unlock();
    }
}`,
      },
      {
        description:
          "A lambda is a short way to write a function. It works with a functional interface, which has one abstract method. Predicate checks a condition, Function converts one value into another, Supplier provides a value, and Consumer accepts a value and performs an action.",
        example:
          "In a shopping application, Predicate checks whether a product is cheap, Function extracts its name, Supplier creates a default product, and Consumer prints the product details.",
        code: `Predicate<Integer> isEven = n -> n % 2 == 0;

Function<String, Integer> length = s -> s.length();

Supplier<String> message = () -> "Hello Java";

Consumer<String> print = s -> System.out.println(s);

System.out.println(isEven.test(10)); // true
System.out.println(length.apply("Java")); // 4
System.out.println(message.get()); // Hello Java
print.accept("Welcome");`,
      },
      {
        description:
          "Streams help process collections of data in a readable way. filter() selects matching elements. map() transforms elements. reduce() combines elements into one result. collect() stores the result in a collection. Intermediate operations are generally lazy and run when a terminal operation is called.",
        example:
          "Imagine you have a list of employees. You want only active employees, extract their names, and store those names in another list. Streams let you do these steps as one pipeline.",
        code: `List<String> names = employees.stream()
    .filter(Employee::isActive)
    .map(Employee::getName)
    .collect(Collectors.toList());

// reduce example
int total = numbers.stream()
    .reduce(0, Integer::sum);

// collect is a terminal operation
// It triggers the stream pipeline.`,
      },
      {
        description:
          "Optional represents a value that may or may not be available. It helps avoid directly passing null values and makes the missing-value decision clear. Use orElse() for a default value and orElseThrow() when the value is required.",
        example:
          "When searching for a customer by ID, the customer may not exist. Optional allows you to return a default message or throw a clear exception instead of getting a NullPointerException later.",
        code: `Optional<String> customerName =
    Optional.ofNullable(findCustomerName(101));

String name = customerName.orElse("Guest");

// Throw an exception if the value is missing
String requiredName = customerName.orElseThrow(
    () -> new RuntimeException("Customer not found")
);

// Transform an available value
String upperName = customerName
    .map(String::toUpperCase)
    .orElse("UNKNOWN");`,
      },
      {
        description:
          "An immutable object cannot be changed after it is created. To create one, make the class final, keep fields private and final, initialize them through the constructor, and do not provide setters. Records provide a shorter way to create data carrier classes. Remember that a final reference does not automatically make its referenced object immutable.",
        example:
          "A date of birth should not unexpectedly change after a customer record is created. An immutable object helps protect important data from accidental changes.",
        code: `final class Employee {
    private final int id;
    private final String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

// Java 16+: record
record EmployeeInfo(int id, String name) {}

// Records provide accessors, equals, hashCode,
// and toString automatically.`,
      },
      {
        description:
          "The JVM loads Java classes using ClassLoaders. The common loading hierarchy includes Bootstrap, Platform, and Application ClassLoaders. After loading, the JVM verifies and executes bytecode. The JIT compiler can convert frequently executed bytecode into native machine code. Heap stores objects, stacks track method execution, and Metaspace stores class metadata.",
        example:
          "Java's built-in classes are loaded by the Bootstrap ClassLoader, while your application classes are generally loaded by the Application ClassLoader. Application servers can use different classloaders to isolate different applications.",
        code: `public class Main {
    public static void main(String[] args) {
        ClassLoader loader =
            Main.class.getClassLoader();

        System.out.println(loader);

        System.out.println(
            String.class.getClassLoader()
        ); // null: Bootstrap ClassLoader
    }
}

// See class-loading details:
// java -verbose:class Main`,
      },
      {
        description:
          "CompletableFuture helps run tasks asynchronously and combine their results. supplyAsync() starts a task, thenApply() transforms a result, thenCompose() chains another asynchronous task, thenCombine() combines two results, and allOf() waits for multiple tasks. Use timeouts and exception handling for reliable applications.",
        example:
          "A dashboard needs customer details and order details. Instead of calling one API and waiting before calling the other, both calls can run at the same time. The dashboard combines their results when both are ready.",
        code: `ExecutorService pool = Executors.newFixedThreadPool(2);

CompletableFuture<String> customer =
    CompletableFuture.supplyAsync(
        () -> "Customer details", pool
    );

CompletableFuture<String> orders =
    CompletableFuture.supplyAsync(
        () -> "Order details", pool
    );

CompletableFuture<String> dashboard =
    customer.thenCombine(
        orders,
        (c, o) -> c + " | " + o
    ).orTimeout(3, TimeUnit.SECONDS);

System.out.println(dashboard.join());

pool.shutdown();`,
      },
    ],

    scenarios: [
      {
        description:
          "Use groupingBy() to count how many times each element appears. Then filter the entries whose count is greater than one. This gives you all duplicate elements.",
        example:
          "Suppose a shopping list contains Apple, Banana, Apple, and Orange. You want to find which product names appear more than once.",
        code: `List<Integer> numbers =
    Arrays.asList(1, 2, 3, 2, 4, 1, 5);

List<Integer> duplicates = numbers.stream()
    .collect(Collectors.groupingBy(
        n -> n,
        Collectors.counting()
    ))
    .entrySet()
    .stream()
    .filter(entry -> entry.getValue() > 1)
    .map(Map.Entry::getKey)
    .collect(Collectors.toList());

System.out.println(duplicates); // [1, 2]`,
      },
      {
        description:
          "A thread-safe counter allows multiple threads to increase a value without losing updates. synchronized uses a lock. AtomicLong uses atomic operations. LongAdder spreads updates across multiple internal variables and is useful when many threads update the counter frequently.",
        example:
          "Imagine an application receiving thousands of requests. You need to count how many requests arrive. LongAdder is often a good choice for high-volume metrics, while AtomicLong is useful when you need an atomic current value.",
        code: `class Counter {
    private long count = 0;

    synchronized void increment() {
        count++;
    }
}

AtomicLong atomicCounter = new AtomicLong();
atomicCounter.incrementAndGet();

LongAdder adder = new LongAdder();
adder.increment();

System.out.println(adder.sum());

// Use:
// synchronized - simple lock-based protection
// AtomicLong   - atomic single-value updates
// LongAdder    - high-contention counters`,
      },
      {
        description:
          "Create a ConcurrentHashMap to store cache entries safely when multiple threads access the cache. Each entry should contain the value and its expiry time. When reading, check whether it has expired. Remove expired entries and periodically clean entries that are not accessed.",
        example:
          "A currency exchange rate may be cached for 60 seconds. If someone requests the rate after 60 seconds, the application should treat the cached value as expired and fetch a fresh rate.",
        code: `record CacheEntry(String value, long expiresAt) {}

Map<String, CacheEntry> cache =
    new ConcurrentHashMap<>();

void put(String key, String value, long ttlMillis) {
    long expiry = System.currentTimeMillis() + ttlMillis;
    cache.put(key, new CacheEntry(value, expiry));
}

String get(String key) {
    CacheEntry entry = cache.get(key);

    if (entry == null) {
        return null;
    }

    if (System.currentTimeMillis() >= entry.expiresAt()) {
        cache.remove(key, entry);
        return null;
    }

    return entry.value();
}

// Example:
// put("USD-INR", "83.50", 60_000);
// System.out.println(get("USD-INR"));`,
      },
      {
        description:
          "A producer-consumer deadlock can happen when threads wait incorrectly or hold locks while waiting. First identify blocked threads using a thread dump. For a normal producer-consumer problem, use BlockingQueue instead of manually managing wait() and notify(). BlockingQueue handles waiting and signaling safely.",
        example:
          "Think about a restaurant. The kitchen prepares food and puts it on a counter. Waiters take food from the counter. If the counter is empty, waiters wait. If it is full, the kitchen waits. BlockingQueue manages this coordination.",
        code: `BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(10);

// Producer
Thread producer = new Thread(() -> {
    try {
        queue.put("Order 1");
        queue.put("Order 2");
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

// Consumer
Thread consumer = new Thread(() -> {
    try {
        String order = queue.take();
        System.out.println("Processing: " + order);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

producer.start();
consumer.start();

// put() waits if the queue is full.
// take() waits if the queue is empty.`,
      },
      {
        description:
          "Do not load the entire 2 GB file into memory. Read it in small pieces, such as one line at a time, using BufferedReader or Files.lines(). Process each line and keep only the information you need. For very large files, also consider batching and streaming output.",
        example:
          "Suppose you need to calculate the total amount from a 2 GB order CSV file. Reading the complete file into a List can use too much heap memory. Reading one line at a time keeps memory usage much lower.",
        code: `Path path = Path.of("orders.csv");

long total = 0;

try (BufferedReader reader =
         Files.newBufferedReader(path)) {

    String line;
    boolean header = true;

    while ((line = reader.readLine()) != null) {
        if (header) {
            header = false;
            continue;
        }

        String[] columns = line.split(",");
        total += Long.parseLong(columns[4]);
    }
}

System.out.println("Total: " + total);

// Avoid Files.readAllLines() for huge files.`,
      },
      {
        description:
          "For CPU-heavy tasks, start with a thread pool close to the number of available CPU cores. For IO-heavy tasks, more threads may be useful because many threads spend time waiting for network or database responses. Use bounded queues, timeouts, and monitoring. Measure and tune instead of blindly choosing a thread count.",
        example:
          "A report calculation uses the CPU continuously, so too many threads may slow it down. An API service spends much of its time waiting for other services, so it may benefit from a larger pool.",
        code: `int cpuCores =
    Runtime.getRuntime().availableProcessors();

// Starting point for CPU-heavy tasks
ExecutorService cpuPool =
    Executors.newFixedThreadPool(cpuCores);

// IO-heavy work: choose a measured limit
int ioThreads = cpuCores * 4;

ThreadPoolExecutor ioPool =
    new ThreadPoolExecutor(
        ioThreads,
        ioThreads,
        0L,
        TimeUnit.MILLISECONDS,
        new ArrayBlockingQueue<>(500),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

// Tune pool sizes using actual workload metrics.`,
      },
      {
        description:
          "First count how many times each word appears. Then find the K words with the highest counts. Sorting all words is easy for smaller data. For large numbers of unique words, use a PriorityQueue of size K to reduce sorting work. If the file is too large for the available memory, use external or distributed processing.",
        example:
          "In application logs, you may want to find the 10 error messages that occur most frequently. Count each message and return only the top 10.",
        code: `Map<String, Long> frequency = new HashMap<>();

Path path = Path.of("words.txt");

try (Stream<String> lines = Files.lines(path)) {
    lines.flatMap(line -> Arrays.stream(
            line.toLowerCase().split("\\\\W+")
        ))
        .filter(word -> !word.isBlank())
        .forEach(word ->
            frequency.merge(word, 1L, Long::sum)
        );
}

List<String> topK = frequency.entrySet()
    .stream()
    .sorted(Map.Entry.<String, Long>
        comparingByValue().reversed())
    .limit(10)
    .map(Map.Entry::getKey)
    .collect(Collectors.toList());

System.out.println(topK);

// For very large frequency maps, consider a
// PriorityQueue or external/distributed processing.`,
      },
      {
        description:
          "For a linked list, use Floyd's Cycle Detection Algorithm. Keep two pointers: slow moves one step and fast moves two steps. If they meet, a cycle exists. For a directed graph, use DFS with visited and recursion-stack states to detect a cycle.",
        example:
          "Imagine following links between pages. If one page eventually points back to an earlier page, you can get stuck visiting the same pages repeatedly. Two pointers can detect this loop in a linked list.",
        code: `class Node {
    int value;
    Node next;

    Node(int value) {
        this.value = value;
    }
}

boolean hasCycle(Node head) {
    Node slow = head;
    Node fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}

// Time: O(n)
// Extra space: O(1)`,
      },
      {
        description:
          "Use Optional at places where a value may be missing. Chain map() calls to safely access nested values. Use orElse() to provide a default or orElseThrow() when the value is mandatory. Avoid using Optional.get() without checking whether a value exists.",
        example:
          "A customer may not have an address, and an address may not have a city. Instead of checking every field manually, Optional lets you safely navigate through these values.",
        code: `class Address {
    String getCity() {
        return "Bengaluru";
    }
}

class User {
    Address getAddress() {
        return new Address();
    }
}

User user = getUser();

String city = Optional.ofNullable(user)
    .map(User::getAddress)
    .map(Address::getCity)
    .orElse("City not available");

System.out.println(city);

// getUser() may return null.
// Replace the example classes/methods with
// your application's actual model and service.`,
      },
      {
        description:
          "Start all three independent API calls using CompletableFuture.supplyAsync(). Use allOf() to wait until all calls finish. Add a timeout so the operation does not wait forever. Handle exceptions so one failed API call can be managed properly.",
        example:
          "A dashboard needs customer details, order details, and payment details. These APIs do not depend on each other, so call them at the same time. The dashboard can display the combined result after all three calls finish.",
        code: `ExecutorService pool = Executors.newFixedThreadPool(3);

CompletableFuture<String> customer =
    CompletableFuture.supplyAsync(
        () -> customerApi(), pool
    );

CompletableFuture<String> orders =
    CompletableFuture.supplyAsync(
        () -> orderApi(), pool
    );

CompletableFuture<String> payments =
    CompletableFuture.supplyAsync(
        () -> paymentApi(), pool
    );

CompletableFuture<Void> all =
    CompletableFuture.allOf(customer, orders, payments)
        .orTimeout(3, TimeUnit.SECONDS);

try {
    all.join();

    String customerResult = customer.join();
    String orderResult = orders.join();
    String paymentResult = payments.join();

    System.out.println(customerResult);
    System.out.println(orderResult);
    System.out.println(paymentResult);

} catch (CompletionException e) {
    System.out.println("One or more API calls failed or timed out");
} finally {
    pool.shutdown();
}

// Replace customerApi(), orderApi(), and paymentApi()
// with your actual API integration methods.`,
      },
    ],
  },

  "spring-boot": {
    important: [
      {
        description:
          "Spring Boot makes it easier to build Java applications using the Spring Framework. It reduces manual configuration by providing auto-configuration, starter dependencies, embedded servers, and production monitoring tools.",
        example:
          "Without Spring Boot, you may need to configure a web server and many Spring components manually. With Spring Boot, you add the web starter and run your application directly using an embedded server.",
        code: `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Add spring-boot-starter-web to build REST APIs.`,
      },
      {
        description:
          "Spring Framework provides the core features such as dependency injection, Spring MVC, and transaction management. Spring Boot is built on top of Spring and provides ready-made configuration and defaults. Spring Boot does not replace Spring; it makes Spring easier to configure.",
        example:
          "Spring Framework is like buying furniture and arranging everything yourself. Spring Boot is like getting a furnished house where most things are already arranged, but you can still customize them.",
        code: `// Spring configuration can be written manually.
@Configuration
class AppConfig {
    @Bean
    MyService myService() {
        return new MyService();
    }
}

// Spring Boot also provides automatic configuration
// based on dependencies and application settings.`,
      },
      {
        description:
          "Spring Boot auto-configuration checks which libraries are available, which configuration properties are set, and which beans already exist. Based on these conditions, it creates the required beans automatically. If you define your own bean, Boot can back off from creating its default bean.",
        example:
          "When you add the Spring Data JPA starter and a database driver, Spring Boot can configure a DataSource and JPA components using your database settings. If a required driver or property is missing, the related configuration may not apply.",
        code: `@Configuration
@ConditionalOnClass(JdbcTemplate.class)
@ConditionalOnMissingBean(JdbcTemplate.class)
class MyJdbcConfiguration {

    @Bean
    JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

// Run with --debug to view the condition evaluation report.`,
      },
      {
        description:
          "@SpringBootApplication is the main annotation used to start a Spring Boot application. It combines three annotations: @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
        example:
          "If your main application class is inside com.example, Spring normally scans that package and its sub-packages to find services, repositories, and controllers. Keeping the main class at the root package avoids many bean-scanning problems.",
        code: `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Equivalent combination:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan`,
      },
      {
        description:
          "Spring Boot Starters are ready-made dependency groups for common application requirements. They bring the required libraries together and help maintain compatible dependency versions.",
        example:
          "For a REST API, spring-boot-starter-web provides Spring MVC and the required web libraries. For database access, you can add spring-boot-starter-data-jpa instead of selecting every JPA dependency manually.",
        code: `// Maven dependencies

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`,
      },
      {
        description:
          "Dependency Injection means Spring creates required objects and provides them to other objects. The class does not need to create its dependencies using new. Constructor injection is generally preferred because dependencies are clear and can be declared final.",
        example:
          "An OrderService needs a PaymentService. Instead of creating PaymentService inside OrderService, Spring creates both objects and passes PaymentService through the OrderService constructor.",
        code: `@Service
class PaymentService {
    void pay() {
        System.out.println("Payment completed");
    }
}

@Service
class OrderService {
    private final PaymentService paymentService;

    OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    void placeOrder() {
        paymentService.pay();
    }
}`,
      },
      {
        description:
          "@Component is a general annotation for a Spring-managed class. @Service is commonly used for business logic, @Repository for database access, and @Controller for handling web requests. They are specialized forms of @Component. @Repository also supports translation of persistence exceptions.",
        example:
          "In an order application, OrderController receives HTTP requests, OrderService applies business rules, and OrderRepository communicates with the database.",
        code: `@Component
class EmailFormatter {
}

@Service
class OrderService {
}

@Repository
class OrderRepository {
}

@Controller
class PageController {
}`,
      },
      {
        description:
          "@Component is placed on a class so Spring can discover and create that class. @Bean is placed on a method inside a configuration class, and the object returned by that method becomes a Spring bean. Use @Bean when you need to configure a class that you do not own.",
        example:
          "You can add @Component to your own OrderService class. But you cannot normally add @Component to a third-party ObjectMapper class, so you create and configure it using a @Bean method.",
        code: `@Component
class OrderService {
}

@Configuration
class AppConfig {

    @Bean
    ObjectMapper objectMapper() {
        return new ObjectMapper()
            .findAndRegisterModules();
    }
}`,
      },
      {
        description:
          "Bean scope defines how many instances Spring creates. Singleton is the default and creates one instance per Spring container. Prototype creates a new instance whenever requested from the container. Web applications also support request, session, application, and WebSocket scopes.",
        example:
          "A stateless OrderService can be shared as a singleton. A shopping cart that belongs to one user session should not be stored as shared mutable state in a singleton service.",
        code: `@Service
class OrderService {
    // Singleton by default
}

@Component
@Scope("prototype")
class ReportBuilder {
    // New instance for each container lookup
}

@Component
@RequestScope
class RequestDetails {
    // One instance for each HTTP request
}`,
      },
      {
        description:
          "The Spring bean lifecycle starts when Spring creates a bean. It injects dependencies, runs initialization callbacks such as @PostConstruct, and then makes the bean available. During application shutdown, destruction callbacks such as @PreDestroy are called. BeanPostProcessors can also modify or wrap beans during this process.",
        example:
          "A cache service may load initial reference data after its dependencies are injected. When the application shuts down, it can close its resources using @PreDestroy.",
        code: `@Component
class CacheService {

    @PostConstruct
    void initialize() {
        System.out.println("Bean initialized");
    }

    @PreDestroy
    void cleanup() {
        System.out.println("Bean is shutting down");
    }
}`,
      },
      {
        description:
          "Spring Profiles allow different beans and configuration settings for different environments, such as development, testing, and production. You can activate a profile using configuration or an environment variable.",
        example:
          "In development, an application may use a local database. In production, it uses the actual production database. Profiles allow both environments to use the same application code with different configurations.",
        code: `@Service
@Profile("dev")
class MockPaymentService implements PaymentService {
}

@Service
@Profile("prod")
class RealPaymentService implements PaymentService {
}

// application.yml
spring:
  profiles:
    active: dev

// Or set:
// SPRING_PROFILES_ACTIVE=prod`,
      },
      {
        description:
          "Both application.properties and application.yml store application configuration. Properties uses a flat key=value format. YAML uses indentation and nested structures, which can be easier to read for complex configurations. YAML indentation must be correct.",
        example:
          "For a small application, properties may be simple to maintain. When database, security, and server settings have multiple nested values, YAML can be easier to organize.",
        code: `# application.properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/app

# application.yml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/app`,
      },
      {
        description:
          "@ConfigurationProperties binds a group of related configuration values into a Java class or record. It is useful when an application has many settings that belong together. It provides type-safe configuration and can support validation.",
        example:
          "A file upload service may need a storage bucket name, maximum file size, and allowed file types. Instead of using many separate @Value annotations, group these settings into one UploadProperties class.",
        code: `@ConfigurationProperties(prefix = "upload")
@Validated
public record UploadProperties(
    @NotBlank String bucket,
    @Min(1) int maxSizeMb
) {
}

// Enable using @ConfigurationPropertiesScan
// or @EnableConfigurationProperties.

// application.yml
upload:
  bucket: documents
  max-size-mb: 20`,
      },
      {
        description:
          "Spring Boot handles exceptions using Spring MVC exception handling. You can use @ExceptionHandler inside a controller for local handling, or @ControllerAdvice / @RestControllerAdvice for global handling. This helps return consistent HTTP status codes and error responses.",
        example:
          "If an order does not exist, the service can throw OrderNotFoundException. A global exception handler catches it and returns HTTP 404 instead of repeating try/catch blocks in every controller.",
        code: `@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    ResponseEntity<String> handleNotFound(
            OrderNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<String> handleGeneral(Exception ex) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Something went wrong");
    }
}`,
      },
      {
        description:
          "@Controller is generally used for MVC controllers that return view names or pages. @RestController combines @Controller and @ResponseBody, so returned objects are written directly into the HTTP response, commonly as JSON.",
        example:
          "A web page controller can return the name of a Thymeleaf page. A REST controller can return an Order object, which Spring serializes into JSON.",
        code: `@Controller
class PageController {

    @GetMapping("/home")
    String home() {
        return "home";
    }
}

@RestController
class OrderController {

    @GetMapping("/api/order")
    Order getOrder() {
        return new Order(101, "CREATED");
    }
}`,
      },
      {
        description:
          "@RequestMapping maps a URL to a controller or method. @GetMapping handles GET requests, @PostMapping handles POST, @PutMapping handles PUT, and @DeleteMapping handles DELETE. These are convenient shortcuts for @RequestMapping with a specific HTTP method.",
        example:
          "In an order application, GET /orders/10 retrieves an order, POST /orders creates one, PUT /orders/10 updates it, and DELETE /orders/10 removes it.",
        code: `@RestController
@RequestMapping("/orders")
class OrderController {

    @GetMapping("/{id}")
    Order get(@PathVariable long id) {
        return service.findById(id);
    }

    @PostMapping
    Order create(@RequestBody OrderDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    Order update(@PathVariable long id,
                 @RequestBody OrderDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable long id) {
        service.delete(id);
    }
}`,
      },
      {
        description:
          "@PathVariable reads a value from the URL path. @RequestParam reads a query parameter. @RequestBody converts the request body, usually JSON, into a Java object.",
        example:
          "GET /orders/101 uses 101 as the order ID. GET /orders?status=SHIPPED uses status as a filter. POST /orders with JSON data uses @RequestBody to receive the new order details.",
        code: `@GetMapping("/orders/{id}")
Order getOrder(@PathVariable long id) {
    return service.findById(id);
}

@GetMapping("/orders")
List<Order> search(
        @RequestParam(required = false) String status,
        @RequestParam(defaultValue = "0") int page) {
    return service.search(status, page);
}

@PostMapping("/orders")
Order create(@RequestBody OrderDto dto) {
    return service.create(dto);
}`,
      },
      {
        description:
          "@Valid triggers validation on a request object using Jakarta Bean Validation annotations such as @NotBlank, @Email, @Min, and @Size. If validation fails, Spring raises a validation exception that can be converted into an HTTP 400 response.",
        example:
          "If a user submits an order with quantity -5, the request should be rejected before the business logic saves invalid data to the database.",
        code: `public record OrderDto(
    @NotBlank String productName,
    @Min(1) int quantity,
    @Email String email
) {
}

@RestController
class OrderController {

    @PostMapping("/orders")
    Order create(@Valid @RequestBody OrderDto dto) {
        return service.create(dto);
    }
}`,
      },
      {
        description:
          "CORS controls which browser-based websites are allowed to call your API from a different origin. You can configure allowed origins, HTTP methods, and headers globally or using @CrossOrigin. Requests with certain methods or headers may first trigger an OPTIONS preflight request.",
        example:
          "Your React application runs on localhost:3000 and your Spring Boot API runs on localhost:8080. The browser may block the request unless the API allows the frontend origin.",
        code: `@Configuration
class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods(
                "GET", "POST", "PUT", "DELETE"
            )
            .allowedHeaders("*");
    }
}`,
      },
      {
        description:
          "In Spring MVC, an incoming request first passes through servlet filters. DispatcherServlet receives it and finds the matching controller using HandlerMapping. HandlerAdapter invokes the controller. Message converters serialize the response, commonly into JSON. Exception handlers manage errors.",
        example:
          "When a client calls GET /orders/101, the request passes through security and logging filters, reaches DispatcherServlet, gets mapped to the OrderController method, and the returned Order object is converted into JSON.",
        code: `// Simplified Spring MVC request flow:
//
// Client request
//      |
// Servlet Filters
//      |
// DispatcherServlet
//      |
// HandlerMapping
//      |
// HandlerAdapter
//      |
// Controller
//      |
// Service -> Repository
//      |
// HttpMessageConverter (Jackson)
//      |
// HTTP response`,
      },
    ],

    scenarios: [
      {
        description:
          "@Transactional normally rolls back automatically for RuntimeException and Error, but not for every checked exception. Rollback can also fail if the method is called through self-invocation, the method is not intercepted by the Spring proxy, or the exception is caught and swallowed. Use rollbackFor when checked exceptions should trigger rollback.",
        example:
          "Suppose an order is saved and then payment processing fails. If the exception is caught without being rethrown, the transaction may commit. The order could remain saved even though payment failed.",
        code: `@Service
class OrderService {

    @Transactional(rollbackFor = Exception.class)
    public void placeOrder() throws Exception {
        orderRepository.save(new Order());

        // If this throws, the transaction rolls back.
        paymentService.processPayment();
    }
}

// Avoid calling a transactional method using
// this.saveOrder() from another method in the same bean.
// Self-invocation bypasses the Spring proxy.`,
      },
      {
        description:
          "When auto-configuration does not create a bean, run the application with --debug or set debug=true. Check the condition evaluation report to see which conditions matched or failed. Then verify the dependency, configuration properties, package scanning, and whether another bean caused the default configuration to back off.",
        example:
          "You expect Spring Boot to create a DataSource, but it does not. The report may show that the database driver is missing or the required URL is not configured. This gives you a clear starting point for debugging.",
        code: `// Run the application with:
java -jar app.jar --debug

// Or in application.properties:
debug=true

// Inspect the Condition Evaluation Report.
// Check:
// 1. Did the required class exist?
// 2. Were required properties present?
// 3. Did another bean cause auto-configuration to back off?`,
      },
      {
        description:
          "N+1 happens when one query loads a list of records and then an additional query runs for each record to load related data. Detect it using SQL logs, Hibernate statistics, or monitoring tools. Fix it with fetch joins, EntityGraph, or batch fetching, depending on the use case.",
        example:
          "A page displays 50 orders and each order loads its items separately. Instead of one query plus 50 more queries, fetch the required related data more efficiently.",
        code: `// JPQL fetch join
@Query("""
    SELECT DISTINCT o
    FROM Order o
    LEFT JOIN FETCH o.items
    WHERE o.status = :status
""")
List<Order> findOrdersWithItems(
    @Param("status") String status
);

// Alternative: use @EntityGraph
@EntityGraph(attributePaths = "items")
List<Order> findByStatus(String status);

// Check generated SQL before choosing a fix.
// Be careful with collection fetch joins and pagination.`,
      },
      {
        description:
          "Optimistic locking prevents one user from silently overwriting another user's changes. Add @Version to the entity. When two users update the same row, the first update succeeds and the second detects that the version has changed. Return HTTP 409 Conflict and ask the client to refresh or resolve the conflict.",
        example:
          "Two support employees edit the same customer record. The first saves successfully. When the second tries to save the old version, the application rejects it instead of losing the first employee's changes.",
        code: `@Entity
class Customer {
    @Id
    private Long id;

    private String name;

    @Version
    private Long version;
}

// In the API exception handler:
@ExceptionHandler({
    OptimisticLockingFailureException.class,
    OptimisticLockException.class
})
ResponseEntity<String> handleConflict(Exception ex) {
    return ResponseEntity
        .status(HttpStatus.CONFLICT)
        .body("Record changed. Please refresh and retry.");
}`,
      },
      {
        description:
          "Use @RestControllerAdvice to handle application exceptions in one place. Create handlers for common errors such as not found, validation failure, business rule failure, and unexpected errors. Return consistent response bodies and correct HTTP status codes. Do not expose internal stack traces to clients.",
        example:
          "If an order is missing, return 404. If request data is invalid, return 400. If a business rule prevents the operation, return an appropriate 409 or 422 response. Unexpected failures should return a safe 500 response.",
        code: `@RestControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    ResponseEntity<String> notFound(Exception ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<String> validation(Exception ex) {
        return ResponseEntity
            .badRequest()
            .body("Request validation failed");
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<String> general(Exception ex) {
        // Log full exception details on the server.
        return ResponseEntity
            .status(500)
            .body("Internal server error");
    }
}`,
      },
      {
        description:
          "First measure where the endpoint spends its time. Check database queries, external API calls, CPU usage, thread blocking, and garbage collection. Use logs, metrics, traces, thread dumps, and profilers. Fix the actual bottleneck and measure again.",
        example:
          "An endpoint takes two seconds. SQL logs reveal repeated queries, and tracing shows two external API calls are running one after another. Fixing the repeated queries and calling independent APIs in parallel may reduce the response time.",
        code: `// Useful production monitoring settings
// application.yml

management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true

// Investigate:
// 1. SQL logs for N+1 queries
// 2. Distributed traces for slow API calls
// 3. Thread dumps for blocked threads
// 4. CPU and GC profiles for resource bottlenecks`,
      },
      {
        description:
          "A circular dependency occurs when Bean A needs Bean B and Bean B also needs Bean A. Constructor injection makes this problem visible during startup. The best solution is usually to redesign the classes and remove the circular relationship. @Lazy can sometimes defer bean creation, but it should not hide a poor design.",
        example:
          "OrderService calls InventoryService, and InventoryService calls OrderService. Instead of both services depending directly on each other, extract shared logic into another service or use an event-based approach.",
        code: `// Better design: both services use a third service.

@Service
class OrderService {
    private final InventoryService inventoryService;

    OrderService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }
}

@Service
class InventoryService {
    private final InventoryRepository repository;

    InventoryService(InventoryRepository repository) {
        this.repository = repository;
    }
}

// If appropriate, an event can also remove
// the direct dependency between services.`,
      },
      {
        description:
          "JWT authentication commonly uses two tokens. The access token is short-lived and sent with API requests. The refresh token lasts longer and is used to obtain a new access token. Rotate refresh tokens when used, store them securely, and revoke them when a user logs out or token reuse is detected.",
        example:
          "A user logs in and receives an access token and refresh token. When the access token expires, the frontend sends the refresh token to the refresh endpoint and receives a new token pair without asking the user to log in again.",
        code: `// Simplified token flow:
//
// 1. POST /auth/login
//    -> verify username and password
//    -> return access token + refresh token
//
// 2. API request:
//    Authorization: Bearer <access-token>
//
// 3. When access token expires:
//    POST /auth/refresh
//    -> validate refresh token
//    -> rotate refresh token
//    -> return new token pair
//
// 4. Logout:
//    -> revoke refresh token/session
//
// Use HTTPS and secure refresh-token storage.
// Never put signing secrets in source code.`,
      },
      {
        description:
          "Call independent APIs concurrently with timeouts. Decide which APIs are mandatory and which are optional. If a mandatory API fails, fail the overall operation. If an optional API fails, return a fallback value and allow the rest of the response to succeed. Use circuit breakers and bulkheads for additional protection.",
        example:
          "A product page needs price, stock, and reviews. Price is mandatory, but reviews are optional. If the reviews service is down, show the product without reviews instead of failing the entire page.",
        code: `ExecutorService pool = Executors.newFixedThreadPool(3);

CompletableFuture<Price> price =
    CompletableFuture.supplyAsync(
        () -> priceApi.getPrice(), pool
    ).orTimeout(2, TimeUnit.SECONDS);

CompletableFuture<Stock> stock =
    CompletableFuture.supplyAsync(
        () -> stockApi.getStock(), pool
    ).orTimeout(2, TimeUnit.SECONDS);

CompletableFuture<List<Review>> reviews =
    CompletableFuture.supplyAsync(
        () -> reviewApi.getReviews(), pool
    )
    .completeOnTimeout(
        List.of(), 1, TimeUnit.SECONDS
    )
    .exceptionally(ex -> List.of());

try {
    CompletableFuture.allOf(price, stock, reviews).join();

    ProductPage result = new ProductPage(
        price.join(),
        stock.join(),
        reviews.join()
    );
} finally {
    pool.shutdown();
}

// Example policy: price and stock are required;
// reviews can use an empty fallback.`,
      },
      {
        description:
          "Before production, check externalized configuration and secure secrets, health and readiness endpoints, structured logs, metrics, distributed tracing, database connection pools, API timeouts, security settings, resource limits, and graceful shutdown. Also configure alerts and document how to respond to failures.",
        example:
          "Before deploying an order service, verify that Kubernetes can check its health, monitoring can track request latency, logs contain correlation IDs, and the application can finish active requests before shutting down.",
        code: `# application.yml

management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true

server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s

# Also configure outside source code:
# - Database credentials and secrets
# - Connection pool limits
# - External API timeouts
# - Container CPU and memory limits
# - Logs, metrics, traces and alerts`,
      },
    ],
  },

  microservices: {
    important: [
      {
        description:
          "A monolithic application keeps most features in one application and is usually deployed as one unit. Microservices split the application into smaller services that can be developed and deployed independently. A monolith is simpler to start with, while microservices provide independent scaling and deployment but introduce network communication and distributed-system complexity.",
        example:
          "A small shopping application can start as one application containing orders, payments, and products. As the business grows, separate teams may own Order Service, Payment Service, and Product Service and release them independently.",
        code: `// Monolith:
// One application
// Order + Payment + Product

// Microservices:
// order-service
// payment-service
// product-service

// Each service has its own deployment
// and communicates through APIs or events.`,
      },
      {
        description:
          "Database-per-service means each microservice owns its database or schema and other services cannot directly access its tables. This reduces database coupling and allows independent schema changes. The trade-off is that joining data across services becomes harder and often requires APIs or event-based data replication.",
        example:
          "Order Service should not directly query Payment Service's database. It can call Payment Service's API or consume payment events and maintain the payment information it needs locally.",
        code: `// Order Service owns its database.
orderRepository.save(order);

// Payment Service owns its database.
paymentRepository.save(payment);

// Order Service gets payment information through:
GET /payments/{paymentId}

// Or it consumes PaymentCompleted events.
// Do not directly query another service's tables.`,
      },
      {
        description:
          "Synchronous communication means the caller waits for a response, such as with REST or gRPC. Asynchronous communication uses messages or events, so the sender does not need to wait for the consumer to finish. Use synchronous calls when an immediate answer is required and asynchronous events for independent background work or event notifications.",
        example:
          "When placing an order, the application may synchronously check whether stock is available. After the order is placed, it can publish an event so email and analytics services process it independently.",
        code: `// Synchronous REST call
Stock stock = inventoryClient.getStock(productId);

// Asynchronous event
eventPublisher.publishEvent(
    new OrderPlaced(orderId)
);

// Other services can react to OrderPlaced
// without blocking the order API response.`,
      },
      {
        description:
          "An API Gateway is the entry point for clients calling multiple microservices. It can route requests, validate authentication, apply rate limits, handle TLS, and add common request information. It should not become a place for all business logic.",
        example:
          "A mobile application calls one gateway URL. The gateway sends order requests to Order Service and product requests to Product Service, so the mobile app does not need to know every internal service address.",
        code: `spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**

# Authentication and rate limiting can be
# configured using gateway filters.`,
      },
      {
        description:
          "Service discovery helps services find the network addresses of other service instances. A service registry such as Eureka or Consul can maintain instance information. Kubernetes commonly provides service discovery through DNS and Services. Load balancing distributes requests across healthy instances.",
        example:
          "If Order Service has three running instances of Inventory Service, it should not depend on one fixed IP address. It should resolve the service name and send requests to available instances.",
        code: `// Kubernetes service DNS example:
http://inventory-service.default.svc.cluster.local

// Spring Cloud LoadBalanced client example:
@Bean
@LoadBalanced
RestTemplate restTemplate() {
    return new RestTemplate();
}

// Call using the logical service name:
restTemplate.getForObject(
    "http://inventory-service/stock/101",
    Stock.class
);`,
      },
      {
        description:
          "Saga is a pattern for managing a business transaction across multiple microservices. Each service performs its own local transaction. If a later step fails, compensating actions reverse the earlier business operations. Choreography uses events between services; orchestration uses a central coordinator to control the steps.",
        example:
          "When placing an order, stock is reserved first and payment is charged next. If payment fails, the stock reservation must be released. This compensation prevents the system from keeping stock reserved for an unsuccessful order.",
        code: `// Simplified orchestration example
Reservation reservation = inventory.reserve(order);

try {
    payment.charge(order);
    orderService.confirm(order);
} catch (PaymentFailedException ex) {
    inventory.release(reservation);
    orderService.cancel(order);
}

// Choreography example:
// OrderPlaced -> StockReserved
// StockReserved -> PaymentRequested
// PaymentFailed -> ReleaseStockRequested`,
      },
      {
        description:
          "Timeout limits how long a service waits for another service. Retry repeats a failed call when the failure may be temporary; use a limit, backoff, and jitter. Circuit breaker stops calls to a service that is repeatedly failing. Bulkhead limits the resources used by one dependency so it cannot consume everything.",
        example:
          "If Inventory Service is down, Order Service should not keep waiting forever. A timeout limits the wait, a circuit breaker stops repeated failing calls, and a bulkhead prevents inventory calls from consuming all request threads.",
        code: `// Resilience4j concepts:
//
// Timeout:
// Stop waiting after a configured duration.
//
// Retry:
// Retry temporary failures with limited attempts.
//
// Circuit Breaker:
// Closed -> calls allowed
// Open -> calls rejected quickly
// Half-open -> test whether service recovered
//
// Bulkhead:
// Limit concurrent calls to one dependency.
//
// Configure these using Resilience4j
// annotations or programmatic decorators.`,
      },
      {
        description:
          "CQRS separates the model used to change data from the model used to read data. Event Sourcing stores changes as a sequence of events instead of storing only the latest state. CQRS can improve read performance when reads and writes have different requirements. Event Sourcing can help with auditing and rebuilding state, but both add complexity.",
        example:
          "An order system may use one model to validate and create orders, while a separate read model stores data in a format suitable for dashboards. With Event Sourcing, events such as OrderCreated and OrderShipped can be replayed to rebuild the current order state.",
        code: `// Command side
void shipOrder(long orderId) {
    eventStore.append(
        new OrderShipped(orderId)
    );
}

// Query side projection
void on(OrderShipped event) {
    orderReadRepository.markShipped(
        event.orderId()
    );
}

// Read queries use the read model.
// Event replay can rebuild the projection.`,
      },
      {
        description:
          "Centralized configuration keeps application settings in one managed place instead of maintaining different configuration files manually for every service. Spring Cloud Config Server is one option. Kubernetes ConfigMaps and Secrets are other options for supplying configuration to applications.",
        example:
          "If the timeout for a payment API changes, the team can manage the setting centrally rather than manually editing configuration files in many services. Sensitive values should be stored in a secure secrets manager, not plain configuration files.",
        code: `# Spring Cloud Config client example
spring:
  application:
    name: order-service
  config:
    import: optional:configserver:http://config-server:8888

# Config Server can load configuration
# for order-service from a managed repository.
#
# Keep passwords and tokens in a secrets manager.`,
      },
      {
        description:
          "Distributed tracing follows one request as it travels through multiple services. A trace contains spans representing individual operations. A trace ID connects those spans, and correlation IDs can also connect related log messages. OpenTelemetry can collect traces and send them to tools such as Zipkin, Jaeger, or Tempo.",
        example:
          "A checkout request passes through Gateway, Order Service, Payment Service, and Bank Service. A trace helps identify which service took the most time without manually comparing timestamps across different logs.",
        code: `// Example trace information:
//
// Trace ID: abc123
//
// Gateway       10 ms
// Order Service 40 ms
// Payment       800 ms
// Bank API      700 ms
//
// Use OpenTelemetry instrumentation
// to propagate trace context between services.
//
// Include trace IDs in structured logs.`,
      },
      {
        description:
          "Docker packages an application and its runtime dependencies into an image. Kubernetes manages containers across machines. It supports deployment, scaling, service discovery, rolling updates, configuration, health checks, and restarting failed containers.",
        example:
          "The same Docker image can run in development, testing, and production. Kubernetes can run three Order Service instances and replace an unhealthy instance automatically.",
        code: `# Dockerfile example
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

# Kubernetes Deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
        - name: order-service
          image: order-service:1.0`,
      },
      {
        description:
          "Idempotency means repeating the same operation does not create additional unwanted effects. It is especially important for payment and order APIs because clients may retry after a timeout without knowing whether the first request succeeded. Use an idempotency key and store its result safely with a database uniqueness constraint.",
        example:
          "A customer clicks Pay and the request times out. The frontend retries. Without idempotency, the customer may be charged twice. With the same idempotency key, the API can return the result of the original payment.",
        code: `// Request header:
// Idempotency-Key: order-payment-101

// Simplified server logic:
@Transactional
PaymentResponse pay(String key, PaymentRequest request) {
    return idempotencyRepository
        .findByKey(key)
        .map(IdempotencyRecord::response)
        .orElseGet(() -> {
            PaymentResponse response =
                paymentService.charge(request);

            idempotencyRepository.save(
                new IdempotencyRecord(key, response)
            );

            return response;
        });
}

// Enforce a UNIQUE constraint on the key.
// Handle concurrent requests and key reuse safely.`,
      },
      {
        description:
          "Strong consistency means a successful write is immediately visible to subsequent reads according to the system's consistency guarantee. Eventual consistency means different copies of data may temporarily show different values but should become consistent later. Distributed services often use eventual consistency to avoid tightly coupling every operation.",
        example:
          "After making a payment, the payment confirmation should show the latest payment status. An analytics dashboard may show the same payment a short time later because its data is updated asynchronously.",
        code: `// Strong consistency within one database:
@Transactional
void updateBalance(long id, BigDecimal amount) {
    accountRepository.updateBalance(id, amount);
}

// Eventual consistency across services:
// Payment Service publishes PaymentCompleted.
// Reporting Service consumes the event
// and updates its local reporting data.`,
      },
      {
        description:
          "Contract testing checks whether a service provider follows the API expectations of its consumers. Consumers define the request and response behavior they depend on, and provider tests verify that these expectations remain valid. It helps detect breaking changes before deployment.",
        example:
          "Order Service expects User Service to return an email field. If someone renames that field without informing the consumer, a contract test can fail during the build instead of allowing the issue to reach production.",
        code: `// Simplified contract example:
//
// Consumer expects:
// GET /users/101
//
// Response:
// {
//   "id": 101,
//   "email": "user@example.com"
// }
//
// Consumer publishes the contract.
// Provider verifies that its API
// still satisfies the contract.
//
// Tools include Pact and Spring Cloud Contract.`,
      },
      {
        description:
          "A service mesh manages communication between services using infrastructure components, commonly sidecar proxies. It can provide mutual TLS, traffic routing, retries, metrics, and tracing without implementing all these features inside each application. It also adds operational complexity and resource overhead.",
        example:
          "A company wants encrypted communication between every service. Instead of writing certificate-handling code in every application, a service mesh such as Istio can manage mutual TLS between workloads.",
        code: `# Conceptual Istio traffic routing:
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
    - order-service
  http:
    - route:
        - destination:
            host: order-service
            subset: v1
          weight: 90
        - destination:
            host: order-service
            subset: v2
          weight: 10

# Routes 90% traffic to v1 and 10% to v2.`,
      },
      {
        description:
          "Service-to-service security should verify who is calling and whether that caller is allowed to perform the operation. OAuth2 client credentials can provide service identity through access tokens. JWTs must be validated for signature, expiry, and audience. Mutual TLS can additionally authenticate both ends of the network connection and encrypt traffic.",
        example:
          "Order Service calls Payment Service. Payment Service validates the caller's token and checks that it is intended for the payment API. Mutual TLS can also verify that the network client is a trusted service.",
        code: `// Outgoing request example:
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://payment-service/pay"))
    .header(
        "Authorization",
        "Bearer " + accessToken
    )
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

// Receiving service should validate:
// 1. JWT signature
// 2. Expiry (exp)
// 3. Issuer (iss)
// 4. Audience (aud)
// 5. Required roles/scopes
//
// Use mTLS where required by the security design.`,
      },
      {
        description:
          "Backpressure prevents a fast producer from overwhelming a slower consumer. It can be implemented using bounded queues, reactive-stream demand, or controlled rejection. Rate limiting controls how many requests a client can send within a time period. Both protect service capacity.",
        example:
          "During a flash sale, thousands of requests may arrive at once. The gateway can allow only the traffic the application can handle and return HTTP 429 with Retry-After for excess requests.",
        code: `// Simplified rate-limit decision:
if (rateLimiter.tryAcquire()) {
    processRequest();
} else {
    // Return HTTP 429 Too Many Requests
    // Include Retry-After where appropriate.
}

// Bounded queue example:
BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(100);

// Reject or slow producers when capacity is reached.
// Do not allow queues to grow without limits.`,
      },
      {
        description:
          "Expand-contract is a safe approach for changing database schemas while old and new application versions run together. First add the new structure without removing the old one. Then migrate data and update applications to use the new structure. Finally, remove the old structure in a later release.",
        example:
          "Suppose you need to rename full_name to name. Add the new name column, copy the existing values, update the application to use the new column, and remove full_name only after every running application version no longer needs it.",
        code: `-- Step 1: Expand
ALTER TABLE users
ADD COLUMN name VARCHAR(100);

-- Step 2: Backfill existing data
UPDATE users
SET name = full_name
WHERE name IS NULL;

-- Step 3: Deploy application versions
-- that write/read the new column safely.

-- Step 4: Contract in a later release
ALTER TABLE users
DROP COLUMN full_name;`,
      },
      {
        description:
          "A bounded context is a domain boundary where business terms have a specific meaning. The same word may represent different things in different services. An anti-corruption layer translates an external or legacy system's data into the model used by your service.",
        example:
          "A legacy billing system may call something a Deal, while the new Order Service uses Invoice. An adapter converts the legacy Deal into the Invoice model so old-system terminology does not spread throughout the new application.",
        code: `// External legacy model
class LegacyDeal {
    long dealId;
    BigDecimal amount;
}

// Internal application model
record Invoice(long id, BigDecimal total) {}

// Anti-corruption layer
class LegacyDealAdapter {

    Invoice toInvoice(LegacyDeal deal) {
        return new Invoice(
            deal.dealId,
            deal.amount
        );
    }
}`,
      },
      {
        description:
          "Observability has three important parts. Logs describe individual events and errors. Metrics show numerical measurements such as request count, error rate, and response time. Traces show how one request moves across services. Together, they help teams understand and troubleshoot production problems.",
        example:
          "A monitoring alert shows that checkout errors increased. Metrics show that response time is high. A distributed trace identifies Payment Service as the slow component, and logs show the exact error using the same trace ID.",
        code: `// Logs:
log.error("Payment failed. traceId={}", traceId);

// Metrics:
requestCounter.increment();
timer.record(responseTime);

// Tracing:
// Start a span for each important operation.
// Propagate trace context to downstream services.

// Common tools:
// Logs   -> ELK / Loki
// Metrics -> Prometheus / Grafana
// Traces  -> OpenTelemetry / Zipkin / Jaeger`,
      },
    ],

    scenarios: [
      {
        description:
          "Use the Saga pattern because inventory and payment are separate services with separate databases. Reserve inventory first, then process payment. If payment fails, release the inventory reservation and mark the order as failed. Each step should be idempotent so retries do not create duplicate effects.",
        example:
          "A customer orders a laptop. Inventory reserves one laptop and Payment Service charges the customer. If the payment is declined, the reservation is released so another customer can buy the laptop.",
        code: `// Simplified Saga orchestration
Reservation reservation =
    inventoryService.reserve(order);

try {
    paymentService.charge(order);
    orderService.confirm(order);

} catch (PaymentFailedException ex) {
    inventoryService.release(reservation);
    orderService.markFailed(order.getId());
}

// Production design:
// - Persist saga state
// - Make each step idempotent
// - Retry transient failures
// - Handle compensation failures
// - Use an outbox for reliable event publishing`,
      },
      {
        description:
          "Give every payment event a unique event ID. Before processing, check whether that event has already been handled. Save the event ID and update the payment or account data in the same database transaction. Use a unique constraint to protect against concurrent duplicate messages.",
        example:
          "A payment event is delivered twice because the message broker retries it. The consumer recognizes the event ID and processes the payment only once instead of charging or crediting the customer twice.",
        code: `@Transactional
void handlePayment(PaymentEvent event) {

    boolean firstTime =
        processedEventRepository
            .insertIfAbsent(event.eventId());

    if (!firstTime) {
        return; // Already processed
    }

    paymentRepository.updateStatus(
        event.paymentId(),
        event.status()
    );
}

// processed_event.event_id must have a UNIQUE constraint.
// Insert and payment update must share one transaction.`,
      },
      {
        description:
          "Use a circuit breaker to stop repeated calls to an unhealthy downstream service. Use a bulkhead to limit how many calls can run at the same time. Add timeouts so requests do not wait forever. Return a fallback only when it is safe for the business operation.",
        example:
          "Shipping Service becomes very slow. Without protection, Order Service threads may all wait for shipping responses. A bulkhead limits shipping calls, and a circuit breaker temporarily stops calls when the service is failing.",
        code: `// Resilience4j concepts:
//
// Circuit breaker:
// - Closed: allow calls
// - Open: reject calls quickly
// - Half-open: test recovery
//
// Bulkhead:
BulkheadConfig config =
    BulkheadConfig.custom()
        .maxConcurrentCalls(20)
        .build();

Bulkhead bulkhead =
    Bulkhead.of("shipping", config);

// Wrap shipping calls with the bulkhead,
// timeout and circuit breaker.
// Return a safe fallback only if appropriate.`,
      },
      {
        description:
          "Generate or accept a trace ID at the API Gateway and propagate the trace context to every downstream service. Add the trace ID to structured logs using MDC. OpenTelemetry can automatically propagate trace context and collect spans across services.",
        example:
          "A customer reports a checkout failure. Support gets the trace ID from the error response and uses it to find related logs and traces from Gateway, Order, Payment, and Bank Adapter services.",
        code: `// Simplified request correlation example
String traceId = request.getHeader("X-Request-Id");

if (traceId == null || traceId.isBlank()) {
    traceId = UUID.randomUUID().toString();
}

MDC.put("traceId", traceId);

try {
    // Process request.
    // Forward trace context to downstream services.
} finally {
    MDC.remove("traceId");
}

// Configure log pattern to include traceId.
// Prefer OpenTelemetry trace context propagation
// for distributed tracing.`,
      },
      {
        description:
          "Use the Strangler Fig pattern to replace a monolith gradually. Put a routing layer or facade in front of the old application. Move one business function at a time to a new service. Compare behavior, gradually send traffic to the new service, and remove the old implementation only after it is no longer used.",
        example:
          "Instead of rewriting a complete shopping application, move only the Order module to Order Service first. Keep Product and Payment in the monolith until they are ready to be separated.",
        code: `// Simplified routing concept
if (requestPath.startsWith("/orders")) {
    routeToOrderService();
} else {
    routeToLegacyMonolith();
}

// Migration steps:
// 1. Add routing facade.
// 2. Build new Order Service.
// 3. Compare old and new behavior.
// 4. Move traffic gradually.
// 5. Monitor errors and latency.
// 6. Remove old order module when safe.`,
      },
      {
        description:
          "Use backward-compatible schema changes. Add new optional fields without removing existing fields. Consumers should tolerate unknown fields. If a field must be renamed or removed, introduce a replacement, migrate consumers, monitor usage, and remove the old field only after it is no longer used.",
        example:
          "An API currently returns total. You want to introduce grandTotal. Return both fields for a transition period, update clients to use grandTotal, and remove total only after old clients have migrated.",
        code: `// Backward-compatible response:
{
  "id": 101,
  "total": 500.00,
  "grandTotal": 500.00
}

// Migration:
// 1. Add grandTotal.
// 2. Continue returning total.
// 3. Migrate consumers.
// 4. Monitor old-field usage.
// 5. Remove total in a planned breaking release.`,
      },
      {
        description:
          "Do not allow services to access another service's database directly. The service that owns the data should publish events when important data changes. Other services can consume those events and maintain their own local read models. Use APIs when a current response is required.",
        example:
          "Order Service needs product names and prices. Product Service publishes ProductUpdated events. Order Service consumes those events and updates its own local product information for the operations it needs.",
        code: `// Product Service publishes an event
ProductUpdated event =
    new ProductUpdated(productId, name, price);

eventPublisher.publish(event);

// Order Service consumes the event
@KafkaListener(topics = "product-updated")
void handle(ProductUpdated event) {
    localProductRepository.upsert(
        event.productId(),
        event.name(),
        event.price()
    );
}

// Order Service owns its local read data.`,
      },
      {
        description:
          "Deploy the new API version alongside the old version. Keep the old API available while clients migrate. Monitor usage of both versions and remove the old version only after clients have moved successfully. Use an adapter when necessary to translate old requests to the new implementation.",
        example:
          "You want to change POST /orders response fields. Release /v2 while /v1 continues working. Update the mobile and web applications gradually, then remove /v1 after its usage reaches zero and the deprecation period ends.",
        code: `@RestController
class OrderController {

    @PostMapping("/v1/orders")
    OrderV1 createV1(@RequestBody OrderRequest request) {
        return service.createV1(request);
    }

    @PostMapping("/v2/orders")
    OrderV2 createV2(@RequestBody OrderRequest request) {
        return service.createV2(request);
    }
}

// Monitor v1 traffic.
// Remove v1 only after consumers have migrated
// and the announced deprecation period has passed.`,
      },
      {
        description:
          "A cache miss storm happens when many requests miss the cache at the same time and all query the database. Protect the database using request coalescing, TTL jitter, stale-while-revalidate, and limits on concurrent database calls. Avoid clearing the entire cache unnecessarily during deployments.",
        example:
          "After a deployment, thousands of users request the same product. Redis has no cached value, so every request hits the database. Request coalescing makes one request load the product while other requests share the result.",
        code: `// Conceptual request coalescing:
CompletableFuture<Product> future =
    inFlight.computeIfAbsent(
        productId,
        id -> CompletableFuture.supplyAsync(
            () -> productRepository.findById(id)
                .orElseThrow()
        )
    );

try {
    return future.join();
} finally {
    inFlight.remove(productId, future);
}

// Also consider:
// - Add random TTL variation.
// - Serve stale data when safe.
// - Limit concurrent DB loads.
// - Use a cache warm-up strategy.`,
      },
      {
        description:
          "Scale the overloaded service horizontally when more instances can handle the load. Apply rate limiting and load shedding to reject excess traffic early. Use bounded queues and prioritize important requests. Delay or disable non-critical background work during high load.",
        example:
          "During a major sale, Payment Service receives much more traffic than normal. Kubernetes can add more instances, the gateway can limit excessive partner traffic, and reporting jobs can be delayed so payment requests get priority.",
        code: `# Kubernetes HPA example
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: payment-service
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: payment-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70

# Application protection:
# - Rate limit incoming requests.
# - Use bounded queues.
# - Return 429 when overloaded.
# - Prioritize payment traffic.
# - Pause non-critical background jobs.`,
      },
    ],
  },

  kafka: {
    important: [
      {
        description:
          "Apache Kafka is a distributed event-streaming platform. It allows applications to publish, store, and consume events. Kafka is used for high-throughput messaging, real-time data processing, event-driven microservices, and replaying historical events.",
        example:
          "When a customer places an order, Order Service publishes an OrderCreated event. Payment, notification, analytics, and inventory services can independently consume that event without Order Service directly calling all of them.",
        code: `// Producer sends an event
kafkaTemplate.send(
    "orders",
    "order-101",
    "OrderCreated"
);

// Consumer receives the event
@KafkaListener(topics = "orders", groupId = "billing")
public void consume(String event) {
    System.out.println(event);
}`,
      },
      {
        description:
          "Kafka runs as a cluster of brokers. A topic is a named stream of records, and a topic is divided into partitions. Each partition is an ordered log of records. Every record has an offset, which identifies its position inside that partition. Kafka uses replication for fault tolerance and KRaft for cluster metadata management in modern deployments.",
        example:
          "An orders topic has 12 partitions across 3 brokers. Each partition has its own sequence of offsets, such as 0, 1, 2, and so on. A consumer tracks its position separately for each partition.",
        code: `// Conceptual Kafka structure
Kafka Cluster
  Broker 1
    orders-0 (leader)
    orders-1 (follower)

  Broker 2
    orders-1 (leader)
    orders-2 (follower)

  Broker 3
    orders-0 (follower)
    orders-2 (leader)

// Each partition has its own offset sequence.`,
      },
      {
        description:
          "Producer sends records to Kafka. Consumer reads records from Kafka. Broker is a Kafka server that stores partitions. Topic is a named event stream. Partition is an ordered part of a topic. Offset is the position of a record inside a partition.",
        example:
          "Checkout Service produces order events. Kafka brokers store them in the orders topic. Billing Service consumes those events and remembers the offset from which it should continue.",
        code: `// Producer
kafkaTemplate.send("orders", "order-101", "CREATED");

// Consumer
@KafkaListener(topics = "orders", groupId = "billing")
public void listen(String message) {
    System.out.println(message);
}

// Topic: orders
// Partition: orders-0
// Offset: position of a record in orders-0`,
      },
      {
        description:
          "Partitions allow Kafka to distribute data across brokers and process records in parallel. Different consumers in the same consumer group can read different partitions at the same time. More partitions can increase parallelism, but they also increase resource usage and operational overhead. Ordering is guaranteed only within a partition.",
        example:
          "A topic with one partition can be assigned to only one consumer in a group. A topic with 8 partitions can have up to 8 active consumers in that group, allowing more parallel processing.",
        code: `// Example
Topic: orders
Partitions: 4

Consumer Group: billing
  Consumer 1 -> Partition 0
  Consumer 2 -> Partition 1
  Consumer 3 -> Partition 2
  Consumer 4 -> Partition 3

// Maximum active consumers for this topic/group = 4`,
      },
      {
        description:
          "Kafka selects a partition using the producer's partitioner. When a record has a key, the default keyed partitioning strategy normally hashes the key to select a partition. Records with the same key normally go to the same partition as long as the partition count and partitioning strategy remain unchanged. Without a key, the default partitioner generally distributes records in batches.",
        example:
          "If userId is the key, all events for user 101 normally go to the same partition. This helps preserve the order of that user's events.",
        code: `ProducerRecord<String, String> record =
    new ProducerRecord<>(
        "orders",
        "user-101",   // key
        "OrderCreated"
    );

kafkaTemplate.send(record);

// Same key -> same partition under the same
// partitioning configuration.`,
      },
      {
        description:
          "A Kafka consumer group is a set of consumers sharing the same group.id. Kafka distributes a topic's partitions among consumers in that group. Each partition is assigned to at most one consumer in a group at a time. Different groups consume the topic independently.",
        example:
          "If the orders topic has 8 partitions and the billing group has 4 consumers, each consumer may receive 2 partitions. The analytics group can independently read all 8 partitions.",
        code: `props.put("group.id", "billing");

KafkaConsumer<String, String> consumer =
    new KafkaConsumer<>(props);

consumer.subscribe(List.of("orders"));

// A different group can independently
// consume the same topic.
props.put("group.id", "analytics");`,
      },
      {
        description:
          "Kafka assigns partitions to consumers using a partition-assignment strategy, such as Range, RoundRobin, Sticky, or CooperativeSticky. A partition can be assigned to only one consumer in a group at a time. If there are more consumers than partitions, some consumers remain idle.",
        example:
          "With 10 partitions and 4 consumers, Kafka distributes approximately 2 or 3 partitions to each consumer. With 12 consumers, at least 2 consumers will receive no partitions.",
        code: `// Example assignment
10 partitions, 4 consumers

Consumer 1 -> P0, P1, P2
Consumer 2 -> P3, P4, P5
Consumer 3 -> P6, P7
Consumer 4 -> P8, P9

// Actual assignment depends on the configured
// partition-assignment strategy.`,
      },
      {
        description:
          "When a consumer joins or leaves a group, Kafka may trigger a rebalance. The group coordinator and assignment strategy redistribute partitions among the remaining and new consumers. During a rebalance, some consumption may pause. Uncommitted records can be processed again after reassignment.",
        example:
          "When a new application instance starts, Kafka redistributes partitions among the consumers. When an instance crashes, its partitions are assigned to other active consumers.",
        code: `// Important consumer settings
props.put("session.timeout.ms", 45000);
props.put("heartbeat.interval.ms", 15000);
props.put("max.poll.interval.ms", 300000);

// CooperativeStickyAssignor can reduce
// the amount of partition movement.
props.put(
    "partition.assignment.strategy",
    "org.apache.kafka.clients.consumer.CooperativeStickyAssignor"
);`,
      },
      {
        description:
          "An offset is the sequential position of a record inside one partition. Each consumer group maintains committed offsets for its assigned partitions. After restarting, a consumer normally continues from its committed offset. If no committed offset exists, auto.offset.reset decides whether to start from the earliest or latest available record.",
        example:
          "A consumer processes records through offset 99 and commits offset 100. If it restarts, it resumes from offset 100. If it processed records but did not commit, those records may be read again.",
        code: `// Consumer configuration
props.put("auto.offset.reset", "earliest");

// Commit current offsets after processing
consumer.commitSync();

// Manually move to a particular offset
consumer.seek(
    new TopicPartition("orders", 0),
    0L
);`,
      },
      {
        description:
          "Kafka guarantees ordering within a single partition, not across all partitions of a topic. To preserve the order of related records, use the same key for those records. Producer retries and in-flight requests must also be configured appropriately for the required ordering guarantee.",
        example:
          "For one order, events should be processed as CREATED, PAID, and SHIPPED. Using orderId as the key sends those events to the same partition, preserving their partition order.",
        code: `props.put("enable.idempotence", true);
props.put("acks", "all");

// With idempotence enabled, Kafka supports
// ordering with multiple in-flight requests
// within the supported configuration limits.

producer.send(
    new ProducerRecord<>(
        "orders",
        "order-101",
        "OrderCreated"
    )
);`,
      },
      {
        description:
          "acks controls how many broker acknowledgements the producer waits for. acks=0 means the producer does not wait for a broker acknowledgement. acks=1 means only the leader acknowledges. acks=all means all currently in-sync replicas must acknowledge. The min.insync.replicas setting controls the minimum number of in-sync replicas required for an acks=all write to succeed.",
        example:
          "For important payment events, use acks=all with replication factor 3 and min.insync.replicas=2. This provides stronger durability than acks=1, although it cannot protect against every possible failure.",
        code: `// Producer settings
props.put("acks", "all");
props.put("enable.idempotence", true);

// Topic or broker configuration
min.insync.replicas=2

// acks=0   -> no broker acknowledgement
// acks=1   -> leader acknowledgement
// acks=all -> all current ISR replicas acknowledge`,
      },
      {
        description:
          "Replication factor is the number of replicas Kafka maintains for each partition, including its leader. Replication helps a partition remain available if a broker fails. A higher replication factor improves fault tolerance but uses more disk space and network bandwidth.",
        example:
          "With replication factor 3, Kafka stores three copies of each partition on different brokers. If one broker fails, another eligible in-sync replica may become the leader.",
        code: `kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create \\
  --topic orders \\
  --partitions 6 \\
  --replication-factor 3

// Replication factor 3 = one leader + two followers.`,
      },
      {
        description:
          "Each replicated partition has one leader and one or more followers. Producers and consumers normally communicate with the partition leader. Followers replicate data from the leader and can become leaders if the current leader fails and they are eligible for election.",
        example:
          "Partition 0 has broker 1 as leader and brokers 2 and 3 as followers. If broker 1 fails, Kafka can elect an eligible in-sync follower as the new leader.",
        code: `kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe --topic orders

// Example output:
// Partition: 0
// Leader: 1
// Replicas: 1,2,3
// Isr: 1,2,3`,
      },
      {
        description:
          "When a broker goes down, the Kafka controller detects the failure and attempts to elect new leaders for affected partitions from their eligible in-sync replicas. Clients refresh metadata and retry requests according to their configuration. Data loss depends on replication, acknowledgements, ISR state, and leader-election settings.",
        example:
          "If broker 1 fails and broker 2 has a fully synchronized copy of a partition, broker 2 can become the new leader. Producers reconnect using refreshed metadata.",
        code: `// Check topic replication and leaders
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe --topic orders

// Monitor:
// - Under-replicated partitions
// - Offline partitions
// - Active broker count
// - ISR changes`,
      },
      {
        description:
          "ISR means In-Sync Replicas. It is the set of replicas considered sufficiently caught up with the partition leader. With acks=all, Kafka waits for acknowledgements from the current ISR. min.insync.replicas sets the minimum ISR size required for an acks=all write to succeed.",
        example:
          "A partition has three replicas and all three are in the ISR. If one follower falls too far behind, it may leave the ISR. If the ISR becomes smaller than min.insync.replicas, acks=all writes are rejected until enough replicas are in sync again.",
        code: `# Example topic settings
replication.factor=3
min.insync.replicas=2

# Producer
acks=all

# Inspect ISR
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe --topic orders`,
      },
      {
        description:
          "Auto commit periodically commits consumer offsets automatically. It is simpler, but the committed position may move ahead of successfully processed records depending on the polling and processing flow. Manual commit lets the application commit after processing succeeds. Manual commits are commonly used when processing must be coordinated with external side effects.",
        example:
          "If a consumer commits an offset before saving an order to the database and then crashes, the order may never be saved. If it saves the order first and commits afterward, a crash may cause the same event to be processed again, so the database operation should be idempotent.",
        code: `props.put("enable.auto.commit", false);

while (true) {
    ConsumerRecords<String, String> records =
        consumer.poll(Duration.ofMillis(1000));

    processAndSave(records); // complete processing first

    consumer.commitSync();
}

// If processing fails, do not commit those records.`,
      },
      {
        description:
          "If a consumer crashes before committing its processed offsets, Kafka normally delivers those records again when the consumer restarts or another consumer takes over. This is at-least-once behavior. It prevents the consumer from skipping uncommitted records but can cause duplicate processing.",
        example:
          "A consumer processes offsets 51 to 100 but crashes before committing. After restart, it reads those records again from the last committed offset. If the database update is not idempotent, the same business action may happen twice.",
        code: `// Last committed offset: 50
// Processed before crash: 51 to 100
// Crash before commit
//
// Restart:
// Consumer reads records 51 to 100 again.
//
// Solution:
// Use an idempotent database update or event ID deduplication.`,
      },
      {
        description:
          "Kafka consumers commonly handle duplicates using an event ID and an idempotent processing operation. Store the event ID in a table with a unique constraint and update business data in the same database transaction. For external systems, pass an idempotency key if the external API supports it.",
        example:
          "A payment event is delivered twice. The first delivery records its event ID and updates the wallet. The second delivery finds the same event ID and skips the duplicate update.",
        code: `@Transactional
public void handle(PaymentEvent event) {

    boolean inserted =
        processedEventRepository.insertIfAbsent(
            event.eventId()
        );

    if (!inserted) {
        return; // Duplicate event
    }

    walletRepository.credit(
        event.accountId(),
        event.amount()
    );
}

// event_id should have a UNIQUE constraint.
// Both operations must use the same transaction.`,
      },
      {
        description:
          "At-most-once means a record is processed zero or one time, so a crash can cause data loss. At-least-once means a record is processed one or more times, so duplicates are possible. Exactly-once processing means the defined processing result is committed once within a supported boundary. Kafka transactions can provide exactly-once behavior for Kafka-to-Kafka processing when configured correctly. External databases and APIs need their own coordination or idempotency.",
        example:
          "For a payment event, at-least-once with an idempotent database update is a common approach. For a Kafka Streams application that reads from one topic and writes to another, Kafka's exactly-once processing can atomically coordinate output records and consumed offsets.",
        code: `// At-least-once consumer
process(record);
consumer.commitSync();

// Kafka Streams exactly-once configuration
props.put(
    StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
    StreamsConfig.EXACTLY_ONCE_V2
);

// Exactly-once Kafka processing does not
// automatically make an external DB/API exactly-once.`,
      },
      {
        description:
          "Choose partitions based on expected peak throughput, consumer parallelism, broker capacity, and future growth. The number of consumers actively reading a topic in one group cannot exceed the number of partitions. Too few partitions limit parallelism; too many partitions increase metadata, file, memory, replication, and rebalance overhead. Increasing partitions can also change key-to-partition mapping.",
        example:
          "If a topic needs more consumer parallelism, 12 partitions may support up to 12 active consumers in a group. But the correct number should be tested against actual message size, broker capacity, throughput, and ordering requirements.",
        code: `// Example planning inputs
double targetMBps = 60;
double testedMBpsPerPartition = 10;

int partitions = (int) Math.ceil(
    targetMBps / testedMBpsPerPartition
);

// Add headroom based on load testing.
// Also consider:
// - Number of consumers
// - Broker count and disk capacity
// - Replication traffic
// - Rebalance duration`,
      },
    ],

    scenarios: [
      {
        description:
          "Repeated rebalances can happen when processing takes longer than max.poll.interval.ms, heartbeats are missed, network connections fail, garbage collection pauses occur, or application instances frequently restart. Reduce work per poll, move long processing carefully outside the poll loop, tune timeouts, and consider cooperative rebalancing or static membership.",
        example:
          "A consumer processes a large batch for 8 minutes while max.poll.interval.ms is 5 minutes. Kafka considers it unhealthy and reassigns its partitions. The consumer then restarts work and may trigger another rebalance.",
        code: `props.put("max.poll.interval.ms", 600000);
props.put("max.poll.records", 200);

props.put(
    "partition.assignment.strategy",
    "org.apache.kafka.clients.consumer.CooperativeStickyAssignor"
);

// Tune based on actual processing time.
// Keep polling regularly and monitor rebalance count.`,
      },
      {
        description:
          "Consumer lag is the difference between the latest offset in a partition and the consumer group's committed position. Detect it using Kafka consumer-group commands and monitoring. To reduce lag, identify hot partitions, improve database or API processing, batch operations, and add consumers up to the number of partitions.",
        example:
          "A billing consumer group is two million records behind. Monitoring shows one partition has most of the lag because many records use the same key. Fix the hot-key distribution and slow database operation before adding more consumers.",
        code: `kafka-consumer-groups.sh \\
  --bootstrap-server localhost:9092 \\
  --describe \\
  --group billing

// Check:
// CURRENT-OFFSET
// LOG-END-OFFSET
// LAG

// Possible fixes:
// - Improve downstream DB performance.
// - Batch writes.
// - Increase consumers up to partition count.
// - Investigate hot partitions and keys.`,
      },
      {
        description:
          "Use the business key as the Kafka record key. Kafka's partitioner normally sends records with the same key to the same partition. One consumer in the group processes that partition in order, while other partitions are processed in parallel.",
        example:
          "For order events, use orderId as the key. Events for order 101 stay in one partition, so CREATED, PAID, and SHIPPED can be consumed in partition order.",
        code: `ProducerRecord<String, OrderEvent> record =
    new ProducerRecord<>(
        "order-events",
        event.getOrderId(), // business key
        event
    );

kafkaTemplate.send(record);

// Same orderId -> same partition under
// the same partitioning configuration.`,
      },
      {
        description:
          "A poison message is a record that repeatedly fails processing. Do not retry it forever in the same partition. Apply a limited retry policy with backoff. After the retry limit, publish the record and its error details to a dead-letter topic, then commit the original offset only after the retry or DLQ action succeeds.",
        example:
          "An invalid order payload crashes the consumer every time. After three failed attempts, the message is sent to orders.DLQ with its original topic, partition, offset, and error details. The consumer can then continue with later records.",
        code: `try {
    process(record);
    consumer.commitSync();

} catch (NonRetryableException ex) {
    publishToDlq(record, ex);
    consumer.commitSync();

} catch (Exception ex) {
    if (retryCount(record) < 3) {
        publishToRetryTopic(record, ex);
    } else {
        publishToDlq(record, ex);
    }

    // Commit only after retry/DLQ publish succeeds.
    consumer.commitSync();
}

// Production: use durable retry metadata,
// backoff, and careful ordering decisions.`,
      },
      {
        description:
          "Retries can cause the same business event to be processed more than once. Use an event ID with a unique database constraint and perform deduplication and the business update in one transaction. For external payment or order APIs, use the same idempotency key on every retry.",
        example:
          "A payment event is retried after a timeout. The consumer checks the event ID. If the event was already processed, it skips the duplicate instead of charging the customer again.",
        code: `@Transactional
public void process(PaymentEvent event) {

    if (processedEventRepository.existsById(
            event.eventId())) {
        return;
    }

    processedEventRepository.save(
        new ProcessedEvent(event.eventId())
    );

    paymentRepository.applyPayment(event);
}

// Add a UNIQUE constraint on event_id.
// Handle concurrent duplicate inserts safely.`,
      },
      {
        description:
          "When a broker crashes, Kafka tries to elect a new leader from the in-sync replicas. With replication factor 3, min.insync.replicas=2, and producer acks=all, a confirmed write has stronger protection against a single broker failure. However, unreplicated data, insufficient ISR, unsafe leader election, or multiple failures can still cause data loss or unavailability.",
        example:
          "Broker 2 is the leader for a partition and crashes. Broker 1 is an in-sync follower, so it can become the new leader. Producers refresh metadata and retry requests.",
        code: `# Topic configuration
replication.factor=3
min.insync.replicas=2

# Producer
acks=all
enable.idempotence=true

# Inspect partition state
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe --topic orders

# Monitor under-replicated and offline partitions.`,
      },
      {
        description:
          "For a high-throughput order pipeline, partition by orderId to preserve per-order ordering. Use an idempotent producer, acks=all, suitable replication, and batching. Consumers should process records safely, commit offsets after success, and use deduplication for external database updates. Kafka exactly-once can be used for Kafka-to-Kafka processing, but an external database needs separate safeguards.",
        example:
          "An order event is published to Kafka. Inventory, billing, and analytics consume it independently. Billing updates its database idempotently, while an analytics processor writes derived events to another Kafka topic using transactions.",
        code: `// Producer settings
props.put("enable.idempotence", true);
props.put("acks", "all");
props.put("compression.type", "lz4");
props.put("linger.ms", 5);

// Key records by orderId.
// Use enough partitions for expected throughput.

// Kafka Streams:
// processing.guarantee=exactly_once_v2

// External DB consumer:
// process idempotently, then commit offsets.`,
      },
      {
        description:
          "Create a separate consumer group for historical replay. A new group has its own committed offsets, so it does not change the offsets of live consumer groups. Start from the earliest retained offset, control the replay speed, monitor broker load, and catch up before switching the new service to normal live processing.",
        example:
          "A search service needs three months of order events. It uses a new group called search-backfill while the billing group continues processing live events independently.",
        code: `props.put("group.id", "search-backfill");
props.put("auto.offset.reset", "earliest");
props.put("enable.auto.commit", false);

// Consume historical records with controlled throughput.
// Use quotas or application-level throttling.
// Ensure the topic retention still contains 3 months
// of the required records.`,
      },
      {
        description:
          "Kafka is usually a good fit for durable, replayable event streams, high throughput, and multiple independent consumer groups. RabbitMQ is often a good fit for task queues, flexible routing, per-message acknowledgements, and delivery workflows. The right choice depends on ordering, replay, routing, throughput, and operational requirements.",
        example:
          "Order events consumed by billing, analytics, and inventory are a strong Kafka use case. A notification task that needs flexible routing, acknowledgement, and delayed retry may fit RabbitMQ well.",
        code: `// Typical use cases
order-events       -> Kafka
payment-events     -> Kafka
analytics-streams  -> Kafka

email-task         -> RabbitMQ
notification-task  -> RabbitMQ

// Choose based on delivery, replay,
// routing, ordering, and throughput needs.`,
      },
      {
        description:
          "For low throughput, check producer batching, linger.ms, batch.size, compression, buffer memory, partition count, and broker disk/network capacity. On the consumer side, check fetch settings, max.poll.records, processing time, and lag. Increase consumers only when there are enough partitions and downstream systems can handle the load.",
        example:
          "A producer sends tiny messages one at a time. Increasing linger.ms slightly and enabling compression can improve batching and reduce network overhead. But a large linger value may increase message latency, so measure throughput and p99 latency together.",
        code: `// Producer tuning example
props.put("linger.ms", 5);
props.put("batch.size", 65536);
props.put("compression.type", "snappy");
props.put("buffer.memory", 67108864);
props.put("acks", "all");

// Consumer tuning example
props.put("fetch.min.bytes", 1024);
props.put("max.poll.records", 500);

// Load test and monitor latency, throughput,
// CPU, disk, network, and consumer lag.`,
      },
    ],
  },

  reactive: {
    important: [
      {
        description:
          "Reactive Programming is a programming approach that handles data asynchronously as it becomes available. It is useful for applications that handle many concurrent requests or continuous data streams. It can improve resource utilization when the complete request flow uses non-blocking operations.",
        example:
          "In a food delivery application, the server calls a payment service. While waiting for the payment response, a non-blocking server can use its thread to handle other requests instead of keeping that thread waiting.",
        code: `Flux.just("ORDER_CREATED", "PAYMENT_DONE", "SHIPPED")
    .filter(event -> event.contains("ORDER"))
    .subscribe(System.out::println);

// Output:
// ORDER_CREATED`,
      },
      {
        description:
          "Traditional imperative programming usually executes statements step by step, and blocking calls make the current thread wait. Reactive programming composes asynchronous operations into a pipeline. The thread can do other work while waiting for non-blocking I/O. Reactive programming does not automatically make blocking operations non-blocking.",
        example:
          "A blocking server may keep one thread waiting for each slow API call. A non-blocking server can manage many waiting network connections using a smaller number of event-loop threads.",
        code: `// Imperative blocking call
Order order = restTemplate.getForObject(
    "/orders/101", Order.class
);

// Reactive non-blocking call
Mono<Order> orderMono = webClient.get()
    .uri("/orders/101")
    .retrieve()
    .bodyToMono(Order.class);`,
      },
      {
        description:
          "Reactive Streams is a specification for asynchronous stream processing with non-blocking backpressure. Publisher produces data, Subscriber receives data, Subscription connects them and controls demand using request(n) and cancellation using cancel(). Processor acts as both a Subscriber and a Publisher.",
        example:
          "A data source can produce thousands of records, but the subscriber requests only 10 at a time. The publisher should respect that demand instead of sending unlimited records.",
        code: `interface Subscriber<T> {
    void onSubscribe(Subscription subscription);
    void onNext(T item);
    void onError(Throwable error);
    void onComplete();
}

// Subscription supports:
// request(n) -> request more items
// cancel()   -> stop receiving items`,
      },
      {
        description:
          "Non-blocking I/O allows an application to start an I/O operation and continue doing other work while waiting for its result. The result is handled when the operation becomes ready. This is useful when many requests spend time waiting for network or file operations.",
        example:
          "A server has 5,000 clients waiting for API responses. Instead of keeping 5,000 threads blocked, a non-blocking server can manage connections using event loops and process callbacks when data is ready.",
        code: `// Reactive HTTP call using WebClient
Mono<String> response = webClient.get()
    .uri("https://example.com/data")
    .retrieve()
    .bodyToMono(String.class);

// The pipeline represents the future response.
// It runs when subscribed to by its consumer.`,
      },
      {
        description:
          "Backpressure is a mechanism that allows a consumer to control how much data it receives. It prevents a fast producer from overwhelming a slow consumer. In Reactor, strategies include buffering, dropping items, keeping the latest item, or returning an error. Choose the strategy based on whether losing data is acceptable.",
        example:
          "A live stock-price screen may need only the latest price, so older updates can be dropped. A payment processor cannot silently drop payments, so it needs reliable buffering and overflow handling.",
        code: `Flux.interval(Duration.ofMillis(1))
    .onBackpressureBuffer(
        1000,
        dropped -> log.warn("Buffer overflow"),
        BufferOverflowStrategy.DROP_OLDEST
    )
    .subscribe(this::process);

// A bounded buffer prevents unlimited memory growth.
// Select a strategy appropriate to the business data.`,
      },
      {
        description:
          "Mono represents a reactive publisher that emits zero or one item, or an error. Flux represents a publisher that can emit zero to many items, or an error. Both support operators for transforming, combining, and handling asynchronous data.",
        example:
          "Finding one customer by ID can return Mono<Customer>. Getting all orders for a customer can return Flux<Order>.",
        code: `Mono<Customer> customer =
    customerRepository.findById(101L);

Flux<Order> orders =
    orderRepository.findByCustomerId(101L);

// Mono: 0 or 1 item
// Flux:  0 to many items`,
      },
      {
        description:
          "A typical Reactor pipeline is assembled first and starts when it is subscribed to by a subscriber or framework. It can emit onNext signals, then terminate with either onComplete or onError. A subscriber can cancel the subscription before completion.",
        example:
          "When a WebFlux controller returns a Mono, the framework subscribes as part of handling the HTTP request. If the client disconnects, cancellation can stop work that is no longer required, where supported by the underlying operations.",
        code: `Disposable disposable = Flux.just(1, 2, 3)
    .doOnSubscribe(s -> log.info("Started"))
    .doOnNext(value -> log.info("Value: {}", value))
    .doOnComplete(() -> log.info("Completed"))
    .subscribe();

// Cancel the subscription if required.
disposable.dispose();`,
      },
      {
        description:
          "Reactor publishers are commonly classified as cold or hot. A cold publisher starts its sequence separately for each subscriber, so each subscriber receives its own execution. A hot publisher shares an ongoing source, so a new subscriber may miss earlier items. Some publishers start eagerly or have different sharing behavior, so always check the source semantics.",
        example:
          "A database query represented by a cold Mono runs separately for each subscription. A live stock-price feed is hot because subscribers receive updates from one ongoing stream.",
        code: `// Cold publisher: each subscriber receives the sequence.
Flux<Integer> cold = Flux.just(1, 2, 3);

cold.subscribe(System.out::println);
cold.subscribe(System.out::println);

// Shared hot stream
Flux<Long> hot = Flux.interval(Duration.ofSeconds(1))
    .share();

hot.subscribe(value -> log.info("A: {}", value));`,
      },
      {
        description:
          "map transforms each emitted item synchronously into another value. flatMap transforms each item into another Publisher, such as Mono or Flux, and merges the resulting streams. flatMap is useful for asynchronous operations, but the output order is not guaranteed.",
        example:
          "Use map to convert a Customer object into a customer ID. Use flatMap when each customer ID triggers an API call that returns Mono<CustomerDetails>.",
        code: `// map: Customer -> customer ID
Flux<Long> ids = customers
    .map(Customer::getId);

// flatMap: ID -> asynchronous API call
Flux<CustomerDetails> details = ids
    .flatMap(id -> customerClient.getDetails(id));`,
      },
      {
        description:
          "flatMap processes inner publishers concurrently and emits results as they arrive, so order may change. concatMap processes one inner publisher at a time and preserves input order. flatMapSequential starts inner publishers concurrently but emits their results in the original input order.",
        example:
          "For independent product-detail API calls, use flatMap for concurrency. For generating a report where rows must remain in input order, use flatMapSequential. Use concatMap when each operation must wait for the previous one.",
        code: `// Concurrent, output order not guaranteed
flux.flatMap(id -> fetchDetails(id));

// Concurrent, output order preserved
flux.flatMapSequential(id -> fetchDetails(id));

// Sequential execution, order preserved
flux.concatMap(id -> fetchDetails(id));`,
      },
      {
        description:
          "merge subscribes to multiple publishers and interleaves their items as they arrive. concat subscribes to publishers sequentially and waits for one to complete before starting the next. zip combines items positionally, waiting for an item from each source to form a tuple.",
        example:
          "Use zip to combine one customer and one profile for a page. Use merge to combine two independent sensor streams. Use concat when the second operation must start only after the first completes.",
        code: `// Interleave items as they arrive
Flux.merge(sensorA, sensorB);

// Complete first publisher before second
Flux.concat(firstPage, secondPage);

// Combine corresponding items
Mono.zip(userMono, profileMono)
    .map(tuple -> new UserProfile(
        tuple.getT1(),
        tuple.getT2()
    ));`,
      },
      {
        description:
          "subscribeOn controls the scheduler used for subscription and source execution. publishOn changes the execution context for downstream operators after that point. subscribeOn is commonly used to isolate a blocking source. publishOn is used when a later part of the pipeline needs to run on another scheduler.",
        example:
          "A legacy JDBC query is blocking, so run it on boundedElastic. After the database result arrives, use publishOn if CPU processing needs to run on the parallel scheduler.",
        code: `Mono.fromCallable(() -> jdbcRepository.findById(101L))
    .subscribeOn(Schedulers.boundedElastic())
    .map(this::convert)
    .publishOn(Schedulers.parallel())
    .map(this::calculate);`,
      },
      {
        description:
          "Schedulers control where Reactor work runs. parallel is intended for CPU-bound non-blocking work. boundedElastic is intended for blocking or legacy I/O and has bounded resource limits. single uses one shared worker thread. immediate runs work on the current thread without switching to another scheduler.",
        example:
          "Use parallel for calculations such as hashing or transformations. Use boundedElastic for JDBC or blocking file operations. Avoid putting blocking database calls on parallel or Netty event-loop threads.",
        code: `Schedulers.parallel();       // CPU-bound work
Schedulers.boundedElastic();  // Blocking I/O
Schedulers.single();          // One shared worker
Schedulers.immediate();       // Current thread

// Example
Mono.fromCallable(() -> legacyDao.find(101L))
    .subscribeOn(Schedulers.boundedElastic());`,
      },
      {
        description:
          "No. Reactive programming does not automatically convert blocking code into non-blocking code. If you call a blocking method on a Netty event-loop thread, that thread remains blocked. Isolate unavoidable blocking calls on boundedElastic or replace them with non-blocking APIs.",
        example:
          "Calling a JDBC query directly inside a WebFlux request handler can block the event loop and delay many other requests. Wrapping the JDBC call in fromCallable and using boundedElastic moves the blocking work away from the event loop.",
        code: `// Avoid blocking on the event loop
Mono.fromCallable(() -> jdbcRepository.findById(101L))
    .subscribeOn(Schedulers.boundedElastic());

// Better long-term option:
// Use a non-blocking database driver such as R2DBC
// when it fits the application's requirements.`,
      },
      {
        description:
          "For database access, prefer a non-blocking driver such as R2DBC when a reactive database stack is appropriate. For legacy JDBC, wrap the blocking operation in Mono.fromCallable and run it on boundedElastic or a dedicated bounded scheduler. Blocking file operations and legacy SDK calls should be isolated in the same way.",
        example:
          "An existing application uses Oracle JDBC. Instead of executing JDBC directly on a Netty event loop, run it on a bounded scheduler sized according to the database connection pool.",
        code: `Mono<Order> order = Mono.fromCallable(
        () -> legacyOrderDao.findById(101L)
    )
    .subscribeOn(Schedulers.boundedElastic())
    .timeout(Duration.ofSeconds(2));

// For a dedicated pool:
Scheduler dbScheduler =
    Schedulers.newBoundedElastic(
        32, 1000, "legacy-db"
    );`,
      },
      {
        description:
          "onErrorReturn provides a fixed fallback value and completes. onErrorResume switches to another Publisher after an error. onErrorMap converts one exception into another exception. These operators let you define how the application should recover from failures.",
        example:
          "If a recommendation API fails, the application can return an empty recommendation list. If a cached value is available, it can use onErrorResume to retrieve that value instead.",
        code: `Mono<Price> price = priceClient.getPrice()
    .onErrorReturn(Price.unavailable());

Mono<Price> fallbackPrice = priceClient.getPrice()
    .onErrorResume(error -> cache.getPrice());

Mono<Price> mappedError = priceClient.getPrice()
    .onErrorMap(error ->
        new ExternalServiceException(
            "Price service failed", error
        )
    );`,
      },
      {
        description:
          "retry resubscribes to a failed publisher. retryWhen allows a more controlled retry policy such as maximum attempts and exponential backoff. timeout fails the operation if it takes longer than the specified duration. Always limit retries and avoid retrying permanent errors.",
        example:
          "A partner API occasionally times out. Retry a few times with increasing delays. If it still fails, return a safe fallback or a clear error instead of retrying forever.",
        code: `partnerClient.getData()
    .timeout(Duration.ofSeconds(5))
    .retryWhen(
        Retry.backoff(3, Duration.ofSeconds(1))
            .maxBackoff(Duration.ofSeconds(8))
            .filter(this::isRetryable)
    )
    .onErrorResume(error -> getFallbackData());

// Retry only errors that are safe to retry.
// Ensure the operation is idempotent if it changes data.`,
      },
      {
        description:
          "Spring MVC is based on the Servlet model and commonly uses a thread-per-request approach. It works well with blocking technologies such as JDBC and JPA. Spring WebFlux supports reactive, non-blocking request handling and is useful for high concurrency when the full processing path uses non-blocking components. Neither is universally faster; choose based on the application workload and technology stack.",
        example:
          "A traditional CRUD service using Spring Data JPA may be simpler with Spring MVC. An API gateway handling thousands of long-lived network connections may benefit from WebFlux if its downstream calls are non-blocking.",
        code: `// Spring MVC
@GetMapping("/orders/{id}")
Order getOrder(@PathVariable long id) {
    return orderService.findById(id);
}

// Spring WebFlux
@GetMapping("/orders/{id}")
Mono<Order> getOrder(@PathVariable long id) {
    return reactiveOrderService.findById(id);
}`,
      },
      {
        description:
          "WebFlux uses a small number of event-loop threads to manage many concurrent connections. When a request waits for non-blocking network or database I/O, the event loop can process other ready work. When the response becomes available, the relevant continuation is scheduled. Blocking operations can stall event loops and remove this benefit.",
        example:
          "Thousands of clients call an API that waits for another service. With non-blocking WebClient calls, Netty event-loop threads can manage many connections without keeping one thread blocked for every waiting request.",
        code: `// Reactive controller
@GetMapping("/orders/{id}")
public Mono<Order> getOrder(@PathVariable long id) {
    return webClient.get()
        .uri("/orders/{id}", id)
        .retrieve()
        .bodyToMono(Order.class);
}

// Keep blocking calls away from event-loop threads.`,
      },
      {
        description:
          "WebClient is Spring's reactive HTTP client. It returns Mono or Flux publishers that can be composed with Reactor operators. Independent API calls can be started together and combined using Mono.zip or Mono.when, depending on whether their results are needed.",
        example:
          "A dashboard needs customer details and recommendations. Both calls can be started independently and combined using zip. The total response time is approximately the slower call's time rather than the sum of both calls, assuming they truly run independently.",
        code: `Mono<Customer> customer = webClient.get()
    .uri("/customers/{id}", id)
    .retrieve()
    .bodyToMono(Customer.class);

Mono<Recommendations> recommendations = webClient.get()
    .uri("/recommendations/{id}", id)
    .retrieve()
    .bodyToMono(Recommendations.class);

Mono.zip(customer, recommendations)
    .map(tuple -> new Dashboard(
        tuple.getT1(),
        tuple.getT2()
    ));`,
      },
    ],

    scenarios: [
      {
        description:
          "Protect a slow downstream service using a timeout, circuit breaker, and bulkhead. Timeout prevents requests from waiting indefinitely. Circuit breaker stops repeated calls when failures are high. Bulkhead limits concurrent calls so one dependency cannot consume all application resources. Use a fallback only when the business operation allows it.",
        example:
          "A recommendation API starts taking 5 seconds to respond. Set a 500 ms timeout, limit concurrent requests to that service, and open the circuit breaker when failures increase. The product page can show cached or empty recommendations.",
        code: `webClient.get()
    .uri("/recommendations/{id}", id)
    .retrieve()
    .bodyToMono(Recommendations.class)
    .timeout(Duration.ofMillis(500))
    .transformDeferred(
        CircuitBreakerOperator.of(circuitBreaker)
    )
    .transformDeferred(
        BulkheadOperator.of(bulkhead)
    )
    .onErrorResume(error ->
        Mono.just(Recommendations.empty())
    );

// Requires Resilience4j Reactor integration.
// Configure the circuit breaker and bulkhead limits.`,
      },
      {
        description:
          "Reactor backpressure allows the subscriber to control demand. When the producer cannot slow down, choose an overflow strategy such as bounded buffering, dropping old values, keeping only the latest value, or reporting an error. Do not use a dropping strategy for business events that must never be lost.",
        example:
          "A stock-price dashboard needs the latest price, not every old update. It can keep the latest value. A payment pipeline must preserve every payment, so it needs reliable storage and bounded processing rather than dropping records.",
        code: `Flux.create(
    sink -> stockFeed.register(sink::next),
    FluxSink.OverflowStrategy.LATEST
)
.subscribe(this::updateLatestPrice);

// For important business events:
// use durable messaging such as Kafka,
// bounded processing, and explicit overflow handling.`,
      },
      {
        description:
          "Do not load all 10 million records into a List. Read data in pages or chunks using a cursor or keyset pagination. Convert each page into a Flux and process it with bounded concurrency. This keeps memory usage under control and allows processing to continue gradually.",
        example:
          "For exporting 10 million orders, read 1,000 records at a time and upload each chunk. Processing a small number of chunks concurrently is safer than loading all 10 million records into memory.",
        code: `Flux.range(0, 10000)
    .concatMap(page ->
        Mono.fromCallable(() ->
            repository.fetchPage(page, 1000)
        ).subscribeOn(Schedulers.boundedElastic())
    )
    .flatMapIterable(records -> records)
    .flatMap(this::uploadRecord, 16)
    .then();

// Use keyset/cursor pagination for large datasets
// when OFFSET becomes expensive.`,
      },
      {
        description:
          "Start by checking metrics and traces to find the bottleneck. Inspect Netty event-loop thread dumps for blocking calls, WebClient connection-pool usage, downstream latency, timeouts, garbage collection, memory usage, and consumer lag if Kafka is involved. Fix the measured bottleneck rather than increasing thread counts blindly.",
        example:
          "The API becomes slow under high traffic. A thread dump shows JDBC calls running on reactor-http-nio threads. Moving JDBC work to a bounded scheduler and adding downstream timeouts can restore event-loop responsiveness.",
        code: `// Isolate a blocking database call
Mono.fromCallable(() -> jdbcRepository.findById(id))
    .subscribeOn(Schedulers.boundedElastic())
    .timeout(Duration.ofSeconds(2));

// Monitor:
// - Netty event-loop thread usage
// - WebClient connection pool
// - Downstream response latency
// - Timeout and error rate
// - Heap and GC pauses
// - Kafka consumer lag, if applicable`,
      },
      {
        description:
          "Use WebFlux to expose reactive APIs, WebClient to call independent services concurrently, and Kafka to publish business events. Validate the order, run required payment and inventory operations with timeouts, and publish an event only after the required business operation succeeds. Consumers should be idempotent and use retry and DLQ handling. Apply backpressure and bounded concurrency to protect downstream services.",
        example:
          "When a customer places an order, Payment and Inventory services are called concurrently. If both succeed, the application publishes OrderPlaced to Kafka. Notification and analytics services consume the event independently. If payment fails, the order flow must not publish a successful OrderPlaced event.",
        code: `Mono.zip(
    paymentClient.charge(order),
    inventoryClient.reserve(order)
)
.timeout(Duration.ofSeconds(3))
.flatMap(result ->
    kafkaSender.send(
        new OrderPlaced(order.getId())
    )
)
.onErrorMap(error ->
    new OrderProcessingException(error)
);

// Production considerations:
// - Handle compensation if one operation succeeds
//   and the other fails.
// - Use an outbox for reliable DB-to-Kafka publishing.
// - Make consumers idempotent.
// - Configure bounded retries and a DLQ.
// - Monitor lag and downstream latency.`,
      },
      {
        description:
          "Use flatMap with a concurrency parameter to limit the number of active asynchronous operations. This allows multiple calls to run in parallel while preventing too many requests from hitting the external API at once. Use flatMapSequential if results must be emitted in input order.",
        example:
          "You need to call an external API for 500 customers, but the provider allows only 10 concurrent requests. flatMap with concurrency 10 keeps at most 10 inner publishers active at a time.",
        code: `Flux.fromIterable(customerIds)
    .flatMap(
        id -> customerClient.getDetails(id),
        10
    );

// Concurrent calls, ordered output:
Flux.fromIterable(customerIds)
    .flatMapSequential(
        id -> customerClient.getDetails(id),
        10
    );`,
      },
      {
        description:
          "Decide whether each API response is mandatory or optional. If all results are required, allow the error to propagate so the operation fails clearly. If one result is optional, handle its error with onErrorResume or onErrorReturn before combining the publishers. This provides partial success without hiding critical failures.",
        example:
          "A product page requires product details but recommendations are optional. If recommendations fail, return an empty recommendation list. For payment and inventory, both may be mandatory, so failure of either should stop order confirmation.",
        code: `// Optional recommendations
Mono.zip(
    productClient.getProduct(id),
    recommendationClient.getRecommendations(id)
        .onErrorReturn(Recommendations.empty())
)
.map(tuple -> new ProductPage(
    tuple.getT1(),
    tuple.getT2()
));

// Required payment and inventory
Mono.zip(
    paymentClient.charge(order),
    inventoryClient.reserve(order)
)
.timeout(Duration.ofSeconds(3));`,
      },
      {
        description:
          "Wrap the legacy blocking call in Mono.fromCallable and schedule it on boundedElastic or a dedicated bounded scheduler. Add a timeout and size the scheduler according to the database connection pool and expected load. Do not execute the blocking call directly on the Netty event loop.",
        example:
          "A service still uses Oracle JDBC. Put those calls on a dedicated 32-thread scheduler sized for the available database connections. This keeps JDBC waiting away from WebFlux event-loop threads.",
        code: `Scheduler jdbcScheduler =
    Schedulers.newBoundedElastic(
        32, 1000, "oracle-jdbc"
    );

Mono<Order> order = Mono.fromCallable(
    () -> oracleDao.findById(id)
)
.subscribeOn(jdbcScheduler)
.timeout(Duration.ofSeconds(2));

// Dispose the dedicated scheduler during application shutdown.`,
      },
      {
        description:
          "A cold stream executes separately for each subscriber. A hot stream shares one ongoing source among subscribers. For live stock ticks, use a shared hot publisher so multiple subscribers receive updates from the same feed. Use replay when new subscribers must receive the latest value immediately.",
        example:
          "Three dashboards subscribe to the same live stock-price feed. A shared publisher can use one upstream WebSocket connection. A dashboard joining late can receive the latest price if the stream uses replay(1).",
        code: `Flux<StockPrice> sharedPrices =
    stockFeed
        .publish()
        .refCount(1);

// Share one upstream source while subscribers exist.

// To replay the latest value to new subscribers:
Flux<StockPrice> replayedPrices =
    stockFeed
        .replay(1)
        .refCount(1);`,
      },
      {
        description:
          "Calling subscribe starts a reactive pipeline. The simple subscribe overload generally requests unbounded demand, so an uncontrolled source can overwhelm downstream processing. Limit concurrency with flatMap, use bounded buffers, and prefer returning Mono or Flux from framework-managed request handlers instead of manually subscribing inside business code.",
        example:
          "A service reads millions of records and calls a downstream API for every record. An unbounded processing approach can create too many concurrent requests and consume excessive memory. Limiting flatMap concurrency to 32 controls the workload.",
        code: `// Bounded concurrent processing
Flux.range(1, 1_000_000)
    .flatMap(
        id -> externalClient.process(id),
        32
    );

// In a WebFlux controller, prefer returning
// the publisher instead of manually subscribing.
@GetMapping("/items")
Flux<Item> getItems() {
    return itemService.findAll();
}`,
      },
    ],
  },

  javascript: {
    important: [
      {
        description:
          "JavaScript is a high-level, dynamically typed programming language primarily used to build interactive web applications.\n\nMain features:\n- Dynamic typing\n- Event-driven programming\n- Asynchronous programming\n- First-class functions\n- Prototype-based inheritance\n- Closures",
        example:
          "In an online banking application, JavaScript handles button clicks, form validation, API calls and dynamically updating account balances.",
        code: `const accountHolder = "Bharath";
let balance = 5000;

function deposit(amount) {
    balance += amount;
    return balance;
}

console.log(deposit(1000)); // 6000`,
      },
      {
        description:
          "These are used to declare variables.\n\n- var: Function-scoped and can be redeclared and reassigned.\n- let: Block-scoped and can be reassigned but not redeclared in the same scope.\n- const: Block-scoped and cannot be reassigned.",
        example:
          "Use let when a value changes, const when a variable should not be reassigned, and avoid var in modern JavaScript.",
        code: `var a = 10;
let b = 20;
const c = 30;

a = 15;
b = 25;
// c = 35; // TypeError

if (true) {
    let x = 100;
    var y = 200;
}

// console.log(x); // ReferenceError
console.log(y); // 200`,
      },
      {
        description:
          "Hoisting is JavaScript's behavior of processing declarations before executing code in their scope.\n\n- var is hoisted and initialized with undefined.\n- let and const are hoisted but remain in the Temporal Dead Zone until initialization.\n- Function declarations can be called before their declaration.",
        example:
          "If a developer accesses a var variable before its declaration, JavaScript returns undefined instead of throwing a ReferenceError.",
        code: `console.log(a); // undefined
var a = 10;

// console.log(b); // ReferenceError
let b = 20;

greet(); // Hello

function greet() {
    console.log("Hello");
}`,
      },
      {
        description:
          "A closure allows an inner function to access variables from its outer function even after the outer function has finished execution.\n\nUses:\n- Data privacy\n- Callbacks\n- Maintaining state\n- Function factories",
        example:
          "A banking application can use a closure to maintain a private account balance that can only be changed through deposit and withdraw functions.",
        code: `function createAccount() {
    let balance = 1000;

    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createAccount();

account.deposit(500);
console.log(account.getBalance()); // 1500`,
      },
      {
        description:
          "The Event Loop coordinates synchronous code and asynchronous callbacks.\n\nExecution order:\n1. Execute synchronous code on the call stack.\n2. Process microtasks, such as Promise callbacks.\n3. Process the next available task, such as a timer callback.\n\nPromise callbacks normally execute before setTimeout callbacks when both are ready.",
        example:
          "When an application makes an API request, JavaScript can continue executing other code instead of waiting for the response.",
        code: `console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise
// Timer`,
      },
      {
        description:
          "== (loose equality): JavaScript may convert values to the same type before comparing them.\n\n=== (strict equality): Compares both type and value without performing type conversion.\n\nPrefer === in most application code.",
        example:
          'If an API returns the account number as the string "100", strict equality will not consider it equal to the number 100.',
        code: `console.log(10 == "10");  // true
console.log(10 === "10"); // false

console.log(0 == false);  // true
console.log(0 === false); // false`,
      },
      {
        description:
          "A Promise represents the eventual success or failure of an asynchronous operation.\n\nThree states:\n- Pending\n- Fulfilled\n- Rejected\n\nPromises can be handled using then(), catch() and finally().",
        example:
          "When fetching customer details from a server, the Promise may be pending while waiting, fulfilled when data arrives, or rejected when the request fails.",
        code: `const promise = fetch("/api/users");

promise
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Request completed"));`,
      },
      {
        description:
          "async and await provide a cleaner way to write asynchronous code using Promises.\n\n- async makes a function return a Promise.\n- await pauses execution inside the async function until the Promise settles.\n- try/catch is commonly used for error handling.",
        example:
          "A dashboard can wait for an API response before displaying customer information without blocking the browser's main thread.",
        code: `async function getData() {
    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getData();`,
      },
      {
        description:
          "- map(): Transforms every element and returns a new array.\n- filter(): Selects elements that satisfy a condition and returns a new array.\n- reduce(): Combines array elements into a single accumulated result.",
        example:
          "For employee records, map can extract employee names, filter can select IT employees, and reduce can calculate the total salary.",
        code: `const employees = [
    { name: "A", salary: 30000 },
    { name: "B", salary: 40000 },
    { name: "C", salary: 50000 }
];

const names = employees.map(e => e.name);

const highSalary = employees.filter(
    e => e.salary >= 40000
);

const totalSalary = employees.reduce(
    (sum, e) => sum + e.salary,
    0
);

console.log(names);
console.log(highSalary);
console.log(totalSalary); // 120000`,
      },
      {
        description:
          "- undefined: A variable has been declared but has not been assigned a value, or a property does not exist.\n- null: An intentional absence of a value.",
        example:
          "If a customer has not provided an alternate phone number, the application may store null. If a variable was never assigned, its value is undefined.",
        code: `let phoneNumber;
let alternatePhoneNumber = null;

console.log(phoneNumber);          // undefined
console.log(alternatePhoneNumber); // null

console.log(typeof phoneNumber);   // undefined
console.log(typeof null);          // object (historical behavior)`,
      },
      {
        description:
          "Both use the ... syntax, but their purposes differ.\n\n- Spread: Expands elements from an array or properties from an object.\n- Rest: Collects multiple values into an array or object.",
        example:
          "Spread can combine two employee lists. Rest can collect any number of salary values passed to a function.",
        code: `// Spread
const first = [1, 2];
const second = [3, 4];

const combined = [...first, ...second];

// Rest
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

console.log(combined); // [1, 2, 3, 4]
console.log(sum(10, 20, 30)); // 60`,
      },
      {
        description:
          "Destructuring extracts values from arrays or objects and assigns them to variables.\n\nIt makes code shorter and easier to read.",
        example:
          "When an API returns customer details, destructuring lets us directly extract the customer's name, email and account ID.",
        code: `const user = {
    name: "Bharath",
    age: 29,
    city: "Bangalore"
};

const { name, age, city } = user;

const numbers = [10, 20, 30];
const [first, second] = numbers;

console.log(name, age, city);
console.log(first, second);`,
      },
      {
        description:
          "call(), apply() and bind() control the this context when working with regular functions.\n\n- call(): Invokes a function immediately with arguments passed individually.\n- apply(): Invokes a function immediately with arguments passed as an array.\n- bind(): Returns a new function with a fixed this context; it does not invoke the function immediately.",
        example:
          "A shared employee greeting function can be reused for different employee objects by changing its this context.",
        code: `const user = {
    name: "Bharath"
};

function greet(city) {
    console.log(this.name, city);
}

// Immediate invocation
greet.call(user, "Bangalore");

// Immediate invocation with an array
greet.apply(user, ["Chennai"]);

// Returns a new function
const fn = greet.bind(user, "Hyderabad");
fn();`,
      },
      {
        description:
          "JavaScript objects can inherit properties and methods from other objects through the prototype chain.\n\nWhen a property is not found on an object, JavaScript checks its prototype and continues up the chain.",
        example:
          "Different employee objects can share common methods through a common prototype instead of defining the same method repeatedly.",
        code: `const person = {
    greet() {
        console.log("Hello");
    }
};

const employee = Object.create(person);

employee.name = "Bharath";
employee.greet(); // Hello

console.log(
    Object.getPrototypeOf(employee) === person
); // true`,
      },
      {
        description:
          "- Synchronous: Operations execute sequentially. The next operation waits for the current operation to finish.\n- Asynchronous: An operation can complete later while other JavaScript work continues.",
        example:
          "Calculating a small total is synchronous. Fetching transaction details from a remote API is asynchronous.",
        code: `console.log("Start");

setTimeout(() => {
    console.log("Async operation");
}, 1000);

console.log("End");

// Output:
// Start
// End
// Async operation`,
      },
      {
        description:
          "Event propagation has three phases:\n\n1. Capturing: Event travels from the outer parent toward the target element.\n2. Target: Event reaches the target element.\n3. Bubbling: Event travels from the target element back toward its ancestors.\n\nThe third argument true enables capturing.",
        example:
          "When a button inside a form is clicked, the click event can be handled by the button and can also propagate to its parent elements.",
        code: `const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
    console.log("Parent capturing");
}, true);

child.addEventListener("click", () => {
    console.log("Child clicked");
});

parent.addEventListener("click", () => {
    console.log("Parent bubbling");
}, false);`,
      },
      {
        description:
          "- Debouncing: Executes a function only after a specified period of inactivity.\n- Throttling: Limits how frequently a function can execute during a period.\n\nUse cases:\n- Debouncing: Search input.\n- Throttling: Scroll and resize events.",
        example:
          "For a search box, debounce waits until the user stops typing. For scrolling, throttle limits how often the application updates scroll-related information.",
        code: `function debounce(fn, delay) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function throttle(fn, delay) {
    let lastCall = 0;

    return (...args) => {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}`,
      },
      {
        description:
          "Shallow copy creates a new outer object but keeps references to nested objects.\n\nDeep copy creates independent copies of nested objects as well.\n\nChanges to nested properties in a shallow copy can affect the original object.",
        example:
          "When editing a customer's address in a copied object, a shallow copy may accidentally modify the original customer's nested address too.",
        code: `const original = {
    name: "Bharath",
    address: {
        city: "Bangalore"
    }
};

// Shallow copy
const shallow = { ...original };

// Deep copy
const deep = structuredClone(original);

shallow.address.city = "Chennai";

console.log(original.address.city); // Chennai
console.log(deep.address.city);     // Bangalore`,
      },
      {
        description:
          "JavaScript has seven primitive types and one non-primitive category.\n\nPrimitive types:\n1. String\n2. Number\n3. BigInt\n4. Boolean\n5. Undefined\n6. Null\n7. Symbol\n\nNon-primitive category:\n- Objects, including arrays and functions.",
        example:
          "An employee record may use a string for the name, number for salary, boolean for active status, and an object for address details.",
        code: `const name = "Bharath";       // String
const salary = 50000;           // Number
const largeNumber = 123n;       // BigInt
const active = true;            // Boolean
let value;                      // Undefined
const result = null;            // Null
const id = Symbol("id");        // Symbol

const employee = {
    name,
    salary
};                              // Object

const skills = ["Java", "React"]; // Array`,
      },
      {
        description:
          "localStorage:\n- Stores data in the browser until explicitly removed.\n- Data is available across browser sessions for the same origin.\n- Not automatically sent to the server.\n\nsessionStorage:\n- Stores data for the current tab's page session.\n- Cleared when that tab's page session ends.\n- Not automatically sent to the server.\n\nCookies:\n- Can have an expiry time.\n- Matching cookies are sent with applicable HTTP requests.\n- Have a relatively small storage limit.\n\nSensitive authentication tokens should not be stored in localStorage without considering XSS risks. HttpOnly cookies can help protect tokens from JavaScript access.",
        example:
          "A website can store a theme preference in localStorage, temporary form data in sessionStorage, and a secure session identifier in an HttpOnly cookie.",
        code: `// localStorage
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");

// sessionStorage
sessionStorage.setItem("formStep", "2");
const step = sessionStorage.getItem("formStep");

// Cookie example
document.cookie =
    "language=en; max-age=3600; path=/";

// HttpOnly cookies must be configured by the server.
`,
      },
    ],

    scenarios: [
      {
        description:
          "Use Promise.all() when all API requests should run concurrently and all results are required.\n\nIt resolves when every Promise fulfills. If any Promise rejects, Promise.all() rejects.",
        example:
          "A banking dashboard needs user details, account details and transaction details. All three APIs can be called at the same time.",
        code: `async function loadDashboard() {
    try {
        const [users, accounts, transactions] =
            await Promise.all([
                getUsers(),
                getAccounts(),
                getTransactions()
            ]);

        return {
            users,
            accounts,
            transactions
        };
    } catch (error) {
        console.error("Dashboard loading failed", error);
    }
}`,
      },
      {
        description:
          "Use Promise.allSettled() when you need the result of every request, even if some requests fail.\n\nIt returns the status and result or rejection reason for each Promise.",
        example:
          "A dashboard can display account information even if the transaction history API fails.",
        code: `async function loadDashboard() {
    const results = await Promise.allSettled([
        getUsers(),
        getAccounts(),
        getTransactions()
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log("Success:", result.value);
        } else {
            console.log("Failed:", index, result.reason);
        }
    });
}`,
      },
      {
        description:
          "Use debouncing to wait until the user stops typing before sending the API request.\n\nA delay such as 300–500 milliseconds is commonly used for search.",
        example:
          "If a user types 'Java', the application waits until typing stops and then sends one search request instead of sending a request for every character.",
        code: `function debounce(fn, delay) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const searchUsers = debounce(async query => {
    const response = await fetch(
        "/api/users?q=" + encodeURIComponent(query)
    );

    const data = await response.json();
    console.log(data);
}, 500);

// Call on every input change:
// searchUsers("Java");`,
      },
      {
        description:
          "Use two levels of protection:\n\n1. Disable the payment button while the request is processing.\n2. Use a backend idempotency key so repeated requests for the same logical payment do not create duplicate payments.\n\nGenerate the key once per payment attempt and reuse it for retries.",
        example:
          "If a customer clicks Pay multiple times because the page is slow, the frontend prevents repeated clicks and the backend recognizes the same idempotency key.",
        code: `let loading = false;

async function makePayment(paymentDetails) {
    if (loading) return;

    loading = true;

    // Generate once for this logical payment.
    const idempotencyKey = crypto.randomUUID();

    try {
        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify(paymentDetails)
        });

        if (!response.ok) {
            throw new Error("Payment failed");
        }

        return await response.json();
    } finally {
        loading = false;
    }
}`,
      },
      {
        description:
          "Use AbortController to cancel a fetch request after five seconds.\n\nPass its signal to fetch() and call abort() when the timeout occurs.",
        example:
          "If a transaction history API does not respond within five seconds, the frontend cancels the request and can show a timeout message.",
        code: `async function getData() {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, 5000);

    try {
        const response = await fetch("/api/users", {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request timed out");
        } else {
            throw error;
        }
    } finally {
        clearTimeout(timer);
    }
}`,
      },
      {
        description:
          "For 100,000 records, avoid rendering and processing everything unnecessarily.\n\nRecommended approaches:\n- Server-side filtering and pagination.\n- Debounced search.\n- Efficient filtering algorithms.\n- Virtualization for large lists.\n- Avoid repeated expensive calculations.",
        example:
          "An employee application can request only 50 employees per page from the backend instead of downloading and displaying all 100,000 employees.",
        code: `async function getEmployees(page, pageSize, search) {
    const params = new URLSearchParams({
        page: String(page),
        size: String(pageSize),
        search
    });

    const response = await fetch(
        "/api/employees?" + params
    );

    return response.json();
}

// Load only one page
const employees = await getEmployees(1, 50, "Java");`,
      },
      {
        description:
          "Use async/await when the second API depends on the result of the first API.\n\nExecute the first request, read its result, and then execute the second request.",
        example:
          "First fetch customer details to get the customer ID. Then use that ID to fetch the customer's bank accounts.",
        code: `async function getCustomerAccount() {
    const user = await getUser();

    const account = await getAccount(user.id);

    return account;
}`,
      },
      {
        description:
          "Use a closure to remember whether the function has already executed.\n\nThe closure maintains a private variable across multiple calls.",
        example:
          "An application initialization function should execute only once, even if multiple components try to call it.",
        code: `function once(fn) {
    let executed = false;
    let result;

    return function(...args) {
        if (executed) {
            return result;
        }

        executed = true;
        result = fn.apply(this, args);

        return result;
    };
}

const initialize = once(() => {
    console.log("Initialized");
    return true;
});

initialize(); // Initialized
initialize(); // Does not execute again
initialize(); // Does not execute again`,
      },
      {
        description:
          "Use Map for in-memory caching.\n\nBefore making an API request, check whether the result is already available in the cache. For production applications, consider cache expiry, invalidation and memory limits.",
        example:
          "If the application requests the same customer details repeatedly, it can reuse the cached result instead of making another API call.",
        code: `const cache = new Map();

async function getUser(id) {
    if (cache.has(id)) {
        return cache.get(id);
    }

    const response = await fetch(
        "/api/users/" + encodeURIComponent(id)
    );

    if (!response.ok) {
        throw new Error("Unable to fetch user");
    }

    const data = await response.json();

    cache.set(id, data);

    return data;
}`,
      },
      {
        description:
          "Use AbortController to cancel the previous search request when a new search starts.\n\nAlternatively, assign request IDs and ignore responses from older requests.",
        example:
          "If a user searches for 'Ja' and quickly changes it to 'Java', the older 'Ja' response should not overwrite the latest search results.",
        code: `let controller;

async function searchUsers(query) {
    // Cancel the previous request
    controller?.abort();

    controller = new AbortController();

    try {
        const response = await fetch(
            "/api/users?q=" + encodeURIComponent(query),
            {
                signal: controller.signal
            }
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        return await response.json();
    } catch (error) {
        if (error.name !== "AbortError") {
            throw error;
        }
    }
}`,
      },
    ],
  },

  react: {
    important: [
      {
        description:
          "React is a JavaScript library used to build reusable and interactive user interfaces using components.\n\nMain features:\n- Component-based architecture\n- Declarative UI\n- State and props\n- Hooks\n- Virtual DOM and reconciliation",
        example:
          "A banking application can use separate React components for Login, Dashboard, Account Details and Transaction History.",
        code: `function App() {
    return (
        <div>
            <h1>Banking Application</h1>
            <p>Welcome to your dashboard</p>
        </div>
    );
}`,
      },
      {
        description:
          "Components are independent and reusable UI building blocks.\n\nTwo common types:\n- Functional components\n- Class components\n\nModern React applications primarily use functional components and Hooks.",
        example:
          "A Header component can be reused on the Dashboard, Profile and Transaction pages.",
        code: `function Header() {
    return <h1>Banking Application</h1>;
}

function App() {
    return (
        <div>
            <Header />
            <p>Dashboard</p>
        </div>
    );
}`,
      },
      {
        description:
          "JSX is a syntax extension that allows us to write HTML-like markup inside JavaScript.\n\nJSX is transformed into JavaScript instructions that React uses to create UI elements.",
        example:
          "A React component can display a customer's name dynamically using a JavaScript expression inside JSX.",
        code: `const name = "Bharath";

function App() {
    return <h1>Hello {name}</h1>;
}`,
      },
      {
        description:
          "Props:\n- Passed from parent to child components.\n- Read-only to the receiving component.\n- Used to pass data into a component.\n- The parent controls their values.\n\nState:\n- Managed within a component.\n- Updated using a state setter.\n- Used for data that can change over time.\n- Updating state can trigger a re-render.",
        example:
          "A parent can pass an employee name as a prop. The child can maintain its own show/hide state for employee details.",
        code: `function Employee({ name }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h2>{name}</h2>

            <button onClick={() => setShowDetails(!showDetails)}>
                Toggle Details
            </button>

            {showDetails && <p>Employee details</p>}
        </div>
    );
}

function App() {
    return <Employee name="Bharath" />;
}`,
      },
      {
        description:
          "The Virtual DOM is a lightweight JavaScript representation of the UI.\n\nReact uses reconciliation to determine what changes need to be committed to the actual DOM.\n\nIt helps React manage UI updates efficiently, but it does not mean every update always changes only one DOM node.",
        example:
          "When a transaction balance changes, React determines which parts of the UI need updating instead of requiring the developer to manually update the DOM.",
        code: `function Balance() {
    const [balance, setBalance] = useState(1000);

    return (
        <div>
            <h2>Balance: {balance}</h2>

            <button onClick={() => setBalance(b => b + 100)}>
                Deposit
            </button>
        </div>
    );
}`,
      },
      {
        description:
          "Reconciliation is the process React uses to compare the previous UI tree with the new UI tree and determine the necessary updates.\n\nReact uses element types and keys to understand which elements can be reused or need to be replaced.",
        example:
          "When a new transaction is added to a list, stable keys help React identify existing transactions and the newly added transaction.",
        code: `function Transactions({ transactions }) {
    return (
        <ul>
            {transactions.map(transaction => (
                <li key={transaction.id}>
                    {transaction.description}
                </li>
            ))}
        </ul>
    );
}`,
      },
      {
        description:
          "Hooks allow functional components to use React features such as state, Effects, context and memoization.\n\nCommon Hooks:\n- useState\n- useEffect\n- useRef\n- useContext\n- useMemo\n- useCallback\n- useReducer\n\nHooks must be called at the top level of React components or custom Hooks.",
        example:
          "A functional component can use useState to manage a counter and useEffect to fetch customer details.",
        code: `function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = "Count: " + count;
    }, [count]);

    return (
        <button onClick={() => setCount(c => c + 1)}>
            {count}
        </button>
    );
}`,
      },
      {
        description:
          "useState allows functional components to maintain state.\n\nIt returns:\n1. Current state value.\n2. Setter function to update the state.\n\nState updates may be batched. Use a functional update when the new value depends on the previous value.",
        example:
          "A banking dashboard can use useState to update the displayed account balance after a deposit.",
        code: `function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(previous => previous + 1);
    }

    return (
        <button onClick={increment}>
            Count: {count}
        </button>
    );
}`,
      },
      {
        description:
          "useEffect is used to synchronize a component with external systems, such as APIs, subscriptions, timers and browser events.\n\n- No dependency array: runs after every committed render.\n- Empty dependency array: runs after the initial mount in normal production behavior.\n- Dependencies: runs after relevant dependency changes.\n- Cleanup: runs before the Effect is re-executed and when the component unmounts.\n\nIn development Strict Mode, React may run an extra setup and cleanup cycle.",
        example:
          "When a transaction page appears, useEffect can fetch transaction data and clean up an event listener when the page is removed.",
        code: `useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
        try {
            const response = await fetch("/api/users", {
                signal: controller.signal
            });

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error(error);
            }
        }
    }

    loadUsers();

    return () => controller.abort();
}, []);`,
      },
      {
        description:
          "useRef stores a persistent reference between renders without triggering a re-render when its value changes.\n\nCommon uses:\n- Accessing DOM elements.\n- Storing timer IDs.\n- Maintaining mutable values that do not affect the UI.",
        example:
          "A search page can use useRef to focus the search input automatically when the component loads.",
        code: `function Search() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <input
            ref={inputRef}
            placeholder="Search users"
        />
    );
}`,
      },
      {
        description:
          "- useMemo: Memoizes the result of a calculation between renders when dependencies have not changed.\n- useCallback: Memoizes a function reference between renders when dependencies have not changed.\n\nUse them when they solve an actual performance problem, not automatically everywhere.",
        example:
          "A transaction page can use useMemo to calculate a large total and useCallback to preserve a handler passed to a memoized child.",
        code: `const total = useMemo(() => {
    return calculateTotal(transactions);
}, [transactions]);

const handleSave = useCallback(() => {
    saveData();
}, []);`,
      },
      {
        description:
          "React.memo is a higher-order component that can skip rendering a component when its props have not changed according to its comparison.\n\nBy default, React compares each prop using Object.is. It does not prevent rendering caused by the component's own state or consumed context changes.",
        example:
          "A large employee list can use React.memo for employee rows so unchanged rows do not needlessly re-render when the parent updates.",
        code: `const Employee = React.memo(function Employee({ name }) {
    console.log("Employee rendered");

    return <h2>{name}</h2>;
});

function App() {
    return <Employee name="Bharath" />;
}`,
      },
      {
        description:
          "useContext allows components to consume shared context data without passing props through every intermediate component.\n\nIt is useful for shared values such as theme, language and authenticated user information.",
        example:
          "Instead of passing the logged-in user's details through multiple components, the application can provide the user through Context.",
        code: `const UserContext = createContext(null);

function Profile() {
    const user = useContext(UserContext);

    return <h1>{user.name}</h1>;
}

function App() {
    const user = { name: "Bharath" };

    return (
        <UserContext.Provider value={user}>
            <Profile />
        </UserContext.Provider>
    );
}`,
      },
      {
        description:
          "useReducer manages state through a reducer function and dispatched actions.\n\nIt is useful when state transitions are complex or when multiple actions update related state values.",
        example:
          "A shopping cart can use useReducer to handle ADD_ITEM, REMOVE_ITEM and CLEAR_CART actions.",
        code: `function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            };

        case "DECREMENT":
            return {
                count: state.count - 1
            };

        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(
        reducer,
        { count: 0 }
    );

    return (
        <div>
            <p>{state.count}</p>

            <button onClick={() => dispatch({ type: "INCREMENT" })}>
                +
            </button>

            <button onClick={() => dispatch({ type: "DECREMENT" })}>
                -
            </button>
        </div>
    );
}`,
      },
      {
        description:
          "Prop drilling occurs when data is passed through multiple intermediate components to reach a deeply nested child.\n\nSolutions include:\n- Context API\n- Redux or other state management libraries\n- Component composition",
        example:
          "If the logged-in user is needed by the Dashboard, Header and Profile components, passing user props through every intermediate component can become difficult to maintain.",
        code: `// Without Context, props are passed through each level.

function App() {
    const user = "Bharath";

    return <Dashboard user={user} />;
}

function Dashboard({ user }) {
    return <Profile user={user} />;
}

function Profile({ user }) {
    return <h1>{user}</h1>;
}`,
      },
      {
        description:
          "React Router is a routing library used for navigation between different pages in React applications without requiring a full page reload for every route change.",
        example:
          "A banking application can provide separate routes for Login, Dashboard, Accounts and Transaction History.",
        code: `import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}`,
      },
      {
        description:
          "Lazy loading loads a component only when it is needed, helping reduce the initial JavaScript bundle.\n\nReact.lazy() is commonly used with Suspense to display a fallback while the component loads.",
        example:
          "A large Reports page can be loaded only when the user navigates to Reports instead of downloading it during the initial application load.",
        code: `const Dashboard = React.lazy(
    () => import("./Dashboard")
);

function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
        </Suspense>
    );
}`,
      },
      {
        description:
          "Redux is a state management library used to manage shared application state in a predictable way.\n\nMain concepts:\n- Store: Holds application state.\n- Actions: Describe what happened.\n- Reducers: Calculate the next state.\n- Dispatch: Sends actions to the store.\n- Selectors: Read required state.\n\nRedux Toolkit is the recommended approach for writing modern Redux applications.",
        example:
          "A banking application can use Redux to share authenticated user information, account details and application-wide state across multiple pages.",
        code: `import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { name: "" },
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});`,
      },
      {
        description:
          "Controlled components:\n- Form values are managed by React state.\n- Input values are updated through onChange handlers.\n\nUncontrolled components:\n- Form values are maintained by the DOM.\n- Values are commonly accessed through refs.",
        example:
          "A login form can use controlled inputs to validate email and password as the user types. An uncontrolled form can use refs to read values when submitting.",
        code: `// Controlled
function ControlledInput() {
    const [name, setName] = useState("");

    return (
        <input
            value={name}
            onChange={e => setName(e.target.value)}
        />
    );
}

// Uncontrolled
function UncontrolledInput() {
    const inputRef = useRef(null);

    function handleSubmit() {
        console.log(inputRef.current.value);
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}`,
      },
      {
        description:
          "React performance can be improved through:\n\n1. React.memo for suitable components.\n2. useMemo for expensive calculations.\n3. useCallback when stable function references are useful.\n4. Lazy loading and code splitting.\n5. List virtualization.\n6. Avoiding unnecessary state updates.\n7. Using proper keys.\n8. Keeping state close to where it is needed.\n9. Profiling to identify actual bottlenecks.",
        example:
          "For a transaction dashboard with thousands of records, use backend pagination, list virtualization and memoization where profiling shows unnecessary work.",
        code: `const TransactionRow = React.memo(function TransactionRow({
    transaction
}) {
    return (
        <div>
            {transaction.description}
            - {transaction.amount}
        </div>
    );
});

function TransactionList({ transactions }) {
    const total = useMemo(() => {
        return transactions.reduce(
            (sum, item) => sum + item.amount,
            0
        );
    }, [transactions]);

    return (
        <div>
            <h2>Total: {total}</h2>

            {transactions.map(transaction => (
                <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                />
            ))}
        </div>
    );
}`,
      },
    ],

    scenarios: [
      {
        description:
          "Use React.memo when the child receives unchanged props.\n\nFor function props, consider useCallback when a stable function reference is necessary.\n\nAlso check whether the child is re-rendering because of its own state or context changes.",
        example:
          "If a Dashboard parent updates its notification count, an Employee component with unchanged props does not need to render again.",
        code: `const Child = React.memo(function Child({ name }) {
    console.log("Child rendered");

    return <h1>{name}</h1>;
});

function Parent() {
    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => setCount(c => c + 1)}>
                Count: {count}
            </button>

            <Child name="Bharath" />
        </>
    );
}`,
      },
      {
        description:
          "Use useEffect to fetch data when a component appears.\n\nFor production applications, also handle loading states, errors and request cancellation during cleanup.",
        example:
          "When the Employees page loads, fetch employee details from the backend and display them in the UI.",
        code: `function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadUsers() {
            try {
                const response = await fetch("/api/users", {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Failed to load users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadUsers();

        return () => controller.abort();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return users.map(user => (
        <p key={user.id}>{user.name}</p>
    ));
}`,
      },
      {
        description:
          "Use useEffect with a debounce timer.\n\nEvery time the search value changes, clear the previous timer and start a new one. Send the API request only after the user stops typing for the configured delay.",
        example:
          "If a user types 'React', the application waits 500 milliseconds after the last keystroke before sending the search request.",
        code: `function Search() {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search.trim()) return;

        const timer = setTimeout(() => {
            fetch(
                "/api/search?q=" + encodeURIComponent(search)
            )
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
        />
    );
}`,
      },
      {
        description:
          "Use Context API or Redux to share logged-in user information across multiple components.\n\nContext is suitable for many relatively simple shared values. Redux can be useful when application state and update logic become more complex.",
        example:
          "The Header, Dashboard and Profile pages can access the same authenticated user's details without passing props through every intermediate component.",
        code: `const UserContext = createContext(null);

function App() {
    const user = {
        name: "Bharath",
        role: "Developer"
    };

    return (
        <UserContext.Provider value={user}>
            <Header />
            <Profile />
        </UserContext.Provider>
    );
}

function Header() {
    const user = useContext(UserContext);

    return <h2>Welcome {user.name}</h2>;
}

function Profile() {
    const user = useContext(UserContext);

    return <p>Role: {user.role}</p>;
}`,
      },
      {
        description:
          "Use useMemo when a calculation is expensive and its inputs have not changed.\n\nReact can reuse the previously calculated value instead of performing the calculation on every render.",
        example:
          "A transaction dashboard can calculate the total transaction amount only when the transaction list changes.",
        code: `function TransactionSummary({ transactions }) {
    const total = useMemo(() => {
        console.log("Calculating total");

        return transactions.reduce(
            (sum, transaction) =>
                sum + transaction.amount,
            0
        );
    }, [transactions]);

    return <h2>Total: {total}</h2>;
}`,
      },
      {
        description:
          "Use pagination to divide 1,000 employees into smaller pages.\n\nFor production applications, prefer backend pagination so the browser does not need to download all records at once.",
        example:
          "Display 10 employees per page. When the user clicks Next, fetch the next page from the backend.",
        code: `function EmployeeList({ employees }) {
    const [page, setPage] = useState(1);

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    const visibleEmployees = employees.slice(
        start,
        start + pageSize
    );

    return (
        <div>
            {visibleEmployees.map(employee => (
                <p key={employee.id}>
                    {employee.name}
                </p>
            ))}

            <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
            >
                Previous
            </button>

            <button
                disabled={start + pageSize >= employees.length}
                onClick={() => setPage(p => p + 1)}
            >
                Next
            </button>
        </div>
    );
}`,
      },
      {
        description:
          "Use controlled components to manage form values through React state.\n\nAdd validation before submitting the form. For larger applications, form libraries can help manage validation and errors.",
        example:
          "A login form stores email and password in state, validates that both fields are provided and then submits the login request.",
        code: `function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setError("");
        console.log("Login submitted");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />

            {error && <p>{error}</p>}

            <button type="submit">Login</button>
        </form>
    );
}`,
      },
      {
        description:
          "Use Optimistic UI updates.\n\nUpdate the UI immediately while the server request is in progress. If the request succeeds, use the confirmed server response. If it fails, restore or reconcile the UI with the confirmed server state.\n\nReact provides useOptimistic for this purpose.",
        example:
          "When a user transfers money, the UI can immediately show the expected updated balance while the backend processes the transfer. If the transfer fails, show the confirmed balance again.",
        code: `import {
    useState,
    useOptimistic,
    startTransition
} from "react";

function Balance() {
    const [balance, setBalance] = useState(1000);

    const [optimisticBalance, updateBalance] =
        useOptimistic(balance);

    async function transfer(amount) {
        startTransition(async () => {
            updateBalance(balance - amount);

            try {
                const confirmedBalance =
                    await transferMoney(amount);

                setBalance(confirmedBalance);
            } catch (error) {
                console.error("Transfer failed", error);
                // Optimistic state returns to the confirmed value
                // when the Action finishes.
            }
        });
    }

    return (
        <div>
            <p>Balance: {optimisticBalance}</p>

            <button onClick={() => transfer(100)}>
                Transfer 100
            </button>
        </div>
    );
}`,
      },
      {
        description:
          "Use Lazy Loading and Code Splitting.\n\nReact.lazy() loads a component when it is rendered instead of including it in the initial application bundle. Suspense displays a fallback while the component is loading.",
        example:
          "A large Reports or Admin page can be downloaded only when the user navigates to that page, reducing the initial application download.",
        code: `import React, { Suspense } from "react";

const Dashboard = React.lazy(
    () => import("./Dashboard")
);

function App() {
    return (
        <Suspense fallback={<p>Loading Dashboard...</p>}>
            <Dashboard />
        </Suspense>
    );
}`,
      },
      {
        description:
          "Use list virtualization to render only the visible rows instead of all 10,000 transaction rows.\n\nLibraries such as react-window or other virtualization libraries help reduce DOM nodes and rendering work.",
        example:
          "A transaction history page may contain 10,000 records, but the screen displays only the rows currently visible to the user.",
        code: `import { FixedSizeList } from "react-window";

function TransactionList({ transactions }) {
    return (
        <FixedSizeList
            height={400}
            width={600}
            itemCount={transactions.length}
            itemSize={50}
            itemData={transactions}
        >
            {({ index, style, data }) => (
                <div style={style}>
                    {data[index].description}
                </div>
            )}
        </FixedSizeList>
    );
}`,
      },
    ],
  },

  multithreading: {
    important: [
      {
        question:
          "What is a thread in Java and what are the two ways to create one?",
        description:
          "A thread is an independent path of execution inside a program. It allows different tasks to make progress at the same time. You can create a thread by extending the Thread class or implementing Runnable. Implementing Runnable is generally preferred because your class can still extend another class.",
        example:
          "Imagine a restaurant. One employee takes orders, another prepares food, and another serves customers. Different tasks are handled by different people instead of making one person do everything.",
        softwareExample:
          "In an online shopping application, one task processes an order while another sends an email notification. These tasks can run independently.",
        code: 'class PaymentTask implements Runnable {\n  public void run() {\n    System.out.println("Processing payment: " + Thread.currentThread().getName());\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Thread t1 = new Thread(new PaymentTask());\n    t1.start();\n  }\n}',
      },
      {
        question: "What is the difference between start() and run()?",
        description:
          "start() tells Java to create and schedule a new thread. That new thread will execute the run() method. Calling run() directly does not create a new thread; it behaves like a normal method call on the current thread.",
        example:
          "Imagine asking another employee to do a task. If you assign the task to them, they work independently. If you do the task yourself, you are still doing it personally. start() is like assigning the work; run() directly is like doing it yourself.",
        softwareExample:
          "Use start() when you want a background task to run separately from the main application thread.",
        code: 'public class Main {\n  public static void main(String[] args) {\n    Thread t = new Thread(() -> {\n      System.out.println("Running in: " + Thread.currentThread().getName());\n    });\n\n    t.run();   // Runs on main thread\n    t.start(); // Runs on a new thread\n  }\n}',
      },
      {
        question: "What are the six Java thread lifecycle states?",
        description:
          "A Java thread has six states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED. NEW means created but not started. RUNNABLE means ready or running. BLOCKED means waiting to acquire a synchronized lock. WAITING means waiting without a time limit. TIMED_WAITING means waiting for a specified time. TERMINATED means execution has finished.",
        example:
          "Think about a person waiting for a bus. Before reaching the bus stop, they are NEW. Once ready to board, they are RUNNABLE. If the entrance is occupied, they are BLOCKED. If they wait for someone, they are WAITING. If they wait for five minutes, they are TIMED_WAITING. After completing the journey, they are TERMINATED.",
        softwareExample:
          "When a background report-generation task is created, started, waits for a database connection and eventually finishes, it moves through different thread states.",
        code: 'public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread t = new Thread(() -> System.out.println("Task running"));\n\n    System.out.println(t.getState()); // NEW\n    t.start();\n    t.join();\n    System.out.println(t.getState()); // TERMINATED\n  }\n}',
      },
      {
        question: "What is the difference between sleep() and wait()?",
        description:
          "sleep() pauses the current thread for a specified time. It does not release a lock that the thread already holds. wait() is used for communication between threads. It must be called while holding that object's monitor, and it releases that monitor while waiting. The thread must reacquire the monitor before continuing.",
        example:
          "Imagine two people sharing one meeting room. Person A takes a break but keeps the room key; nobody else can use the room. That is like sleep() while holding a lock. With wait(), Person A releases the key and waits, allowing another person to enter.",
        softwareExample:
          "A producer-consumer application uses wait() when a queue is empty so the consumer can wait until the producer adds data.",
        code: 'class Shared {\n  private boolean ready = false;\n\n  synchronized void waitForData() throws InterruptedException {\n    while (!ready) {\n      wait(); // Releases this object\'s monitor\n    }\n    System.out.println("Data is ready");\n  }\n\n  synchronized void provideData() {\n    ready = true;\n    notifyAll();\n  }\n}\n\n// Thread.sleep(1000); pauses the current thread for 1 second.\n// sleep() does not release a monitor already held by that thread.',
      },
      {
        question: "What is the difference between synchronized and volatile?",
        description:
          "synchronized allows only one thread at a time to execute a protected section using the same lock. It also makes changes visible to other threads that acquire that lock. volatile makes updates to a variable visible across threads, but it does not make operations such as count++ atomic.",
        example:
          "Imagine a shared bank counter. If multiple employees update it, they need a rule that allows only one employee to update it at a time. That is like synchronized. If everyone only needs to see the latest shop-open or shop-closed sign, that is like volatile.",
        softwareExample:
          "Use volatile for a shared application shutdown flag. Use synchronized or AtomicInteger when multiple requests update the same counter or balance.",
        code: "class Counter {\n  private volatile boolean running = true;\n  private int count = 0;\n\n  synchronized void increment() {\n    count++;\n  }\n\n  void stop() {\n    running = false;\n  }\n\n  boolean isRunning() {\n    return running;\n  }\n}",
      },
      {
        question: "What is the difference between join() and yield()?",
        description:
          "join() makes the current thread wait until another thread finishes. yield() is only a suggestion to the thread scheduler that the current thread is willing to let another thread run. The scheduler may ignore yield().",
        example:
          "Imagine waiting for your colleague to finish a report before submitting the final document. That is like join(). Taking a break and allowing another colleague to work first is like yield(), but nobody guarantees that they will get the chance.",
        softwareExample:
          "The main thread can call join() to wait for a background file-processing task before reading its final output.",
        code: 'public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread worker = new Thread(() -> {\n      System.out.println("Worker is processing");\n    });\n\n    worker.start();\n    worker.join(); // Main waits for worker to finish\n\n    System.out.println("Worker completed");\n    Thread.yield(); // Scheduler hint only\n  }\n}',
      },
      {
        question: "What is a race condition and how do you prevent it?",
        description:
          "A race condition happens when multiple threads access and change shared data at the same time, and the final result depends on which thread executes first. Prevent it with synchronized, locks, atomic variables or thread-safe data structures.",
        example:
          "Imagine a bank account has ₹1,000. Two people try to withdraw ₹800 at the same time. Both may see the original balance and approve their withdrawal. The account could become incorrect because both operations happened without proper coordination.",
        softwareExample:
          "Two payment requests updating the same customer balance must be coordinated so the balance is not incorrectly updated.",
        code: "import java.util.concurrent.atomic.AtomicInteger;\n\npublic class Main {\n  public static void main(String[] args) throws InterruptedException {\n    AtomicInteger counter = new AtomicInteger(0);\n\n    Runnable task = () -> {\n      for (int i = 0; i < 1000; i++) {\n        counter.incrementAndGet();\n      }\n    };\n\n    Thread t1 = new Thread(task);\n    Thread t2 = new Thread(task);\n    t1.start();\n    t2.start();\n    t1.join();\n    t2.join();\n\n    System.out.println(counter.get()); // 2000\n  }\n}",
      },
      {
        question: "What is deadlock and how do you prevent it?",
        description:
          "Deadlock happens when two or more threads wait forever for locks held by one another. Prevent it by acquiring locks in a consistent order, avoiding unnecessary nested locks, keeping locked sections short and using timed tryLock() when appropriate.",
        example:
          "Imagine two people on a narrow staircase. Person A waits for Person B to move, while Person B waits for Person A to move. Neither moves, so both remain stuck.",
        softwareExample:
          "During a bank transfer, one thread locks Account A and waits for Account B, while another locks Account B and waits for Account A. Both transactions can get stuck.",
        code: 'import java.util.concurrent.TimeUnit;\nimport java.util.concurrent.locks.Lock;\nimport java.util.concurrent.locks.ReentrantLock;\n\npublic class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Lock accountA = new ReentrantLock();\n    Lock accountB = new ReentrantLock();\n\n    // Always acquire locks in the same order.\n    if (accountA.tryLock(1, TimeUnit.SECONDS)) {\n      try {\n        if (accountB.tryLock(1, TimeUnit.SECONDS)) {\n          try {\n            System.out.println("Transfer completed");\n          } finally {\n            accountB.unlock();\n          }\n        }\n      } finally {\n        accountA.unlock();\n      }\n    }\n  }\n}',
      },
      {
        question: "What is the difference between notify() and notifyAll()?",
        description:
          "notify() wakes up one thread waiting on an object's monitor. notifyAll() wakes up all threads waiting on that monitor. The awakened threads still need to acquire the lock and check their conditions before continuing.",
        example:
          "Imagine several people waiting outside a service counter. notify() calls one waiting person. notifyAll() informs everyone that the counter may now be available. They still need to take their turn.",
        softwareExample:
          "In a shared task queue, notifyAll() can wake waiting consumers after new work is added. Each consumer checks whether work is actually available.",
        code: 'class Shared {\n  private boolean ready = false;\n\n  synchronized void waitForWork() throws InterruptedException {\n    while (!ready) {\n      wait();\n    }\n    System.out.println("Work is available");\n  }\n\n  synchronized void addWork() {\n    ready = true;\n    notifyAll();\n  }\n}',
      },
      {
        question:
          "What is the Executor Framework and why use it instead of raw threads?",
        description:
          "The Executor Framework separates submitting a task from managing the threads that execute it. ExecutorService can reuse threads, manage a pool, return task results and support controlled shutdown. This avoids manually creating a new thread for every task.",
        example:
          "Imagine a restaurant with a fixed number of employees. New orders are placed in a queue, and available employees pick them up. Employees are reused instead of hiring a new person for every order.",
        softwareExample:
          "A Spring Boot service can submit background email, report or order-processing tasks to a configured thread pool.",
        code: 'import java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\n\npublic class Main {\n  public static void main(String[] args) {\n    ExecutorService pool = Executors.newFixedThreadPool(4);\n\n    pool.submit(() -> System.out.println("Processing order"));\n\n    pool.shutdown();\n  }\n}',
      },
      {
        question: "What is the difference between execute() and submit()?",
        description:
          "execute() accepts a Runnable and returns nothing. submit() accepts a Runnable or Callable and returns a Future. The Future lets you check completion, cancel the task or retrieve its result. Exceptions from submitted tasks can be observed through Future.get().",
        example:
          "Imagine asking an employee to deliver a parcel without expecting a confirmation. That is like execute(). If you ask for a delivery receipt, that is like submit() with a Future.",
        softwareExample:
          "Use execute() for a simple background notification. Use submit() when a report-generation task must return a result to the calling service.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(2);\n\n    pool.execute(() -> System.out.println("Email sent"));\n\n    Future<Integer> result = pool.submit(() -> 100);\n    System.out.println("Result: " + result.get());\n\n    pool.shutdown();\n  }\n}',
      },
      {
        question: "What is the difference between Runnable and Callable?",
        description:
          "Runnable has a run() method and does not return a result. Callable has a call() method, returns a value and can throw checked exceptions. Callable is useful when a background task must produce a result.",
        example:
          "Imagine asking an employee to clean a room. They complete the task but do not return anything. That is Runnable. If you ask an employee to count the items in the room and report the number, that is Callable.",
        softwareExample:
          "Use Runnable to send an email. Use Callable<Customer> when a background task calls a customer service and must return customer information.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    ExecutorService pool = Executors.newSingleThreadExecutor();\n\n    Runnable notification = () -> System.out.println("Notification sent");\n    pool.submit(notification);\n\n    Callable<Integer> calculation = () -> 100;\n    Future<Integer> result = pool.submit(calculation);\n\n    System.out.println(result.get());\n    pool.shutdown();\n  }\n}',
      },
      {
        question: "What is Future in Java and why does get() block?",
        description:
          "Future represents a result that may become available later. get() waits until the task finishes because the result is not ready yet. get(timeout, unit) limits how long the caller waits. Future also supports cancellation and completion checks.",
        example:
          "Imagine ordering food at a restaurant and receiving a token. You can do other things while the food is being prepared. When you ask for the food, you may need to wait if it is not ready. The token is like Future and collecting the food is like get().",
        softwareExample:
          "A report service can start generating a report in the background and retrieve the completed report later.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    ExecutorService pool = Executors.newSingleThreadExecutor();\n\n    Future<String> future = pool.submit(() -> {\n      Thread.sleep(1000);\n      return "Report generated";\n    });\n\n    System.out.println(future.get(5, TimeUnit.SECONDS));\n    pool.shutdown();\n  }\n}',
      },
      {
        question: "What are the different ExecutorService thread pools?",
        description:
          "Common executor types include fixed thread pools, cached thread pools, single-thread executors and scheduled thread pools. A fixed pool has a fixed number of workers. A cached pool can create and reuse workers as needed. A single-thread executor runs tasks one at a time. A scheduled pool runs tasks after a delay or periodically. For production, consider explicitly configuring ThreadPoolExecutor with a bounded queue and a suitable rejection policy.",
        example:
          "A fixed pool is like a shop with four service counters. A single-thread pool is like one counter. A scheduled pool is like a person who performs a task every morning at 9 AM.",
        softwareExample:
          "Use a bounded pool for controlled background processing and a scheduled executor for periodic cleanup or report jobs. Avoid unlimited task queues when incoming work may exceed processing capacity.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ExecutorService fixed = Executors.newFixedThreadPool(4);\n    ExecutorService single = Executors.newSingleThreadExecutor();\n    ExecutorService cached = Executors.newCachedThreadPool();\n    ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2);\n\n    fixed.submit(() -> System.out.println("Fixed pool task"));\n    single.submit(() -> System.out.println("Single pool task"));\n    cached.submit(() -> System.out.println("Cached pool task"));\n    scheduled.schedule(() -> System.out.println("Scheduled task"), 1, TimeUnit.SECONDS);\n\n    fixed.shutdown();\n    single.shutdown();\n    cached.shutdown();\n    scheduled.shutdown();\n  }\n}',
      },
      {
        question:
          "What is CompletableFuture and how does it differ from Future?",
        description:
          "CompletableFuture represents a result that will be available in the future, like Future, but it also supports asynchronous stages, callbacks, combining results and exception handling. It allows you to build a sequence of tasks without immediately blocking the current thread.",
        example:
          "Imagine ordering food and a drink at the same time. When both are ready, the waiter brings them together. You do not need to stand at the counter and repeatedly check each item.",
        softwareExample:
          "A dashboard can call Customer API and Account API in parallel, then combine both responses into one dashboard response.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    CompletableFuture<String> customer =\n        CompletableFuture.supplyAsync(() -> "Customer details");\n\n    CompletableFuture<String> account =\n        CompletableFuture.supplyAsync(() -> "Account details");\n\n    CompletableFuture<String> dashboard = customer.thenCombine(\n        account,\n        (c, a) -> c + " + " + a\n    );\n\n    System.out.println(dashboard.join());\n  }\n}',
      },
      {
        question:
          "What is the difference between shutdown() and shutdownNow()?",
        description:
          "shutdown() stops accepting new tasks but allows already submitted tasks to finish. shutdownNow() attempts to interrupt running tasks and returns tasks that have not started. Interruption is cooperative, so a task must respond to interruption for it to stop promptly.",
        example:
          "Imagine a restaurant closing. shutdown() means no new customers are accepted, but existing customers can finish their meals. shutdownNow() means asking everyone to stop immediately, although some people may still need time to respond.",
        softwareExample:
          "When a Spring Boot application stops, it should first allow background jobs to finish. If they exceed the allowed shutdown time, the application can request interruption.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws InterruptedException {\n    ExecutorService pool = Executors.newFixedThreadPool(2);\n\n    pool.submit(() -> System.out.println("Finishing existing task"));\n    pool.shutdown();\n\n    if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {\n      pool.shutdownNow();\n    }\n  }\n}',
      },
      {
        question:
          "What is RejectedExecutionException and the common rejection policies?",
        description:
          "RejectedExecutionException occurs when an executor cannot accept a new task, commonly because it has been shut down or its worker capacity and bounded queue are full. Common policies are AbortPolicy, CallerRunsPolicy, DiscardPolicy and DiscardOldestPolicy.",
        example:
          "Imagine a restaurant with all tables occupied and no waiting space. It may refuse a new customer, ask the person taking orders to handle the task, or remove an older waiting request to make space. These are different rejection strategies.",
        softwareExample:
          "If a production API receives more background jobs than its thread pool can process, the rejection policy decides what happens to extra jobs. CallerRunsPolicy can slow down the submitting thread; AbortPolicy allows the application to handle overload explicitly.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ThreadPoolExecutor pool = new ThreadPoolExecutor(\n        2,\n        4,\n        60,\n        TimeUnit.SECONDS,\n        new ArrayBlockingQueue<>(100),\n        new ThreadPoolExecutor.CallerRunsPolicy()\n    );\n\n    pool.submit(() -> System.out.println("Task running"));\n    pool.shutdown();\n  }\n}',
      },
      {
        question:
          "What are Virtual Threads and how do they differ from platform threads?",
        description:
          "Virtual Threads are lightweight threads managed by the JVM. They became a final feature in Java 21. Platform threads are backed by operating-system threads and are more expensive to create in very large numbers. Virtual threads are useful for applications with many tasks that spend time waiting for I/O. They do not make CPU-heavy work faster.",
        example:
          "Imagine a large office. Platform threads are like assigning a dedicated employee to every waiting customer. Virtual threads are like giving each customer a lightweight token while a smaller number of employees handle the actual work. Customers can wait without requiring one dedicated employee each.",
        softwareExample:
          "A backend service that handles thousands of independent requests waiting for HTTP responses or database operations can use virtual threads to simplify concurrent code.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      Future<String> result = executor.submit(() -> {\n        return "API response received";\n      });\n\n      System.out.println(result.get());\n    }\n  }\n}',
      },
      {
        question:
          "What is thread pinning in virtual threads and how do you avoid it?",
        description:
          "Thread pinning happens when a virtual thread cannot temporarily release its carrier platform thread during a blocking operation. In Java 21, blocking while holding a synchronized monitor is an important situation to watch for. Keep synchronized sections short and avoid slow I/O or sleeping while holding a monitor. Newer Java versions have changed some pinning behavior, so check the Java version being used.",
        example:
          "Imagine a person holding the only key to a meeting room while taking a long phone call. Nobody else can use the room until the person finishes. The person is effectively keeping a shared resource occupied while waiting.",
        softwareExample:
          "Do not make a slow HTTP request or sleep inside a synchronized block in a virtual-thread task. Update shared data inside the lock, release it, and then perform the network request.",
        code: 'public class Main {\n  private final Object lock = new Object();\n\n  public void process() {\n    synchronized (lock) {\n      updateSharedState(); // Keep this section short\n    }\n\n    callRemoteService(); // Do blocking I/O outside the monitor\n  }\n\n  private void updateSharedState() {\n    System.out.println("State updated");\n  }\n\n  private void callRemoteService() {\n    System.out.println("Calling remote service");\n  }\n}',
      },
      {
        question: "When should you use ExecutorService vs Virtual Threads?",
        description:
          "Use a bounded platform-thread ExecutorService when you need controlled concurrency, especially for CPU-heavy work. Use virtual threads when you have many independent tasks that spend most of their time waiting for I/O. Choose based on the workload, resource limits and measurements.",
        example:
          "For heavy physical work, a factory needs a limited number of machines because only so many can work at once. For waiting tasks, such as customers waiting for a response, many lightweight waiting slots can be managed efficiently.",
        softwareExample:
          "Image compression is CPU-bound and usually suits a bounded platform-thread pool sized around available CPU cores. Many independent HTTP calls are I/O-bound and may suit virtual threads. You still need to control database connections and external API rate limits.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    // CPU-heavy work: bounded platform-thread pool\n    ExecutorService cpuPool = Executors.newFixedThreadPool(\n        Runtime.getRuntime().availableProcessors()\n    );\n\n    cpuPool.submit(() -> System.out.println("Compressing image"));\n    cpuPool.shutdown();\n\n    // Many blocking I/O tasks: virtual threads (Java 21+)\n    try (ExecutorService ioPool = Executors.newVirtualThreadPerTaskExecutor()) {\n      ioPool.submit(() -> System.out.println("Calling remote API"));\n    }\n  }\n}',
      },
    ],
    scenarios: [
      {
        question:
          "Print even and odd numbers 1 to 100 in order using exactly two threads with wait()/notifyAll().",
        description:
          "We need exactly two threads. One prints odd numbers and the other prints even numbers. Both share one number variable. If it is the wrong thread's turn, that thread waits. After printing a number, the thread increases the number and notifies the other thread.",
        example:
          "Imagine two people announcing numbers. Person A announces odd numbers and Person B announces even numbers. They must take turns: A says 1, B says 2, A says 3, B says 4.",
        softwareExample:
          "This is useful for understanding coordination between multiple workers that share data and must process tasks in a particular order.",
        code: 'class NumberPrinter {\n  private int number = 1;\n\n  synchronized void printNumbers(boolean even) {\n    while (number <= 100) {\n      while (number <= 100 && (number % 2 == 0) != even) {\n        try {\n          wait();\n        } catch (InterruptedException e) {\n          Thread.currentThread().interrupt();\n          return;\n        }\n      }\n\n      if (number <= 100) {\n        System.out.println(Thread.currentThread().getName() + " : " + number);\n        number++;\n      }\n\n      notifyAll();\n    }\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) throws InterruptedException {\n    NumberPrinter printer = new NumberPrinter();\n\n    Thread odd = new Thread(() -> printer.printNumbers(false), "Odd Thread");\n    Thread even = new Thread(() -> printer.printNumbers(true), "Even Thread");\n\n    odd.start();\n    even.start();\n\n    odd.join();\n    even.join();\n  }\n}',
      },
      {
        question:
          "Call a Customer API and an Account API in parallel using ExecutorService, Callable and Future.",
        description:
          "Create two Callable tasks: one calls the Customer API and another calls the Account API. Submit both tasks before calling get(). The executor can run them at the same time. Future.get() retrieves each response and waits if it is not ready.",
        example:
          "Imagine going to two different counters to collect your customer information and account information. Instead of visiting one counter, waiting, and then visiting the other, both requests are handled independently.",
        softwareExample:
          "A banking dashboard may need customer details and account details. Calling both services concurrently can reduce total response time compared with calling them one after another.",
        code: 'import java.util.concurrent.*;\n\nclass Customer {\n  String name = "Ravi";\n}\n\nclass Account {\n  String number = "ACC1001";\n}\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(2);\n\n    try {\n      Callable<Customer> customerTask = () -> {\n        System.out.println("Calling Customer API");\n        return new Customer();\n      };\n\n      Callable<Account> accountTask = () -> {\n        System.out.println("Calling Account API");\n        return new Account();\n      };\n\n      Future<Customer> customerFuture = pool.submit(customerTask);\n      Future<Account> accountFuture = pool.submit(accountTask);\n\n      Customer customer = customerFuture.get();\n      Account account = accountFuture.get();\n\n      System.out.println(customer.name);\n      System.out.println(account.number);\n    } finally {\n      pool.shutdown();\n    }\n  }\n}',
      },
      {
        question:
          "Call two APIs in parallel using CompletableFuture and combine results with allOf().",
        description:
          "Use supplyAsync() to start both API calls asynchronously. allOf() creates a future that completes when all supplied futures complete. After that, use join() to retrieve each result and combine them.",
        example:
          "Imagine ordering a meal and a drink from two separate counters. You can collect the complete order only after both are ready.",
        softwareExample:
          "A dashboard calls Customer and Account services simultaneously. Once both responses arrive, the application creates one combined dashboard response.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    CompletableFuture<String> customer = CompletableFuture.supplyAsync(() -> {\n      return "Customer: Ravi";\n    });\n\n    CompletableFuture<String> account = CompletableFuture.supplyAsync(() -> {\n      return "Account: ACC1001";\n    });\n\n    CompletableFuture<String> dashboard = CompletableFuture\n        .allOf(customer, account)\n        .thenApply(ignored -> customer.join() + " | " + account.join());\n\n    System.out.println(dashboard.join());\n  }\n}',
      },
      {
        question:
          "Call two external APIs in parallel using Virtual Threads (newVirtualThreadPerTaskExecutor).",
        description:
          "Create a virtual-thread-per-task executor and submit one task for each external API call. Each task can wait for its API response independently. Collect the results using Future.get(). Configure connection and request timeouts in real applications.",
        example:
          "Imagine two customers waiting at two different service counters. Both can wait independently without needing a large number of dedicated employees.",
        softwareExample:
          "A backend application can call a Customer service and an Account service using separate virtual threads. This is especially useful when the application spends much of its time waiting for external responses.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      Future<String> customer = executor.submit(() -> {\n        return "Customer API response";\n      });\n\n      Future<String> account = executor.submit(() -> {\n        return "Account API response";\n      });\n\n      System.out.println(customer.get());\n      System.out.println(account.get());\n    }\n  }\n}',
      },
      {
        question:
          "Execute 100 independent API calls using Virtual Threads and discuss timeouts/rate limits.",
        description:
          "Submit 100 independent tasks to a virtual-thread-per-task executor. Virtual threads make it practical to have many tasks waiting for I/O. However, the external API may not support 100 simultaneous requests. Use timeouts and a Semaphore or rate limiter to control how many requests run at once.",
        example:
          "Imagine 100 people arriving at a hospital. Having enough waiting chairs does not mean 100 doctors are available. The hospital must control how many people are served at the same time.",
        softwareExample:
          "A service may need to call an external payment provider for 100 independent records. Virtual threads can handle waiting efficiently, but the payment provider may allow only 10 concurrent requests.",
        code: 'import java.util.*;\nimport java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    Semaphore limit = new Semaphore(10);\n\n    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      List<Future<?>> futures = new ArrayList<>();\n\n      for (int i = 1; i <= 100; i++) {\n        final int requestId = i;\n\n        futures.add(executor.submit(() -> {\n          try {\n            limit.acquire();\n            try {\n              System.out.println("Calling API for request " + requestId);\n              // Set HTTP connection and request timeouts here.\n            } finally {\n              limit.release();\n            }\n          } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n          }\n        }));\n      }\n\n      for (Future<?> future : futures) {\n        future.get();\n      }\n    }\n  }\n}',
      },
      {
        question:
          "Handle exceptions thrown inside a Virtual Thread submitted via ExecutorService (ExecutionException).",
        description:
          "When a task submitted using submit() throws an exception, Future.get() throws ExecutionException. The original exception is available through getCause(). Handle InterruptedException separately and restore the interrupt flag.",
        example:
          "Imagine assigning a task to an employee. The employee encounters a problem and reports failure. When you collect the task result, you also receive information about the problem.",
        softwareExample:
          "An API request running on a virtual thread may fail because of a network error or invalid response. The calling service should catch the exception and decide whether to retry, return an error or log the failure.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      Future<String> future = executor.submit(() -> {\n        throw new IllegalStateException("External API failed");\n      });\n\n      try {\n        System.out.println(future.get());\n      } catch (ExecutionException e) {\n        System.out.println("Task failed: " + e.getCause().getMessage());\n      } catch (InterruptedException e) {\n        Thread.currentThread().interrupt();\n        System.out.println("Main thread was interrupted");\n      }\n    }\n  }\n}',
      },
      {
        question:
          "Shut down an ExecutorService gracefully with shutdown() vs forcefully with shutdownNow().",
        description:
          "First call shutdown() so the executor stops accepting new tasks but allows existing tasks to finish. Wait using awaitTermination(). If tasks do not finish within the allowed time, call shutdownNow() to request interruption. Tasks must cooperate with interruption.",
        example:
          "Imagine a restaurant closing for the day. First, it stops accepting new customers and allows existing customers to finish. If a closing deadline arrives, it asks everyone to finish and leave.",
        softwareExample:
          "When a backend application is shutting down, it should give background jobs time to finish. If they exceed the shutdown deadline, it should request their interruption.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ExecutorService executor = Executors.newFixedThreadPool(2);\n\n    executor.submit(() -> System.out.println("Task 1 completed"));\n    executor.submit(() -> System.out.println("Task 2 completed"));\n\n    executor.shutdown();\n\n    try {\n      if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {\n        executor.shutdownNow();\n      }\n    } catch (InterruptedException e) {\n      executor.shutdownNow();\n      Thread.currentThread().interrupt();\n    }\n  }\n}',
      },
      {
        question:
          "Avoid thread pinning: keep synchronized blocks short and never sleep while holding a monitor.",
        description:
          "A synchronized block holds an object's monitor until the thread exits the block. In Java 21, a virtual thread performing certain blocking operations while holding a monitor can pin its carrier platform thread. Keep the synchronized section short and perform slow network calls, sleeps and other blocking operations outside it.",
        example:
          "Imagine holding the only key to a meeting room while going out for lunch. Nobody else can use the room while you are away. Instead, finish the short task, return the key, and then go for lunch.",
        softwareExample:
          "A virtual-thread task should update shared application state inside a synchronized block and then make its external HTTP request after releasing the lock.",
        code: 'public class Main {\n  private final Object lock = new Object();\n  private int count = 0;\n\n  void process() throws InterruptedException {\n    synchronized (lock) {\n      count++;\n      System.out.println("Updated count: " + count);\n    }\n\n    // Do not sleep or call a slow API while holding the monitor.\n    Thread.sleep(1000);\n    System.out.println("External work completed");\n  }\n\n  public static void main(String[] args) throws InterruptedException {\n    Main app = new Main();\n\n    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      executor.submit(() -> {\n        try {\n          app.process();\n        } catch (InterruptedException e) {\n          Thread.currentThread().interrupt();\n        }\n      });\n    }\n  }\n}',
      },
      {
        question:
          "Configure a bounded production thread pool with a queue and an appropriate rejection policy.",
        description:
          "A production thread pool should have a suitable core size, maximum size, bounded task queue and rejection policy. A bounded queue prevents unlimited tasks from accumulating in memory. CallerRunsPolicy makes the submitting thread execute rejected work, which can slow down new submissions. AbortPolicy rejects the task immediately so the application can handle overload explicitly.",
        example:
          "Imagine a shop with four employees and a waiting area that can hold only 100 customers. Once the waiting area is full, the shop needs a clear rule: refuse new customers or ask the person at reception to help serve them.",
        softwareExample:
          "A payment service may receive more background jobs than its workers can process. A bounded queue protects the application from unlimited task buildup. Monitor queue size, active workers, task duration and rejected tasks.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ThreadPoolExecutor pool = new ThreadPoolExecutor(\n        4,                          // Core threads\n        8,                          // Maximum threads\n        60,                         // Idle thread keep-alive\n        TimeUnit.SECONDS,\n        new ArrayBlockingQueue<>(100), // Bounded queue\n        new ThreadPoolExecutor.CallerRunsPolicy()\n    );\n\n    for (int i = 1; i <= 20; i++) {\n      final int taskId = i;\n      pool.submit(() -> System.out.println("Processing task " + taskId));\n    }\n\n    pool.shutdown();\n  }\n}',
      },
      {
        question:
          "Run multiple async tasks and proceed as soon as any one completes using CompletableFuture.anyOf().",
        description:
          "anyOf() completes when the first supplied CompletableFuture completes. It returns a CompletableFuture<Object>, so the result may need to be converted to the expected type. Remember that the first completion could be a failure, so production code should define how failures and remaining tasks are handled.",
        example:
          "Imagine asking two different shops for the price of the same product. You proceed when the first shop responds instead of waiting for both shops.",
        softwareExample:
          "A search service may query two replicas and use the first available response to reduce waiting time. The application should also define whether to cancel or ignore the remaining request and how to handle an early failure.",
        code: 'import java.util.concurrent.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    CompletableFuture<String> apiA = CompletableFuture.supplyAsync(() -> {\n      return "Response from API A";\n    });\n\n    CompletableFuture<String> apiB = CompletableFuture.supplyAsync(() -> {\n      return "Response from API B";\n    });\n\n    CompletableFuture<Object> firstResponse = CompletableFuture.anyOf(apiA, apiB);\n\n    System.out.println("First response: " + firstResponse.join());\n  }\n}',
      },
    ],
  },
};
