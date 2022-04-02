
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Todos } from './Todos';
import { CreateList } from './CreateList';
import { supabase } from './utils/supabase';

function useMyLists() {
  const [lists, setLists] = useState([])
  const [id, setId] = useState()

  async function retrieveAll() {
    let { data, error } = await supabase
      .from('list')
      .select('name, id')

    setLists(data)

  }

  useEffect(() => {
    retrieveAll()
  }, [])

  return {
    lists,
    setId,
    retrieveAll,
    id
  }
}

export function MyLists() {
  const {
    lists,
    setId,
    retrieveAll,
    id
  } = useMyLists()


  return (
    <div>
      <h1>my lists</h1>
      {lists.map((list) => (
        <h3 key={list.id} onClick={() => { setId(list.id) }}>
          {list.name}
        </h3>
      ))}
      <div>
        {id ? (
          <Todos id={id} />
        ) : (
          <p> Please Select A List</p>
        )}
      </div>
      {/*retrieve all lists once a list is created */}
      <CreateList onListCreated={retrieveAll} />
    </div >
  )

}