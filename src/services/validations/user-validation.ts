import * as yup from 'yup'
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

export const emailSchema = yup.string().email().required()
export const nameSchema = yup.string().required()
export const passwordSchema = yup.string().required().min(1)
export const codeSchema = yup.string().required().length(36)

export const validateInput = async (
  schema: RequiredStringSchema<string | undefined, AnyObject>,
  setterFunction: React.Dispatch<React.SetStateAction<boolean>>,
  stateValue: string
) => {
  const isValid = await schema.isValid(stateValue);
  isValid ? setterFunction(false) : setterFunction(true);
};
