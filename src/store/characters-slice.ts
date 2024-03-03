import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { CharacterList } from "../interface/CharacterList";

const initialState={
    characterList:[] as CharacterList[] ,
}

const characterSlice=createSlice({
    name:'characters',
    initialState,
    reducers:{
        getCharacterList:(state,action:PayloadAction<CharacterList>)=>{
            state.characterList.push(action.payload);
        },
        setCharacterList:(state)=>{
             state.characterList.length=0;
        }
    }
});

export default  characterSlice.reducer;
export const {getCharacterList, setCharacterList}=characterSlice.actions;