import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../auth/store/userSlice'
import themeReducer from '../../shared/store/themeSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'


const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
})

const persistedReducer = persistReducer({
    key: 'root',
    storage,
    version: 1,
}, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);