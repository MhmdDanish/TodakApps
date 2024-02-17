    import { createSlice } from "@reduxjs/toolkit";

    export const userSlice = createSlice({
        name: 'user',
        initialState: {
            addid:'',
            add: '',
        },
        reducers: {
            updateAdd: (state, action) => {
                state.add = action.payload;
            },
          
            updateAddId: (state, action) => {
                state.addid = action.payload;
            },
        }
    })

    export const {
    updateAdd,
    updateAddId,

   

    } = userSlice.actions

    export default userSlice.reducer