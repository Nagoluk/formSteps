import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { useFormik } from 'formik';
import {IStepsProps} from '../interfaces/common-interfaces';


type OwnProps = {
    setFormData: any
}

export const Services: React.FC<IStepsProps & OwnProps> = ({step, setCurrentStep, formValues, setFormValues, setFormData}) => {
    const formik = useFormik({
        initialValues: {
            ...formValues
        },
        enableReinitialize: true,
        onSubmit: values => {
            setFormValues(values)
            setFormData()
        },
    });

    return (<Form onSubmit={formik.handleSubmit}>
                <h3>Платні сервіси</h3>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="ser1" onChange={formik.handleChange} checked={formik.values.ser1}/>
                        Service 1
                    </Label>
                </FormGroup>


                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="ser2" onChange={formik.handleChange} checked={formik.values.ser2}/>
                        Service 2
                    </Label>
                </FormGroup>


                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="ser3" onChange={formik.handleChange} checked={formik.values.ser3}/>
                        Service 3
                    </Label>
                </FormGroup>


                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="ser4" onChange={formik.handleChange} checked={formik.values.ser4}/>
                        Service 4
                    </Label>
                </FormGroup>


                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="ser5" onChange={formik.handleChange} checked={formik.values.ser5}/>
                        Service 5
                    </Label>
                </FormGroup>

                <br/>
                <Button color="primary mt-10" onClick={() => {
                    setFormValues({...formValues, ...formik.values})
                    setCurrentStep(step - 1)
                }}>Prev step</Button>
                <Button color="primary mt-10" type="submit">Save</Button>
            </Form>)
}