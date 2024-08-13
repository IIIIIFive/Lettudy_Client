import { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RegisterButton from '@/components/note/RegisterButton';
import TagInput from '@/components/note/TagInput';
import Toast from '@/components/note/Toast';
import styled from 'styled-components';
import useNoteStore from '@/store/noteStore';

interface NoteFormProps {
  onSubmit: (data: {
    title: string;
    tags: string[];
    content: string;
    date: string;
  }) => void;
}

function NoteForm({ onSubmit }: NoteFormProps) {
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
    date,
    setDate,
  } = useNoteStore();

  const toastRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDate(new Date().toISOString());

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ title, tags: tagList, content, date });
    setTitle('');
    setTags('');
    addTag(tags.trim());
    setContent('');
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tags.trim() !== '') {
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <NoteFormStyle>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <h4>제목</h4>
          <input
            className='input'
            type='text'
            placeholder='제목을 입력하세요.'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <h4>태그</h4>
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
          <h4>내용</h4>
          <ReactQuill
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

const NoteFormStyle = styled.div`
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

  .form-group h4 {
    margin-bottom: 20px;
    margin-left: 12px;
  }

  .input {
    padding: 14px 20px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.color_borderGray};
    font-size: ${({ theme }) => theme.fontSize_sm};
    outline: none;
    width: 100%;
  }

  .ql-container,
  .ql-toolbar {
    border: 1px solid ${({ theme }) => theme.color_borderGray};
    background-color: ${({ theme }) => theme.color_bgWhite};
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
    min-height: 200px;
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

  .register {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
`;

export default NoteForm;
