import React, {ChangeEvent, useState, FormEvent, useEffect} from 'react';
import {Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import {IStepsProps} from '../interfaces/common-interfaces';


export const Photos: React.FC<IStepsProps> = ({step, setCurrentStep, formValues, setFormValues}) => {
    const [photos, setPhotos] = useState<File[]>([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        setPhotos(formValues.photosList)
    }, [])

    const RemoveFileFromList = (needRemove: number) => {
        const temp = photos.filter((item, key) => key !== needRemove)
        setPhotos(temp)
    }

    const renderPhotos = (files: File[]) => {
        return files.map((item, id) => {
            return <div className={'photo-list-item'} key={item.name + id}>
                        <span onClick={() => RemoveFileFromList(id)}>&times;</span>
                        <img src={URL.createObjectURL(item)} width={100} height={100}/>
                    </div>
        })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setFormValues({...formValues, photosList: photos})
        setCurrentStep(step + 1)
    }

    return <Form onSubmit={onSubmit}>
            <h3>Фото</h3>
            <p>До 5 штук</p>
            <FormGroup>
                <Label for="title">Email</Label>
                <Input
                    type="file"
                    name="photo"
                    id="photo"
                    placeholder="Email"
                    multiple
                    onInput={(event: ChangeEvent<HTMLInputElement>) => {
                        if(photos.length >= 5) {
                            setAlert(true)
                        }else {
                            setAlert(false)
                            if (event.currentTarget !== null && event.currentTarget.files !== null) {
                                setPhotos([...photos, event.currentTarget.files[0]])
                            }
                        }
                    }}
                />
            </FormGroup>
            <FormGroup>
                {renderPhotos(photos)}

                <br/>

                {alert && <Alert color="danger">5 фотографій максимум</Alert>}
            </FormGroup>


            <br/>
            <Button color="primary mt-10" onClick={() => {
                setFormValues({...formValues, photosList: photos})
                setCurrentStep(step - 1)
            }
            }>Prev step</Button>
            <Button color="primary mt-10" type="submit" disabled={photos.length === 0}>Next step</Button>
           </Form>
}