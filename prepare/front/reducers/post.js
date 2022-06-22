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
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPost: [dummyPost, ...state.mainPost],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
