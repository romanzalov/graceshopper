/* global describe beforeEach it */

import { expect } from 'chai'
import {last} from 'lodash'
import React from 'react'
import { createStore } from 'redux'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  Route,
  withRouter,
  MemoryRouter
} from 'react-router-dom'
import orders, { } from './orders'

describe('Frontend tests', () => {
  describe('store/reducer', () => {

    let testingStore;
    beforeEach('Create testing store from reducer', () => {
      testingStore = createStore(orders);
    });

    it('has an initial state as described', () => {
      const currentStoreState = testingStore.getState();
      expect(currentStoreState).to.be.deep.equal([]);
    });

    // "on MESSAGES_LOADING" means when an action of that type is dispatched.

    describe('reducing on GET_ORDERS', () => {

      beforeEach('initialize the store to fetch all orders', () => {
        testingStore.replaceReducer(() => (
          { ...testingStore.getState() }
        ));
        testingStore.dispatch({ type: 'INITIALIZE_FOR_GET_ORDER_TEST' });
        testingStore.replaceReducer(orders);
      });

      it('affects state by setting state to an array of orders', () => {

        // an action is dispatched…
        const GET_ORDERS = 'GET_ORDERS';

        testingStore.dispatch({
          type: GET_ORDERS,
          orders: [{
            "id": 1,
            "isCart": false,
            "status": "Created",
            "userId": 1
          },
          {
            "id": 2,
            "isCart": true,
            "status": "Completed",
            "userId": 1
          }]
        });

        const newState = testingStore.getState();
        // and lo, the state has changed! The reducer function is
        // responsible for generating the new state.
        expect(newState.length).to.be.equal(2);

      });

      it('creates a NEW state object on any dispatched action', () => {

        const GET_ORDERS = 'GET_ORDERS';

        const currentStoreState = testingStore.getState();

        testingStore.dispatch({
          type: GET_ORDERS
        });

        const subsequentStoreState = testingStore.getState();

        // Remember how to copy properties into new objects?
        // You should not be modifying a previous Redux state!

        expect(currentStoreState).to.not.be.equal(subsequentStoreState);

      });

    });



    describe('reducing on CREATE_ORDER', () => {

      let existingOrders = [
        {
          "id": 1,
          "isCart": false,
          "status": "Created",
          "userId": 1
        },
        {
          "id": 2,
          "isCart": true,
          "status": "Completed",
          "userId": 1
        },
        {
          "id": 3,
          "isCart": true,
          "status": "Cancelled",
          "userId": 2
        }
      ]

      const dispatchedOrder = {
        "id": 4,
        "isCart": true,
        "status": "Cancelled",
        "userId": 3
      }

      const CREATE_ORDER = 'CREATE_ORDER';

      beforeEach(() => {
        testingStore = createStore(
          orders, existingOrders
        );

      });

      it('affects the state by appends dispatched orders to state orders', () => {




        testingStore.dispatch({
          type: CREATE_ORDER,
          order: dispatchedOrder
        });

        const newState = testingStore.getState();

        console.log('NEWSTATE', newState)
        const lastOrderOnState = last(newState);

        expect(newState).to.have.length(4);
        expect(lastOrderOnState).to.be.deep.equal(dispatchedOrder);

      });

      it('sets messages to different array from previous state', () => {

        const originalState = testingStore.getState();

        testingStore.dispatch({
          type: CREATE_ORDER,
          order: dispatchedOrder
        });

        const newState = testingStore.getState();

        // Once again, don't mutate old data! Generate new data
        // that looks the way you want. There are many ways to do
        // so with arrays.
        expect(newState).to.not.be.equal(originalState);
        expect(originalState).to.have.length(3);

      });

    });

    describe('reducing on CREATE_ORDER', () => {

      beforeEach('initialize the store to be creating new order', () => {
        testingStore.replaceReducer(() => ({ ...testingStore.getState() }));
        testingStore.dispatch({ type: 'INITIALIZE_FOR_CREATE_ORDER_TEST' });
        testingStore.replaceReducer(orders);
      });

      it('affects the state by adding newly created order', () => {



        const CREATE_ORDER = 'CREATE_ORDER';

        testingStore.dispatch({
          type: CREATE_ORDER,
          order: {
            "id": 1,
            "isCart": false,
            "status": "Created",
            "userId": 1
          }
        });

        const newState = testingStore.getState();

        expect(newState.length).to.be.equal(1);
        expect(newState.id).to.be.equal('1');

      });

    });

  });
});
