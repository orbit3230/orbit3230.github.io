ALTER TABLE comments ADD COLUMN root_id INTEGER REFERENCES comments(id);
ALTER TABLE comments ADD COLUMN reply_to INTEGER REFERENCES comments(id);
ALTER TABLE comments ADD COLUMN password_salt TEXT;
ALTER TABLE comments ADD COLUMN password_hash TEXT;
ALTER TABLE comments ADD COLUMN notify_hash TEXT;
ALTER TABLE comments ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0;
ALTER TABLE comments ADD COLUMN revision INTEGER NOT NULL DEFAULT 0;
ALTER TABLE comments ADD COLUMN updated_at TEXT;
CREATE INDEX comments_thread ON comments(root_id, id);
CREATE INDEX comments_reply_target ON comments(reply_to, id);
CREATE TABLE request_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_ms INTEGER NOT NULL);
CREATE INDEX request_limits_expiry ON request_limits(expires_ms);
CREATE TABLE post_activity (post TEXT PRIMARY KEY, last_comment_id INTEGER NOT NULL, comment_count INTEGER NOT NULL);
CREATE INDEX post_activity_recent ON post_activity(last_comment_id DESC);
INSERT INTO post_activity SELECT post, MAX(id), COUNT(*) FROM comments WHERE deleted = 0 GROUP BY post;
CREATE TRIGGER comments_activity_insert AFTER INSERT ON comments WHEN NEW.deleted = 0 BEGIN
  INSERT INTO post_activity VALUES(NEW.post, NEW.id, 1)
  ON CONFLICT(post) DO UPDATE SET last_comment_id = NEW.id, comment_count = comment_count + 1;
END;
CREATE TRIGGER comments_activity_delete AFTER UPDATE OF deleted ON comments WHEN OLD.deleted = 0 AND NEW.deleted = 1 BEGIN
  UPDATE post_activity SET last_comment_id = COALESCE((SELECT MAX(id) FROM comments WHERE post = NEW.post AND deleted = 0), 0), comment_count = comment_count - 1 WHERE post = NEW.post;
  DELETE FROM post_activity WHERE post = NEW.post AND comment_count <= 0;
END;
