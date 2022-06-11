import React, { createContext } from "react";
import { useEffect } from "react";
import { useAuthHook } from "../hooks/useAuthHook";
import { useCalendarHook } from "../hooks/useCalendarHook";


const Context = createContext({});

function AppContext(props) {
  const { events, isLoading, getEvents, create, edit, removed } = useCalendarHook();
  const { login, logout, register, loading, user } = useAuthHook();

  useEffect(() => {
    if (events.length <= 0) {
      getEvents();
    }
  }, []);

  return (
    <Context.Provider
      value={{
        auth:{
          login,
          logout,
          register,
          user,
          loading,
        },
        calendar: {
          events,
          create,
          edit,
          removed,
          isLoading,
        }
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, AppContext };
