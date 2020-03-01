import React from 'react';
import {
    Col, Form, Row,
} from 'antd';
import {
    FormProps
} from 'antd/lib/form';
import {FormInstance} from 'antd/lib/form/util';
import {FormItemProps} from 'antd/lib/form/FormItem';

type InputConfig = {
    size: number,
    key: string,
    element: JSX.Element,
    formItemProps: FormItemProps
};

export declare type InputFieldsType = InputConfig[];

export declare type FieldChangeType = {
    key: string,
    value: any
}

export interface FormBodyProps {
    inputFields: InputFieldsType,
    onFieldChangeFunc: (listFieldChanged: FieldChangeType[]) => void,
    formProps: FormProps,
    formInstance: FormInstance,
    name: string,
    initialValue: any
}

const FormBody: React.FC<FormBodyProps> = (
    {
        inputFields,
        formProps,
        formInstance,
        name,
        initialValue
    }
)  => {

    return (
        <Form
            {...formProps}
            form={formInstance}
            name={name}
            initialValues={initialValue}
        >
            <Row gutter={24}>
                {
                    inputFields.map(({size, key, element, formItemProps}) => (
                        <Col span={size} key={key}>
                            <Form.Item {...formItemProps} name={key}>
                                {element}
                            </Form.Item>
                        </Col>
                    ))
                }
            </Row>
        </Form>
    );
};

export default FormBody;