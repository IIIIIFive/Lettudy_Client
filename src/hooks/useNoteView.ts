import { useState } from 'react';
import { Note, notes } from '@/data/noteData';

export function useNoteView() {
  const sortedNotes: Note[] = [...notes].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const allTags = Array.from(new Set(sortedNotes.flatMap((note) => note.tags)));
  const [selectedNote, setSelectedNote] = useState<Note | null>(sortedNotes[0]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleToggleTags = () => {
    setShowAllTags(!showAllTags);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
    setCurrentPage(1);
  };

  const handleResetTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const filteredNotes = selectedTags.length
    ? sortedNotes.filter((note) =>
        selectedTags.some((tag) => note.tags.includes(tag)),
      )
    : sortedNotes;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  return {
    selectedNote,
    showAllTags,
    selectedTags,
    currentPage,
    itemsPerPage,
    allTags,
    currentNotes,
    totalPages,
    handleNoteClick,
    handleToggleTags,
    handleTagClick,
    handleResetTags,
    setCurrentPage,
  };
}
