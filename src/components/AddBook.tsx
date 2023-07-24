import { For, JSX, Setter, Show, createResource, createSignal } from "solid-js";
import { Book } from "./types";
import { searchBooks } from "./SearchBooks";

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<any, any>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Book name</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <div></div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Add book
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onclick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
