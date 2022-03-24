import { TextField } from "@mui/material";

// Field for basic input text
export function TextInput(props) {
    return (
        <>
            <TextField
                variant='outlined'
                multiline={props.multiline}
                rows={props.rows}
                name={props.name}
                label={props.label}
                placeholder={props.placeholder}
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                inputRef={props.inputRef}
                style={props.style}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            { props.errors && 
                <p className={props.errorClassName} style={{ marginTop: -10, marginBottom: 10 }}>
                    {props.errors.message}
                </p>
            }
        </>
    )
}