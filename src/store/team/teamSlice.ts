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
    resetTeam: () => initialState,
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
  "team/teamCreation",
  async (teamName: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const newTeam = await api.post("/projects", {
        name: teamName.toLowerCase().trim(),
        slug: teamName.toLowerCase().trim().replace(/\s+/g, "-"),
      });
      dispatch(getTeams());
      return newTeam.data.data.id;
    } catch (err) {
      toast.error("Error creating project");
      return false;
    }
  }
);

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const projects = await api.get("/projects");
      const teamList = projects.data.data.map((team: any) => {
        return {
          name: team.name,
          slug: team.slug,
          id: team.id,
          permissions: [],
          activeSubscription: team.activeSubscription === null ? false : true,
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
  "team/teamCreation",
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
              activeSubscription:
                result.activeSubscription === null ? false : true,
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
  "team/deleteTeam",
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
  "team/acceptInvite",
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
  "team/inviteMember",
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

export const deleteMember = createAsyncThunk("team/deleteMember", async (memberId: string, { getState, dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/projects/users/${memberId}`);
    toast.success("Member removed");
    return true;
  } catch (err: any) {
    console.log(err.response.data.message);

    toast.error(err.response.data.message);
    return false;
  }
 })

export const getTeamMembers = createAsyncThunk(
  "team/getTeamMembers",
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
  "team/fetchTeamMembers",
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

export const { resetTeam, setTeamItems, setTeamId, setCurrentTeam } = teamSlice.actions;

export default teamSlice.reducer;
