import React from 'react';
import CharacterComponent from './CharacterComponent';

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      starwarsChars: [],
      currentPage: 1,
      perPage: 3
    }
  }

  componentDidMount() {
    this.getCharacters('https://swapi.co/api/people/');
  }

  handlePageChange() {
    // this.setState({
    //   currentPage: 
    // })
  }

  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ starwarsChars: data.results });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  render() {
    return (
      <div className="characters-wrapper">
      {
        this.state.starwarsChars.map( (character, key) => {
          return (
            <CharacterComponent key={key} character={character}/>
          )
        })
      }
      </div>
    )
}

}

export default ListComponent;