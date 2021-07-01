import styled from 'styled-components'
import {Table} from "antd";

const App = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Wrapper>
      <div className="containerTitule">
        <span className="titule">Maintenance of managers</span>
      </div>

    <Table dataSource={dataSource} columns={columns} />;
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  .containerTitule {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
  }

  .titule {
    color: #001e94;
    font-size: 20px;
    font-weight: bold;
  }

  .ant-table-wrapper {
    padding-left: 40px;
    padding-right: 40px;
  }
`;
export default App;