/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import { Container, Content, Background } from './style';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../context/auth';

interface UserData {
  name: string;
  email: string;
  maskedCpf: string;
  ddd: string;
  number: string;
  phoneTypeString: string;
  street: string;
  maskedZip: string;
  uf: string;
  city: string;
  district: string;
}
interface Address {
  street: string;
  zipCode: string;
  uf: string;
  city: string;
  district: string;
}
type AddressItems = Array<Address>;

interface Phone {
  ddd: string;
  number: string;
  phoneType: number;
}
type PhoneItems = Array<Phone>;

type EmailItems = Array<string>;

interface RequestData {
  name: string;
  emails: EmailItems;
  cpf: string;
  addresses: AddressItems;
  phones: PhoneItems;
}

const Cadastrar: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);

  const handleSubmit = React.useCallback(async (data: UserData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('por favor preencha este campo')
          .min(3, 'Mínimo de 3 caracteres')
          .max(100, 'Limite máximo de 100 caracteres')
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            'Apenas letras e espaços',
          ),
        email: Yup.string()
          .required('Por favor preencha este campo')
          .email('Digite um email válido'),
        maskedCpf: Yup.string()
          .required('Por favor preencha este campo')
          .matches(
            /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})$/,
            'formato válido: xxx.xxx.xxx-xx',
          )
          .min(
            14,
            'O cpf deve conter 14 caracteres contando números e separadores',
          )
          .max(
            14,
            'O cpf deve conter 14 caracteres contando números e separadores',
          ),
        ddd: Yup.string()
          .required('Por favor preencha este campo')
          .min(3, 'Mínimo de 3 dígitos')
          .max(3)
          .matches(/^([0-9]*)$/),
        number: Yup.string()
          .required('Por favor preencha este campo')
          .min(8, 'mínimo de 8 dígitos')
          .max(9, 'celular precisa ter 9 dígitos')
          .matches(/^([0-9]*)$/),
        maskedZip: Yup.string()
          .required('Por favor preencha este campo')
          .min(9)
          .max(9)
          .matches(/^([0-9]{5}\-[0-9]{3})$/, 'formato: XXXXXX-XX'),
        street: Yup.string()
          .required('Por favor preencha este campo')
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            'Apenas letras e espaços',
          ),
        uf: Yup.string()
          .required()
          .min(2)
          .max(2)
          .matches(/^[a-z]{2}$/, 'Apenas letras'),
        district: Yup.string()
          .required('Por favor preencha este campo')
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            'Apenas letras e espaços',
          ),
        city: Yup.string()
          .required('Por favor preencha este campo')
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            'Apenas letras e espaços',
          ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const {
        name,
        city,
        ddd,
        district,
        email,
        number,
        phoneTypeString,
        street,
        uf,
        maskedZip,
        maskedCpf,
      } = data;
      const phoneType = Number(phoneTypeString);
      const zipCode = maskedZip.split('-', 3).join('');
      const cpf = maskedCpf.split('.', 8).join('').split('-', 2).join('');
      const addresses: AddressItems = [
        {
          zipCode,
          city,
          district,
          street,
          uf,
        },
      ];
      const phones: PhoneItems = [
        {
          ddd,
          number,
          phoneType,
        },
      ];
      const emails: EmailItems = [email];
      const requestData: RequestData = {
        name,
        emails,
        cpf,
        addresses,
        phones,
      };
      console.log(requestData);
      await api.post('/clients', requestData);
    } catch (err) {
      console.log(err);
      // const errors = getValidationErrors(err);
      // formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastrar cliente</h1>
            <Input type="text" placeholder="Nome completo" name="name" />
            <Input
              type="text"
              placeholder="CPF 000.000.000-00"
              name="maskedCpf"
              maxLength={14}
            />
            <Input type="text" placeholder="E-mail" name="email" />
            <Input
              type="text"
              placeholder="0(Res) 1(Cel) 2(Com)"
              name="phoneTypeString"
            />
            <Input type="text" placeholder="DDD" name="ddd" />
            <Input type="text" placeholder="Número de telefone" name="number" />
            <Input type="text" placeholder="CEP" name="maskedZip" />
            <Input type="text" placeholder="Logradouro" name="street" />
            <Input type="text" placeholder="UF" name="uf" />
            <Input type="text" placeholder="Cidade" name="district" />
            <Input type="text" placeholder="Bairro" name="city" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Cadastrar;
