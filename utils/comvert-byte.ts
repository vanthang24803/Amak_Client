function convertBytes(bytes: number): string {
  if (bytes < 0) {
    throw new Error("Số byte không thể là số âm.");
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
}

export { convertBytes };
