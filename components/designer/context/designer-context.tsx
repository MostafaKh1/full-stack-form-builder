"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { FormElementsInstance } from "../form-elemts";

interface DesignerContextType {
  elements: FormElementsInstance[];
  addElement: (index: number, element: FormElementsInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementsInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementsInstance | null>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementsInstance[]>([]);
  const [selectedElement,setSelectedElement] = useState<FormElementsInstance | null>(null)

  const addElement = (index: number, element: FormElementsInstance) => {
    setElements((prev) => {
      const newElement = [...prev];
      newElement.splice(index, 0, element);
      return newElement;
    });
  };
  
  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };


  return (
    <DesignerContext.Provider value={{ addElement, elements, removeElement, selectedElement, setSelectedElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
