import React, { MouseEvent } from 'react';
import { number } from 'yup';
import { ClientList, Header, Container } from './style';
import api from '../../services/api';

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
type RequestDataItems = Array<RequestData>;

interface RequestData {
  id: number;
  name: string;
  emails: EmailItems;
  cpf: string;
  addresses: AddressItems;
  phones: PhoneItems;
}

const Clients: React.FC = () => {
  const [data, setData] = React.useState([] as RequestDataItems);

  React.useEffect(() => {
    async function fetchData() {
      const response = await api.get('/clients');
      console.log(response.data);
      setData(response.data);
    }
    fetchData();
  }, [setData]);

  async function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('value');
    try {
      api.delete(`/clients/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <a href="">Clientes</a>
          <a href="">Adicionar cliente</a>
          <a href="">Log-out</a>
        </Header>

        {data.map(client => (
          <ClientList key={client.id}>
            <h3>{client.name}</h3>
            <p>
              <b>Nome: </b>
              {client.name}
            </p>
            <p>
              <b>E-mail: </b>
              {client.emails}
            </p>
            <p>
              <b>CPF: </b>
              {client.cpf}
            </p>
            <p>
              <b>DDD: </b>
              {client.phones[0].ddd}
            </p>
            <p>
              <b>Número de telefone: </b> {client.phones[0].number}
            </p>
            <p>
              <b>Tipo: </b>
              {client.phones[0].phoneType}
            </p>
            <p>
              <b>CEP: </b>
              {client.addresses[0].zipCode}
            </p>
            <p>
              <b>UF: </b>
              {client.addresses[0].uf}
            </p>
            <p>
              <b>Cidade: </b>
              {client.addresses[0].district}
            </p>
            <p>
              <b>Logradouro: </b>
              {client.addresses[0].street}
            </p>
            <p>
              <b>Bairro: </b>
              {client.addresses[0].city}
            </p>
            <span>
              <button type="button" onClick={handleDelete} value={client.id}>
                Excluir
              </button>
              <button type="button">Editar</button>
            </span>
          </ClientList>
        ))}
      </Container>
    </>
  );
};

export default Clients;
