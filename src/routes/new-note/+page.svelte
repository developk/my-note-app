<script lang="ts">
    let title = '';
    let content = '';

    async function saveNote() {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        const response = await fetch('/new-note', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        });

        const result = await response.json();
        if (result.success) {
            alert('Note saved successfully!');
            window.location.href = '/'; // 노트 목록 화면으로 이동
        } else {
            alert('Failed to save the note.');
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">새 노트 작성</h1>

<form on:submit|preventDefault={saveNote} class="flex flex-col space-y-4">
    <!-- 제목 -->
    <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
            id="title"
            type="text"
            bind:value={title}
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
        />
    </div>

    <!-- 내용 -->
    <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <textarea
            id="content"
            bind:value={content}
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
        ></textarea>
    </div>

    <!-- 버튼 영역 -->
    <div class="flex justify-between">
        <!-- 목록 버튼 -->
        <a
            href="/"
            class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            aria-label="Go back to note list"
        >
            List
        </a>

        <!-- 저장 버튼 -->
        <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Save Note
        </button>
    </div>
</form>
