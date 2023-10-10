import { atom, useAtom } from "jotai";

export const jotaiState = atom({
  count: 0
})

export const useJotaiState = () => useAtom(jotaiState);

export default useJotaiState;
