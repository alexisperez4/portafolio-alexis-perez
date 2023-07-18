CREATE TABLE task_status (
  status_id SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);

CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(45) NOT NULL,
  task_description VARCHAR(500),
  status_id INTEGER NOT NULL
);

ALTER TABLE task
ADD CONSTRAINT task__task_status_fk FOREIGN KEY (status_id) REFERENCES task_status(status_id);
