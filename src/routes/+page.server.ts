import { db } from '$lib/server/db/index';
import { notes } from '$lib/server/db/schema';
import type { Note } from '$lib/types/note';
import type { Actions } from './$types';
import { eq, sql, desc, asc } from 'drizzle-orm';

export async function load({ url }) {
    console.log('url: %o', url);
    const sort = url.searchParams.get('sort') || 'createdAt'; // 기본 정렬: 작성일
    const order = url.searchParams.get('order') === 'asc' ? asc : desc;

    const result = await db
    .select({
        id: notes.id,
        title: notes.title,
        content: notes.content,
        createdAt: notes.createdAt,
        updatedAt: notes.updatedAt,
        isStarred: notes.isStarred,
        isLocked: notes.isLocked,
        isDeleted: notes.isDeleted,
    })
    .from(notes)
    .where(eq(notes.isDeleted, false))
    .orderBy(
        order(notes.createdAt),
        order(eq(notes.isStarred, true))
    )
    ;

    const noteList = result as Note[];

    return { noteList: noteList }; // 데이터를 클라이언트로 반환
}

export const actions = {
    toggleStar: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const isStarred = data.get('isStarred') === 'true'; // boolean으로 변환

        // console.log('isStarred: %o', isStarred);

        // 별표 상태 업데이트 (boolean -> number로 변환)
        await db.update(notes).set({ isStarred: isStarred }).where(eq(notes.id, id));
        return { success: true };
    },

    unlockNote: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const password = data.get('password');

        // 잠금 해제 확인 (여기서는 예시로, 실제 비밀번호 확인 필요)
        const note = await db.select().from(notes).where(eq(notes.id, id)).get();

        if (!note) {
            return { success: false, error: 'note not exists' };
        }

        if (note.password === password) {
            return { success: true, note };
        }
        return { success: false, error: 'Invalid password' };
    },
} satisfies Actions;;
