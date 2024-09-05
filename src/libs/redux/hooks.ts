import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: TypedUseSelectorHook<AppDispatch> = useDispatch();
export const useAppStore: TypedUseSelectorHook<AppStore> = useStore;