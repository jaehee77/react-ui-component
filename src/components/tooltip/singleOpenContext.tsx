import { createContext, Dispatch, SetStateAction } from 'react';

const SingleOpenContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);
