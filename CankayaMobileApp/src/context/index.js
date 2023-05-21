import {createContext, useContext, useEffect, useState} from "react";

const Context = createContext({
    state: {},
    setState: f => f
});

const AppContext = ({ children }) => {
    const [state, setState] = useState({});

    return (
        <Context.Provider value={{state, setState}}>
            {children}
        </Context.Provider>
    );
};

export const useUser = () => {
    const { state, setState } = useContext(Context);

    return {
        user: state.user,
        setUser: user => setState(prevState => ({...prevState, user}))
    }
};

export default AppContext;
