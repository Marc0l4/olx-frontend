import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer';

export const makeUserStore = () => {
    return configureStore({
        reducer: {
            user: userReducer
        }
    });
};

export type AppStore = ReturnType<typeof makeUserStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']