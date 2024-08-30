// import React from "react";
// import dynamic from "next/dynamic";
// import { renderNode } from "@lava-x/helpers";
// import { BlockProps } from "@types";
// import { Registry } from "config/registry";

// // ============ handle screen renderer
// export const renderScreen = ({
//   loading,
//   pageData,
//   contentData,
//   customComponent
// }: any): React.ReactNode => {
//   const comp = Registry.screen[customComponent];
//   const type = comp?.type;
//   const customComp = comp?.comp;
//   switch (type) {
//     case "page-only":
//       return renderNode(customComp, true, { pageData });
//     case "content-only":
//       return renderNode(customComp, true, { contentData });
//     case "loading":
//       return renderNode(customComp, true, { pageData, contentData, loading });
//     default:
//       return renderNode(customComp, true, { pageData, contentData });
//   }
// };

// // ============ handle component mapping
// export const renderBlockComponent = (component: BlockProps) => {
//   const comp = component?.__component;
//   if (comp === undefined) return null;

//   return Registry.component[comp];
// };

// // ============ handle render mapped component as a react component
// export const RenderComponent = ({ component, loading }) => {
//   let Component: React.ElementType | any = null;
//   Component = renderBlockComponent(component);
//   if (!Component) return <></>;
//   return <Component component={component} loading={loading} />;
// };

// export default { renderScreen, renderBlockComponent, RenderComponent };
