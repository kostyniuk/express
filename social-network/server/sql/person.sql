CREATE TABLE Person (
  person_id INTEGER,
  age INTEGER NOT NULL,
  bio VARCHAR(64) NOT NULL,
  email VARCHAR(32) NOT NULL,
  fullName VARCHAR(64) NOT NULL,
  number_of_posts INTEGER NOT NULL
);

ALTER TABLE Person ADD CONSTRAINT pkPerson
  PRIMARY KEY (person_id);

ALTER TABLE Person ALTER number_of_posts SET DEFAULT 0;
ALTER TABLE Person ALTER bio SET DEFAULT "";


ALTER TABLE person ADD CONSTRAINT fk_Person_User_Id
  FOREIGN KEY (person_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;
