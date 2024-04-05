"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import { Collection, CollectionDataManager } from "@bonadocs/core";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import { fetchCollectionContracts } from "@/store/contract/contractSlice";
import { openDB } from "idb";
import { fetchCollectionVariables } from "@/store/variable/variableSlice";

// Create the context props
interface CollectionContextProps {
  initializeEditor: (uri: string) => Promise<CollectionDataManager>; // Update the type to include Promise
  collection: CollectionDataManager | null;
  getCollection: () => CollectionDataManager | null;
}

// Create the context
const CollectionContext = createContext<CollectionContextProps | undefined>(
  undefined
);

// Create a custom hook to consume the context
export const useCollectionContext = (): CollectionContextProps => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

interface CollectionProviderProps {
  children: React.ReactNode;
}
// Create the provider component
export const CollectionProvider: React.FC<CollectionProviderProps> = ({
  children,
}) => {
  const collectionRef = useRef<CollectionDataManager | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loadCollection = async (uri: string) => {
    try {
      const collectionState = await checkLocalCollection(uri);
      if (collectionState) {
        const collectionIndex = (await openDB("collections", 1))
          .objectStoreNames[0];

        const collection = await Collection.createFromLocalStore(
          collectionIndex
        );

        collectionRef.current = collection.manager;
      } else {
        const dbs = await window.indexedDB.databases();
        dbs.forEach((db) => {
          if (db.name) {
            window.indexedDB.deleteDatabase(db.name);
          }
        });
        const collection = await Collection.createFromIPFS(uri);

        await collection.manager.saveToLocal();
        collectionRef.current = collection.manager;
      }
    } catch (err) {}
  };

  const checkLocalCollection = async (uri: string) => {
    try {
      const db = await openDB("metadata", 1);
      const store = db.transaction("index").objectStore("index");

      const metadataKey = uri.slice(0, 4) + "-data:" + uri.slice(7);
      const value = await store.get(metadataKey);
      const collectionIndex = (await openDB("collections", 1))
        .objectStoreNames[0];
      const isValuePresent = value && collectionIndex ? true : false;
      return isValuePresent;
    } catch (err) {
      return false;
    }
  };

  const getCollection = () => collectionRef.current;
  const initializeEditor = async (uri: string) => {
    await loadCollection(uri);
    if (!collectionRef.current) {
      throw new Error("Collection not loaded");
    }
    dispatch(fetchCollectionContracts(collectionRef.current));
    dispatch(fetchCollectionVariables(collectionRef.current));

    return collectionRef.current;
  };

  return (
    <CollectionContext.Provider
      value={{
        initializeEditor: initializeEditor,
        collection: collectionRef.current,
        getCollection: getCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
