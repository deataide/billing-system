import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '.';

export const useAuth = () => {
let context = useContext(AuthContext)

return context

};
