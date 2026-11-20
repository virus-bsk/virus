-- Method 1: LIMIT and OFFSET (PostgreSQL/MySQL)
SELECT DISTINCT salary
FROM emp
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Method 2: DENSE_RANK()
SELECT salary
FROM (
  SELECT salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) AS rn
  FROM (SELECT DISTINCT salary FROM emp) s
) t
WHERE rn = 2;

-- Method 3: Subquery
SELECT MAX(salary) AS second_highest_salary
FROM emp
WHERE salary < (SELECT MAX(salary) FROM emp);