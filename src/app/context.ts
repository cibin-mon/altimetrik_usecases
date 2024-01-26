import React, { createContext } from "react";

interface FormDataContextProps {
  formData: { [key: string]: string }; // This is an index signature
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);
