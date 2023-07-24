type ResultItem = {
  title: string;
  author_name: string[];
};

const url = (query: string) =>
  `https://openlibrary.org/search.json?q=${encodeURI(query)}`;

export async function searchBooks(query: string) {
  if (query.trim() === "") return [];

  const response = await fetch(url(query));

  const results = await response.json();

  const documents = results.docs as ResultItem[];

  console.log(documents);

  return documents.slice(0, 10).map(({ title, author_name }) => ({
    title,
    author: author_name,
  }));
}
