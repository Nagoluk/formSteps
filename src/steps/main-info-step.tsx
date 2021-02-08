import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {IStepsProps} from '../interfaces/common-interfaces';


export const MainInfo: React.FC<IStepsProps> = ({step, setCurrentStep, formValues, setFormValues}) => {
    const formik = useFormik({
        initialValues: {
            ...formValues
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Required'),
            description: Yup.string()
                .required('Required'),
        }),

        onSubmit: values => {
            let stepTemp = step + 1
            setCurrentStep(stepTemp)
            setFormValues(values)
        },
    });

    return <Form onSubmit={formik.handleSubmit}>
            <h3>Основна інформація</h3>
            <FormGroup>
                <Label for="title">Заголовок</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Введіть заголовок"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    invalid={!!(formik.touched.title && formik.errors.title)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="description">Опис</Label>
                <Input type="textarea"
                       name="description"
                       id="description"
                       onChange={formik.handleChange}
                       value={formik.values.description}
                       invalid={!!(formik.touched.description && formik.errors.description)}
                />
            </FormGroup>

            <FormGroup check>
                <Label check>
                    <Input type="checkbox" name="status" onChange={formik.handleChange} checked={formik.values.status}/>
                    Status
                </Label>
            </FormGroup>
            <br/>
            <Button color="primary mt-10" type="submit">Next step</Button>
           </Form>
}