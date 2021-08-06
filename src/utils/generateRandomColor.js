/**
 *
 * @returns random color as a hex string e.g #8c84ef
 */
export default function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}
