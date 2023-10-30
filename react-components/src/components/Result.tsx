import './loader.css';
import { Component } from 'react';
import Planet from '../interfaces/Planet';
import fetchPlanets from './fetchPlanets';

interface ResultState {
  list: Planet[];
  isLoading: boolean;
}

class Result extends Component<Record<string, never>, ResultState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const planets = await fetchPlanets('');
      // Обновите состояние компонента с полученными данными
      this.setState({ list: planets, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  async updateSearchResults(query: string) {
    try {
      const planets = await fetchPlanets(query);
      this.setState({ list: planets, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { list, isLoading } = this.state;
    return (
      <section className="result-section">
        <div className="result-container">
          <h3>Planet list:</h3>
          {isLoading ? (
            <div id="loader" />
          ) : (
            <ul>
              {list.map((planet) => {
                return (
                  <div key={planet.name}>
                    <h4>{planet.name}</h4>
                    {`Diameter: ${planet.diameter}`}
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    );
  }
}

export default Result;
