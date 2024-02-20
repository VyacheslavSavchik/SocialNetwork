import React, { HTMLInputTypeAttribute } from "react";
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import s from "./FormsControls.module.css";


type FormsControls = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

const FormControl = ({meta, input, ...props}: FormsControls) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = ({input, meta, ...props}: FormsControls) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            <div><textarea className={s.formControl + ' ' + (hasError ? s.error : '')}{...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const Input = ({input, meta, ...props}: FormsControls) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            <div className={s.inputLogin}><input className={s.formControl + ' ' + (hasError ? s.error : '')}{...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const createField = (placeholder:string|null, name:string,validators:any, components:any,props:any) => {
    return (
        <div><Field placeholder={placeholder} name={name} component={components} validate={validators}{...props}/></div>
    )
}
