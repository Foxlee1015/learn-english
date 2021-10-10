import ProtectedRoute from "../../HOC/ProtectedRoute";
import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { Table, Tag, Space } from 'antd';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`

const Accounts = () => {
  const [fetchUsers, doFetchUsers] = useFetch([]);

  useEffect(() => {
    doFetchUsers(`users/`);
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id_',
      // eslint-disable-next-line react/display-name
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      key: 'user_type',
      dataIndex: 'user_type',
      // eslint-disable-next-line react/display-name
      render: user_type => (<Tag color={user_type === 0 ? 'geekblue' : 'green'}>
        {user_type}
      </Tag>)
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: () => <Space size="middle">
        <a>Delete</a>
      </Space>
    },
  ];

  return (
    <Container>
      {fetchUsers.data &&
        fetchUsers.data.length > 0 && (
          <Table rowKey="name" columns={columns} dataSource={fetchUsers.data} />
        )}
    </Container>
  );
};
export default ProtectedRoute(Accounts);