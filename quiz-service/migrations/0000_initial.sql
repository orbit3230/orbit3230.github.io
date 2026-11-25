PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY CHECK(id=1), salt TEXT NOT NULL, verifier TEXT NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL CHECK(kind IN ('era','type')), name TEXT NOT NULL, UNIQUE(kind,name));
CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, request_id TEXT UNIQUE NOT NULL, era_id INTEGER NOT NULL REFERENCES categories(id), type_id INTEGER NOT NULL REFERENCES categories(id), keyword TEXT NOT NULL, answer TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, correct INTEGER NOT NULL DEFAULT 0, wrong INTEGER NOT NULL DEFAULT 0, deleted INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS attempts (token TEXT PRIMARY KEY, question_id INTEGER NOT NULL REFERENCES questions(id), revision INTEGER NOT NULL, expires INTEGER NOT NULL, submitted TEXT, correct INTEGER CHECK(correct IN (0,1)));
CREATE INDEX IF NOT EXISTS attempts_expiry ON attempts(expires);
CREATE INDEX IF NOT EXISTS questions_public ON questions(deleted,era_id,id);
CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TRIGGER IF NOT EXISTS count_answer AFTER UPDATE OF submitted ON attempts WHEN OLD.submitted IS NULL AND NEW.submitted IS NOT NULL BEGIN
  UPDATE questions SET correct=correct+NEW.correct, wrong=wrong+(1-NEW.correct) WHERE id=NEW.question_id AND revision=NEW.revision;
END;
