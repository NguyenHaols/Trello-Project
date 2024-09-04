const initialState = { language: localStorage.getItem('language') || 'en' }

const languageReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_LANGUAGE' : {
    const language = action.payload
    localStorage.setItem('language', language)
    const newState = {
      ...state,
      language: language
    }
    return newState
  }

  default:
    return state
  }

}

export default languageReducer