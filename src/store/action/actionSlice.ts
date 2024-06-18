import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionItem } from "@/data/dataTypes";
import { CodeSnippet, CollectionDataManager } from "@bonadocs/core";
import { PayloadAction } from "@reduxjs/toolkit";
import { WorkflowItem, WorkflowCodeItem } from "@/data/dataTypes";
import { setCloudIcon } from "../controlBoard/controlBoardSlice";
import { toast } from "react-toastify";
import _ from "lodash";

const initialState = {
  collectionActions: [] as Array<ActionItem>,
  currentAction: {} as ActionItem,
  loader: false,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setActiveAction: (state, action: PayloadAction<ActionItem>) => {
      state.currentAction = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionActions.pending, () => {})
      .addCase(
        getCollectionActions.fulfilled,
        (state, action: PayloadAction<any>) => {

          state.collectionActions = action.payload;
        }
      );

    builder
      .addCase(deleteWorkflowAction.pending, () => {})
      .addCase(deleteWorkflowAction.fulfilled, (state) => {

        state.currentAction = {} as ActionItem;
      });

    builder
      .addCase(renameWorkflowAction.pending, () => {})
      .addCase(
        renameWorkflowAction.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          const newWorkflowName = action.payload;
          state.currentAction = {
            ...state.currentAction,
            name: newWorkflowName!,
          };
        }
      );

    builder
      .addCase(updateWorkflowActionCode.pending, () => {})
      .addCase(
        updateWorkflowActionCode.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          const code = action.payload;
          state.currentAction = {
            ...state.currentAction,
            code: [
              {
                language: state.currentAction.code[0].language,
                code: code!,
              },
            ],
          };
        }
      );

    builder
      .addCase(updateWorkflowActionDocs.pending, () => {})
      .addCase(
        updateWorkflowActionDocs.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          const docs = action.payload;
          state.currentAction = {
            ...state.currentAction,
            documentation: docs,
          };
        }
      );
  },
});

export const getCollectionActions = createAsyncThunk(
  "action/getCollectionActions",
  async (params: CollectionDataManager) => {
    const collection = params;
    const workflowList = Array.from(collection.workflowManagerView.workflows);
    const collectionActions: Array<ActionItem> = [];
    let documentation: any;

    for (const workflow of workflowList) {
      documentation = await collection.workflowManagerView.getDocText(
        workflow.id
      );

      collectionActions.push({
        id: workflow.id,
        name: workflow.name,
        documentation: documentation ?? "",
        code: (workflow.execution as CodeSnippet[]).map((c) => ({
          language: c.language,
          code: c.code,
        })),
      });
    }

    return collectionActions;
  }
);

export const createWorkflowAction = createAsyncThunk(
  "action/createWorkflowAction",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowName } = setWorkflowParams;

    try {
      await collection.workflowManagerView.addWorkflow({
        id: `00${Math.floor(Math.random() * 1000)}`,
        name: workflowName?.replace(/\s+/g, '')!,
        variables: [
          {
            name: "var1",
            value: "qwerty",
          },
        ],
        execution: [
          {
            code: "// write your action in javascript",
            language: "js",
          },
        ],
      });
      await collection.workflowManagerView.setDocText(
        `00${Math.floor(Math.random() * 1000)}`,
        workflowName?.trim()!
      );
      dispatch(getCollectionActions(collection));
    } catch (err) {
      console.log(err, "error creating action");
      toast.error("error creating action");
    }
  }
);

export const updateWorkflowActionDocs = createAsyncThunk(
  "action/updateWorkflowActionDocs",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowId, workflowDocs } = setWorkflowParams;

    try {
      await collection.workflowManagerView.setDocText(
        workflowId!,
        workflowDocs!
      );

      dispatch(getCollectionActions(collection));
      return workflowDocs;
    } catch (err) {
      toast.error(`${err} Error updating action docs`);
    }
  }
);

export const updateWorkflowActionCode = createAsyncThunk(
  "action/updateWorkflowActionCode",
  async (setWorkflowCodeParams: WorkflowCodeItem, { dispatch }) => {
    const { collection, workflowId, code } = setWorkflowCodeParams;
    try {
      await collection.workflowManagerView.setWorkflowCode(
        workflowId,
        "js",
        code
      );
      setCloudIcon(false);
     

      dispatch(getCollectionActions(collection));
      return code;
    } catch (err) {
      setCloudIcon(true);
      toast.error(`${err} Error updating action code`);
    }
  }
);

export const renameWorkflowAction = createAsyncThunk(
  "action/renameWorkflowAction",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowId, workflowName } = setWorkflowParams;

    try {
      await collection.workflowManagerView.renameWorkflow(
        workflowId!,
        workflowName?.replace(/\s+/g, "")!
      );
      dispatch(getCollectionActions(collection));
      toast.success(`Successfully renamed action`);
      return workflowName!;
    } catch (err) {
      toast.error(`${err} Error renaming action`);
    }
  }
);

export const deleteWorkflowAction = createAsyncThunk(
  "action/deleteWorkflowAction",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowId } = setWorkflowParams;

    try {
      await collection.workflowManagerView.removeWorkflow(workflowId!);
      dispatch(getCollectionActions(collection));
      toast.success(`Successfully deleted action`);
    } catch (err) {
      toast.error(`${err} Error deleting action`);
    }
  }
);
export const { setActiveAction, setLoader } = actionSlice.actions;

export default actionSlice.reducer;
