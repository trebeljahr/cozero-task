import React from 'react'
import { PastSearchesProps } from './types'

export function PastSearchesComponent({
  searches,
  searchAgain,
  current,
}: PastSearchesProps): JSX.Element {
  return (
    <div>
      <h3>Past Searches</h3>
      {searches.map((id: string) => (
        <div key={id}>
          {id}{' '}
          {id === current ? (
            '(Active)'
          ) : (
            <button onClick={() => searchAgain(id)}>Search again!</button>
          )}
        </div>
      ))}
    </div>
  )
}
