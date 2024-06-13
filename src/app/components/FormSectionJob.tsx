import FormInputText from "./FormInputText";
import FormInputCheckbox from "./FormInputCheckbox";
import FormSelect from "./FormSelect"
import { useState } from "react";
import { Job } from "@prisma/client";
import FormButton from "./FormButton";

type Props = {
    index: number
    job: Job
}

export default function FormSectionJob(props: Props) {
    const [stillEmployed, setStillEmployed] = useState(props.job.stillWorksHere)
    const [endDate, setEndDate] = useState(props.job.endDate)
    const [removeSection, setRemoveSection] = useState(false)

    function toggleEndDate(e: React.MouseEvent) {
        const el = e.target as HTMLInputElement
        setStillEmployed(el.checked)
        if (el.checked) {
            setEndDate('')
        }
    }

    if (removeSection) {
        return (
            <>
                { props.job.employer && props.job.id ? 
                    <section className="border-b border-white pt-10 pb-10">
                        <p><strong>{props.job.employer}</strong> will be deleted on form submission.</p>
                        <FormButton buttonText="Undo" onClick={() => { setRemoveSection(false) }} />
                    </section>
                : ''}
                { props.job.id ? <input type="hidden" name="[delete]" value={props.job.id} /> : ''}
            </>
        )
    } else {
        return (
            <section className="border-b border-white pb-5 mb-10">
                <FormInputText
                    label="Employer:"
                    inputName={ "[job" + props.index + "]employer"  }
                    defaultValue={props.job.employer}
                />
                <FormInputText
                    label="Location:"
                    inputName={ "[job" + props.index + "]location" }
                    defaultValue={props.job.location}
                />
                <FormSelect
                    options={['On-premises', 'Hybrid', 'Remote']}
                    inputName={ "[job" + props.index + "]attendanceModel" }
                    defaultValue={props.job.attendanceModel}
                    label="Location Type:"
                />
                <FormInputText
                    label="Start Date:"
                    inputName={ "[job" + props.index + "]startDate" }
                    defaultValue={props.job.startDate}
                />
                {stillEmployed
                    ?
                        <input type="hidden" name={ "[job" + props.index + "]endDate" } value="" />
                    : 
                        <FormInputText
                            label="End Date:"
                            inputName={ "[job" + props.index + "]endDate" }
                            defaultValue={endDate}
                        />
                }
                <FormInputCheckbox
                    label="Still employed here?"
                    onClick={(e) => { toggleEndDate(e) }}
                    defaultValue={props.job.stillWorksHere}
                    inputName={ "[job" + props.index + "]stillWorksHere" } 
                />
                <input
                    type="hidden"
                    name={"[job" + props.index + "]id"}
                    defaultValue={props.job.id || ''}
                />
                <FormButton
                    buttonText="Remove Section"
                    onClick={() => { setRemoveSection(true) }}
                />
            </section>
        )
    }
}