// import { SearchPlatform, Status } from "@prisma/client";
// import { useEffect, useState } from "react";

// type ChartDataElement = {
//   label: string;
//   value: number;
// };

// type ArrayElement = {
//   [key as string]: string;
//   name?: string;
//   url?: string;
//   _count: { applications: number };
// };

// export const useChartData = (
//   data: ArrayElement[] | undefined,
//   keyProp: string,
//   valueProp: string
// ) => {
//   const [chartData, setChartData] = useState<ChartDataElement[]>();
//   const [maxValue, setMaxValue] = useState<number>();

//   useEffect(() => {
//     const splitted = valueProp.split(".");
//     const mappedData = data
//       ?.map((el) => {
//         return {
//           label: el[keyProp],
//           value: el[splitted[0] as string][splitted[1] as string],
//         };
//       })
//       .filter((el) => el.value > 0);
//     const maxValue = mappedData?.reduce((acc, curr) => acc + curr.value, 0);

//     setChartData(mappedData);
//     setMaxValue(maxValue);
//   }, [data]);

//   return { chartData, maxValue };
// };
