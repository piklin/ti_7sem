const ADD_FLIGTH= 'ADD_FLIGTH';
const ADD_CLIENT = 'ADD_CLIENT';
const EDIT_CLIENT = 'EDIT_CLIENT';
const REMOVE_CLIENT = 'REMOVE_CLIENT';
const DOWNLOAD_FLIGTHS = 'DOWNLOAD_FLIGTHS';

const downloadFligthsAction = (fligths) => ({
  type: DOWNLOAD_FLIGTHS,
  payload: fligths,
});

const addFligthAction = ({ fligthName, fligthDest, fligthId, fligthPalace, clients }) => ({
  type: ADD_FLIGTH,
  payload: { fligthName, fligthDest, fligthId, fligthPalace, clients },
});

const addClientAction = ({ client, fligthId }) => ({
  type: ADD_CLIENT,
  payload: { fligthId, client },
});

const editClientAction = ({ fligthId, clientId, clientName }) => ({
  type: EDIT_CLIENT,
  payload: { fligthId, clientId, clientName },
});

const removeClientAction = ({ fligthId, clientId }) => ({
  type: REMOVE_CLIENT,
  payload: { fligthId, clientId },
});

export {
  DOWNLOAD_FLIGTHS,
  ADD_FLIGTH,
  ADD_CLIENT,
  EDIT_CLIENT,
  REMOVE_CLIENT,
  downloadFligthsAction,
  addFligthAction,
  addClientAction,
  editClientAction,
  removeClientAction,
};
