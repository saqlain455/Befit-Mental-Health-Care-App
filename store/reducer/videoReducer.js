import { MY_STREAM, ADD_STREAM, ADD_REMOTE_STREAM,Remove_STREAM } from "../actions/types";
const initalState = {
  myStream: null,
  streams: [],
  remoteStreams: [],
  myId: "",
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case MY_STREAM:
      return {
        ...state,
        myStream: payload,
      };
    case ADD_STREAM:
      return {
        ...state,
        streams: [...state.streams, payload],
      };
    case ADD_REMOTE_STREAM:
      return {
        ...state,
        remoteStreams: [...state.remoteStreams, payload],
      };
      case Remove_STREAM:
        return {
          ...state,
          streams: [],
        };

    case 'MY_ID':
      return {
        ...state,
        myId: payload,
      };

    default:
      return state;
  }
};
