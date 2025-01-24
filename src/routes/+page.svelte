<script lang="ts">
    export let data;
    console.log('Received notes:', data);

    let selectedNote = null;
    let sort = 'createdAt';
    let order = 'desc';

    // 별표 상태 토글
    async function toggleStar(note) {
        if (!note) return;

        const formData = new FormData();
        formData.append('id', note.id.toString());
        formData.append('isStarred', note.isStarred ? 'true' : 'false');

        await fetch('?/toggleStar', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        });

        note.isStarred = !note.isStarred;
    
        // 반응형 데이터 업데이트
        data.noteList = [...data.noteList]
    }

    // 노트 선택
    function selectNote(note) {
        if (!note.isLocked) {
            selectedNote = note;
        } else {
            const password = prompt('Enter password to unlock this note:');
            unlockNote(note, password);
        }
    }

    // 잠금 해제
    async function unlockNote(note, password: string | null) {
        if (!note || !password) return;

        const formData = new FormData();
        formData.append('id', note.id.toString());
        formData.append('password', password);

        const response = await fetch('/unlockNote', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
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
<div class="flex justify-between items-center mb-4">
    <div class="flex gap-4">
        <div>
            <label class="font-medium">Sort by:</label>
            <select bind:value={sort} class="border rounded px-2 py-1">
                <option value="title">Title</option>
                <option value="createdAt">Created Date</option>
            </select>
        </div>
        <div>
            <label class="font-medium">Order:</label>
            <select bind:value={order} class="border rounded px-2 py-1">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </div>
    <a
        href="/new-note"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        aria-label="Add a new note"
    >
        + New Note
    </a>
</div>

<!-- 노트 목록 -->
{#if data.noteList.length === 0}
    <p>No notes available.</p>
{:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each data.noteList as note}
            <div
                class="border rounded shadow-md p-4 relative hover:shadow-lg cursor-pointer"
                on:click={() => selectNote(note)}
            >
                <!-- 별표와 잠금 상태 -->
                <div class="absolute top-2 right-2 flex gap-2">
                    <button
                        type="button"
                        on:click={(e) => {
                            e.stopPropagation();
                            toggleStar(note);
                        }}
                        class="text-yellow-500 hover:text-yellow-600"
                        aria-label="Toggle star"
                    >
                        {note.isStarred ? '⭐' : '☆'}
                    </button>
                    {#if note.isLocked}
                        <span class="text-red-500" aria-label="Locked note">🔒</span>
                    {/if}
                </div>

                <!-- 노트 내용 -->
                <h2 class="font-bold text-lg mb-2 truncate">{note.title}</h2>
                <p class="text-gray-600 text-sm truncate">{note.content}</p>
                <p class="text-gray-400 text-xs mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </div>
        {/each}
    </div>
{/if}

<!-- 노트 미리보기 -->
{#if selectedNote}
    <div class="mt-4 p-4 border rounded shadow-md">
        <h2 class="text-xl font-bold">{selectedNote.title}</h2>
        <p>{selectedNote.content}</p>
    </div>
{/if}
