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
    formItemProps: FormItemProps
};

export declare type InputFieldsType = InputConfig[];

export interface FormBodyProps {
    inputFields: InputFieldsType,
    formProps: FormProps,
    formInstance: FormInstance,
    name: string,
}

export const FormEngine: React.FC<FormBodyProps> = (
    {
        inputFields,
        formProps,
        formInstance,
        name
    }
)  => {

    return (
        <Form
            {...formProps}
            form={formInstance}
            name={name}
        >
            <Row gutter={24}>
                {
                    inputFields.map(({size, key, formItemProps}) => (
                        <Col span={size} key={key}>
                            <Form.Item {...formItemProps} name={key}>
                                {formItemProps.children}
                            </Form.Item>
                        </Col>
                    ))
                }
            </Row>
        </Form>
    );
};

