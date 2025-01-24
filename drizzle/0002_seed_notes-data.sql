INSERT INTO Notes (title, content, created_at, updated_at, is_starred, is_locked, is_deleted)
            VALUES
            ('First Note', 'This is the content of the first note.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 0, 0),
            ('Second Note', 'This is the content of the second note.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, 1, 0),
            ('Third Note', 'This is the content of the third note.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 0),
            ('Fourth Note', 'This is the content of the fourth note.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, 0, 1);