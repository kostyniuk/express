CREATE TABLE profilePicture (
  picture_id BIGSERIAL,
  user_id INTEGER,
  path VARCHAR(50)
);

ALTER TABLE profilePicture ADD CONSTRAINT pkProfilePicture
  PRIMARY KEY (picture_id);

ALTER TABLE profilePicture ADD CONSTRAINT fk_User_Picture
  FOREIGN KEY (user_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;