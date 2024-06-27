import {
  buildCreateSlice,
  asyncThunkCreator,
  createAction,
  createAsyncThunk,
  PayloadAction,
} from "../redux-toolkit/packages/toolkit/src/index.ts";

createAsyncThunk("xx", async () => {}, {
  condition: () => {
    return true;
  },
});
const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

interface Slice {
  value: number;
  list: string[];
}
const initialState: Slice = {
  value: 0,
  list: [],
};

const extraDecrement = createAction("counter/extraDecrement");

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: (create) => {
    return {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload;
      },
      asyncFetch: create.asyncThunk(
        async (args, { getState, dispatch }) => {
          const state = getState();
          return new Promise<any[]>((res) => {
            setTimeout(() => {
              res([1, 2, 3, 4]);
            }, 1000);
          });
        },
        {
          fulfilled: (state, action) => {
            console.log(state, action);
            state.list = action.payload;
          },
        }
      ),
    };
  },
  extraReducers: (builder) => {
    builder.addCase(extraDecrement, (state) => {
      state.value -= 1;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, asyncFetch } =
  counterSlice.actions;

export default counterSlice.reducer;
console.log("redux-toolkit", "app", "actions", counterSlice.actions);
console.log("redux-toolkit", "app", "reducer", counterSlice.reducer);
