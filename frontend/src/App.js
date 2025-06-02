import { useEffect, useState } from "react";
import { Table, Button, Input, Row, Col, message } from "antd";
import axios from "axios";
import "./App.css";

const SERVER_URL = `${process.env.REACT_APP_API_URL}/todo`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${SERVER_URL}`);
      if (res.data.status === "error") {
        messageApi.open({
          type: "error",
          content: res.data.error || "error",
        });
      } else {
        setTodos(res.data.todos);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message || "error",
      });
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (!title) {
      return messageApi.open({
        type: "error",
        content: "Please enter a valid Title",
      });
    }
    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}`, { title });
      if (res.data.status === "error") {
        messageApi.open({
          type: "error",
          content: res.data.error || "error",
        });
      } else {
        fetchTodos();
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message || "error",
      });
    }
    setLoading(false);
    setTitle("");
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${SERVER_URL}/${id}`);
      if (res.data.status === "error") {
        messageApi.open({
          type: "error",
          content: res.data.error || "error",
        });
      } else {
        messageApi.open({
          type: "success",
          content: "Todo deleted successfully",
        });
        fetchTodos();
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message || "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_id) => <span>{_id}</span>,
      width: 10,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (title) => <span>{title}</span>,
      width: 300,
    },
    {
      title: "Action",
      dataIndex: "sction",
      render: (_, todo) => (
        <Button danger onClick={() => deleteTodo(todo._id)}>
          Delete
        </Button>
      ),
      width: 20,
    },
  ];

  return (
    <div className="App" style={{ padding: 20 }}>
      {contextHolder}
      <h1>TODO APP</h1>
      <Row gutter={10} align="middle" justify="center">
        <Col>
          <Input
            placeholder="Enter Todo"
            style={{ marginRight: 5 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={addTodo}>
            Add Todo
          </Button>
        </Col>
      </Row>
      <div style={{ padding: 20 }}>
        <Table
          dataSource={todos}
          columns={columns}
          bordered
          loading={loading}
          size="small"
        />
      </div>
    </div>
  );
};

export default App;
