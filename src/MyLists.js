
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Todos } from './Todos';

const supabaseUrl = 'https://epowhiqqzsmspubeowcb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwb3doaXFxenNtc3B1YmVvd2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg3Mzc0MzksImV4cCI6MTk2NDMxMzQzOX0.tO4iyhMjjcPrdutSm4XZB5hnFLItInI1EaDN2oG-kT0"
const supabase = createClient(supabaseUrl, supabaseKey)

export function MyLists() {

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

  return (
    <div>
      {lists.map((list) => (
        <h3 key={list.id} onClick={() => { setId(list.id) }}>
          {list.name}
        </h3>

      ))
      }
      <div>
        {id ? (
          <Todos id={id} />
        ) : (
          <p> Please Select A List</p>
        )}
      </div>
    </div >
  )

}