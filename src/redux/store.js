import { configureStore } from "@reduxjs/toolkit";
import isLoadingReducer from "./reducers/isLoadingSlice";

export default configureStore({
    reducer: {
        isloading: isLoadingReducer,
    }
});