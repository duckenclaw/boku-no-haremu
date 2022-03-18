import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { WaxJS } from "@waxio/waxjs/dist";

const context = createContext<WaxContextValue | null>(null);
context.displayName = "WaxContext";

type WaxContextValue = {
  login: () => Promise<void>;
  isConnected: boolean;
} & WaxContextState;

type WaxContextState =
  | {
      isLoading: true;

      wax: null;
    }
  | {
      isLoading: false;
      wax: WaxJS;
    };

const initer = () =>
  ({
    isLoading: true,
    wax: null,
  } as WaxContextState);

export const WaxProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<WaxContextState>(initer);
  useEffect(() => {
    const wax = new WaxJS({
      rpcEndpoint: "https://wax.greymass.com",
      tryAutoLogin: false,
    });
    setState({
      isLoading: false,
      wax,
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      isConnected: !!state.wax?.user,
      login: () =>
        state.wax?.login().then(() => setState((s) => ({ ...s }))) ??
        Promise.resolve(),
    }),
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      state,
      state.wax,
    ]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useWax = () => {
  const r = useContext(context);
  if (!r) throw new Error("useWax was used outside of WaxProvider");
  return r;
};
