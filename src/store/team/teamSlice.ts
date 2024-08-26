import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/utils/axios";
import { TeamItem, TeamInvite } from "@/data/dataTypes";

const initialState = {
  teamList: [] as TeamItem[],
  currentTeam: {} as TeamItem,
};

const teamSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    // reset: () => initialState,
    setTeamId: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      state.currentTeam.id = action.payload.toString();
    },
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
          id: team.id,
          permissions: [],
        };
      });
      dispatch(setTeamItems(teamList));
    } catch (err) {
      toast.error("Error listing project");
      return false;
    }
  }
);

export const acceptInvite = createAsyncThunk(
  "project/acceptInvite",
  async (inviteToken: string, { getState, dispatch, rejectWithValue }) => {
    try {
      await api.get(`/projects/accept-invitation?token=${inviteToken}`);
      toast.success("Invitation accepted");
      return true;
    } catch (err: any) {
      console.log(err.response.data.message);

      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const inviteMember = createAsyncThunk(
  "project/inviteMember",
  async (inviteParam: TeamInvite, { getState, dispatch, rejectWithValue }) => {
    try {
      await api.post(`/projects/${inviteParam.projectId}/invitations`, {
        memberName: inviteParam.name,
        emailAddress: inviteParam.email,
        permissions: inviteParam.permission,
      });
      toast.success(`Invitation sent to ${inviteParam.name}`);
      return true;
    } catch (err: any) {
      console.log(err.response.data.message);

      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const fetchTeamMembers = createAsyncThunk(
  "project/fetchTeamMembers",
  async (projectId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const members = await api.get(`/projects/${projectId}/invitations`);
      console.log(members.data.data);
      return members.data.data;
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      return false;
    }
  }
);

export const { setTeamItems, setTeamId } = teamSlice.actions;

export default teamSlice.reducer;
