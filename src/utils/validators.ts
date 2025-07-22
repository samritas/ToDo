export const validatePostInput = (title: string, body: string): string | null => {
  if (!title.trim() || !body.trim()) return 'Title and body are required.';
  if (title.length < 1) return 'Title must be at least 1 characters.';
  if (body.length < 1) return 'Body must be at least 1 characters.';
  return null;
};
