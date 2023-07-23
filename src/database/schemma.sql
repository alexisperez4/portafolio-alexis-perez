CREATE TYPE status_type AS ENUM ('to_do', 'in_progress', 'done');

CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(45) NOT NULL,
  task_description VARCHAR(500),
  task_status status_type NOT NULL
);
