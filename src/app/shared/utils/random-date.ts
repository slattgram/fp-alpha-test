export default function randomDate() {
  const start = new Date(2026, 2, 1); // March 1, 2026
  const end = new Date();
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}
