import React from 'react'
import { PastSearchesProps } from './types'

export function PastSearchesComponent({ searches, searchAgain }: PastSearchesProps): JSX.Element {
  return (
    <div>
      {searches.map((id: string) => (
        <div key={id}>
          {id} <button onClick={() => searchAgain(id)}>Search again!</button>
        </div>
      ))}
    </div>
  )
}
