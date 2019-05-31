import React from 'react';
import CharacterComponent from './CharacterComponent';
import JwPagination from 'jw-react-pagination';

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
        this.setState({ starwarsChars: [...data.results, data.results] });
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
      <JwPagination items={this.state.starwarsChars} onChangePage={this.handlePageChange} />
      </div>
    )
}

}

export default ListComponent;