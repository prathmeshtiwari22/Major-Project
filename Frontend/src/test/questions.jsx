// questions.js
export const questionsByLevel = {
    1: [
        {
            question: "What does DBMS stand for?",
            options: [
                "Database Management System",
                "DataBase Maintenance System",
                "Data Management Syntax",
                "Database Monitoring System"
            ],
            correctAnswer: "Database Management System"
        },
        {
            question: "In a relational database, a row is also called a:",
            options: [
                "Record",
                "Field",
                "Attribute",
                "Data"
            ],
            correctAnswer: "Record"
        },
        {
            question: "What is the purpose of the foreign key in a database?",
            options: [
                "To uniquely identify a row in a table",
                "To enforce referential integrity between two tables",
                "To store large amounts of data",
                "To create indexes on a table"
            ],
            correctAnswer: "To enforce referential integrity between two tables"
        },
    ],
    2: [
        {
            question: "Which SQL clause is used to filter records?",
            options: [
                "WHERE",
                "FILTER",
                "HAVING",
                "SELECT"
            ],
            correctAnswer: "WHERE"
        },
        {
            question: "Which of the following is a SQL aggregate function?",
            options: [
                "COUNT",
                "SELECT",
                "JOIN",
                "INSERT"
            ],
            correctAnswer: "COUNT"
        },
        {
            question: "What does ACID stand for in DBMS?",
            options: [
                "Access, Control, Integrity, Data",
                "Atomicity, Consistency, Isolation, Durability",
                "Accuracy, Consistency, Integrity, Durability",
                "Atomicity, Control, Isolation, Data"
            ],
            correctAnswer: "Atomicity, Consistency, Isolation, Durability"
        },
    ],
    3: [
        {
            question: "What is a join in SQL?",
            options: [
                "A way to combine rows from two or more tables",
                "A way to aggregate data",
                "A type of data structure",
                "None of the above"
            ],
            correctAnswer: "A way to combine rows from two or more tables"
        },
        {
            question: "Which of the following is an example of a NoSQL database?",
            options: [
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Oracle"
            ],
            correctAnswer: "MongoDB"
        },
        {
            "question": "Which SQL statement is used to update existing data in a database?",
            "options": [
                "CHANGE",
                "UPDATE",
                "MODIFY",
                "CHANGE DATA"
            ],
            "correctAnswer": "UPDATE"
        },
    ],
    4: [
        {
            question: "What is a stored procedure?",
            options: [
                "A saved SQL statement that can be reused",
                "A type of database backup",
                "A way to optimize queries",
                "None of the above"
            ],
            correctAnswer: "A saved SQL statement that can be reused"
        },
        {
            "question": "What is a primary key in a database?",
            "options": [
                "A key used to encrypt the database",
                "A unique identifier for a record in a table",
                "A type of index that speeds up data retrieval",
                "A method to connect two tables"
            ],
            "correctAnswer": "A unique identifier for a record in a table"
        },
        {
            "question": "What is normalization in databases?",
            "options": [
                "The process of organizing data to reduce redundancy",
                "A method of encrypting data",
                "The procedure to create backups of databases",
                "A way to increase database speed"
            ],
            "correctAnswer": "The process of organizing data to reduce redundancy"
        },
        
    ],
};
