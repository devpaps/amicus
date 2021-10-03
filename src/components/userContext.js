import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
// Memo hook is used for "remembering" the state, and only update it if it changes
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
