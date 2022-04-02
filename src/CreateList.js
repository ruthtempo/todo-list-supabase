import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

function useCreateList(props) {
  const [listName, setListName] = useState("")

  async function createNewList() {
    const { data, error } = await supabase
      .from('list')
      .insert([
        { name: listName, todos: [{ content: 'my first task', isCompleted: false }] },
      ])
    //notifies parent that list is created (with callback). parent decides how to handle this
    props.onListCreated()
    setListName("")
  }
  function handleKeyDown(e) {
    if (e.key == 'Enter') {
      createNewList(e)
    }
  }

  return {
    setListName,
    listName,
    handleKeyDown
  }
}

export function CreateList(props) {
  const {
    setListName,
    listName,
    handleKeyDown
  } = useCreateList(props)

  return (
    <div>
      <input
        placeholder="New list"
        onKeyDown={handleKeyDown}
        onChange={e => setListName(e.target.value)}
        value={listName}></input>
    </div>
  )
}