PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY CHECK(id=1), salt TEXT NOT NULL, verifier TEXT NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL CHECK(kind IN ('era','type')), name TEXT NOT NULL, UNIQUE(kind,name));
CREATE TABLE IF NOT EXISTS question_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, request_id TEXT UNIQUE NOT NULL, group_id INTEGER NOT NULL REFERENCES question_groups(id), era_id INTEGER NOT NULL REFERENCES categories(id), type_id INTEGER NOT NULL REFERENCES categories(id), keyword TEXT NOT NULL, answer TEXT NOT NULL, answers_json TEXT, revision INTEGER NOT NULL DEFAULT 1, correct INTEGER NOT NULL DEFAULT 0, wrong INTEGER NOT NULL DEFAULT 0, deleted INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS attempts (token TEXT PRIMARY KEY, question_id INTEGER NOT NULL REFERENCES questions(id), revision INTEGER NOT NULL, expires INTEGER NOT NULL, submitted TEXT, player_id TEXT, correct INTEGER CHECK(correct IN (0,1)));
CREATE INDEX IF NOT EXISTS attempts_expiry ON attempts(expires);
CREATE INDEX IF NOT EXISTS questions_public ON questions(deleted,era_id,id);
CREATE INDEX IF NOT EXISTS questions_group ON questions(group_id,deleted,era_id,id);
CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TRIGGER IF NOT EXISTS count_answer AFTER UPDATE OF submitted ON attempts WHEN OLD.submitted IS NULL AND NEW.submitted IS NOT NULL BEGIN
  UPDATE questions SET correct=correct+NEW.correct, wrong=wrong+(1-NEW.correct) WHERE id=NEW.question_id AND revision=NEW.revision;
END;

CREATE TABLE IF NOT EXISTS player_progress (
  player_id TEXT NOT NULL, question_id INTEGER NOT NULL REFERENCES questions(id),
  revision INTEGER NOT NULL, mastered INTEGER NOT NULL DEFAULT 0 CHECK(mastered IN (0,1)),
  PRIMARY KEY(player_id,question_id,revision)
);
CREATE TRIGGER IF NOT EXISTS remember_answer AFTER UPDATE OF submitted ON attempts
WHEN OLD.submitted IS NULL AND NEW.submitted IS NOT NULL AND NEW.player_id IS NOT NULL BEGIN
  INSERT INTO player_progress(player_id,question_id,revision,mastered)
  VALUES(NEW.player_id,NEW.question_id,NEW.revision,NEW.correct)
  ON CONFLICT(player_id,question_id,revision) DO UPDATE SET mastered=MAX(mastered,excluded.mastered);
END;
