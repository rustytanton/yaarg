'use client'

import { useState } from "react"
import FormButton from "./FormButton"

type Props = {
    children: any,
    isHidden?: boolean,
    hideText?: string
    showText?: string
}

export default function ShowHideText(props: Props) {
    const [hidden, setHidden] = useState(props.isHidden)

    if (hidden) {
        return (
            <div>
                <FormButton onClick={() => { setHidden(false) }} buttonText={props.showText || 'Show'} />
            </div>
        )
    } else {
        return (
            <div>
                {props.children}
                <FormButton onClick={() => { setHidden(true) }} buttonText={props.hideText || 'Hide'} />
            </div>
        )
    }
}