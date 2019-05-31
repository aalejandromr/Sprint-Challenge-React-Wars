import React from 'react';
import CharacterComponent from './CharacterComponent';
import JwPagination from 'jw-react-pagination';
import './List.css';

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    // let exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    this.state = {
      starwarsChars: [],
      // exampleItems,
      pageSize: 3,
      initialPage: 1,
      pageOfItems: []
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getCharacters('https://swapi.co/api/people/');
  }

  handlePageChange(pageOfItems) {
    // this.setState({
    //   currentPage: 
    // })
    this.setState({ pageOfItems: pageOfItems});
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
        this.setState({ starwarsChars: [...data.results, {
          "name": "Luke Skywalker", 
          "height": "172", 
          "mass": "77", 
          "skin_color": "fair", 
          "eye_color": "blue", 
          "birth_year": "19BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.co/api/planets/1/", 
          "created": "2014-12-09T13:50:51.644000Z", 
          "edited": "2014-12-20T21:17:56.891000Z", 
          "url": "https://swapi.co/api/people/1/"}] });
          // this.setState({ 
        //   starwarsChars: data.results
        // })
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  render() {
    
    return (
      <div className="characters-wrapper">
      {
        this.state.pageOfItems.map( (character, key) => {
          return (
            <CharacterComponent key={key} character={character}/>
          )
        })
      }
      <div className="character-container">
        <JwPagination items={this.state.starwarsChars} onChangePage={this.handlePageChange}
          labels={{
                first: '<<',
                last: '>>',
                previous: '<',
                next: '>'
            }} pageSize={1}
        />
      </div>
      </div>
    )
}

}

export default ListComponent;