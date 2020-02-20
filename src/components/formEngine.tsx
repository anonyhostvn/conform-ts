import React, {forwardRef, useImperativeHandle} from 'react';
import {
    Col, Form, Row,
} from 'antd';
import {
    FormComponentProps, FormProps,
} from 'antd/lib/form';
import {GetFieldDecoratorOptions} from 'antd/lib/form/Form';

type InputConfig = {
    size: number,
    key: string,
    element: JSX.Element,
    label: string,
    fieldDecorator: GetFieldDecoratorOptions
};

export declare type InputFieldsType = InputConfig[];

export declare type FieldChangeType = {
    key: string,
    value: any
}

export interface FormBodyProps extends FormComponentProps {
    inputFields: InputFieldsType,
    dataSource: any,
    onFieldChangeFunc: (listFieldChanged: FieldChangeType[]) => void,
    restProps: FormProps
}

const FormBody = forwardRef<FormComponentProps, FormBodyProps>(
    (
        {
            form: {getFieldDecorator, validateFieldsAndScroll},
            inputFields,
            form,
            restProps
        }: FormBodyProps, ref
    ) => {
        useImperativeHandle(ref, () => ({form}));

        return (
            <Form {...restProps}>
                <Row gutter={24}>
                    {
                        inputFields.map(({size, key, element , fieldDecorator, label}) => (
                            <Col span={size} key={key}>
                                <Form.Item label={label}>
                                    {
                                        getFieldDecorator(
                                            key,
                                            fieldDecorator,
                                        )(element)
                                    }
                                </Form.Item>
                            </Col>
                        ))
                    }
                </Row>
            </Form>
        );
    },
);

const transformDataSourceToMapPropsToFields = (dataSource: any) => {
    let res = {};
    Object.entries(dataSource).forEach(
        ([key, value]: [string, any]) => {
            res = {
                ...res,
                [key]: Form.createFormField({value}),
            };
        },
    );
    return res;
};

export const FormEngine = Form.create<FormBodyProps>({
    name: 'awesome-form',
    mapPropsToFields: ({dataSource}: FormBodyProps) => ({
        ...transformDataSourceToMapPropsToFields(dataSource),
    }),
    onFieldsChange: ({onFieldChangeFunc}: FormBodyProps, fields: any) => {
        onFieldChangeFunc(Object.entries(fields).map(
            ([, value]: [string, any]): any => ({
                key: value.name,
                value: value.value,
            }),
        ));
    }
})(FormBody);