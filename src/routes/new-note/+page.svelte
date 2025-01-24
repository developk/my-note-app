<script lang="ts">
    import { onMount } from 'svelte';
    import Quill from 'quill';
    import TableUI from 'quill-table-ui'; // quill-table-ui 플러그인
    import 'quill/dist/quill.snow.css'; // Quill 기본 테마
    import 'quill-table-ui/dist/index.css'; // quill-table-ui 스타일
    import DOMPurify from 'dompurify';

    let editorContainer; // Quill 에디터 컨테이너 참조
    let quill; // Quill 인스턴스
    let content = ''; // 에디터 내용 저장

    onMount(() => {
        // Quill에 TableUI 플러그인 등록
        Quill.register('modules/tableUI', TableUI);

        // Quill 에디터 초기화
        quill = new Quill(editorContainer, {
            theme: 'snow', // Quill의 기본 테마
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['table'], // 테이블 버튼 추가
                ],
                tableUI: true, // quill-table-ui 활성화
            },
        });

        // 에디터 내용 변경 이벤트
        quill.on('text-change', () => {
            content = quill.root.innerHTML; // 에디터 HTML 내용 저장
        });
    });

    // 노트 저장
    async function saveNote() {
        console.log('Saving note:', content);

        const formData = new FormData();

        const saveContent = DOMPurify.sanitize(content);

        formData.append('content', saveContent);

        const response = await fetch('?/saveNote', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Note saved successfully!');
            window.location.href = '/'; // 목록 화면으로 이동
        } else {
            alert('Failed to save the note.');
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">새 노트 작성</h1>

<!-- Quill 에디터 영역 -->
<div class="border rounded p-4">
    <div bind:this={editorContainer} class="editor-container"></div>
</div>

<!-- 저장 버튼 -->
<button
    on:click={saveNote}
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
    Save Note
</button>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    .editor-container {
        height: 400px; /* 에디터 높이 */
    }
</style>
