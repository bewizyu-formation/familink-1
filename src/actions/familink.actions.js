import WebServices from '../webServices/WebServices';
import AppString from '../strings';

export const ADD_ISCONNECTED = 'ADD_ISCONNECTED';
export const ADD_CONTACTLINK = 'ADD_CONTACTLINK';
export const ADD_TOKEN = 'ADD_TOKEN';
export const ADD_TOKEN_REJECTED = 'ADD_TOKEN_REJECTED';
export const ADD_CONTACTSLIST = 'ADD_CONTACTSLIST';
export const LOGIN_USER = 'LOGIN_USER';
export const SET_CONNECTED = 'SET_CONNECTED';

export function addToken(newToken) {
  return {
    type: ADD_TOKEN,
    token: newToken,
  };
}

export function addIsConnected(newIsConnected) {
  return {
    type: ADD_ISCONNECTED,
    isConnected: newIsConnected,
  };
}

export function addContactLink(newContactlink) {
  return {
    type: ADD_CONTACTLINK,
    contactLink: newContactlink,
  };
}

export function setConnected(newIsConnected) {
  return {
    type: SET_CONNECTED,
    isConnected: newIsConnected,
  };
}

export function addContactsList() {
  return (dispatch, getState) => WebServices.getContacts(getState().familinkReducer.userToken)
    .then((contacts) => {
      dispatch({
        type: ADD_CONTACTSLIST,
        contactsList: contacts,
      });
    },
    )
    .catch(() => {
      // TODO

    });
}

export function loginUser(loginString) {
  return (dispatch, getState) => {
    try {
      if (!getState().familinkReducer.isConnected) {
        const toThrow = { code: 0, message: 'No network' };
        throw toThrow;
      }
      return fetch(`${getState().familinkReducer.uri}/public/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginString,
      })
        .then((response) => {
          try {
            const toThrow = { code: 0, message: null };
            switch (response.status) {
              case 200:
                return response.json();

              case 400:
                toThrow.code = 400;
                toThrow.message = AppString.actionError400Message;
                throw toThrow;

              case 500:
                toThrow.code = 500;
                toThrow.message = AppString.actionError500Message;
                throw toThrow;

              default:
                return false;
            }
          } catch (error) {
            dispatch({
              type: ADD_TOKEN_REJECTED,
              code: error.code,
              message: error.message,
            });

            return false;
          }
        })
        .then((response) => {
          if (response === null || response === false) {
            return dispatch({
              type: ADD_TOKEN,
              token: null,
            });
          }
          return dispatch({
            type: ADD_TOKEN,
            token: response.token,
          });
        });
    } catch (error) {
      return dispatch({
        type: ADD_TOKEN_REJECTED,
        code: error.code,
        message: error.message,
      });
    }
  };
}

/*
export function saveContact(contact) {
  return (dispatch, getState) => WebServices.createContact(contact, getState().familinkReducer.userToken)
    .then((result) => {
      dispatch({
        type: ADD_CREATECONTACTRESULT,
        createContactResult: result,
      });
      throw Error('error');
    },
    )
    .catch(() => {
      // TODO
      console.log('catch');
    });
}
*/
