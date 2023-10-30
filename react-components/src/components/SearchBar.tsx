import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  // Получаем последний запрос из Local Storage при монтировании компонента.
  useEffect(() => {
    const storedQuery = localStorage.getItem('lastQuery');
    if (storedQuery) {
      setLastQuery(storedQuery);
    }
  }, []);

  // Обработчик изменения ввода
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Сохраняем текущий запрос в Local Storage и обновляем состояние lastQuery
    if (!(query === '')) {
      localStorage.setItem('lastQuery', query);
      setLastQuery(query);
    }

    // Здесь вы можете выполнить поиск или другие действия с запросом
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {lastQuery && (
        <div>
          Ранее вы искали:{' '}
          <span onClick={() => setQuery(lastQuery)}>{lastQuery}</span>
        </div>
      )}
      <button type="submit">Искать</button>
    </form>
  );
}

export default SearchBar;
