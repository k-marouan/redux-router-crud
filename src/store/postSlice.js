import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, record: null };

// Read Posts
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetch("http://localhost:3007/posts");
            const data = await res.json();
            return data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// get Post
export const getPost = createAsyncThunk(
    "posts/getPost",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetch(`http://localhost:3007/posts/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete Post
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await fetch(`http://localhost:3007/posts/${id}`, {
                method: "DELETE",
            });
            return id;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Insert Post
export const insertPost = createAsyncThunk(
    "posts/insertPost",
    async (item, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { auth } = getState();
        console.log(auth); // Object { id: 1, isLoggedIn: true }
        item.user_id = auth.id;
        console.log(item); // Object { id: 125, title: "test", description: "test", user_id: 1 }
        try {
            const res = await fetch(`http://localhost:3007/posts/`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            return data; // payload
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update Post
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (item, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetch(`http://localhost:3007/posts/${item.id}`, {
                method: "PATCH",
                body: JSON.stringify(item),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        },
    },
    //extraReducers: {
        // get post
        // [getPost.pending]: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // [getPost.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.record = action.payload;
        // },
        // [getPost.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        // fetch posts
        // [fetchPosts.pending]: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // [fetchPosts.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     // state.records.push(...action.payload);
        //     state.records = action.payload;
        // },
        // [fetchPosts.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },

        // create post
        // [insertPost.pending]: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // [insertPost.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.records.push(action.payload);
        // },
        // [insertPost.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },

        // delete post
        // [deletePost.pending]: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // [deletePost.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.records = state.records.filter((elt) => elt.id !== action.payload);
        // },
        // [deletePost.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },

        // // edit post
        // [updatePost.pending]: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // [updatePost.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.record = action.payload;
        // },
        // [updatePost.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    //},
    
    extraReducers: (builder) => {
         // get post
        builder.addCase(getPost.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        });
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // fetch posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
          });
          builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

        // create post
        builder.addCase(insertPost.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(insertPost.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
          });
          builder.addCase(insertPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

        // delete post
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((elt) => elt.id !== action.payload);
          });
          builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        
        // edit post
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
          });
          builder.addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
});

export const { cleanRecord } = postSlice.actions;

export default postSlice.reducer;