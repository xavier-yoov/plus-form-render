import './css/style.scss'; // Import SCSS file

export type YoovPlusCredentials = {
    app_key: string,
    app_sign: string,
}
export type YoovPlusGatewayApiKey= {
    api_key: string,
}
export type YOOVPlusHeaders = {
    "Content-Type": "application/json",
    "X-APP-KEY": string,
    "X-APP-SIGN": string,
}
export type YOOVPlusGatewayHeaders = {
    "Content-Type": "application/json",
    "X-API-KEY": string,
}
export type Component = any

class YoovPlusFormRender{
    private host :string
    private headers:YOOVPlusHeaders | YOOVPlusGatewayHeaders

    constructor(private readonly credentials: YoovPlusCredentials | YoovPlusGatewayApiKey) {
        if (this.credentials.hasOwnProperty("app_key") && this.credentials.hasOwnProperty("app_sign") ){
            this.credentials = credentials as YoovPlusCredentials
            this.host = "https://api.yoov.plus/worksheet/api/v1/open"
            this.headers = {
                "Content-Type": "application/json",
                "X-APP-KEY": this.credentials.app_key,
                "X-APP-SIGN": this.credentials.app_sign,
            }
        } else if (credentials.hasOwnProperty("api_key")) {
            this.credentials = credentials as YoovPlusGatewayApiKey
            this.host = "https://api.yoov.plus/worksheet/api/v1/open"
            this.headers = {
                "Content-Type": "application/json",
                "X-API-KEY": this.credentials.api_key,
            }
        } else {
            throw new Error("Invalid credentials")
        }
    }

    private createFromGroupDiv(component:Component){
        const div = document.createElement("div")
        div.className=`form-group ${component.id}`

        return div
    }
    private createLabel(component:Component){
        const label = document.createElement("label")
        label.setAttribute("for", component.id)

        return label

    }



    createSingleLineTextInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "text"
        input.name = component.id
        input.id = component.id



        if(component.extra.minWord){
            input.minLength = Number(component.extra.minWord)
        }

