import { createSlice } from '@reduxjs/toolkit';
import { addQuizId } from '../topics/topicsSlice';
import { useDispatch } from 'react-redux';


export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {}
    },
    reducers: {
        addQuiz: (state, action) => {
            const { id, name, topicId, cardIds } = action.payload;
            state.quizzes[id] = {
                id,
                name,
                topicId,
                cardIds
            }
        }
    }
});




export const addQuizAndTopicId = quiz => {
    const { id, name, topicId, cardIds } = quiz;
    return (dispatch, getState) => {
        dispatch(quizzesSlice.actions.addQuiz({ id, name, topicId, cardIds }));
        dispatch(addQuiz({ id, topicId, cardIds }));
    }
};



export const selectQuizzes = state => state.quizzes.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;

