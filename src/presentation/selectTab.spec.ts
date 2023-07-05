import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {TableState, initialState, pendingTableSelected , archivedTableSelected} from 'src/features/table/tableSlice'
import tableReducer from "src/features/table/tableSlice";

//const rootReducer = combineReducers({tableSlice: ()=>initialState})
const rootReducer = combineReducers({
    tableSlice: tableReducer
  });
  
import {store} from "../app/store";
const storeBruno = configureStore({reducer: rootReducer})

const createPresentation = (state: TableState)=>{return {status : state.status}}
it ("should select table pending tab", ()=>{
    const dispatch = storeBruno.dispatch
    // const presentation = presentationSelector()
    //dispatch(pendingTableSelected())
    
    const presentation = createPresentation(storeBruno.getState().tableSlice)
    expect(presentation).toEqual({status: "pending"})
})
it ("should select table archived tab", ()=>{
    const dispatch = storeBruno.dispatch
    // const presentation = presentationSelector()
    dispatch(archivedTableSelected())
    
    const presentation = createPresentation(storeBruno.getState().tableSlice)
    expect(presentation).toEqual({status: "archived"})
})



