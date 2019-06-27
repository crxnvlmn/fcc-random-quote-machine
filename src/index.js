import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import img_cersei from './assets/cersei.jpg';
import img_tyrion from './assets/tyrion.jpg';
import img_ygritte from './assets/ygritte.jpg';
import img_syrio from './assets/syrio.jpg';
import img_peter from './assets/peter.jpg';
import img_daenerys from './assets/daenerys.jpg';
import img_jon from './assets/jon.jpg';

class RandomQuotesMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      quotes: [
        {
          quote: 'You Know Nothing, Jon Snow.',
          author: 'Ygritte'
        },
        {
          quote:
            'Never forget what you are.\nThe rest of the world will not.\nWear it like armor, and it can \nnever be used to hurt you.',
          author: 'Tyrion Lannister'
        },
        {
          quote: 'There is only one thing we say to death: Not today!',
          author: 'Syrio Forel'
        },
        {
          quote: "What we don't know is what usually get us killed.",
          author: 'Peter Baelish'
        },
        {
          quote:
            'When you play the game of\nthrones, you win or you die.\nThere is no middle ground.',
          author: 'Cersei Lannister'
        },
        {
          quote:
            'I’m not going to stop the wheel. I’m going to break the wheel.',
          author: 'Daenerys Targaryen'
        },
        {
          quote:
            'When enough people make false promises,\nwords stop meaning anything.\nThen there are no more answers,\nonly better and better lies.',
          author: 'Jon Snow'
        }
      ],
      images: [
        img_ygritte,
        img_tyrion,
        img_syrio,
        img_peter,
        img_cersei,
        img_daenerys,
        img_jon
      ],
      pics: [],
      stash: [],
      anim: ['', '', ''],
      placer: ['', ''],
      init: false,
      disable: false
    };

    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  componentWillMount() {
    if (!this.state.init) {
      this.setState({ init: true });

      const initialRandom = Math.floor(
        Math.random() * this.state.quotes.length
      );
      const newStash = [...this.state.stash];
      const newQuotes = [...this.state.quotes];

      newStash.unshift(this.state.quotes[initialRandom]);
      newQuotes.splice(initialRandom, 1);

      this.setState({ quotes: newQuotes });
      this.setState({ stash: newStash });

      // BG
      const newPic = [...this.state.pics];
      const newImg = [...this.state.images];

      newPic.unshift(this.state.images[initialRandom]);
      newImg.splice(initialRandom, 1);

      this.setState({ images: newImg });
      this.setState({ pics: newPic });
      console.log('YE');
    }
  }

  handleNewQuote() {
    console.log('NO');
    this.setState({
      anim: ['fade', 'scrollQ1', 'scrollA1', 'scrollQ2', 'scrollA2'],
      disable: true
    });

    if (this.state.quotes.length !== 0) {
      const initialRandom = Math.floor(
        Math.random() * this.state.quotes.length
      );
      const newStash = [...this.state.stash];
      const newQuotes = [...this.state.quotes];

      newStash.unshift(this.state.quotes[initialRandom]);
      newQuotes.splice(initialRandom, 1);

      this.setState({ placer: [newStash[0].quote, newStash[0].author] });

      const newPic = [...this.state.pics];
      const newImg = [...this.state.images];

      newPic.unshift(this.state.images[initialRandom]);
      newImg.splice(initialRandom, 1);

      setTimeout(() => {
        this.setState({ images: newImg });
        this.setState({ pics: newPic });
      }, 1000);

      setTimeout(() => {
        this.setState({ quotes: newQuotes });
        this.setState({ stash: newStash });
      }, 2000);
    } else {
      const initialRandom =
        Math.floor(Math.random() * (this.state.stash.length - 1)) + 1;
      const newQuote = [...this.state.stash];
      const selectedQuote = newQuote.splice(initialRandom, 1);

      this.setState({
        placer: [selectedQuote[0].quote, selectedQuote[0].author]
      });

      const newPic = [...this.state.pics];
      const selectedImg = newPic.splice(initialRandom, 1);

      setTimeout(() => {
        this.setState({ images: newPic });
        this.setState({ pics: selectedImg });
      }, 1000);

      setTimeout(() => {
        this.setState({ quotes: newQuote });
        this.setState({ stash: selectedQuote });
        this.setState({ placer: ['', ''] });
      }, 2000);
    }

    setTimeout(() => {
      this.setState({
        anim: ['', '', '', '', ''],
        placer: ['', ''],
        disable: false
      });
    }, 2000);
  }

  render() {
    const quote = this.state.stash[0].quote;
    const author = this.state.stash[0].author;
    const image = this.state.pics[0];

    return (
      <>
        <img src={image} alt="bg" id="background" />
        <div id="filter" className={this.state.anim[0]} />
        <img src={require('./assets/got.png')} alt="got-logo" id="got" />

        <div id="quote-box">
          <p id="text" className={this.state.anim[1]}>
            "{quote}"
          </p>
          <p id="author" className={this.state.anim[2]}>
            - {author}
          </p>

          <p id="text2" className={this.state.anim[3]}>
            {this.state.placer[0] !== '' && `"${this.state.placer[0]}"`}
          </p>

          <p id="author2" className={this.state.anim[4]}>
            {this.state.placer[1] !== '' && `- ${this.state.placer[1]}`}
          </p>
          <button
            id="new-quote"
            onClick={this.handleNewQuote}
            disabled={this.state.disable}
          >
            New Quote
          </button>
          <br />
          <a href="twitter.com/intent/tweet" id="tweet-quote">
            Tweet Quote
          </a>
          <br />
        </div>
      </>
    );
  }
}

ReactDOM.render(<RandomQuotesMachine />, document.getElementById('root'));
