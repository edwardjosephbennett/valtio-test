"use client";

import styles from './page.module.css';
import { useSnapshot } from "valtio";
import { valtioState, useZustandStore, useJotaiState } from "@valtio-test/state"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const defaultPage = () => {
  // Valtio state
  const snap = useSnapshot(valtioState);

  // Zustand state
  const { count, increaseCounter } = useZustandStore();

  // Jotai state
  const [jotai, setJotai] = useJotaiState();

  const ValtioCodeString = `
    // Valtio needs to be used client side in Next.js 13+
    "use client";

    import { proxy, useSnapshot } from "valtio";

    // Declare state outside of components
    const valtioState = { count: 0 };

    // Create a component and modify the state from inside it
    const Button = () => {
        // Use the read only version of state to output the data
        const stateObject = useSnapshot(valtioState);

        // Return a button component
        return (
            <>
              <h1>Button clicked {stateObject.count} times</h1>
              <button onClick={() => ++valtioState.count} />Click Me</button>
            </>
        )
    }
  `;

  const ZustandCodeString = `
    import { create } from "zustand";

    export interface ZustandStoreState {
      count: number;
      increaseCounter: () => void;
    }
    export const useZustandStore = create<ZustandStoreState>()((set) => ({
      count: 0,
      increaseCounter: () => set((state) => ({count: state.count + 1}))
    }))

    // Create a component and modify the state from inside it
    const Button = () => {
        // Grab the state values from the hook
        const { count, increaseCounter } = useZustandStore();

        // Return a button component
        return (
            <>
              <h1>Button has been clicked {count} times</h1>
              <button className={styles.button} onClick={() => increaseCounter()}>Click Me</button>
            </>
        )
    }
  `;

  const JotaiCodeString = `
    import { atom, useAtom } from "jotai";

    const jotaiState = atom({
      count: 0
    })

    const useJotaiState = () => useAtom(jotaiState);

    // Jotai state
    const [jotai, setJotai] = useJotaiState();

    // Create a component and modify the state from inside it
    const Button = () => {
        // Return a button component
        return (
            <>
              <h1>Button has been clicked {jotai.count} times</h1>
              <button onClick={() => setJotai((prev) => ({ count: prev.count + 1}))}>Click Me</button>
            </>
        )
    }
  `;

  return (
    <>
      <div style={{padding: "10px", border: "1px solid black", background: "rgba(0,0,0,0.1)"}}>
        <span className={styles.stateLabel}>Valtio State Setting</span>
        <h1>Button has been clicked { snap.count } times</h1>

        <button className={styles.button} onClick={(e) => {
          ++valtioState.count;
        }}>Click Me</button>

        <SyntaxHighlighter language={"tsx"} style={oneDark}>
          {ValtioCodeString}
        </SyntaxHighlighter>
      </div>
      <div style={{padding: "10px", border: "1px solid black", background: "rgba(100,100,200,0.4)"}}>
        <span className={styles.stateLabel}>Zustand State Setting</span>
        <h1>Button has been clicked {count} times</h1>

        <button className={styles.button} onClick={() => increaseCounter()}>Click Me</button>

        <SyntaxHighlighter language={"tsx"} style={oneDark}>
          {ZustandCodeString}
        </SyntaxHighlighter>
      </div>
      <div style={{padding: "10px", border: "1px solid black", background: "rgba(100,200,200,0.4)"}}>
        <span className={styles.stateLabel}>Jotai State Setting</span>
        <h1>Button has been clicked {jotai.count} times</h1>

        <button className={styles.button} onClick={() => setJotai((prev) => ({ count: prev.count + 1}))}>Click Me</button>

        <SyntaxHighlighter language={"tsx"} style={oneDark}>
          {JotaiCodeString}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default defaultPage;
