import { useEffect } from "react";

export function useFetchDecks(dispatch: any, url:string) {
    let ignore = false;

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(response => {
            if(!ignore){
                
            }
        })
    
      return () => {
        ignore = true
      }
    }, [])
    
    return true;
}