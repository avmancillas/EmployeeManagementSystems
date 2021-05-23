DROP DATABASE IF EXISTS employee_TrackerDB;

CREATE DATABASE employee_TrackerDB;

USE employee_TrackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE role_name (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NULL,
    last_name VARCHAR (30) NULL,
    role_id INT NULL,
    manager_id NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (dept_name)
VALUES ("HR", "SALES", "FINANCE", "ENGINEERING");


INSERT INTO role_name (title,salary,department_id)
VALUES ("MANAGER", 200000,5),("SALES PERSON",100000,8) , ("ACCOUNTANT",80000,7), ("ENGINEER",90000,9);


INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("JOHN","SMITH", 1, 123), ("JAMES","JOHNSON",2,456),("SALLY","LEE",3,789),("JANE","DOE",4,098);