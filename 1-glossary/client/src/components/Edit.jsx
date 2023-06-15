import React from 'react';

export default function Edit({ vic, onCancel, onSubmit }) {
  const [word, setWord] = React.useState(vic.word);
  const [definition, setDefinition] = React.useState(vic.definition);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...vic, word, definition });
  }

  return (
    <div id="edit" className="modal">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
          <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        </div>

        <div className="actions">
          <button type="button" onClick={onCancel}>cancel</button>
          <button type="submit">GO</button>
        </div>
      </form>
    </div>
  );
}