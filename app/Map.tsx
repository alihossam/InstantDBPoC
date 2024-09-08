import * as React from "react";
import { useEffect, useState } from "react";
import type { CountryContext } from "react-svg-worldmap";
import WorldMap from "react-svg-worldmap";
import { MapInfo } from "./page";

export interface MapChartProps {
  mapInfo: MapInfo[];
}

export const MapChart = (props: MapChartProps) => {
  const [targetCountryCases, setTargetCountryCases] = useState<MapInfo[]>([]);
  const [mapComponentData, setMapComponentData] = useState([]);
  useEffect(() => {
    const casesPerCountry = props.mapInfo.reduce((rv, curr) => {
      (rv[curr.countryIsoCode] = rv[curr.countryIsoCode] || []).push(curr);
      return rv;
    }, {});
    setMapComponentData(
      Object.keys(casesPerCountry).map((curr) => {
        return {
          country: `${curr}`,
          value: `There are currently ${casesPerCountry[curr].length} cases in ${curr}`,
        };
      })
    );
  }, [props.mapInfo]);

  const clickAction = React.useCallback(
    ({ countryName, countryCode, countryValue }: CountryContext) => {
      const targetCountryInfo = props.mapInfo.filter(
        (entry) => entry.countryIsoCode.toUpperCase() === countryCode.toUpperCase()
      ).map(info => {return {...info, countryName: countryName}});
      setTargetCountryCases(targetCountryInfo);
    },
    []
  );

  const getCasesList = () => {
    if (!targetCountryCases) return;
    return targetCountryCases.map((value) => <>
            <ul>
          <li>Country: {value.countryName}</li>
          <li>Title: {value.title}</li>
          <li>Details: {value.details}</li>
        </ul>
    </>);
  }

  return (
    <>
      <WorldMap
        data={mapComponentData}
        onClickFunction={clickAction}
        tooltipTextFunction={(countryContext) =>
          `${countryContext.countryValue}`
        }
      />
      {getCasesList()}
    </>
  );
};

export default MapChart;
