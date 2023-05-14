import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// get API base URL from .env file
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const itemSlice = createSlice({
    name: "items",
    initialState: {
        loading: false, searchKeyword: "", error: { errorStatus: false, errorMessage: "" },
        success: { successStatus: false, successMessage: "" }, list: [], favouriteItems: []
    },
    reducers: {
        getItems: (state) => {
            state.loading = true;
        },
        getItemsResponse: (state, action) => {
            let itemList = []
            // set random drinks data to the store 
            action.payload.map((item) => (
                itemList.push(item.data.drinks[0])
            ))
            state.loading = false;
            state.list = itemList;
        },
        getSearchResponse: (state, action) => {
            state.loading = false;
            // set searched drinks data to the store
            if (action.payload) {
                state.list = action.payload;
            } else {
                state.list = [];
            }
        },
        handleError: (state, action) => {
            state.loading = false;
            state.error.errorStatus = true;
            state.error.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.error.errorStatus = false;
            state.error.errorMessage = "";
        },
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        addFavourite: (state, action) => {
            // find the existence of a drink in favourite list by id
            const itemExists = state.favouriteItems.find(item => item.idDrink === action.payload.idDrink);
            // check the existence and add new drink to favourite list, if drink is not already exist in the list
            if (!itemExists) {
                state.favouriteItems = [...state.favouriteItems, action.payload];
                state.success.successStatus = true;
                state.success.successMessage = "Added Item Successfully.";
            } else {
                state.error.errorStatus = true;
                state.error.errorMessage = "Item already exist.";
            }
        },
        removeFavourite: (state, action) => {
            state.favouriteItems = state.favouriteItems.filter(item => item.idDrink !== action.payload);
        },
        clearSuccess: (state) => {
            state.success.successStatus = false;
            state.success.successMessage = "";
        },
    },
});

/**
 * getting 5 random drink items
 */
export const getRandomItems = () => async (dispatch) => {
    let urlPath = `random.php`;
    try {
        dispatch(setSearchKeyword(""))
        dispatch(getItems());
        /**
         * Not available free API to get 5 random items simultaneously, then I had to create endpoint list 
         * including 5 endpoint URLs and fetch 5 random drink items together using axios.all option
         */
        let endpoints = [];
        // create endpoint list
        for (let i = 0; i < 5; i++) {
            endpoints.push(`${apiBaseUrl}/${urlPath}`)
        }
        // fetching data
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(function (response) {
            dispatch(getItemsResponse(response));
        }).catch(function (error) {
            dispatch(handleError(error.message));
        });
    } catch (err) {
        dispatch(handleError(err.message));
    }
};

/**
 * search drinks by keyword
 */
export const searchItem = (keyword) => async (dispatch) => {
    let urlPath = `search.php`;
    try {
        dispatch(getItems());
        // fetching data with keyword
        axios.get(`${apiBaseUrl}/${urlPath}`, {
            params: {
                s: keyword
            }
        }).then(function (response) {
            dispatch(getSearchResponse(response.data.drinks));
        }).catch(function (error) {
            dispatch(handleError(error.message));
        })
    } catch (err) {
        dispatch(handleError(err.message));
    }
};

export const setKeyword = (keyword) => async (dispatch) => {
    dispatch(setSearchKeyword(keyword));
}

/**
 * add drink item to favourite list
 */
export const addFavouriteItem = (item) => async (dispatch) => {
    dispatch(addFavourite(item));
}

/**
 * remove drink item from favourite list
 */
export const removeFavouriteItem = (id) => async (dispatch) => {
    dispatch(removeFavourite(id));
}

export const { getItems, getItemsResponse, getSearchResponse, handleError, clearError, setSearchKeyword, 
    addFavourite, removeFavourite, clearSuccess } = itemSlice.actions;
export default itemSlice.reducer;