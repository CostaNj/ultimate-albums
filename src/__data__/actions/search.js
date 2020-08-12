import { SEARCH } from '../constants'

export const searchAction = () => (dispatch) => {
    setTimeout(()=>{
        dispatch({
            type: SEARCH,
            payload: {
                title: 'new search data'
            }
        })
    }, 2000)
}