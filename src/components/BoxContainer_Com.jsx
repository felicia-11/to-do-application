import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { TextInput } from '../logic/FormInput';
import ToDoItemCom from './ToDoItem_Com';
import '../styles/components/BoxContainer_Styles.css';

export default function BoxContainer_Com(props) {

    const { register, handleSubmit, errors, setValue } = useForm();

    /**
     * Handle create new task
     * @param data new data from form
     */
    const handleSubmitForm = (data) => {
        props.handleSubmit(data);
        setValue('title', '');
        setValue('description', '');
    }

    return (
        <div className='box-container'>
            <h2 className='box-title'>{props.title}</h2>
            { props.type.includes('to-do-list') && props.data ?
                props.data.map((res, idx) => {
                    return (
                        <ToDoItemCom
                            key={`item_${idx}`}
                            type={props.type}
                            data={res}
                            handleTaskAction={props.handleTaskAction}
                        />
                    );
                })
                : props.type === 'create-task' ?
                <form onSubmit={handleSubmit(handleSubmitForm)} className='create-form'>
                    <TextInput
                        name='title'
                        label='Title *'
                        placeholder='Title'
                        className='tf-todo'
                        inputRef={register({ required: '*title is required' })}
                        style={{ marginBottom: 20 }}
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
                        inputRef={register}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        className='create-btn'
                    >
                        Create
                    </Button>
                </form>
                :
                <></>
            }
        </div>
    )
}