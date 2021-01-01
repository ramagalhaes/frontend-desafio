import React, { MouseEvent } from 'react';
import { number } from 'yup';
import { ClientList, Header, Container } from './style';
import api from '../../services/api';
import { Address, PhoneItems, EmailItems } from '../../utils/interfaces';

interface RequestData {
  id: number;
  name: string;
  emails: EmailItems;
  cpf: string;
  address: Address;
  phones: PhoneItems;
}

type RequestDataItems = Array<RequestData>;

const Clients: React.FC = () => {
  const [data, setData] = React.useState([] as RequestDataItems);

  React.useEffect(() => {
    async function fetchData() {
      const response = await api.get('/clients');
      setData(response.data);
    }
    fetchData();
  }, [setData]);
  console.log(data);

  async function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('value');
    try {
      const response = await api.delete(`/clients/${id}`);
      window.location.href = '/clients';
    } catch (err) {
      alert('Só administradores podem deletar usúarios');
    }
  }

  function handleLogOut(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('authorization');
    window.location.href = '/';
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.location.href = '/cadastro';
  }

  async function handleUpdate(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const userId = event.currentTarget.getAttribute('value');
    window.localStorage.setItem('userId', userId as string);
    window.location.href = '/atualizar';
  }

  return (
    <>
      <Container>
        <Header>
          <a href="">Clientes</a>
          <a href="" onClick={handleClick}>
            Adicionar cliente
          </a>
          <a href="" onClick={handleLogOut}>
            Log-out
          </a>
        </Header>

        {data.map(client => (
          <ClientList key={client.id}>
            <h3>{client.name}</h3>
            <p>
              <b>Nome: </b>
              {client.name}
            </p>
            {client.emails.map(email => (
              <div key={email}>
                <p>
                  <b>Email: </b>
                  {email}
                </p>
              </div>
            ))}
            <p>
              <b>CPF: </b>
              {client.cpf}
            </p>
            {client.phones.map(phone => (
              <div key={phone.number}>
                <p>
                  <b>DDD: </b>
                  {phone.ddd}
                </p>
                <p>
                  <b>Número de telefone: </b> {phone.number}
                </p>
                <p>
                  <b>Tipo: </b>
                  {phone.phoneType}
                </p>
              </div>
            ))}
            <p>
              <b>CEP: </b>
              {client.address.zipCode}
            </p>
            <p>
              <b>UF: </b>
              {client.address.uf}
            </p>
            <p>
              <b>Cidade: </b>
              {client.address.district}
            </p>
            <p>
              <b>Logradouro: </b>
              {client.address.street}
            </p>
            <p>
              <b>Bairro: </b>
              {client.address.city}
            </p>
            {client.address.complement ? (
              <p>
                <b>Complemento: </b>
                {client.address.complement}
              </p>
            ) : null}
            <span>
              <button type="button" onClick={handleDelete} value={client.id}>
                Excluir
              </button>
              <button type="button" value={client.id} onClick={handleUpdate}>
                Editar
              </button>
            </span>
          </ClientList>
        ))}
      </Container>
    </>
  );
};

export default Clients;
