import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Notes 테이블 스키마 정의
export const notes = sqliteTable('Notes', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
	password: text('password'), // password 필드 추가
	createdAt: text('created_at').default('CURRENT_TIMESTAMP'), // SQLite의 CURRENT_TIMESTAMP를 사용하여 문자열 저장
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'), // 문자열로 저장
    isStarred: integer('is_starred').default(0), // BOOLEAN 대신 INTEGER 사용 (0: false, 1: true)
    isLocked: integer('is_locked').default(0),
    isDeleted: integer('is_deleted').default(0)

});