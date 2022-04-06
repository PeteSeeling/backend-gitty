-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;

CREATE TABLE github_users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_avatar TEXT NOT NULL
)