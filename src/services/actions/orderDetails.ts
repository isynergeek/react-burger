import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOrder as makeOrderApi } from '../../api/Api';

export const makeOrder = createAsyncThunk('ORDER_DETAILS/MAKE_ORDER', (ids: string[]) => makeOrderApi(ids))

