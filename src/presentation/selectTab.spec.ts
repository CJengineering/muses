import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector} from '../app/hooks'
import {TableState, initialState, pendingTableSelected } from 'src/features/table/tableSlice'

const rootReducer = combineReducers({tableSlice: ()=>initialState})
const store = configureStore({reducer: rootReducer})
const createPresentation = (state: TableState)=>{return {status : state.status}}
it ("should select table pending tab", ()=>{
    const dispatch = store.dispatch
    // const presentation = presentationSelector()
    dispatch(pendingTableSelected())
    
    const presentation = createPresentation(store.getState().tableSlice)
    expect(presentation).toEqual({status: "pending"})
})
it ("should select table archived tab", ()=>{
    const dispatch = store.dispatch
    // const presentation = presentationSelector()
    dispatch(archivedTableSelected())
    
    const presentation = createPresentation(store.getState().tableSlice)
    expect(presentation).toEqual({status: "archived"})
})

