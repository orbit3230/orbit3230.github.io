-- Upgrade the original quiz database without changing questions or statistics.
CREATE TABLE IF NOT EXISTS question_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, created INTEGER NOT NULL);
ALTER TABLE questions ADD COLUMN group_id INTEGER REFERENCES question_groups(id);
INSERT INTO question_groups(name,created) SELECT '기존 문제',CAST(strftime('%s','now') AS INTEGER)*1000 WHERE EXISTS(SELECT 1 FROM questions) ON CONFLICT(name) DO NOTHING;
UPDATE questions SET group_id=(SELECT id FROM question_groups WHERE name='기존 문제') WHERE group_id IS NULL;
CREATE INDEX IF NOT EXISTS questions_group ON questions(group_id,deleted,era_id,id);
CREATE TRIGGER require_question_group_insert BEFORE INSERT ON questions WHEN NEW.group_id IS NULL BEGIN SELECT RAISE(ABORT,'question group required'); END;
CREATE TRIGGER require_question_group_update BEFORE UPDATE OF group_id ON questions WHEN NEW.group_id IS NULL BEGIN SELECT RAISE(ABORT,'question group required'); END;
