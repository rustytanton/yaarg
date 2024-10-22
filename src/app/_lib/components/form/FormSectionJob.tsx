import FormInputText from "@/app/_lib/components/form/FormInputText";
import FormInputCheckbox from "@/app/_lib/components/form/FormInputCheckbox";
import FormSelect from "@/app/_lib/components/form/FormSelect"
import { useState } from "react";
import FormButton from "@/app/_lib/components/form/FormButton";
import { Job } from "@/app/_data/job";

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
                    required={true}
                />
                <FormInputText
                    label="Title:"
                    inputName={ "[job" + props.index + "]title"  }
                    defaultValue={props.job.title as string}
                    required={true}
                />
                <FormInputText
                    label="Location:"
                    inputName={ "[job" + props.index + "]location" }
                    defaultValue={props.job.location}
                    required={true}
                />
                <FormSelect
                    options={['On-premises', 'Hybrid', 'Remote']}
                    inputName={ "[job" + props.index + "]attendanceModel" }
                    defaultValue={props.job.attendanceModel}
                    label="Location Type:"
                    required={true}
                />
                <FormInputText
                    label="Start Date:"
                    inputName={ "[job" + props.index + "]startDate" }
                    defaultValue={props.job.startDate}
                    required={true}
                    pattern="\d{1,2}/\d{4}"
                    placeholder="Ex: 2/2024 or 11/2024"
                />
                {stillEmployed
                    ?
                        <input type="hidden" name={ "[job" + props.index + "]endDate" } value="" />
                    : 
                        <FormInputText
                            label="End Date:"
                            inputName={ "[job" + props.index + "]endDate" }
                            defaultValue={endDate}
                            required={true}
                            placeholder="Ex: 2/2024 or 11/2024"
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