import {createAsyncThunk} from "@reduxjs/toolkit";
import ApiClient from "../../api/api";

export const getComments = createAsyncThunk(
    "GET_COMMENTS",
    (async (_, thunkApi) => {
        try {
            const response = await ApiClient.getComments();
            return response;
        }catch(err) {
            return thunkApi.rejectWithValue(err);
        }
    })
)


export const deleteComment = createAsyncThunk(
    "DELETE_COMMENT",
    async (id: number, thunkApi) => {
        try {
            const response = await ApiClient.deleteComment(id);
            return response;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const addComment = createAsyncThunk(
    "ADD_COMMENT",
    async (addFormData: {name:string, email:string, body:string}, thunkApi) => {
        try {
            const response = await ApiClient.addComment(addFormData);
            return response;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const editComment = createAsyncThunk(
    "EDIT_COMMENT",
    async (editData: {id:number, name:string, email:string, body:string}, thunkApi) => {
        try {
            const response = await ApiClient.editComment(editData);
            return response;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);