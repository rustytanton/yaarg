import FormInputText from '../components/FormInputText'
import FormInputCheckbox from '../components/FormInputCheckbox'
import { useState } from 'react'
import FormButton from './FormButton'
import { Education } from '@prisma/client'

type Props = {
    index: number
    education: Education
}

export default function FormSectionEducation(props: Props) {   
    const [removeSection, setRemoveSection] = useState(false)

    if (removeSection) {
        return (
            <>
                { props.education.institution && props.education.id ? 
                    <section className="border-b border-white pt-10 pb-10">
                        <p><strong>{props.education.institution}</strong> will be deleted on form submission.</p>
                        <FormButton buttonText="Undo" onClick={() => { setRemoveSection(false) }} />
                    </section>
                : ''}
                { props.education.id ? <input type="hidden" name="[delete]" value={props.education.id} /> : ''}
            </>
        )
    } else {
        return (
            <section className="border-b border-white pb-5 mb-10">
                <FormInputText
                    label="Institution:"
                    inputName={"[education" + props.index + "]institution"}
                    defaultValue={props.education.institution as string}
                />
                <FormInputText
                    label="Major / Credential:"
                    inputName={"[education" + props.index + "]major"}
                    defaultValue={props.education.major as string}
                />
                <FormInputText
                    label="Minor:"
                    inputName={"[education" + props.index + "]minor"}
                    defaultValue={props.education.minor as string}
                />
                <FormInputText
                    label="Start Date:"
                    inputName={"[education" + props.index + "]startDate"}
                    defaultValue={props.education.startDate?.toString()}
                    pattern="^\d{1,2}/\d{2,4}"
                    placeholder='Example: 8/1997'
                />
                <FormInputText
                    label="End Date:"
                    inputName={"[education" + props.index + "]endDate"}
                    defaultValue={props.education.endDate?.toString()}
                    pattern="^\d{1,2}/\d{2,4}"
                    placeholder='Example: 5/2002'
                />
                <FormInputText
                    label="GPA:"
                    inputName={"[education" + props.index + "]gpa"}
                    defaultValue={props.education.gpa?.toString()}
                    pattern="^\d\.\d"
                    placeholder='Example: 4.0'
                />
                <FormInputCheckbox
                    label="Graduated / Earned Credential"
                    inputName={"[education" + props.index + "]graduated"}
                    defaultValue={props.education.graduated ? true : false}
                />
                <input
                    type="hidden"
                    name={"[education" + props.index + "]id"}
                    defaultValue={props?.education?.id || ''}
                />
                <FormButton
                    buttonText="Remove Section"
                    onClick={() => { setRemoveSection(true) }}
                />
            </section>
        )
    }
    
}