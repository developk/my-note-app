<script lang="ts">
    // import type { Note } from '$lib/types/note';


    // export let notes = []; // notes는 서버에서 전달되는 데이터
    // console.log('Received notes:', notes); // 클라이언트에서 데이터 확인

    export let data;
    console.log('Received notes:', data); // 클라이언트에서 데이터 확인
    
    let selectedNote = null;
    let sort = 'createdAt';
    let order = 'desc';

    // 별표 상태 토글
    async function toggleStar(note) {

        if (null == note) {
            return false;
        }

        const formData = new FormData();
        formData.append('id', note.id.toString());
        formData.append('isStarred', note.isStarred ? 'true' : 'false');

        await fetch('/?sort=' + sort + '&order=' + order, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });

        note.isStarred = !note.isStarred;
    }

    // 노트 선택
    function selectNote(note) {
        if (!note.isLocked) {
            selectedNote = note;
        } else {
            // 잠금 해제 팝업 표시
            const password = prompt('Enter password to unlock this note:');
            unlockNote(note, password);
        }
    }

    // 잠금 해제
    async function unlockNote(note, password: string|null) {

        if (null == note) {
            return false;
        }

        if (null == password) {
            return false;
        }

        const formData = new FormData();
        formData.append('id', note.id.toString());
        formData.append('password', password);

        const response = await fetch('/unlockNote', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });

        const result = await response.json();
        if (result.success) {
            selectedNote = result.note;
        } else {
            alert(result.error);
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">내 노트</h1>

<!-- 정렬 옵션 -->
<div class="mb-4">
    <label>
        Sort by:
        <select bind:value={sort}>
            <option value="title">Title</option>
            <option value="createdAt">Created Date</option>
        </select>
    </label>
    <label>
        Order:
        <select bind:value={order}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </label>
</div>

<!-- 데이터가 없을 경우 -->
{#if data.noteList.length === 0}
    <p>No notes available.</p>
{:else}
    <ul>
        {#each data.noteList as note}
            <li class="mb-2 flex justify-between items-center">
                <button
                    type="button"
                    on:click={() => console.log('Selected note:', note)}
                    class="cursor-pointer text-left flex-1"
                >
                    <strong>{note.title}</strong>
                    <span class="text-sm text-gray-500">({new Date(note.createdAt).toLocaleString()})</span>
                    {#if note.isLocked}
                        <span class="text-red-500 ml-2">🔒</span>
                    {/if}
                </button>

                <button
                    type="button"
                    on:click={() => console.log('Toggled star for note:', note)}
                    class="text-yellow-500"
                >
                    {note.isStarred ? '⭐' : '☆'}
                </button>
            </li>
        {/each}
    </ul>
{/if}


<!-- 노트 미리보기 -->
{#if selectedNote}
    <div class="mt-4 p-4 border rounded">
        <h2 class="text-xl font-bold">{selectedNote.title}</h2>
        <p>{selectedNote.content}</p>
    </div>
{/if}