import {
  CREATED_STREAM,
  FETCHING_FAILED_STREAMS,
  FETCHING_STREAMS,
  FETCHED_STREAMS,
  FETCHING_FAILED_STREAM,
  FETCHING_STREAM,
  FETCHED_STREAM,
} from "../actions/actionTypes";

/**
 * Stream's state structure
 *
 * Stream: {
 *    streams: {
 *      isFetching: true || false || null,
 *      data: [] || null
 *      error: string || null
 *    },
 *    loadedStream: {
 *      isFetching: true || false || null,
 *      data: object || null,
 *      user: object || null
 *      error: string || null
 *    }
 * }
 *
 **/

const INITIAL_STATE = {
  streams: {
    isFetching: null,
    data: null,
    error: null,
  },
  loadedStream: {
    isFetching: null,
    data: null,
    user: null,
    error: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_STREAMS:
      return { ...state, streams: { isFetching: true } };
    case FETCHING_FAILED_STREAMS:
      return { ...state, streams: { error: action.payload } };
    case FETCHED_STREAMS:
      return { ...state, streams: { isFetching: false, data: action.payload } };

    case FETCHING_FAILED_STREAM:
      return { ...state, loadedStream: { error: action.payload } };
    case FETCHING_STREAM:
      return { ...state, loadedStream: { isFetching: true } };
    case FETCHED_STREAM:
      return { ...state, loadedStream: { data: action.payload } };

    case CREATED_STREAM:
      let previousStreamData = state.streams.data;
      return {
        ...state,
        streams: { data: [action.payload, ...previousStreamData] },
      };

    default:
      return state;
  }
};
