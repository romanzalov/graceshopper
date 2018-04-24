/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import { createStore } from 'redux'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  Route,
  withRouter,
  MemoryRouter
} from 'react-router-dom'
import { EditProduct } from './EditProduct'

const adapter = new Adapter()
enzyme.configure({ adapter })


describe('routing tests', () => {
  it('renders EditProduct at /edit-product', () => {
    const wrapper = enzyme.render(
      <MemoryRouter
        initialEntries={['/edit-product/1']}
      >
        <EditProduct />
      </MemoryRouter>
    )
    expect(wrapper.find('form').length).toBe(1);
  })
})
