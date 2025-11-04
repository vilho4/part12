import { render, screen } from '@testing-library/react'
import SingleTodo from '../Todos/singleTodo'

describe('SingleTodo', () => {
  const todo = { id: 1, text: 'Test todo', done: false }
  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  beforeEach(() => {
    render(
      <SingleTodo
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />,
    )
  })

  test('renders todo text', async () => {
    const todoText = await screen.findByText(todo.text)
    expect(todoText).toBeInTheDocument()
  })

  test('renders todo text', async () => {
    const todoText = screen.queryByText('tätä ei löydy')
    expect(todoText).not.toBeInTheDocument()
  })

  test('delete button is clicked', () => {
    const deleteButton = screen.getByText('Delete')
    deleteButton.click()
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  test('complete button is clicked', () => {
    const completeButton = screen.getByText('Set as done')
    completeButton.click()
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})
