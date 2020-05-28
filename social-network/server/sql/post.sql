CREATE TABLE Post (
  post_id BiGSERIAL,
  creator_id INTEGER NOT NULL,
  caption TEXT,
  number_of_likes INTEGER,
  created_at TIMESTAMP NOT NULL 
);

ALTER TABLE Post ADD CONSTRAINT pkPost
  PRIMARY KEY (post_id);

ALTER TABLE Post ALTER number_of_likes SET DEFAULT 0;
ALTER TABLE Post ALTER caption SET DEFAULT ('');
ALTER TABLE Post ALTER created_at SET DEFAULT NOW();


ALTER TABLE Post ADD CONSTRAINT number_of_likes_postitve CHECK(number_of_likes >= 0); 

ALTER TABLE Post ADD CONSTRAINT fk_post_User_Id
  FOREIGN KEY (creator_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;