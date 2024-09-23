import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/utils/axios";
import { TeamItem, TeamInvite } from "@/data/dataTypes";
import { auth } from "@/utils/firebase.utils";

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
      state.currentTeam.id = action.payload.toString();
    },
    setCurrentTeam: (state, action: PayloadAction<TeamItem>) => {
      state.currentTeam = action.payload;
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
  "project/getTeams",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const projects = await api.get("/projects");
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
      toast.error("Error listing projects");
      return false;
    }
  }
);

export const getTeamById = createAsyncThunk(
  "project/teamCreation",
  async (projectId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const projects = await api.get(`/projects/${projectId}`);

      const result = projects.data.data;

      if (projects.data.data) {
        if (auth.currentUser !== null) {
          const profileEmail = auth.currentUser?.email!;

          if (profileEmail) {
            const permissions = projects.data.data["users"].find(
              (user: any) => user.emailAddress === profileEmail
            ).permissions;

            const currentTeam = {
              name: result.name,
              slug: result.slug,
              id: result.id,
              permissions,
            };

            dispatch(setCurrentTeam(currentTeam));
          }
        }
      }
      return result;
    } catch (err) {
      toast.error("Error listing project");
      console.log(err);

      return false;
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "project/deleteTeam",
  async (projectId: string, { dispatch }) => {
    try {
      await api.delete(`/projects/${projectId}`);
      dispatch(getTeams());
      return true;
    } catch (err) {
      toast.error("Error deleting project");
      return false;
    }
  }
);

export const acceptInvite = createAsyncThunk(
  "project/acceptInvite",
  async (inviteToken: string, {}) => {
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

export const getTeamMembers = createAsyncThunk(
  "project/getTeamMembers",
  async (projectId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const members = await api.get(`/projects/${projectId}/users`);

      return members.data.data;
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      return false;
    }
  }
);

export const fetchTeamMembers = createAsyncThunk(
  "project/fetchTeamMembers",
  async (projectId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const members = await api.get(`/projects/${projectId}/invitations`);

      return members.data.data;
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      return false;
    }
  }
);

export const { setTeamItems, setTeamId, setCurrentTeam } = teamSlice.actions;

export default teamSlice.reducer;
