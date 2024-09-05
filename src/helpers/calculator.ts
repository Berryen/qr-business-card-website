// import { FormulaCollectionType } from "@types";
// import { toFixedNumber } from "helpers";

// export const performFormulationCalculation = (
//   formula: FormulaCollectionType,
//   data: { [key: string]: any }
// ) => {
//   const { dimensions, constant, type } = formula.attributes;
//   let TotalVolume, Volume;

//   // 1. Calculate Dimensions
//   if (type === "B") {
//     Volume =
//       ((data[dimensions[0].name] + data[dimensions[1].name]) /
//         (data[dimensions[0].name] * data[dimensions[1].name])) *
//       data[dimensions[2].name] *
//       data[dimensions[3].name];
//   } else
//     Volume = dimensions?.reduce((acc, curr) => {
//       return acc * data[curr.name];
//     }, 1);

//   // 2. (Optional) Calculate Constant
//   if (constant) Volume *= constant;

//   // 3. (Optional) Calculate reverse volume
//   if (!isNaN(data.reserveVolume))
//     TotalVolume = Volume + Volume * (data.reserveVolume / 100);
//   else TotalVolume = Volume;

//   return {
//     Volume: toFixedNumber(Volume),
//     TotalVolume: toFixedNumber(TotalVolume)
//   };
// };

// export default performFormulationCalculation;
