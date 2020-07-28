import { connect } from 'react-redux'
import Item1 from '../../images/sylveon.png'
import Item2 from '../../images/clefable.png'
import Item1S from '../../images/sylveonshiny.png'
import Item2S from '../../images/clefableshiny.png'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY, END_BUY } from '../actions/action-types/cart-actions'

const initState = {
    addedItems:[],
    total: 0,
    compraFinalizada : false,

}

const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            existed_item.quantidade += 1 
             return{
                ...state,
                addedItems: [...state.addedItems],
                 total: state.total + existed_item.id
                  }
        }
         else{
             
            let addedItem = {id:action.id,quantidade:1}
            
            //calculating the total
            let newTotal = state.total + addedItem.id 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.id * itemToRemove.quantidade )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if(action.type=== ADD_QUANTITY){
        let addedItem = state.addedItems.find(item=> item.id === action.id)
          addedItem.quantidade += 1 
          let newTotal = state.total + addedItem.id
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.addedItems.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantidade === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.id
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantidade -= 1
            let newTotal = state.total - addedItem.id
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    
    if(action.type=== END_BUY){  
        console.log(state.compraFinalizada)
        return{
            ...state,
            addedItems : [],
            compraFinalizada : !state.compraFinalizada
        }
        
    }
    return state
}

export default cartReducer