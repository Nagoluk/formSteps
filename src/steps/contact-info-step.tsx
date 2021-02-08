import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {IStepsProps} from '../interfaces/common-interfaces';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



export const ContactInfo: React.FC<IStepsProps> = ({step, setCurrentStep, formValues, setFormValues}) => {
    const formik = useFormik({
        initialValues: {
            ...formValues
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            phone: Yup.string()
                .required('Required').matches(phoneRegExp, 'Phone number is not valid')
            ,
            email: Yup.string()
                .required('Required').email('Incorrect email'),
        }),
        onSubmit: values => {
         setCurrentStep(step + 1)
         setFormValues({...formValues, ...values})
        },
    });

    return <Form onSubmit={formik.handleSubmit}>
            <h3>Контакти</h3>
            <FormGroup>
                <Label for="title">Email</Label>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    invalid={!!(formik.touched.email && formik.errors.email)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="title">Phone</Label>
                <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    invalid={!!(formik.touched.phone && formik.errors.phone)}
                />
            </FormGroup>

            <br/>
            <Button color="primary mt-10" onClick={() => {
                setFormValues(formik.values)
                setCurrentStep(step - 1)
            }}>Prev step</Button>
            <Button color="primary mt-10" type="submit">Next step</Button>
           </Form>
}