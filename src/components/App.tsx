import { createSignal, type Component, createEffect, Show } from "solid-js";

import { BookList } from "./BookList";
import { AddBook } from "./AddBook";
import { Book } from "./types";

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface BookShelfProps {
  name: string;
}

const BookShelf = (props: BookShelfProps) => {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={toggleForm}>Finished adding books</button>
      </Show>
    </div>
  );
};

const App: Component = () => {
  return <BookShelf name="solid" />;
};

export default App;
