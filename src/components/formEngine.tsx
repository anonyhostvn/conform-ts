import * as React from 'react';
import {forwardRef, useImperativeHandle} from 'react';
import {
  Button, Col, Form, Row,
} from 'antd';
import {
  FormComponentProps,
} from 'antd/lib/form';
import {GetFieldDecoratorOptions, WrappedFormUtils} from 'antd/lib/form/Form';

type inputConfig = {
  size: number,
  key: string,
  Element: any,
  propsElement: object,
  fieldDecorator: GetFieldDecoratorOptions
};

export declare type inputFieldsType = inputConfig[];

export declare type fieldChangeType = {
  key: string,
  value: any
}

export interface FormBodyProps extends FormComponentProps {
  inputFields: inputFieldsType,
  onSubmit: (data: object) => void,
  formName: string,
  dataSource: object,
  onFieldChangeFunc: (listFieldChanged: fieldChangeType[]) => void,
}

const FormBody = forwardRef<FormComponentProps, FormBodyProps> (
  (
    {
      form: {getFieldDecorator, validateFieldsAndScroll},
      inputFields,
      onSubmit,
      form,
    }: FormBodyProps & { form: WrappedFormUtils }, ref,
  ) => {
    useImperativeHandle(ref, () => ({form}));

    const handleSubmit = () => {
      validateFieldsAndScroll((err: any, values: any) => {
        if (!err) onSubmit(values);
      });
    };

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
        <Form.Item>
          <Button onClick={handleSubmit}> Submit </Button>
        </Form.Item>
      </Form>
    );
  },
);

const transformDataSourceToMapPropsToFields = (dataSource: object) => {
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
  name: `awesome-form`,
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
  },
})(FormBody);
