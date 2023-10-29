import { Component, ChangeEvent, FormEvent } from 'react';
import './component-styles.css';
import Planet from '../interfaces/Planet';
import fetchPlanets from './fetchPlanets';

interface State {
  query: string;
  lastQuery: string | null;
  searchResults: Planet[];
}

class Search extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      query: '',
      lastQuery: null,
      searchResults: [],
    };
  }

  // Получаем последний запрос из Local Storage при монтировании компонента.
  componentDidMount() {
    const storedQuery = localStorage.getItem('lastQuery');
    if (storedQuery) {
      this.setState({ lastQuery: storedQuery });
    }
  }

  // Обработчик изменения ввода
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    this.setState({ query: newQuery });
  };

  handleLastQueryClick = () => {
    if (this.state.lastQuery) {
      this.setState({ query: this.state.lastQuery });
    }
  };

  // Обработчик отправки формы
  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Сохраняем текущий запрос в Local Storage и обновляем состояние lastQuery.
    if (!(this.state.query === '')) {
      localStorage.setItem('lastQuery', this.state.query);
      this.setState({ lastQuery: this.state.query });
    }
    // Здесь вы можете выполнить поиск или другие действия с запросом.
  };

  render() {
    return (
      <div className="search-container">
        <form action="" className="search__form" onSubmit={this.handleSubmit}>
          <input
            className="search__field"
            type="search"
            value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Find somethin' !"
            autoComplete="on"
          />
          <button className="search_submit" type="submit">
            Search
          </button>
          {this.state.lastQuery && (
            <div className="last_search">
              Your last search:
              <button
                className="autocomplete_button"
                type="button"
                onClick={this.handleLastQueryClick}
              >
                {this.state.lastQuery}
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default Search;
