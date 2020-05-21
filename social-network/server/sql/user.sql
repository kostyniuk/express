CREATE TABLE user_info (
  user_id BIGSERIAL,
  username VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL
);

ALTER TABLE user_info ADD CONSTRAINT pkUser
  PRIMARY KEY (user_id);

ALTER TABLE user_info ADD CONSTRAINT uniqueUsername
  UNIQUE (username);

