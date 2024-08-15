import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/utils/axios";
import { TeamItem } from "@/data/dataTypes";

const initialState = {
  teamList: [] as TeamItem[],
};

const teamSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    reset: () => initialState,
    setTeamItems: (state, action: PayloadAction<TeamItem[]>) => {
      state.teamList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, () => {})

      .addCase(getTeams.rejected, () => {
        throw Error;
      });
  },
});

export const teamCreation = createAsyncThunk(
  "project/teamCreation",
  async (teamName: string, { getState, dispatch, rejectWithValue }) => {
    try {
      await api.post("/projects", {
        name: teamName.trim(),
        slug: teamName.trim().replace(/\s+/g, "-"),
      });
      dispatch(getTeams());
      return teamName;
    } catch (err) {
      toast.error("Error creating project");
      return false;
    }
  }
);

export const getTeams = createAsyncThunk(
  "project/teamCreation",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const projects = await api.get("/projects");
      console.log(projects.data.data);
      const teamList = projects.data.data.map((team: any) => {
        return {
          name: team.name,
          slug: team.slug,
        };
      });
      dispatch(setTeamItems(teamList));
    } catch (err) {
      toast.error("Error listing project");
      return false;
    }
  }
);

export const { setTeamItems } = teamSlice.actions;

export default teamSlice.reducer;
