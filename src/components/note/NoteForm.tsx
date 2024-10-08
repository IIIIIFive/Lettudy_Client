import { useRef, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RegisterButton from '@/components/note/RegisterButton';
import TagInput from '@/components/note/TagInput';
import Toast from '@/components/note/Toast';
import styled from 'styled-components';
import useNoteStore from '@/store/noteStore';
import { formatDate } from '@/utils/formatDate';
import ImageResize from 'quill-image-resize';
import { getPreSignedUrl, uploadImageToS3 } from '@/api/note.api';
import { useParams } from 'react-router-dom';

Quill.register('modules/ImageResize', ImageResize);

interface NoteFormProps {
  onSubmit: (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => void;
  initialData?: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  };
}

function NoteForm({ onSubmit, initialData }: NoteFormProps) {
  const {
    title,
    tags,
    tagList,
    content,
    showToast,
    setTitle,
    setTags,
    addTag,
    removeTag,
    setContent,
    setShowToast,
    setDate,
    clearTags,
  } = useNoteStore();

  const quillRef = useRef<ReactQuill>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { roomId } = useParams();

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileName = file.name;

        try {
          const preSignedUrlResponse = await getPreSignedUrl(roomId!, fileName);
          const preSignedUrl = preSignedUrlResponse.preSignedUrl;

          await uploadImageToS3(preSignedUrl, file);

          const imageUrl = preSignedUrl.split('?')[0];

          const quillEditor = quillRef.current?.getEditor();
          if (quillEditor) {
            const range = quillEditor.getSelection();
            if (range) {
              quillEditor.insertEmbed(range.index, 'image', imageUrl);
            } else {
              console.error('선택 범위를 가져올 수 없습니다.');
            }
          } else {
            console.error('에디터 초기화 오류가 발생했습니다.');
          }
        } catch (error) {
          console.error('이미지 업로드 오류가 발생했습니다.');
        }
      }
    };
  }, [roomId]);
  const modules = {
    toolbar: {
      container: [
        [{ header: [3, 4, 5, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['image'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    ImageResize: {
      parchment: Quill.import('parchment'),
    },
  };

  useEffect(() => {
    setDate(formatDate(new Date()));

    const handleClickOutside = (event: MouseEvent) => {
      if (
        toastRef.current &&
        !toastRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowToast(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowToast, setDate]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      clearTags();
      initialData.tags.forEach((tag) => addTag(tag));
      setContent(initialData.content);
      setDate(initialData.date);
    }
  }, [initialData, setTitle, addTag, clearTags, setContent, setDate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    const isConfirmed = window.confirm('제출하시겠습니까?');

    if (isConfirmed) {
      const currentDate = formatDate(new Date());
      onSubmit({ title, tags: tagList, content, date: currentDate });
      setTitle('');
      setTags('');
      setContent('');
      clearTags();
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      event.nativeEvent.isComposing == false &&
      tags.trim() !== ''
    ) {
      event.preventDefault();
      addTag(tags.trim());
    }
  };

  const handleTagFocus = () => {
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleTagRemove = (index: number) => {
    removeTag(index);
  };

  return (
    <NoteFormStyle>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <h3>제목</h3>
          <input
            className='input'
            type='text'
            placeholder='제목을 입력하세요.'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <h3>태그</h3>
          <TagInput
            tags={tags}
            tagList={tagList}
            inputRef={inputRef}
            onTagChange={handleTagChange}
            onTagKeyDown={handleTagKeyDown}
            onTagFocus={handleTagFocus}
            onTagRemove={handleTagRemove}
          />
          {showToast && <Toast ref={toastRef} onClose={handleToastClose} />}
        </div>
        <div className='form-group'>
          <h3>내용</h3>
          <ReactQuill
            ref={quillRef}
            value={content}
            placeholder='내용을 입력하세요.'
            onChange={setContent}
            theme='snow'
            className='quill-editor'
            modules={modules}
          />
        </div>
        <div className='register'>
          <RegisterButton text='등록하기' onClick={handleSubmit} />
        </div>
      </form>
    </NoteFormStyle>
  );
}
export default NoteForm;

const NoteFormStyle = styled.div`
  margin-bottom: 60px;
  .form {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  .form-group {
    margin: 10px 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .form-group h3 {
    margin-bottom: 20px;
    margin-left: 12px;
  }

  .input {
    padding: 14px 20px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.color_borderGray};
    font-size: ${({ theme }) => theme.fontSize_reg};
    outline: none;
    width: 100%;
  }

  .ql-container,
  .ql-toolbar {
    border: 1px solid ${({ theme }) => theme.color_borderGray};
    background-color: ${({ theme }) => theme.color_bgWhite};
    font-size: ${({ theme }) => theme.fontSize_sm};
    border-radius: 12px;
  }

  .ql-container {
    border-radius: 0 0 12px 12px;
    overflow: hidden;
  }

  .ql-toolbar {
    border-radius: 12px 12px 0 0;
    padding: 12px;
  }

  .ql-editor {
    min-height: 500px;
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
  }

  .ql-blank::before {
    font-size: ${({ theme }) => theme.fontSize_sm};
    font-style: normal;
  }
  .ql-img-wrapper {
    position: relative;
    display: inline-block;
  }

  .ql-img-wrapper img {
    max-width: 100%;
    height: auto;
  }

  .register {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
`;
