import React from 'react';
import CharacterComponent from './CharacterComponent';
import JwPagination from 'jw-react-pagination';
import './List.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    // let exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    this.state = {
      starwarsChars: [],
      // exampleItems,
      pageSize: 3,
      initialPage: 1,
      pageOfItems: [],
      currenItemClicked: []
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  handleOpenModal(currentItem) {
    this.setState({modalIsOpen: true, currenItemClicked: currentItem});
  }

  handleCloseModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    
    return (
      <div className="characters-wrapper">
        {
          this.state.pageOfItems.map( (character, key) => {
            return (
              <CharacterComponent key={key} character={character} 
                openModal={this.handleOpenModal}
                closeModal={this.handleCloseModal} 
                modalIsOpen={this.state.modalIsOpen}
              />
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleAfterOpenModal}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <p> Name: {this.state.currenItemClicked.name} </p>
          <p> Birth Year: {this.state.currenItemClicked.birth_year} </p>
          <p> Eye Color: {this.state.currenItemClicked.eye_color} </p>

        </Modal>
      </div>
    )
}

}

export default ListComponent;