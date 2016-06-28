const DEFAULT_TITLE = 'Todo App';

export function setDocumentTitle (title) {
  if (document) {
    if (title && typeof title === 'string') {
      title = `${title} | ${DEFAULT_TITLE}`;
    } else {
      title = DEFAULT_TITLE;
    }
    document.title = title;
  }
}
