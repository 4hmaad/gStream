import {
  CREATED_STREAM,
  FETCHING_FAILED_STREAMS,
  FETCHING_STREAMS,
  FETCHED_STREAMS,
  NOT_FOUND_STREAM,
  FETCHING_STREAM,
  FETCHED_STREAM,
} from "../actions/actionTypes";

/**
 * Stream's state structure
 *
 * Stream: {
 *    streams: {
 *      fetching: true || false || null,
 *      data: [] || null
 *      error: string || null
 *    },
 *    loadedStream: {
 *      fetching: true || false || null,
 *      data: object || null,
 *      user: object || null
 *      found: true || false || null
 *    }
 * }
 *
 **/

const INITIAL_STATE = {
  streams: {
    fetching: null,
    data: null,
    error: null,
  },
  loadedStream: {
    fetching: null,
    data: null,
    user: null,
    found: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_STREAMS:
      return { ...state, streams: { ...state.streams, fetching: true } };
    case FETCHING_FAILED_STREAMS:
      return {
        ...state,
        streams: { ...state.streams, error: action.payload, fetching: false },
      };
    case FETCHED_STREAMS:
      return {
        ...state,
        streams: { ...state.streams, fetching: false, data: action.payload },
      };

    case FETCHING_STREAM:
      return {
        ...state,
        loadedStream: { ...state.loadedStream, fetching: true },
      };
    case NOT_FOUND_STREAM:
      return {
        ...state,
        loadedStream: { ...state.loadedStream, found: false, fetching: false },
      };
    case FETCHED_STREAM:
      return {
        ...state,
        loadedStream: {
          fetching: false,
          found: true,
          data: action.data,
          user: action.user,
        },
      };

    case CREATED_STREAM:
      let previousStreamData = state.streams.data;
      return {
        ...state,
        streams: {
          ...state.streams,
          data: [action.payload, ...previousStreamData],
        },
      };

    default:
      return state;
  }
};
