import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { User } from './types/types.ts';

interface ContextType {
  isAuthorized: boolean;
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const Context = createContext<ContextType>({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: {
    name: "",
    email: "",
    phone: null,
    password: "",
    role: "",
    _id: ""
  },
  setUser: () => {}
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
