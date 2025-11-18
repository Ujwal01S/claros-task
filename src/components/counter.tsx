import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "@/store/slices/counter-slice";

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Counter: {count}</h2>
      <div style={{ gap: "1rem", margin: "1rem 0" }}>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      </div>
    </div>
  );
};

export default Counter;
