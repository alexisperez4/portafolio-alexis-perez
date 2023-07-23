CREATE TYPE status_type AS ENUM ('to_do', 'in_progress', 'done');

CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(50) UNIQUE NOT NULL,
  user_password VARCHAR(50) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role user_role DEFAULT 'user'
);

CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(45) NOT NULL,
  task_description VARCHAR(500),
  task_status status_type NOT NULL,
  user_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE task
ADD CONSTRAINT task_fk_user_id
FOREIGN KEY (user_id) 
REFERENCES users(user_id);
