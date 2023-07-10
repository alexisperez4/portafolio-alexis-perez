CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(255) NOT NULL,
  task_description TEXT,
  status_id INTEGER REFERENCES task_status(status_id)
);

CREATE TABLE task_status (
  status_id SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);


