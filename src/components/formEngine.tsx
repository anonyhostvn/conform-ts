import React, {ComponentType, forwardRef, useImperativeHandle} from 'react';
import {
  Col, Form, Row,
} from 'antd';
import {
  FormComponentProps,
} from 'antd/lib/form';
import {GetFieldDecoratorOptions} from 'antd/lib/form/Form';

type inputConfig = {
  size: number,
  key: string,
  Element: ComponentType,
  propsElement: any,
  fieldDecorator: GetFieldDecoratorOptions
};

export declare type inputFieldsType = inputConfig[];

export declare type fieldChangeType = {
  key: string,
  value: any
}

export interface FormBodyProps extends FormComponentProps {
  inputFields: inputFieldsType,
  dataSource: any,
  onFieldChangeFunc: (listFieldChanged: fieldChangeType[]) => void,
}

const FormBody = forwardRef<FormComponentProps, FormBodyProps> (
  (
    {
      form: {getFieldDecorator, validateFieldsAndScroll},
      inputFields,
      form,
    }: FormBodyProps, ref
  ) => {
    useImperativeHandle(ref, () => ({form}));

    return (
      <Form>
        <Row gutter={24}>
          {
            inputFields.map(({size, key, Element, propsElement: {...propsElement}, fieldDecorator,}) => (
              <Col span={size} key={key}>
                <Form.Item>
                  {
                    getFieldDecorator(
                      key,
                      fieldDecorator,
                    )(
                      <Element {...propsElement} />,
                    )
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
  mapPropsToFields: ({dataSource} : FormBodyProps) => ({
    ...transformDataSourceToMapPropsToFields(dataSource),
  }),
  onFieldsChange: ({onFieldChangeFunc} : FormBodyProps, fields: any) => {
    onFieldChangeFunc(Object.entries(fields).map(
      ([, value]: [string, any]): any => ({
        key: value.name,
        value: value.value,
      }),
    ));
  }
})(FormBody);
