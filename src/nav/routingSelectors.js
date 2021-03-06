export const getInitialRoutes = (accounts: any[]): string => {
  const activeAccount = accounts[0];

  if (activeAccount && activeAccount.apiKey) {
    return ['main'];
  }

  if (accounts.length > 1) return ['account'];
  return ['realm'];
};

export const getCurrentRoute = (state) =>
  state.nav.routes[state.nav.index];
