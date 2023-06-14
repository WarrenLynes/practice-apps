import React from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
import Word from './Word.jsx';

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
        setWords(data);
        setWords(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handleDelete(item) {

  }

  function handleEdit(item) {

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
            <Word
              key={item.word}
              word={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}