import React, {useState} from 'react';
import './App.css';
import { MainInfo } from './steps/main-info-step';
import { IFSetCurrentSep } from './interfaces/common-interfaces';
import { ContactInfo } from './steps/contact-info-step';
import { Photos } from './steps/photos-step';
import { Services } from './steps/checkbox-step';


const initialFormState = {
    title: '',
    description: '',
    status: false,
    phone: '',
    email: '',
    photosList: [] as File[],
    ser1: false,
    ser2: false,
    ser3: false,
    ser4: false,
    ser5: false,
}

export type TForm = typeof initialFormState

const renderSteps = (step: number, setCurrentSep: IFSetCurrentSep, formValues: any, setFormValues: any, setFormData: any) => {
    switch (step){
        case 1: {
            return <MainInfo setCurrentStep={setCurrentSep}
                             step={step}
                             formValues={formValues}
                             setFormValues={setFormValues}
            />
        }

        case 2: {
            return <ContactInfo
                            setCurrentStep={setCurrentSep}
                            step={step}
                            formValues={formValues}
                            setFormValues={setFormValues}
                            />
        }

        case 3: {
            return <Photos
                        setCurrentStep={setCurrentSep}
                        step={step}
                        formValues={formValues}
                        setFormValues={setFormValues}
            />

        }

        case 4: {
            return <Services
                        setCurrentStep={setCurrentSep}
                        step={step}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setFormData={setFormData}
            />
        }
    }
}
const FormDataInstance = new FormData()

function App() {
  const [currentStep, setCurrentSep] = useState(1)
  const [formValues, setFormValues] = useState(initialFormState)



  const setFormData = () => {
      const {photosList, ...simple} = formValues

      for(let i = 0; i < photosList.length; i++){
          FormDataInstance.append("fileToUpload[]"+i, photosList[i])
      }

      for(let key in simple) {
          //@ts-ignore
          FormDataInstance.append(key, formValues[key])
      }

      FormDataInstance.forEach(item => {
          console.log(item)
      })

  }

  const setFormValuesSafety = (payload: TForm) => {
      setFormValues(prevState => {
          return {...prevState, ...payload}
      })
  }

  return (<div className={"main-wrap"}>
            {renderSteps(currentStep, setCurrentSep, formValues, setFormValuesSafety, setFormData)}
          </div>

  );
}

export default App;
