import React, { Component } from "react";
import PropTypes from "prop-types";

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  constructor(props) {
    super(props);
    const charmanderImg = "https://www.serebii.net/swordshield/pokemon/004.png";
    const squirtleImg = "https://www.serebii.net/swordshield/pokemon/007.png";
    const bulbasaurImg = "https://www.serebii.net/swordshield/pokemon/001.png";
    const pikachuImg = "https://www.serebii.net/swordshield/pokemon/025.png";
    const mewImg = "https://www.serebii.net/swordshield/pokemon/151.png";
    const mewtwoImg = "https://www.serebii.net/swordshield/pokemon/150.png";
    const eeveeImg = "https://www.serebii.net/swordshield/pokemon/133.png";
    const vaporeonImg = "https://www.serebii.net/swordshield/pokemon/134.png";
    const jolteonImg = "https://www.serebii.net/swordshield/pokemon/135.png";
    const flareonImg = "https://www.serebii.net/swordshield/pokemon/136.png";
    const snorlaxImg = "https://www.serebii.net/swordshield/pokemon/143.png";
    const rhyhornImg = "https://www.serebii.net/swordshield/pokemon/111.png";
    this.state = {
      selected: [],
      selectedCount: 0,
      board: [
        charmanderImg,
        bulbasaurImg,
        squirtleImg,
        pikachuImg,
        mewImg,
        mewtwoImg,
        eeveeImg,
        vaporeonImg,
        jolteonImg,
        flareonImg,
        snorlaxImg,
        rhyhornImg
      ]
    };
  }
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    children: ""
  };

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleClick(image) {
    if (0 === this.state.selected.length) {
      var joined = this.state.selected.concat(image);
      this.setState({
        board: this.shuffle(this.state.board),
        selected: joined,
        selectedCount: this.state.selectedCount + 1
      });
    } else {
      let found = false;
      let index = 0;
      while (index < this.state.selected.length) {
        if (image === this.state.selected[index]) {
          found = true;
          break;
        }
        index++;
      }

      if (found) {
        this.setState({
          board: this.shuffle(this.state.board),
          selected: [],
          selectedCount: 0
        });
      } else {
        let joined = this.state.selected.concat(image);
        this.setState({
          board: this.shuffle(this.state.board),
          selected: joined,
          selectedCount: this.state.selectedCount + 1
        });
      }
    }

    if (this.state.selected.length + 1 === this.state.board.length) {
      alert("---Winner!!!---");
    }
  }

  renderBoard() {
    const items = [];

    for (const [index, value] of this.state.board.entries()) {
      if (index === 4) {
        items.push(<br />);
      }
      items.push(
        <Square url={value} onClick={() => this.handleClick(value)} />
      );
    }
    return items;
  }

  render() {
    let status;

    status = "User score is: " + this.state.selectedCount;

    return (
      <div className="home-app">
        <div>{status}</div>
        {this.renderBoard()}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button onClick={props.onClick}>
      <img alt="" src={props.url} />
    </button>
  );
}
