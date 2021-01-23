import {
  DOWNLOAD_FLIGTHS,
  ADD_FLIGTH,
  ADD_CLIENT,
  EDIT_CLIENT,
  REMOVE_CLIENT,
} from './actions';

const initialState = {
  fligths: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOWNLOAD_FLIGTHS:
      return {
        ...state,
        fligths: payload,
      };

    case ADD_FLIGTH:
      return {
        ...state,
        fligths: [
          ...state.fligths,
          {
            fligthName: payload.fligthName,
            fligthDest: payload.fligthDest,
            fligthId: payload.fligthId,
            fligthPalace : payload.fligthPalace,
            clients: [],
          },
        ],
      };

    case ADD_CLIENT:
      return {
        ...state,
        fligths: state.fligths.map((fligth, index) =>
          index !== payload.fligthId
            ? { ...fligth }
            : { ...fligth, clients: [...fligth.clients, payload.client] }
        ),
      };

    case EDIT_CLIENT:
      return {
        ...state,
        fligths: state.fligths.map((fligth, index) =>
          index !== payload.fligthId
            ? { ...fligth }
            : {
                ...fligth,
                clients: fligth.clients.map((client, clientIndex) =>
                  clientIndex === payload.clientId
                    ? { ...client, name: payload.clientName }
                    : client
                ),
              }
        ),
      };

    case REMOVE_CLIENT:
      const removedClient =
        state.fligths[payload.fligthId].clients[payload.clientId];
      const clients = state.fligths[payload.fligthId].clients.filter(
        (client) => client !== removedClient
      );

      return {
        ...state,
        fligths: state.fligths.map((fligth, index) =>
          index === payload.fligthId
            ? {
                ...fligth,
                clients,
              }
            : { ...fligth }
        ),
      };

    default:
      return state;
  }
}
