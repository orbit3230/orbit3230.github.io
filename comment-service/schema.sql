CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL UNIQUE,
  post TEXT NOT NULL,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 40),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 2000),
  created_at TEXT NOT NULL,
  created_ms INTEGER NOT NULL,
  writer_key TEXT
);
CREATE INDEX IF NOT EXISTS comments_post_id ON comments(post, id DESC);
CREATE INDEX IF NOT EXISTS comments_writer_time ON comments(writer_key, created_ms);
