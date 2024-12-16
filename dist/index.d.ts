import './css/style.scss';
export type YoovPlusCredentials = {
    app_key: string;
    app_sign: string;
};
export type YoovPlusGatewayApiKey = {
    api_key: string;
};
export type YOOVPlusHeaders = {
    "Content-Type": "application/json";
    "X-APP-KEY": string;
    "X-APP-SIGN": string;
};
export type YOOVPlusGatewayHeaders = {
    "Content-Type": "application/json";
    "x-api-key": string;
};
export type Component = any;
declare class YoovPlusFormRender {
    private readonly credentials;
    private host;
    private headers;
    constructor(credentials: YoovPlusCredentials | YoovPlusGatewayApiKey);
    private createFromGroupDiv;
    private createLabel;
    createSingleLineTextInput(document: Document, component: Component): HTMLDivElement;
    createMultiLineTextInput(document: Document, component: Component): HTMLDivElement;
    createFileInput(document: Document, component: Component): HTMLDivElement;
    createImageInput(document: Document, component: Component): HTMLDivElement;
    createSelectInput(document: Document, component: Component): HTMLDivElement;
    createMailInput(document: Document, component: Component): HTMLDivElement;
    createTelephoneInput(document: Document, component: Component): HTMLDivElement;
    createDateInput(document: Document, component: Component): HTMLDivElement;
    createTimeInput(document: Document, component: Component): HTMLDivElement;
    createRatingInput(document: Document, component: Component): HTMLDivElement;
    createNumberInput(document: Document, component: Component): HTMLDivElement;
    createForm(document: Document, id: string, components: Component[]): HTMLFormElement;
    renderCreateFrom(containerId: string, worksheetId: string): void;
}
export default YoovPlusFormRender;
