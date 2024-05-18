import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionItem } from "@/data/dataTypes";
import { CodeSnippet, CollectionDataManager } from "@bonadocs/core";
import { PayloadAction } from "@reduxjs/toolkit";
import { WorkflowItem, WorkflowCodeItem } from "@/data/dataTypes";
import { RootState } from "..";
import { toast } from "react-toastify";
import { log } from "console";

const initialState = {
  collectionActions: [] as Array<ActionItem>,
  currentAction: {} as ActionItem,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setActiveAction: (state, action: PayloadAction<ActionItem>) => {
      state.currentAction = action.payload;
    },
    getCollectionActions: (
      state,
      action: PayloadAction<CollectionDataManager>
    ) => {
      const collection = action.payload;
      const workflowList = Array.from(collection.workflowManagerView.workflows);
      const collectionActions: Array<ActionItem> = [];
      workflowList.map((workflow) => {
        collectionActions.push({
          id: workflow.id,
          name: workflow.name,
          documentation: "",
          code: workflow.execution as CodeSnippet[],
        });
      });
      console.log("collectionActions", collectionActions);
      state.collectionActions = collectionActions.slice();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteWorkflowAction.pending, () => {})
      .addCase(deleteWorkflowAction.fulfilled, (state) => {
        console.log("only run for delete");

        state.currentAction = {} as ActionItem;
      });
  },
});

export const createWorkflowAction = createAsyncThunk(
  "action/createWorkflowAction",
  async (setWorkflowParams: WorkflowItem, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { collection, workflowName } = setWorkflowParams;

    try {
      await collection.workflowManagerView.addWorkflow({
        id: `00${Math.floor(Math.random() * 1000)}`,
        name: workflowName?.trim()!,
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
      dispatch(getCollectionActions(collection));
    } catch (err) {
      console.log(err, "error creating action");
    }
  }
);

export const updateWorkflowActionDocs = createAsyncThunk(
  "action/updateWorkflowActionDocs",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowId, workflowName } = setWorkflowParams;
    console.log("workflowId", workflowId, "workflowName", workflowName);

    try {
      // await collection.workflowManagerView.renameWorkflow(
      //   workflowId!,
      //   workflowName!
      // );

      dispatch(getCollectionActions(collection));
      toast.success(`Successfully renamed action`);
    } catch (err) {
      toast.error(`${err} Error renaming action`);
    }
  }
);

export const updateWorkflowActionCode = createAsyncThunk(
  "action/updateWorkflowActionCode",
  async (setWorkflowCodeParams: WorkflowCodeItem, { dispatch }) => {
    const { collection, workflowId, code } = setWorkflowCodeParams;
    console.log("workflowId", workflowId, "code", code, "collection", collection);
    try {
      await collection.workflowManagerView.setWorkflowCode(
        workflowId,
        "js",
        code
      );
      dispatch(getCollectionActions(collection));
     
    } catch (err) {
      toast.error(`${err} Error updating action code`);
    }

    //   async setDocText(workflowId: string, text: string) {
    //   const fullKey = `docs::workflows::${workflowId}::text`
    //   await this.#valueManagerView.setString(fullKey, text)
    // }

    // async getDocText(workflowId: string) {
    //   const fullKey = `docs::workflows::${workflowId}::text`
    //   return this.#valueManagerView.getString(fullKey)
    // }
  }
);

export const renameWorkflowAction = createAsyncThunk(
  "action/updateWorkflowAction",
  async (setWorkflowParams: WorkflowItem, { dispatch }) => {
    const { collection, workflowId, workflowName } = setWorkflowParams;
    console.log("workflowId", workflowId, "workflowName", workflowName);

    try {
      await collection.workflowManagerView.renameWorkflow(
        workflowId!,
        workflowName!
      );
      dispatch(getCollectionActions(collection));
      toast.success(`Successfully renamed action`);
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
export const { setActiveAction, getCollectionActions } = actionSlice.actions;

export default actionSlice.reducer;
