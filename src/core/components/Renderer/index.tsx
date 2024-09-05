// import { Fragment, useState, useEffect } from "react";
// import CustomMeta from "components/CustomMeta";
// import { useYTLStrapiDataHook } from "core/context/YTLStrapiContext";
// import { renderScreen, RenderComponent } from "./helpers";

// export const ComponentRenderer: React.FC<any> = () => {
//   // ================== STATE
//   const [loading, setLoading] = useState(true);

//   // ================== HOOKS
//   const {
//     pageData,
//     contentData,
//     customComponent,
//     getConditionalBlocks,
//     getMetaDataFromContentData
//   } = useYTLStrapiDataHook();
//   // ================== EFFECTS
//   useEffect(() => {
//     if (!pageData && !contentData) return;
//     setTimeout(() => {
//       setLoading(false);
//     }, 400);
//   }, [pageData, contentData]);

//   // ================== VARIABLES
//   const blocks = getConditionalBlocks();
//   // ================== VIEWS
//   if (customComponent) {
//     return (
//       <>{renderScreen({ customComponent, pageData, contentData, loading })}</>
//     );
//   }
//   return (
//     <Fragment>
//       <CustomMeta data={getMetaDataFromContentData() ?? pageData} />
//       {blocks?.map((component: any, index: any) => (
//         <RenderComponent key={index} component={component} loading={loading} />
//       ))}
//     </Fragment>
//   );
// };

// export default ComponentRenderer;
