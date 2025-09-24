import {createSlice, nanoid} from "@reduxjs/toolkit";
import { getComments, deleteComment, addComment, editComment } from "../action/actions";
import {toast} from "react-toastify";

const savedLikes = localStorage.getItem("likedComments");

interface StateRoot {
    data: any[];
    loading: {
        dataLoading: boolean;
        deleteLoading: boolean;
        addLoading: boolean;
        editLoading: boolean;
    };
    error: string;
    likedComments:  any[],
}

const initialState: StateRoot = {
    data: [],

    loading: {
        dataLoading: false,
        deleteLoading: true,
        addLoading: true,
        editLoading: false,
    },

    error: "",
    likedComments: savedLikes ? JSON.parse(savedLikes) : [],
};

const dataSlice = createSlice({
    name: "comments",
    initialState,

    reducers: {
        onLikedComment(state, action) {
            const comment = action.payload;
            const exists = state.likedComments.find(c => c.id === comment.id);

            if (exists) {
                state.likedComments = state.likedComments.filter(c => c.id !== comment.id);
            } else {
                state.likedComments.push(comment);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.loading.dataLoading = true;
                state.error = "";
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading.dataLoading = false;
                state.data = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading.dataLoading = false;
                state.error =
                    (action.payload as string) || "Something went wrong";
            })

            // DELETE COMMENT
            .addCase(deleteComment.pending, (state) => {
                state.loading.deleteLoading = true;
            })

            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading.deleteLoading = false;
                toast.success("Comment deleted");
                state.data = state.data.filter((comment) => comment.id !== action.payload);
            })

            .addCase(deleteComment.rejected, (state) => {
                state.loading.deleteLoading = false;
                toast.error("An error occurred");
            })
            // ADD COMMENT

            .addCase(addComment.pending, (state) => {
                state.loading.addLoading = true;
            })

            .addCase(addComment.fulfilled, (state, action) => {
                state.loading.addLoading = false;
                toast.success("Comment added");

                const newComment =  {
                  ...action.payload,
                    id: nanoid(),
                }

                state.data.unshift(newComment);
            })

            .addCase(addComment.rejected, (state) => {
                state.loading.addLoading = false;
                toast.error("An error occurred");
            })

            // EDIT COMMENT

            .addCase(editComment.pending, (state) => {
                state.loading.editLoading = true;
            })

            .addCase(editComment.fulfilled, (state, action) => {
                state.loading.editLoading = false;
                toast.success("Comment edited");
                state.data = state.data.map(comment =>
                    comment.id === action.payload.id ? action.payload : comment
                );
            })

            .addCase(editComment.rejected, (state) => {
                state.loading.editLoading = false;
                toast.error("An error occurred");
            })
    },
});

export const {onLikedComment} = dataSlice.actions;
export default dataSlice.reducer;
