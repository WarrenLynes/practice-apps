import React from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';

function getGlossary() {
  return axios({
    url: '/words',
    method: 'get'
  });
}
function createWord(word, definition) {
  return axios({
    url: '/words',
    method: 'post',
    data: { word, definition }
  })
}

export default function App() {
  const [words, setWords] = React.useState([]);
  const [word, setWord] = React.useState('');
  const [definition, setDefinition] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  function fetchWords() {
    getGlossary()
      .then(({ data }) => {
        setTimeout(() => {
          setWords(data);
          setLoading(false);
        }, 3000)
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    createWord(word, definition)
      .then(fetchWords)
  }

  React.useEffect(() => {
    fetchWords()
  }, [])

  return (
    <div className="container">
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
        <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        <button type="submit">GO</button>
      </form>

      {words.length && (
        <div className="words-list">
          {words.map((item) => (
            <div className="word" key={item.word}>
              <h5>{item.word}</h5>
              <p>{item.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}