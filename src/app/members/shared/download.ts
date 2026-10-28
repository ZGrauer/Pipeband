export function downloadFile(path: string, filename: string): void {
  const link = document.createElement('a');
  link.setAttribute('href', path);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function filenameOf(path: string): string {
  return path.substring(path.lastIndexOf('/') + 1);
}
