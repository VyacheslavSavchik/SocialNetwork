import React, {ComponentType, Suspense} from "react";
import {Preloader} from "../components/common/Preloader/Preloader"

type PropsType = {}

export function withSuspense<T>(Component: ComponentType<T>){

    return (props: PropsType) => {
        return <Suspense fallback={<Preloader/>}><Component {...props as T}/></Suspense>
    }
}
