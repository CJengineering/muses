import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useState, useEffect } from 'react';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useUpdateArchive = () => {
    const updateArchive = async (id :number) => {
      const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`;
      const body = JSON.stringify({ category_label: 'archived' });

      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });

        if (!response.ok) {
          throw new Error('Failed to update archive');
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    return { updateArchive }; 
  };

  export const useUpdateShortlist = () => {
    const updateShortlist = async (id :number) => {
      const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`;
      const body = JSON.stringify({ category_label: 'shortlist' });
  
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
  
        if (!response.ok) {
          throw new Error('Failed to update archive');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return { updateShortlist }; 
  };

  export const useAnalyzer = ()=>{
    const handleAnalyser = async (id: number) => {
      
        const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/analyzer_new?id=${id}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
          }
        } catch (error) {
          console.error(error);
        } 
      };
      return {handleAnalyser}
  }

  export const useWebflow= ()=>{
    const handleWebflow = async (link: string, id:number) => {
     
        const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/article_creator?link=${link}&id=${id}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status == 204) {
          
          }
        } catch (error) {
          console.error(error);
        } finally {
       
        }
      };
      return {handleWebflow}
    }
  