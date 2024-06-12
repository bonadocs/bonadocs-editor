import { Option } from "@/data/dataTypes";
import { CollectionDataManager } from "@bonadocs/core";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface PackageState {
  name: string;
  version: string;
  versionList: Option[];
}

interface PackageDetails {
  versions: Array<PackageState>;
  currentVersion: string;
}

interface UpdatePackageVersion {
  collection: CollectionDataManager;
  packageVersion: string;
}

const initialState = {
  writeMethod: false as boolean,
  collectionPackages: [
    { name: "ethers", version: "", versionList: [] },
  ] as Array<PackageState>,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setCurrentPackage: (state, action: PayloadAction<string>) => {
      state.collectionPackages[0].version = action.payload;
    },
    setCurrentPackageVersion: (state, action: PayloadAction<string>) => {
      state.collectionPackages[0].version = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLatestEthersVersion.pending, () => {})
      .addCase(
        getLatestEthersVersion.fulfilled,
        (state, action: PayloadAction<PackageDetails | any>) => {
          if (action.payload) {
            const versions = action.payload;
            state.collectionPackages[0].versionList = versions.map(
              (item: any) => ({
                label: item.version,
                value: item.version,
              })
            );
          }
        }
      );

    builder
      .addCase(setCurrentPackageVersion.pending, () => {})
      .addCase(
        setCurrentPackageVersion.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.collectionPackages[0].version = action.payload!;
        }
      );
  },
});

export const setCurrentPackageVersion = createAsyncThunk(
  "package/setCurrentPackageVersion",
  async (updatePackageVersion: UpdatePackageVersion, thunkAPI) => {
    const { collection, packageVersion } = updatePackageVersion;
    const state = thunkAPI.getState() as any;
    const packageName = state.package.collectionPackages[0].name;
    try {
      await collection.valueManagerView.removeLibrary(
        "js",
        `${packageName}@${state.package.collectionPackages[0].version}`
      );
      await collection.valueManagerView.addLibrary(
        "js",
        `${packageName}@${packageVersion}`
      );
      return packageVersion;
    } catch (error) {
      console.error("Error updating package version:", error);
      toast.error("Error updating package version");
    }
  }
);

export const getLatestEthersVersion = createAsyncThunk(
  "package/getLatestEthersVersion",
  async (collection: CollectionDataManager, { dispatch }) => {
    const regex = /^([^@]+)@(.+)$/;

    let currentVersion;
    collection.valueManagerView.getLibraries("js").find((library) => {
      const matches = library.match(regex);

      if (matches && matches[1] === "ethers") {
        currentVersion = matches[2];
      }
    });
    const packageName = "ethers";
    try {
      const response = await fetch(
        `https://data.jsdelivr.com/v1/packages/npm/${packageName}`
      );
      const data = await response.json();

      const versions = data["versions"];
      console.log('currentVersion', currentVersion);
      
      if (currentVersion) {
        await collection.valueManagerView.addLibrary(
          "js",
          `${packageName}@${currentVersion}`
        );
        dispatch(setCurrentPackage(currentVersion));
      } else {
        await collection.valueManagerView.addLibrary(
          "js",
          `${packageName}@${versions[0].version.slice()}`
        );
        dispatch(setCurrentPackage(versions[0].version.slice()));
      }

      return versions;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

export const { setCurrentPackage } = packageSlice.actions;

export default packageSlice.reducer;
