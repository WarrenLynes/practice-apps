import React from 'react';

export default function Word({ word, onEdit, onDelete }) {

  return (
    <div className="word">
      <div className="content">
        <h3>{word.word}</h3>
        <p>{word.definition}</p>
      </div>
      <div className="actions">
        <button className="btn btn-edit" onClick={onEdit}> edit </button>
        <button className="btn btn-delete" onClick={onDelete}> delete </button>
      </div>
    </div>
  );
}