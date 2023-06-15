import React from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
import Word from './Word.jsx';
import Edit from './Edit.jsx';

function getGlossary(page) {
  return axios({
    url: '/words?skip=' + page,
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
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [definition, setDefinition] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

  function fetchWords() {
    getGlossary(page)
      .then(({ data }) => {
        setWords(data.data);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }

  function handleDelete(item) {

  }

  function handleEdit(item) {
    console.log(item);
    axios({
      url: '/words/' + item._id,
      method: 'put',
      data: item
    }).then(() => {
      setEditing(null);
      fetchWords();
    })
  }

  function handlePage(action) {
    if (action === 'last') {
      if (page > 0) {
        setPage(page - 10)
      }
    } else if (action === 'next') {
      if (page < total) {
        setPage(page + 10)
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    createWord(word, definition)
      .then(() => {
        setWord('');
        setDefinition('');
        return fetchWords();
      })
      .catch((err) => {
        setLoading(false);
      })
  }


  React.useEffect(() => {
    fetchWords()
  }, [page])

  return (
    <div className="container">
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
        <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        <button type="submit">GO</button>
      </form>

      <div className="pagination">
        <button onClick={() => handlePage('last')}>last</button>
        <button onClick={() => handlePage('next')}>next</button>
      </div>

      {words.length && (
        <div className="words-list">
          {words.map((item) => (
            <Word
              key={item.word}
              word={item}
              onEdit={() => setEditing(item)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editing ? (
        <Edit
          vic={editing}
          onCancel={() => setEditing(null)}
          onSubmit={handleEdit}
        />
      ) : null}
    </div>
  );
}