# Form-awesome

## ✨  Feature
    - Fast building form with file config
    
## 🖥 Environment Support
    - Modern browsers and Internet Explorer 9+
    - Server-side Rendering
    - [Electron](http://electron.atom.io/)
    
## 📦 Install

## 🔨 Usage

**Config File**
```typescript jsx
import {Input} from "antd";
import { inputFieldsType} from "../formEngine";

export const inputFields : inputFieldsType = [
    {
        size: 12,
        key: 'name',
        Element: Input,
        propsElement: {},
        fieldDecorator: {
            rules: [
                {
                    required: true,
                    message: 'Must fill this field'
                }
            ]
        }
    },
    {
        size: 12,
        key: 'userName',
        Element: Input,
        propsElement: {},
        fieldDecorator: {}
    }
];
```

**Code** 
```typescript jsx
    <FormEngine
        formName={formName}
        inputFields={inputFields}
        dataSource={info}
        onFieldChangeFunc={(listFieldChanged) =>
            listFieldChanged.forEach((temp) => {
                setInfo({
                    ...info,
                    [temp.key]: temp.value
                });
        })}
        onSubmit={(data: Object) => console.error(data)}
        wrappedComponentRef={formRef}
    />
```
