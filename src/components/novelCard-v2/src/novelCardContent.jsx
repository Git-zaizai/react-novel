import { createContext } from 'react'

export const NovelCardContent = createContext(null)
export const NovelCardDispatchContext = createContext(null)

export function NovelCardContentProvider({ value = null, children }) {
  const [tasks, dispatch] = useReducer(NovelCardReducer, [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false },
  ])

  return (
    <NovelCardContent.Provider value={tasks}>
      <NovelCardDispatchContext.Provider value={dispatch}>{children}</NovelCardDispatchContext.Provider>
    </NovelCardContent.Provider>
  )
}

function NovelCardReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ]
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
