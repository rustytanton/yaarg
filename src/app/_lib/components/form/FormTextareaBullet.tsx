'use client'

import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import FormButton from '@/app/_lib/components/form/FormButton'

type Props = {
    defaultValue?: string
    show?: boolean
    contentId?: number
    inputName: string  
}

export default function FormTextareaBullet({ defaultValue = '', show = true, inputName = '', contentId = undefined }: Props) {
    
    const [showField, setShowField] = useState(show)
    const [fieldValue] = useState(defaultValue)
    
    if (showField) {
        return (
            <div>
                <TextareaAutosize
                    className="p-2 bg-slate-800 text-white w-full h-10 outline-0 resize-none"
                    name={inputName}
                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >{fieldValue}</TextareaAutosize>
                {contentId ? <input type="hidden" name={inputName + '_contentId'} value={contentId} /> : ''}
                <FormButton buttonText='Remove Bullet' onClick={ () => { setShowField(false) } } />
            </div>
        )
    } else {
        return (
            <div>
                <FormButton buttonText='Restore Bullet' onClick={ () => { setShowField(true) } } />
                {contentId ? <input type="hidden" name="[delete]" value={contentId} /> : ''}
            </div>
        )
    }
}