        if(component.extra.maxWord){
            input.maxLength = Number(component.extra.maxWord)
        }
        if(component.extra.regex){
            input.pattern = JSON.parse(component.extra.regex).regex
        }
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)

        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createMultiLineTextInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)

        const label =this.createLabel(component)
        const input = document.createElement("textarea")
        if(component.hint){
            input.placeholder = component.hint
        }

        if(component.extra.minWord){
            input.minLength = Number(component.extra.minWord)
        }

        if(component.extra.maxWord){
            input.maxLength = Number(component.extra.maxWord)
        }
        if(component.extra.regex){
            input.setAttribute("pattern",  JSON.parse(component.extra.regex).regex )
        }

        input.name = component.id
        input.id = component.id
        label.innerText = component.name
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createFileInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "file"
        input.name = component.id
        input.id = component.id
        if(component.required){
            input.required = true
        }

        if(component.extra.multiple){
            input.multiple = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createImageInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "file"
        input.name = component.id
        input.id = component.id
        input.setAttribute("accept", "image/*")
        if(component.required){
            input.required = true
        }

        if(component.extra.multiple){
            input.multiple = true
        }
        div.appendChild(label)
        div.appendChild(input)

        return div
    }

    createSelectInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        label.innerText = component.name
        div.appendChild(label)

        if(component.extra.present==="LIST"){

            const radioContainer = document.createElement("div")
            radioContainer.style.display = "flex"
            radioContainer.style.flexDirection = "row"
            radioContainer.style.gap = "10px"
            component.extra.options.sort((a:any,b:any)=>a.position>b.position).forEach((option:any) => {

                const radio = document.createElement("input")
                const label = document.createElement("label")

                if(component.required){
                    radio.required = true
                }
                radio.type = component.type === "MULTIPLE_SELECT" ?  "checkbox" : "radio"
                radio.name = component.id
                radio.value = option.key
                label.innerText = option.value

                if(option.color){
                    label.style.color = option.color
                }

                label.prepend(radio)
                radioContainer.appendChild(label)
            })
            div.appendChild(radioContainer)
        }else{
            const select = document.createElement("select")
            select.name = component.id
            if(component.required){
                select.required = true
            }
            if(component.type === "MULTIPLE_SELECT"){
                select.multiple = true
            }
            component.extra.options.sort((a:any,b:any)=>a.position>b.position).forEach((option:any) => {
                const optionElement = document.createElement("option")
                optionElement.value = option.key
                optionElement.innerText = option.value
                select.appendChild(optionElement)
            })
            div.appendChild(select)
        }
        return div

    }

    createMailInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "email"
        input.name = component.id
        input.id = component.id
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createTelephoneInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "tel"
        input.name = component.id
        input.id = component.id
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createDateInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        if(component.extra.type === "DATE"){
            input.type = "date"
        }else if(component.extra.type === "DATETIME"){
            input.type = "datetime-local"
        }

        input.name = component.id
        input.id = component.id
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createTimeInput(document:Document, component:Component){
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "time"
        input.name = component.id
        input.id = component.id

        if(component.extra.enableStartTime){
            input.min = component.extra.startTime.value[0].text
        }

        if(component.extra.enableEndTime){
            input.max = component.extra.endTime.value[0].text
        }
        if(component.required){
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }

        return div
    }

    createRatingInput(document:Document, component:Component) {
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name + " (0-" + component.extra.star + ")"
        input.type = "range"
        input.min = "0"
        input.max = component.extra.star
        input.step = "1"
        input.name = component.id
        input.id = component.id
        if (component.required) {
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }


        return div
    }

    createNumberInput(document:Document, component:Component) {
        const div = this.createFromGroupDiv(component)
        const label = this.createLabel(component)
        const input = document.createElement("input")

        label.innerText = component.name
        input.type = "number"
        input.name = component.id
        input.id = component.id

        input.step = (1 / (10**component.extra.point)).toString()

        input.min = component.extra.minValue.toString()
        input.max = component.extra.maxValue.toString()

        if (component.required) {
            input.required = true
        }
        div.appendChild(label)
        div.appendChild(input)
        if(component.hint){
            input.placeholder = component.hint
        }
        if(component.description){
            const description = document.createElement("small")
            description.innerText = component.description
            div.appendChild(description)
        }


        return div
    }

    createForm(document:Document, id:string, components:Component[]){
        const form = document.createElement("form")
        form.id=id
        form.className = `yoov-plus-create-form ${ id}`
        components.filter(c=>c.extra).filter(c=>c.createReadable===false).forEach(c=>{

            console.log(c)
            let el = null
            switch(c.type){
                case "TEXT":
                    el = c.extra.multiline? this.createMultiLineTextInput(document, c) : this.createSingleLineTextInput(document, c)
                    break;
                case "FILE":
                    el = this.createFileInput(document, c)
                    break;
                case "IMAGE":
                    el = this.createImageInput(document, c)
                    break;
                case "SINGLE_SELECT":
                case "MULTIPLE_SELECT":
                    el = this.createSelectInput(document, c)
                    break;
                case "MAIL":
                    el = this.createMailInput(document, c)
                    break;
                case "TELEPHONE":
                    el = this.createTelephoneInput(document, c)
                    break;
                case "RATE":
                    el = this.createRatingInput(document, c)
                    break;
                case "DATE":
                    el = this.createDateInput(document, c)
                    break;
                case "DATETIME":
                    el = this.createTimeInput(document, c)
                    break;
                case "DIGIT":
                    el = this.createNumberInput(document, c)
                    break;
                default:
                    console.error('Unknown type', c.type)
            }

            if(el) form.appendChild(el)
        })
        const submit = document.createElement("button")
        submit.type = "submit"
        submit.innerText = "Submit"
        form.appendChild(submit)

        return form

    }

    renderCreateFrom(containerId:string, worksheetId:string) {

        // const app_key = "263e8e054bda40edb3c54262085f881f"
        // const app_sign = "OTMyZjEzNzNjNTZhZGVmODAxNTM1YzZjYTIyOGViYTc0OTk3ODNiMmMzOTNlMWM1YzlhMTgzM2U1OGVjYzliOQ=="
        // const worksheet_id = "67515579506be661f3531afc"

        const container = document.getElementById(containerId)

        if(container){
            const path = `worksheets/${worksheetId}`
            const url = `${this.host}/${path}`
            fetch(url, {
                method:"GET",
                headers:this.headers
            })
                .then(response => {
                    response
                        .json()
                        .then(json=>{
                        console.log(json)
                        const form = this.createForm(document,json.data.id, json.data.components)
                        container.appendChild(form)
                    })
                })
        }else{
            console.error("Container not found")
        }
    }
}

export default YoovPlusFormRender;
