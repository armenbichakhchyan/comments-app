import {configureStore} from "@reduxjs/toolkit";
import dataSlice from './reducer/storeData'


export const store = configureStore({
    reducer: {
        data: dataSlice,
    }
})

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(
        "likedComments",
        JSON.stringify(state.data.likedComments)
    );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;