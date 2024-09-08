"use client";

import { init, tx, id } from "@instantdb/react";
import MapChart from "./Map";

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = "APP_ID";

// Optional: Declare your schema for intellisense!
type Schema = {
  maps: MapInfo;
};

const db = init<Schema>({ appId: APP_ID });

function App() {
  // Read Data
  const { isLoading, error, data } = db.useQuery({ maps: {} });
  if (isLoading) {
    return <div>Fetching data...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  const { maps: mapInfo } = data;
  return <MapChart mapInfo={mapInfo} />;
}

// Types
// ----------
export type MapInfo = {
  id: string;
  countryIsoCode: string;
  countryName?: string;
  title: string;
  details: string;
};

export default App;
