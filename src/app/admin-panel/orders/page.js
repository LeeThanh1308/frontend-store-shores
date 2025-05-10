"use client";

import { Button, ColorPicker, Input, Space, Table } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatCurrencyVND, handleRegexSlug } from "@/services/utils";
import {
  handleGetAdminOrders,
  handleUpdatedAdminOrders,
  ordersSelector,
} from "@/services/redux/Slices/orders";
import { useDispatch, useSelector } from "react-redux";

import FormPopup from "@/components/sections/FormPopup";
import Highlighter from "react-highlight-words";
import InputFormAdmin from "@/components/ui/InputFormAdmin";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function OrderPage() {
  const dispatch = useDispatch();
  const { orders, validators, onRefresh } = useSelector(ordersSelector);
  const [showFormCreated, setShowFormCreated] = useState(false);
  const [showFormUpdated, setShowFormUpdated] = useState(false);
  const [idsSelectedRows, setIdsselectedRows] = useState([]);
  const [idThisUpdated, setIdThisUpdated] = useState(undefined);
  const [pickColor, setPickColor] = useState();
  const onSubmit = useCallback(
    (data) => {
      if (showFormCreated) dispatch(handleCreateColor(data));
      if (showFormUpdated) {
        dispatch(handleUpdateColor({ ...data, id: idThisUpdated }));
      }
    },
    [showFormCreated, showFormUpdated]
  );

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (orders?.length == 0) dispatch(handleGetAdminOrders());
    }, 200);
    return () => clearTimeout(timerID);
  }, [orders?.length]);

  useEffect(() => {
    if (onRefresh) {
      setShowFormCreated(false);
      setShowFormUpdated(false);
      setIdThisUpdated(undefined);
      dispatch(handleGetAdminOrders());
    }
  }, [onRefresh]);

  // Table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      console.log(value, record);
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },

    {
      title: "Người nhận",
      dataIndex: "receiver",
      key: "receiver",
      ...getColumnSearchProps("receiver"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },

    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a?.price - b?.price,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p>{formatCurrencyVND(text)}</p>,
    },
    {
      title: "Phương thức thanh toán",
      key: "paymentMethod",
      dataIndex: "paymentMethod",
      ...getColumnSearchProps("paymentMethod"),
      sorter: (a, b) => a?.paymentMethod - b?.paymentMethod,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Trạng thái giao dịch",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
      ...getColumnSearchProps("paymentStatus"),
      sorter: (a, b) => a?.paymentStatus - b?.paymentStatus,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày khởi tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? -1 : 1),
      sortDirections: ["descend", "ascend"],
      render: (record) => {
        return moment(record?.createdAt).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                handleUpdatedAdminOrders({
                  id: _.id,
                  paymentStatus: "DELIVERED",
                })
              );
            }}
          >
            Giao hàng
          </Button>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <Table
        columns={[
          {
            title: "Tên Sản Phẩm",
            dataIndex: ["product", "name"],
          },
          {
            title: "Loại",
            dataIndex: ["size", "type"],
          },
          {
            title: "Màu sắc",
            dataIndex: ["color", "name"],
          },
          {
            title: "Số lượng",
            dataIndex: "quantity",
            sorter: (a, b) => parseFloat(a.quantity) - parseFloat(b.quantity),
            ...getColumnSearchProps("quantity"),
          },
          {
            title: "Thành tiền",
            dataIndex: "totalAmount",
            ...getColumnSearchProps("totalAmount"),
            sorter: (a, b) =>
              parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
            render: (value) => (
              <span className=" text-green-700">
                {+value > 0
                  ? `${formatCurrencyVND(parseInt(value))}`
                  : "Mặc định"}
              </span>
            ),
          },
        ]}
        dataSource={record.tempOrders}
        pagination={false}
        rowKey="id"
      />
    );
  };
  // Table
  return (
    <div className="w-full h-full z-10 text-black relative font-dancing-script">
      <div className="p-6 z-0">
        <div className="flex justify-between items-center">
          <div className="mb-4 font-bold text-5xl text-rose-700">
            <span>Đơn đặt hàng </span>
            <span className=" text-3xl">({orders?.length})</span>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            rowKey="id"
            dataSource={orders}
            expandable={{
              expandedRowRender,
              rowExpandable: () => true,
            }}
          />
          <div className=" grid grid-cols-8">
            <Button
              type="primary"
              disabled={idsSelectedRows?.length == 0}
              onClick={() => {
                console.log(idsSelectedRows);
                if (
                  window.confirm("Bạn chắc chắn muốn xóa Đơn đặt hàng đã chọn?")
                )
                  dispatch(handleDeleteColor({ ids: idsSelectedRows }));
              }}
              danger
            >
              Xóa nhiều
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
