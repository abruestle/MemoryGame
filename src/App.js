import React, { Component } from "react";
import GameCard from "./components/GameCard";
//import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Comment from "./components/Comment";
import "./App.css";
import API from "./utils/API.js";
import successComments from "./successComments.json";
import Alert from "./components/Alert";
import Col from "./components/Col";
import Row from "./components/Row";
import Container from "./components/Container";
// import SearchForm from "../components/SearchForm";
// import SearchResults from "../components/SearchResults";


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    cards: [],
    cardsSelected: [],
    points: 0,
    breed: "",
    comment: "Select a pupper to start...but don't select the same one twice!",
    number: 18,
    error: ""
  };

  shuffleArray = (array, array2) => {
    let i = array.length - 1;
    
    //two arrays
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      if(array2){
        const temp2 = array2[i];
        array2[i] = array2[j];
        array2[j] = temp2;
      }
    }
    this.setState({[array]: array});
    if (array2){
      this.setState({[array2]: array2});
    }
  }

  // When the component mounts, start game
  componentDidMount() {
    this.setBreed();
  }

  setBreed() {
    this.setState({points: 0});
    API.getBaseBreedsList()
      .then(res => {
        //set random breed
        const rand = Math.floor( Math.random() * res.data.message.length);
        this.setState({breed: res.data.message[rand]});
        //Call method to get breed images
        console.log("Breed selected: "+this.state.breed);
        this.getImages();
      })
      .catch(err => console.log(err));
  }

  getImages() {
    API.getDogsOfBreed(this.state.breed)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      const imageArray = res.data.message;
      imageArray.length = this.state.number;
      //console.log(imageArray);
    this.setState({ cards: imageArray});
    console.log("getImages");
    this.setState({error: "" });
    this.setUp();
    })
    .catch(err => this.setState({ error: err.message }));
  }

  setUp() {
    //set cards to correct number and create matching points array.
    let imageArray = this.state.cards;

    let pointsArray = [];
    for (let i = 0; i < this.state.number; i++){
      pointsArray.push(0);
    }
    this.setState({ cards: imageArray, cardsSelected: pointsArray });
    // console.log(this.state.cards);
    // console.log("----------");
    // console.log(this.state.cardsSelected);
  }

  selectCard = id => {
    //event.preventDefault();
    //const id = event.target.value;
    if(this.state.cardsSelected[id] === 0) {
      //card has not been selected before
      //this.state.cardsSelected[id]
      // const readers = [...this.state.readers];
      // this.setState({
      //   readers: [...this.state.readers, newReader]
      // })

      //readers.map((item, index) => {

      //})

      //Make sure card is selected
      let arr = this.state.cardsSelected;
      arr[id]++;
      this.setState({cardsSelected: arr});
      //Set points
      this.setState({points: this.state.points + 1});
      //set comment

      const comment = successComments[Math.floor(Math.random()* successComments.length)];
      this.setState({comment: comment});
      //Shuffle Array
      this.shuffleArray(this.state.cards, this.state.cardsSelected);
    } else {
      //card has been selected before
      //make comment
      const comment = "You chose the wrong pup! Final score: "+this.state.points;
      this.setState({comment: comment});
      //call new game up
      this.setBreed();
    }
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <Container style={{ minHeight: "80%" }}>
        <Title title="Dog Memory Game" comment={this.state.comment} />
        <Comment>Score: {this.state.points}</Comment>
        <Alert
          type="danger"
          style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
        >
          {this.state.error}
        </Alert>
      <Row>
        {this.state.cards.map((card, index) => (
        <Col size="md-2">
          <GameCard
            id={index}
            key={index}
            image={card}
            breed={this.state.breed}
            selectCard={this.selectCard}
          />
        </Col>
        ))}
      </Row>
      </Container>
      
    );
  }
}

export default App;
