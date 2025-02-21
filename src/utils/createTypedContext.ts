import { createContext, useContext } from "react";

export interface ICreateContextOptions {
  strict?: boolean;
  errorMessage?: string;
  name?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Utilities for creating typed React contexts
 * Idea borrowed from Chakra UI
 */

export function createTypedContext<ContextType>(
  options: ICreateContextOptions = {}
) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name,
  } = options;

  const Context = createContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  function useTypedContext() {
    const context = useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [
    Context.Provider,
    useTypedContext,
    Context,
  ] as CreateContextReturn<ContextType>;
}
