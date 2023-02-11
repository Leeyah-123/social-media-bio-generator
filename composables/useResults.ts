export default function () {
  return useState<string[]>('results', () => []);
}
