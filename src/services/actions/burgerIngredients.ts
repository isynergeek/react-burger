import {createAsyncThunk} from "@reduxjs/toolkit";
import {getIngredients} from "../../api/Api";

export const getItems = createAsyncThunk(`BURGER_INGREDIENTS/GET_ITEMS`, () => getIngredients())
