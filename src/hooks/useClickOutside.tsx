import React, { useEffect, useRef } from "react";

function useClickOutside(handler: any, element: any) {
  let domNode = useRef(element);
  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (
        domNode &&
        domNode.current &&
        !domNode.current.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
}

export default useClickOutside;
