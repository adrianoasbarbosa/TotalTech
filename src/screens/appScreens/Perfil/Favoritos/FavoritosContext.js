import React, { createContext, useState } from 'react';
 

export const FavoritosContext = createContext();
 

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
 
 
  const toggleFavorito = (item) => {
    setFavoritos((prevFavoritos) => {
     
if (prevFavoritos.some(fav => fav.id === item.id)) {
        
return prevFavoritos.filter(fav => fav.id !== item.id);
      } else {
        
        return [...prevFavoritos, item];
      }
    });
  };
 
  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};