import { createSlice } from "@reduxjs/toolkit";
//import { useNavigate } from "react-router-dom";

//let navigate = useNavigate();

const e = () => {
    localStorage.clear();
    alert("Adios !");
    //navigate("/");
}

const initialState = {
    exit: e
}

export const exitSlice = createSlice({
    name: "exit",
    initialState,
    reducers: {
        getExit: (state) => {
            //immer
            state.exit();
        }

    }
});

export const { getExit } = exitSlice.actions;
export default exitSlice.reducer;