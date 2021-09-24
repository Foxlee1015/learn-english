import ProtectedRoute from "../../HOC/ProtectedRoute";
import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { Table, Tag, Space } from 'antd';

const Accounts = () => {
  const [fetchUsers, doFetchUsers] = useFetch([]);

  useEffect(() => {
    doFetchUsers(`users/`);
  }, []);

  useEffect(()=>{
    console.log(fetchUsers.data);
  },[fetchUsers.data])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id_',
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
      render: user_type => (<Tag color={user_type === 0 ? 'geekblue' : 'green'}>
                {user_type}
              </Tag>)
    },
    {
      title: 'Action',
      key: 'action',
      render: () =><Space size="middle">
                <a>Delete</a>
              </Space>
    },
  ];
  
  return (
    <>
      {fetchUsers.data && 
        fetchUsers.data.length > 0 && (
          <Table rowKey="name" columns={columns} dataSource={fetchUsers.data} />
      )}
    </>
  );
};
export default ProtectedRoute(Accounts);