import { styled, TextField } from '@mui/material'
import React from 'react'

const CustomisedInput = ({ name, label, type }) => {
    return (
        <TextField
            margin="normal"
            name={name}
            type={type}
            label={label}
            InputProps={
                {
                    style: {
                        width: "400px",
                        borderRadius: 10,
                        fontSize: 20,
                        color: "white",
                    }

                }

            }
        >

        </TextField>
    )
}

export default CustomisedInput
