CREATE TABLE Likes
(
  like_id BIGSERIAL,
  post_id INTEGER NOT NULL,
  from_id INTEGER NOT NULL
)

ALTER TABLE Likes ADD CONSTRAINT pkLike
  PRIMARY KEY (like_id);

ALTER TABLE Likes ADD CONSTRAINT fk_Like_Post_Id
  FOREIGN KEY (post_id) REFERENCES post (post_id)
  ON DELETE CASCADE;

ALTER TABLE Likes ADD CONSTRAINT fk_Like_User_Id
  FOREIGN KEY (from_id) REFERENCES user_info (user_id);
  