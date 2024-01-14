import React from "react";
import s from "./FormsControls.module.css";

type PropsType = {
    input: any
    meta: any
    children: React.ReactNode
}

const FormControl = ({meta, children}: PropsType) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = ({input, meta, ...props}: PropsType) => {
    return <FormControl input={input} meta={meta}><textarea {...input} {...props}/></FormControl>
}

export const Input = ({input, meta, ...props}: PropsType) => {
    return <FormControl input={input} meta={meta}><input {...input} {...props}/></FormControl>

}