/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import axios from 'axios';
import api from '../../services/api';
import { Container, Content, Background } from './style';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../context/auth';
import {
  Address,
  PhoneItems,
  EmailItems,
  UserData,
} from '../../utils/interfaces';

interface RequestData {
  name: string;
  emails: EmailItems;
  cpf: string;
  address: Address;
  phones: PhoneItems;
}

interface AutoCEP {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

const Cadastrar: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);

  // Adiciona máscara ao CPF
  const [cpfValue, setCpfValue] = React.useState('');
  const [autoCep, setAutoCep] = React.useState({} as AutoCEP);

  function onCpfChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setCpfValue(event.currentTarget.value);
    if (
      event.currentTarget.value.length === 3 ||
      event.currentTarget.value.length === 7
    ) {
      setCpfValue(`${event.currentTarget.value}.`);
    } else if (event.currentTarget.value.length === 11) {
      setCpfValue(`${event.currentTarget.value}-`);
    }
  }
  // Adiciona máscara ao CPF
  const [cepValue, setCepValue] = React.useState('');
  function onCepChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setCepValue(event.currentTarget.value);
    if (event.currentTarget.value.length === 5) {
      setCepValue(`${event.currentTarget.value}-`);
    }
  }

  // Preenche o Endereço com base no CEP
  async function handleCepBlur(event: React.FormEvent<HTMLInputElement>) {
    const zipCode = cepValue.split('-', 3).join('');
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    );
    setAutoCep(response.data);
  }

  const handleSubmit = React.useCallback(async (data: UserData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('por favor preencha este campo')
          .min(3, 'Mínimo de 3 caracteres')
          .max(100, 'Limite máximo de 100 caracteres')
          .matches(
            /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/,
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
            /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/,
            'Apenas letras e espaços',
          ),
        uf: Yup.string()
          .required()
          .min(2)
          .max(2)
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            'Apenas letras',
          ),
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
        complement,
      } = data;
      const phoneType = Number(phoneTypeString);
      const zipCode = maskedZip.split('-', 3).join('');
      const cpf = maskedCpf.split('.', 8).join('').split('-', 2).join('');
      const address = {
        zipCode,
        city,
        district,
        street,
        uf,
        complement,
      };
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
        address,
        phones,
      };
      const response = await api.post('/clients', requestData);
      if (response) {
        alert('Usuário cadastrado com sucesso');
        window.location.href = '/clients';
      }
    } catch (err) {
      alert('Apenas admnistradores podem cadastrar clientes');
      window.location.href = '/clients';
      console.log(err);
    }
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastrar cliente</h1>
            <Input
              type="text"
              placeholder="Nome completo*"
              name="name"
              maxLength={100}
              required
            />
            <Input
              type="text"
              placeholder="CPF apenas números*"
              name="maskedCpf"
              maxLength={14}
              value={cpfValue}
              onChange={onCpfChange}
              required
            />
            <Input type="text" placeholder="E-mail*" name="email" required />
            <Input
              type="text"
              placeholder="DDD*"
              name="ddd"
              maxLength={3}
              required
            />
            <Input
              required
              type="number"
              placeholder="0(Res) 1(Cel) 2(Com)*"
              name="phoneTypeString"
              maxLength={1}
              max={2}
            />
            <Input
              required
              type="text"
              placeholder="Número de telefone*"
              name="number"
              maxLength={9}
            />
            <Input
              required
              type="text"
              placeholder="CEP* apenas números"
              name="maskedZip"
              value={cepValue}
              onChange={onCepChange}
              maxLength={9}
              onBlur={handleCepBlur}
            />
            <Input
              required
              type="text"
              placeholder="Logradouro*"
              name="street"
              value={autoCep.logradouro}
              onChange={() => {
                setAutoCep({} as AutoCEP);
              }}
            />
            <Input
              required
              type="text"
              placeholder="UF*"
              name="uf"
              maxLength={2}
              value={autoCep.uf}
              onChange={() => {
                setAutoCep({} as AutoCEP);
              }}
            />
            <Input
              required
              type="text"
              placeholder="Cidade*"
              name="district"
              value={autoCep.localidade}
              onChange={() => {
                setAutoCep({} as AutoCEP);
              }}
            />
            <Input
              required
              type="text"
              placeholder="Bairro*"
              name="city"
              value={autoCep ? autoCep.bairro : ''}
              onChange={() => {
                setAutoCep({} as AutoCEP);
              }}
            />
            <Input type="text" placeholder="Complemento " name="complement" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Cadastrar;
