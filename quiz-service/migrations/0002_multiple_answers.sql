ALTER TABLE questions ADD COLUMN answers_json TEXT;
ALTER TABLE attempts ADD COLUMN player_id TEXT;
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
