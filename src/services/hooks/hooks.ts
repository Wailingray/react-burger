import { TUseParams } from './../utils/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import type { RootState, AppDispatch, AppThunk } from '../../index';

export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppParams = () => useParams<TUseParams>()

