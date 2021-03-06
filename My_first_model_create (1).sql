-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2015-09-28 08:29:03.342




-- tables
-- Table Answer
CREATE TABLE Answer (
    answer_id int  NOT NULL AUTO_INCREMENT,
    description varchar(500)  NOT NULL,
    question_Id int  NOT NULL,
    correct_answer bool  NOT NULL,
    status_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT Answer_pk PRIMARY KEY (answer_id)
);

-- Table Category
CREATE TABLE Category (
    category_id int  NOT NULL,
    category_name varchar(50)  NOT NULL,
    CONSTRAINT Category_pk PRIMARY KEY (category_id)
);

-- Table Exam
CREATE TABLE Exam (
    exam_id int  NOT NULL AUTO_INCREMENT,
    description varchar(200)  NOT NULL,
    duration int  NOT NULL,
    status_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT Exam_pk PRIMARY KEY (exam_id)
);

-- Table ExamSession
CREATE TABLE ExamSession (
    exam_session_id int  NOT NULL AUTO_INCREMENT,
    user_id int  NOT NULL,
    exam_id int  NOT NULL,
    session_token varchar(100)  NOT NULL,
    created_at timestamp  NOT NULL,
    CONSTRAINT ExamSession_pk PRIMARY KEY (exam_session_id)
);

-- Table Level
CREATE TABLE Level (
    level_id int  NOT NULL,
    level_name varchar(50)  NOT NULL,
    CONSTRAINT Level_pk PRIMARY KEY (level_id)
);

-- Table Question
CREATE TABLE Question (
    question_id int  NOT NULL AUTO_INCREMENT,
    description varchar(500)  NOT NULL,
    question_type_id int  NOT NULL,
    category_id int  NOT NULL,
    level_id int  NOT NULL,
    status_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT Question_pk PRIMARY KEY (question_id)
);

-- Table QuestionExam
CREATE TABLE QuestionExam (
    question_exam_id int  NOT NULL AUTO_INCREMENT,
    exam_id int  NOT NULL,
    question_id int  NOT NULL,
    CONSTRAINT QuestionExam_pk PRIMARY KEY (question_exam_id)
);

-- Table QuestionType
CREATE TABLE QuestionType (
    question_type_id int  NOT NULL,
    question_type_name varchar(50)  NOT NULL,
    CONSTRAINT QuestionType_pk PRIMARY KEY (question_type_id)
);

-- Table Status
CREATE TABLE Status (
    status_id int  NOT NULL,
    status_name varchar(50)  NOT NULL,
    CONSTRAINT Status_pk PRIMARY KEY (status_id)
);

-- Table TestResult
CREATE TABLE TestResult (
    testresult_id int  NOT NULL AUTO_INCREMENT,
    question_exam_id int  NOT NULL,
    answer_id int  NOT NULL,
    answer_text varchar(500)  NOT NULL,
    correct_answer int  NOT NULL,
    user_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    CONSTRAINT TestResult_pk PRIMARY KEY (testresult_id)
);

-- Table User
CREATE TABLE User (
    user_id int  NOT NULL AUTO_INCREMENT,
    first_name varchar(50)  NOT NULL,
    last_name varchar(50)  NOT NULL,
    address varchar(100)  NOT NULL,
    phone varchar(12)  NOT NULL,
    email varchar(50)  NOT NULL,
    password varchar(50)  NOT NULL,
    user_type_id int  NOT NULL,
    status_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (user_id)
);

-- Table UserType
CREATE TABLE UserType (
    user_type_id int  NOT NULL,
    user_type_name varchar(50)  NOT NULL,
    CONSTRAINT UserType_pk PRIMARY KEY (user_type_id)
);





-- foreign keys
-- Reference:  Answer_Question (table: Answer)


ALTER TABLE Answer ADD CONSTRAINT Answer_Question FOREIGN KEY Answer_Question (question_Id)
    REFERENCES Question (question_id);
-- Reference:  Answer_Status (table: Answer)


ALTER TABLE Answer ADD CONSTRAINT Answer_Status FOREIGN KEY Answer_Status (status_id)
    REFERENCES Status (status_id);
-- Reference:  ExamSession_Exam (table: ExamSession)


ALTER TABLE ExamSession ADD CONSTRAINT ExamSession_Exam FOREIGN KEY ExamSession_Exam (exam_id)
    REFERENCES Exam (exam_id);
-- Reference:  ExamSession_User (table: ExamSession)


ALTER TABLE ExamSession ADD CONSTRAINT ExamSession_User FOREIGN KEY ExamSession_User (user_id)
    REFERENCES User (user_id);
-- Reference:  Exam_Status (table: Exam)


ALTER TABLE Exam ADD CONSTRAINT Exam_Status FOREIGN KEY Exam_Status (status_id)
    REFERENCES Status (status_id);
-- Reference:  QuestionExam_Exam (table: QuestionExam)


ALTER TABLE QuestionExam ADD CONSTRAINT QuestionExam_Exam FOREIGN KEY QuestionExam_Exam (exam_id)
    REFERENCES Exam (exam_id);
-- Reference:  QuestionExam_Question (table: QuestionExam)


ALTER TABLE QuestionExam ADD CONSTRAINT QuestionExam_Question FOREIGN KEY QuestionExam_Question (question_id)
    REFERENCES Question (question_id);
-- Reference:  Question_Category (table: Question)


ALTER TABLE Question ADD CONSTRAINT Question_Category FOREIGN KEY Question_Category (category_id)
    REFERENCES Category (category_id);
-- Reference:  Question_Level (table: Question)


ALTER TABLE Question ADD CONSTRAINT Question_Level FOREIGN KEY Question_Level (level_id)
    REFERENCES Level (level_id);
-- Reference:  Question_QuestionType (table: Question)


ALTER TABLE Question ADD CONSTRAINT Question_QuestionType FOREIGN KEY Question_QuestionType (question_type_id)
    REFERENCES QuestionType (question_type_id);
-- Reference:  Question_Status (table: Question)


ALTER TABLE Question ADD CONSTRAINT Question_Status FOREIGN KEY Question_Status (status_id)
    REFERENCES Status (status_id);
-- Reference:  TestResult_QuestionExam (table: TestResult)


ALTER TABLE TestResult ADD CONSTRAINT TestResult_QuestionExam FOREIGN KEY TestResult_QuestionExam (question_exam_id)
    REFERENCES QuestionExam (question_exam_id);
-- Reference:  TestResult_User (table: TestResult)


ALTER TABLE TestResult ADD CONSTRAINT TestResult_User FOREIGN KEY TestResult_User (user_id)
    REFERENCES User (user_id);
-- Reference:  User_Status (table: User)


ALTER TABLE User ADD CONSTRAINT User_Status FOREIGN KEY User_Status (status_id)
    REFERENCES Status (status_id);
-- Reference:  User_UserType (table: User)


ALTER TABLE User ADD CONSTRAINT User_UserType FOREIGN KEY User_UserType (user_type_id)
    REFERENCES UserType (user_type_id);



-- End of file.

