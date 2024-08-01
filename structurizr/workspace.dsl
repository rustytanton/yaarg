workspace {

    # !identifiers hierarchical

    model {
        # define models
        jobSeeker = person "Job Seeker"
        yaarg = softwareSystem "YAARG" "Yet Another AI Resume Generator" {
            nextJS = container "NextJS" {
                dataLayer = component "Data Layer" "Convert app models to/from database entities"
                contactInfoForm = component "Contact Info Form"
                educationForm = component "Education Form"
                jobsForm = component "Jobs Form"
                newResumeForm = component "New Resume Form"
                resume = component "Resume Page"
                prisma = component "Prisma ORM" "Database schema as code, entity clients and models"
            }
            postgres = container "PostgreSQL"
        }
        chatGPT = softwareSystem "ChatGPT"

        # person relationship
        jobSeeker -> nextJS "Uses"
        
        # software system relationships
        nextJS -> chatGPT "Uses"
        nextJS -> postgres "Read/Write"
        
        # container relationships
        contactInfoForm -> dataLayer "Uses"
        
        # component relationships
        educationForm -> dataLayer "Uses"
        jobsForm -> dataLayer "Uses"
        newResumeForm -> dataLayer "Uses"
        resume -> dataLayer "Uses"
        dataLayer -> prisma "Read/Write"
        prisma -> postgres "Read/Write"
    }

    views {

        systemContext yaarg {
            include *
            autoLayout
        }

        container yaarg {
            include *
            autoLayout
        }

        component nextJS {
            include *
            autoLayout
        }

        styles {
            element "Person" {
                shape person
            }
        }
    }

    # configuration {
    #     scope softwaresystem
    # }

}