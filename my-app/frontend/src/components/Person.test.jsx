import { render, screen } from '@testing-library/react'
import HandleList from "./HandleList"
import { beforeEach, describe, test, expect } from 'vitest'

describe('HandleList', () => {

  const persons = [
    { name: 'Teppo Testaaja', number: '123-12312', id: 123123 },
    { name: 'John Doe',        number: '123-12312', id: 123124 }
  ]

  beforeEach(() => {
    render(<HandleList persons={persons} />)
  })

  test('renders the first person name on screen', () => {
    expect(
      screen.getByText((text) => text.includes(persons[0].name))
    ).toBeInTheDocument()
  })

  test('does not render person id on screen', () => {
    expect(screen.queryByText(String(persons[0].id))).not.toBeInTheDocument()
  })

})
