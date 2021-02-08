import { TForm } from "../App";

export type IFSetCurrentSep = (step: number) => void


export interface IStepsProps  {
    setCurrentStep: IFSetCurrentSep,
    step: number,
    formValues: TForm,
    setFormValues: any,
    disablePreviousStep?: boolean
}