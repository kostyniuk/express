CREATE TABLE Follow
(
  follow_id BIGSERIAL,
  following_id INTEGER NOT NULL,
  followed_id INTEGER NOT NULL,
  followed_at TIMESTAMP NOT NULL  
);

  ALTER TABLE Follow ADD CONSTRAINT pk_follow
  PRIMARY KEY (follow_id);

  ALTER TABLE Follow ADD CONSTRAINT fk_followind_id_User_Id
  FOREIGN KEY (following_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;

  ALTER TABLE Follow ADD CONSTRAINT fk_followed_id_User_Id
  FOREIGN KEY (followed_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;

  ALTER TABLE Follow ADD CONSTRAINT one_user_follow_one_user_from_one_time
 UNIQUE(following_id, followed_id);

  ALTER TABLE Follow ALTER followed_at
  SET
  DEFAULT NOW
  ();