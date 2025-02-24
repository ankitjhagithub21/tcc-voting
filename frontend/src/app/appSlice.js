import { createSlice } from '@reduxjs/toolkit'


export const appSlice = createSlice({
  name: 'app',
  initialState:{
    user:null,
    votes:null,
    isLoading:true,

  },
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload
    },
    setVotes:(state,action)=>{
      state.votes = action.payload
    },
    setIsLoading:(state,action)=>{
      state.isLoading = action.payload
    },
    
  },
})


export const { setUser,setVotes,setIsLoading } = appSlice.actions

export default appSlice.reducer