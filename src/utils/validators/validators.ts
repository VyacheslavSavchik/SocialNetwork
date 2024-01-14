import react from "react";
export const required = (value: string) => {
    if(value) return undefined
    return 'field is required'
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}
