import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
    Modal,
    Grid,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { TextInput } from '../logic/FormInput';
import '../styles/components/Modal_Styles.css';

export default function ToDoModal_Com(props) {

    const { register, handleSubmit, errors } = useForm();
    const [title, setTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.data.description);

    // HTML for Modal
    const modalBody = (
        <div className='modal-body'>
            <h2 className='modal-title'>{props.title}</h2>
            { props.type === 'delete-task' ?
                <p>Judul: {props.data.title}</p>
              : props.type === 'update-task' ?
                <div className='form-container'>
                    <TextInput
                        name='title'
                        label='Title *'
                        placeholder='Title'
                        className='tf-todo'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        inputRef={register({ required: '*title is required' })}
                        style={{ marginBottom: 10 }}
                        errors={errors.title}
                        errorClassName="text-required"
                    />
                    <TextInput
                        multiline={true}
                        rows={2}
                        name='description'
                        label='Description'
                        placeholder='Description'
                        className='tf-todo'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        inputRef={register}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name='status'
                                defaultChecked={ props.data.status === 0? false : true }
                            />
                        }
                        label='Mark as done'
                        className='modal-checkbox'
                        inputRef={register}
                    />
                </div>
              :
                <></>
            }
            <form>
                <Grid container>
                    { props.type.includes('delete') ?
                        <Grid item xs={6}>
                            <Button
                                variant='contained'
                                color='error'
                                onClick={handleSubmit((d) => props.handleSubmit(d, 'delete'))}
                            >
                                Hapus
                            </Button>
                        </Grid>
                    :
                        <Grid item xs={6}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit((d) => props.handleSubmit(d, 'update', props.data))}
                            >
                                Update
                            </Button>
                        </Grid> 
                    }
                    <Grid item xs={6}>
                        <Button
                            variant='contained'
                            className='cancel-btn'
                            onClick={props.onClose}
                        >
                            Tidak
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            className="custom-modal"
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {modalBody}
        </Modal>
    );
}
