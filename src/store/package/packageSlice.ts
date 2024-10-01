import { Option } from "@/data/dataTypes";
import { CollectionDataManager } from "@bonadocs/core";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface PackageState {
  name: string;
  version: string;
  versionList?: Option[];
}

interface PackageDetails {
  versions?: Array<PackageState>;
  currentVersion?: string;
  name?: string;
  collection?: CollectionDataManager;
}

interface UpdatePackageVersion {
  collection: CollectionDataManager;
  packageVersion: string;
  name: string;
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
    setPackages: (state, action: PayloadAction<Array<PackageState>>) => {
      state.collectionPackages = action.payload;
    },
    setCurrentPackageVersion: (state, action: PayloadAction<string>) => {
      state.collectionPackages[0].version = action.payload;
    },
  },
});

export const setCurrentPackageVersion = createAsyncThunk(
  "package/setCurrentPackageVersion",
  async (updatePackageVersion: UpdatePackageVersion, thunkAPI) => {
    const { collection, packageVersion, name } = updatePackageVersion;
    const state = thunkAPI.getState() as any;
    const currentPackage = state.package.collectionPackages.find(
      (item: PackageState) => item.name === name
    );
    try {
      await collection.valueManagerView.removeLibrary(
        "js",
        `${name}@${currentPackage.version}`
      );
      await collection.valueManagerView.addLibrary(
        "js",
        `${name}@${packageVersion}`
      );
      thunkAPI.dispatch(getAllPackages(collection));
    } catch (error) {
      console.error("Error updating package version:", error);
      toast.error("Error updating package version");
    }
  }
);

export const getAllPackages = createAsyncThunk(
  "package/getAllPackages",
  async (collection: CollectionDataManager, { dispatch }) => {
    const regex = /^([^@]+)@(.+)$/;

    let currentVersion: string;
    let packageName: string;
    let packageList: Array<PackageState> = [];

    collection.valueManagerView.getLibraries("js").map(async (library) => {
      const matches = library.match(regex);

      if (matches) {
        currentVersion = matches[2];
        packageName = matches[1];

        packageList.push({
          name: packageName,
          version: currentVersion,
        });
      }
    });

    if (!packageList.find((item) => item.name === "ethers")) {
      console.log("ethers not found");
      try {
        const response = await fetch(
          `https://data.jsdelivr.com/v1/packages/npm/ethers`
        );
        const data = await response.json();

        const versions = data["versions"];

        await collection.valueManagerView.addLibrary(
          "js",
          `$ethers@${versions[0].version.slice()}`
        );
        packageList.push({
          name: "ethers",
          version: versions[0].version.slice(),
        });
        console.log("ethers added");
      } catch (error) {
        console.error("Error setting custom package:", error);
        toast.error("Error setting custom package");
      }
    }

    dispatch(setPackages(packageList));
  }
);

export const addCustomPackage = createAsyncThunk(
  "package/setCustomPackage",
  async (packageDetails: PackageDetails, { dispatch }) => {
    const { name, currentVersion, collection } = packageDetails;

    try {
      await collection?.valueManagerView.addLibrary(
        "js",
        `${name}@${currentVersion}`
      );

      toast.success("Package set successfully");

      dispatch(getAllPackages(collection!));
    } catch (error) {
      console.error("Error setting custom package:", error);
      toast.error("Error setting custom package");
    }
  }
);

export const deleteCustomPackage = createAsyncThunk(
  "package/setCustomPackage",
  async (packageDetails: PackageDetails, { dispatch, getState }) => {
    const state = getState() as any;
    const { name, collection } = packageDetails;

    const currentPackage = state.package.collectionPackages.find(
      (item: PackageState) => item.name === name
    );

    try {
      await collection?.valueManagerView.removeLibrary(
        "js",
        `${name}@${currentPackage.version}`
      );
      dispatch(getAllPackages(collection!));
    } catch (error) {
      console.error("Error setting custom package:", error);
      toast.error("Error setting custom package");
    }
  }
);

export const packageVersions = createAsyncThunk(
  "package/packageVersions",
  async (packageName: string, { dispatch }) => {
    try {
      const response = await fetch(
        `https://data.jsdelivr.com/v1/packages/npm/${packageName}`
      );
      const data = await response.json();

      const versions = data["versions"];

      return versions;
    } catch (error) {
      console.error("Error setting custom package:", error);
      toast.error("Error setting custom package");
    }
  }
);

export const { setPackages } = packageSlice.actions;

export default packageSlice.reducer;
