(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.YoovPlusFormRender = factory());
})(this, (function () { 'use strict';

    var YoovPlusFormRender = /** @class */ (function () {
        function YoovPlusFormRender(credentials) {
            this.credentials = credentials;
            console.log(credentials);
            if (this.credentials.hasOwnProperty("app_key") && this.credentials.hasOwnProperty("app_sign")) {
                this.credentials = credentials;
                this.host = "https://api.yoov.plus/worksheet/api/v1/open";
                this.headers = {
                    "Content-Type": "application/json",
                    "X-APP-KEY": this.credentials.app_key,
                    "X-APP-SIGN": this.credentials.app_sign,
                };
            }
            else if (credentials.hasOwnProperty("api_key")) {
                console.log("correct");
                this.credentials = credentials;
                this.host = "https://xsv5hhtu5fac56aev3vb3mcvw40icuzq.lambda-url.ap-east-1.on.aws";
                this.headers = {
                    "Content-Type": "application/json",
                    "x-api-key": this.credentials.api_key,
                };
            }
            else {
                throw new Error("Invalid credentials");
            }
        }
        YoovPlusFormRender.prototype.createFromGroupDiv = function (component) {
            var div = document.createElement("div");
            div.className = "form-group ".concat(component.id);
            return div;
        };
        YoovPlusFormRender.prototype.createLabel = function (component) {
            var label = document.createElement("label");
            label.setAttribute("for", component.id);
            return label;
        };
        YoovPlusFormRender.prototype.createSingleLineTextInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "text";
            input.name = component.id;
            input.id = component.id;
            if (component.extra.minWord) {
                input.minLength = Number(component.extra.minWord);
            }
            if (component.extra.maxWord) {
                input.maxLength = Number(component.extra.maxWord);
            }
            if (component.extra.regex) {
                input.pattern = JSON.parse(component.extra.regex).regex;
            }
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createMultiLineTextInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("textarea");
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.extra.minWord) {
                input.minLength = Number(component.extra.minWord);
            }
            if (component.extra.maxWord) {
                input.maxLength = Number(component.extra.maxWord);
            }
            if (component.extra.regex) {
                input.setAttribute("pattern", JSON.parse(component.extra.regex).regex);
            }
            input.name = component.id;
            input.id = component.id;
            label.innerText = component.name;
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createFileInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "file";
            input.name = component.id;
            input.id = component.id;
            if (component.required) {
                input.required = true;
            }
            if (component.extra.multiple) {
                input.multiple = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createImageInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "file";
            input.name = component.id;
            input.id = component.id;
            input.setAttribute("accept", "image/*");
            if (component.required) {
                input.required = true;
            }
            if (component.extra.multiple) {
                input.multiple = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            return div;
        };
        YoovPlusFormRender.prototype.createSelectInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            label.innerText = component.name;
            div.appendChild(label);
            if (component.extra.present === "LIST") {
                var radioContainer_1 = document.createElement("div");
                radioContainer_1.style.display = "flex";
                radioContainer_1.style.flexDirection = "row";
                radioContainer_1.style.gap = "10px";
                component.extra.options.sort(function (a, b) { return a.position > b.position; }).forEach(function (option) {
                    var radio = document.createElement("input");
                    var label = document.createElement("label");
                    if (component.required) {
                        radio.required = true;
                    }
                    radio.type = component.type === "MULTIPLE_SELECT" ? "checkbox" : "radio";
                    radio.name = component.id;
                    radio.value = option.key;
                    label.innerText = option.value;
                    if (option.color) {
                        label.style.color = option.color;
                    }
                    label.prepend(radio);
                    radioContainer_1.appendChild(label);
                });
                div.appendChild(radioContainer_1);
            }
            else {
                var select_1 = document.createElement("select");
                select_1.name = component.id;
                if (component.required) {
                    select_1.required = true;
                }
                if (component.type === "MULTIPLE_SELECT") {
                    select_1.multiple = true;
                }
                component.extra.options.sort(function (a, b) { return a.position > b.position; }).forEach(function (option) {
                    var optionElement = document.createElement("option");
                    optionElement.value = option.key;
                    optionElement.innerText = option.value;
                    select_1.appendChild(optionElement);
                });
                div.appendChild(select_1);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createMailInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "email";
            input.name = component.id;
            input.id = component.id;
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createTelephoneInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "tel";
            input.name = component.id;
            input.id = component.id;
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createDateInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            if (component.extra.type === "DATE") {
                input.type = "date";
            }
            else if (component.extra.type === "DATETIME") {
                input.type = "datetime-local";
            }
            input.name = component.id;
            input.id = component.id;
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createTimeInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "time";
            input.name = component.id;
            input.id = component.id;
            if (component.extra.enableStartTime) {
                input.min = component.extra.startTime.value[0].text;
            }
            if (component.extra.enableEndTime) {
                input.max = component.extra.endTime.value[0].text;
            }
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createRatingInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name + " (0-" + component.extra.star + ")";
            input.type = "range";
            input.min = "0";
            input.max = component.extra.star;
            input.step = "1";
            input.name = component.id;
            input.id = component.id;
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createNumberInput = function (document, component) {
            var div = this.createFromGroupDiv(component);
            var label = this.createLabel(component);
            var input = document.createElement("input");
            label.innerText = component.name;
            input.type = "number";
            input.name = component.id;
            input.id = component.id;
            input.step = (1 / (Math.pow(10, component.extra.point))).toString();
            input.min = component.extra.minValue.toString();
            input.max = component.extra.maxValue.toString();
            if (component.required) {
                input.required = true;
            }
            div.appendChild(label);
            div.appendChild(input);
            if (component.hint) {
                input.placeholder = component.hint;
            }
            if (component.description) {
                var description = document.createElement("small");
                description.innerText = component.description;
                div.appendChild(description);
            }
            return div;
        };
        YoovPlusFormRender.prototype.createForm = function (document, id, components) {
            var _this = this;
            var form = document.createElement("form");
            form.id = id;
            form.className = "yoov-plus-create-form ".concat(id);
            components.filter(function (c) { return c.extra; }).filter(function (c) { return c.createReadable === false; }).forEach(function (c) {
                console.log(c);
                var el = null;
                switch (c.type) {
                    case "TEXT":
                        el = c.extra.multiline ? _this.createMultiLineTextInput(document, c) : _this.createSingleLineTextInput(document, c);
                        break;
                    case "FILE":
                        el = _this.createFileInput(document, c);
                        break;
                    case "IMAGE":
                        el = _this.createImageInput(document, c);
                        break;
                    case "SINGLE_SELECT":
                    case "MULTIPLE_SELECT":
                        el = _this.createSelectInput(document, c);
                        break;
                    case "MAIL":
                        el = _this.createMailInput(document, c);
                        break;
                    case "TELEPHONE":
                        el = _this.createTelephoneInput(document, c);
                        break;
                    case "RATE":
                        el = _this.createRatingInput(document, c);
                        break;
                    case "DATE":
                        el = _this.createDateInput(document, c);
                        break;
                    case "DATETIME":
                        el = _this.createTimeInput(document, c);
                        break;
                    case "DIGIT":
                        el = _this.createNumberInput(document, c);
                        break;
                    default:
                        console.error('Unknown type', c.type);
                }
                if (el)
                    form.appendChild(el);
            });
            var submit = document.createElement("button");
            submit.type = "submit";
            submit.innerText = "Submit";
            form.appendChild(submit);
            return form;
        };
        YoovPlusFormRender.prototype.renderCreateFrom = function (containerId, worksheetId) {
            var _this = this;
            var container = document.getElementById(containerId);
            if (container) {
                var path = "worksheets/".concat(worksheetId);
                var url = "".concat(this.host, "/").concat(path);
                fetch(url, {
                    method: "GET",
                    headers: this.headers
                })
                    .then(function (response) {
                    response
                        .json()
                        .then(function (json) {
                        console.log(json);
                        var form = _this.createForm(document, json.data.id, json.data.components);
                        container.appendChild(form);
                    });
                });
            }
            else {
                console.error("Container not found");
            }
        };
        return YoovPlusFormRender;
    }());

    return YoovPlusFormRender;

}));
