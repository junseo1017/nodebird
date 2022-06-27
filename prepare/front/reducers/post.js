export const initialState = {
  mainPost: [
    // 소문자인 속성 : post 자체의 속성
    // 대문자인 속성 : 다른 정보와 합쳐져서 받는 데이터는 대문자
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'jsking',
      },
      content: '첫 번째 게시글 #해시태그 #해시태그',
      Images: [
        {src: 'https://cdn.pixabay.com/photo/2022/05/17/15/49/flower-7203048__340.jpg'},
        {src: 'https://cdn.pixabay.com/photo/2022/05/17/15/49/flower-7203048__340.jpg'},
        {src: 'https://cdn.pixabay.com/photo/2022/05/17/15/49/flower-7203048__340.jpg'},
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '댓글 111111111111',
        },
        {
          User: {
            nickname: 'zero',
          },
          content: '댓글22222222222222',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMNET_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMNET_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMNET_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: 'It is dummy data',
  User: {
    id: 1,
    nickname: 'jsking',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPost: [dummyPost, ...state.mainPost],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
