import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Search = (props) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
      props.onHandleSearch(search);
    }, [search]);
    const handleChange = (e) => {
        setSearch(e.target.value);
      };
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Search"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Search" value={search} onChange={handleChange} />
      </FloatingLabel>
    </>
  )
}

export default Search;