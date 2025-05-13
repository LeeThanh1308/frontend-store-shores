"use client";

import { Button, Input, Select, Space, Table } from "antd";
import {
  cartsSelector,
  handleCreateCashiersCarts,
  handleDeleteCart,
  handleGetCashiersCarts,
  handleUpdateCart,
} from "@/services/redux/Slices/carts";
import { formatCurrencyVND, generateUrlImage } from "@/services/utils";
import {
  handleFindProductByCashiers,
  productsSelector,
} from "@/services/redux/Slices/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import AuthRequest from "@/services/axios/AuthRequest";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import InputFormAdmin from "@/components/ui/InputFormAdmin";
import InputQuantitySpinner from "@/components/ui/InputQuantitySpinner";
import { SearchOutlined } from "@ant-design/icons";
import Toastify from "@/components/sections/Toastify";
import { allowedRoles } from "@/services/utils/allowedRoles";
import { authSelector } from "@/services/redux/Slices/auth";
import { withRoleGuard } from "@/components/auth/withRoleGuard";

const { Search } = Input;

function CashierPage() {
  const dispatch = useDispatch();
  const { cashiersCarts, onRefresh } = useSelector(cartsSelector);
  const { search: searchData } = useSelector(productsSelector);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated } = useSelector(authSelector);
  const [rowIdChangeStatus, setRowIdChangeStatus] = useState();
  const [dataCustomer, setDataCustomer] = useState({
    phone: "",
    receiver: "Customers",
  });
  const [colorID, setColorID] = useState();
  const [sizeID, setSizeID] = useState();
  const [quantity, setQuantity] = useState(1);
  const [idsSelectedRows, setIdsselectedRows] = useState([]);
  const [expandedRowType, setExpandedRowType] = useState("sizes"); // 'sizes' | 'images' | etc.
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdsselectedRows(
        selectedRows.reduce((acc, current) => {
          acc.push(current?.id);
          return acc;
        }, [])
      );
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };
  const fieldExpands = ["sizes", "images", "description"];
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
        ?.toString()
        ?.toLowerCase()
        ?.includes(value.toLowerCase());
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
          textToHighlight={text ? text?.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = useMemo(() => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      ...getColumnSearchProps("slug"),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      ...getColumnSearchProps("barcode"),
    },

    {
      title: "Giá bán",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      sorter: (a, b) => parseFloat(a.sellingPrice) - parseFloat(b.sellingPrice),
      render: (value) => (
        <span className=" text-green-700">{`${formatCurrencyVND(
          parseInt(value)
        )}`}</span>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
    },
    {
      title: "Màu sắc",
      dataIndex: "colors",
      render: (_, record) => {
        return (
          <Select
            placeholder="Chọn màu sắc"
            className=" w-full"
            onChange={(value) => {
              setRowIdChangeStatus(record.id);
              setColorID(value);
            }}
            options={_.map((_) => ({
              value: _.id,
              label: _.name,
            }))}
          />
        );
      },
    },
    {
      title: "Kích thước",
      render: (_, record) => {
        return (
          <Select
            placeholder="Chọn kích thước"
            className=" w-full"
            onChange={(value) => {
              setRowIdChangeStatus(record.id);
              setSizeID(value);
            }}
            options={record?.colors?.reduce((acc, color) => {
              if (color.id == colorID) {
                color?.sizes.map((size) => {
                  acc.push({
                    label: `Size ${size?.type} còn ${size?.inventory}`,
                    value: size?.id,
                    disabled: size?.inventory <= 0,
                  });
                });
              }
              return acc;
            }, [])}
          />
        );
      },
    },
    {
      title: "Số lượng",
      render: (_, record) => {
        const { inventory } = record?.colors?.reduce(
          (acc, color) => {
            if (color.id == colorID) {
              color?.sizes.map((size) => {
                if (size.id == sizeID) {
                  acc.inventory = size?.inventory;
                }
              });
            }
            return acc;
          },
          { inventory: 0 }
        );
        return (
          <InputQuantitySpinner
            defaultValue={1}
            max={inventory}
            onOption={(value) => {
              setQuantity(value);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {[rowIdChangeStatus].includes(record.id) && colorID && sizeID && (
            <Button
              type="primary"
              className=" border border-sky-500 text-sky-500"
              onClick={(e) => {
                dispatch(
                  handleCreateCashiersCarts({
                    quantity,
                    sizeID,
                    colorID,
                  })
                );
              }}
            >
              Thêm +
            </Button>
          )}
        </Space>
      ),
    },
  ]);
  const { totalCost, totalSale, totalSave, totalQuantity } = useMemo(() => {
    if (!cashiersCarts?.items?.length) return {};
    return cashiersCarts?.items?.reduce(
      (acc, item) => {
        const totalSellingPrice = +item?.sellingPrice * +item?.quantity;
        acc.totalCost += totalSellingPrice;
        acc.totalSale += totalSellingPrice * (1 - item?.discount / 100);
        acc.totalSave += acc.totalCost - acc.totalSale;
        acc.totalQuantity += +item?.quantity;
        return acc;
      },
      {
        totalCost: 0,
        totalSale: 0,
        totalSave: 0,
        totalQuantity: 0,
      }
    );
  }, [cashiersCarts]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      searchValue && dispatch(handleFindProductByCashiers(searchValue));
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [searchValue]);

  useEffect(() => {
    onRefresh && dispatch(handleGetCashiersCarts());
  }, [onRefresh]);

  useEffect(() => {
    dispatch(handleGetCashiersCarts());
  }, []);
  console.log(cashiersCarts);
  return (
    <div className=" font-dancing-script">
      <div className="p-6 z-0">
        <div className="flex justify-between items-center">
          <div className="mb-4 font-bold text-5xl text-rose-700">
            <span>Trang thu ngân</span>
          </div>
        </div>

        <div className="">
          <div className=" flex flex-col gap-2 w-full">
            <Search
              placeholder="Tìm kiếm thêm sản phẩm theo tên sp;size;màu sắc"
              value={searchValue}
              className=""
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={setSearchValue}
              enterButton
            />
            {searchValue && (
              <Table
                dataSource={searchData}
                columns={columns}
                rowSelection={{
                  ...rowSelection,
                }}
                rowKey="id"
              />
            )}
          </div>
          <div className="w-full flex text-lg text-black/70 py-3 font-dancing-script">
            {/* San pham */}
            <div className="w-full">
              {cashiersCarts?.items?.length === 0 ? (
                <div className="flex justify-center items-center pt-24">
                  <div className="h-80 aspect-video relative">
                    <Image
                      src={"/images/empty-cart.webp"}
                      alt="empty carts"
                      layout="fill"
                    />
                  </div>
                </div>
              ) : (
                <div className=" flex justify-between gap-4">
                  <div className=" flex-[0.7]">
                    {cashiersCarts?.items?.map((_, index) => (
                      <div
                        className="text-sm text-gray-500 flex py-2 items-center"
                        key={index}
                      >
                        <div className="w-3/6 flex items-center" key={index}>
                          <Image
                            className="w-14 h-14 rounded mr-2 text-xs"
                            src={generateUrlImage(_?.image)}
                            alt="image"
                            width={56}
                            height={56}
                            objectFit="cover"
                          />
                          <div className="truncate w-3/5 ...">
                            <div className="">{_.name}</div>
                            <div>
                              Size: {_.size.type} - {_?.color?.name}
                            </div>
                          </div>
                        </div>
                        <div className="w-1/6 text-start text-rose-500">
                          {formatCurrencyVND(_.sellingPrice)}
                        </div>
                        <div className="w-1/6 flex justify-center items-center">
                          <InputQuantitySpinner
                            defaultValue={_?.quantity}
                            max={_?.sold?.inventory}
                            onOption={(quantity) => {
                              console.log(_.id);
                              _?.quantity != quantity &&
                                dispatch(
                                  handleUpdateCart({ id: _.id, quantity })
                                );
                            }}
                          />
                        </div>
                        <div className="w-1/6 text-end text-green-500">
                          {formatCurrencyVND(
                            _.sellingPrice * _.quantity * (1 - _.discount / 100)
                          )}
                        </div>

                        <div className="w-1/12 flex items-center justify-center group">
                          <div
                            className="w-5 h-5 rounded-full text-black/70 text-sm flex justify-center cursor-pointer items-center bg-rose-500"
                            onClick={() =>
                              dispatch(handleDeleteCart({ id: _?.id }))
                            }
                          >
                            {
                              <FaXmark className=" hidden group-hover:block text-white" />
                            }
                          </div>
                        </div>
                      </div>
                    ))}

                    {cashiersCarts?.items && (
                      <div
                        className="text-rose-500 my-2 mx-4 cursor-pointer"
                        onClick={() => {
                          dispatch(handleDeleteCart({ clears: true }));
                        }}
                      >
                        Xoá giỏ hàng
                      </div>
                    )}
                  </div>
                  <div className=" flex-[0.3]">
                    <div className="w-full flex justify-between mb-2">
                      <div>Tạm tính giỏ hàng: </div>
                      <div className=" text-red-500">
                        {formatCurrencyVND(totalCost ?? 0)}
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-2">
                      <div>Tạm tính sản phẩm khuyến mãi: </div>
                      <div
                        className={`${
                          totalSale < totalCost
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrencyVND(totalSale ?? 0)}
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-2">
                      <div>Tiết kiệm được: </div>
                      <div
                        className={`${
                          totalSave ? "text-blue-500" : "text-red-500"
                        }`}
                      >
                        {formatCurrencyVND(totalSave ?? 0)}
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-2">
                      <div>Phí vận chuyển: </div>
                      <div className=" text-red-500">0đ</div>
                    </div>
                    <div className="w-full flex justify-between mb-2">
                      <div>Tổng sản phẩm: </div>
                      <div className=" text-red-500">{totalQuantity}</div>
                    </div>
                    <div className="w-full flex justify-between  mb-2 border-t border-rose-500">
                      <div>Thành tiền: </div>
                      <div className=" text-rose-500 font-bold font-roboto">
                        {formatCurrencyVND(cashiersCarts?.total ?? 0)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <InputFormAdmin
                        className={"flex-[0.5]"}
                        title={"Tên khách hàng"}
                        placeholder="Tên khách hàng"
                        value={dataCustomer.receiver}
                        onChange={(e) => {
                          setDataCustomer((prev) => ({
                            ...prev,
                            receiver: e.target.value,
                          }));
                        }}
                      />
                      <InputFormAdmin
                        className={"flex-[0.5]"}
                        title={"Phone"}
                        placeholder="Số điện thoại khách hàng"
                        value={dataCustomer.phone}
                        onChange={(e) => {
                          setDataCustomer((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div
                      onClick={() => {
                        cashiersCarts?.total > 0 &&
                          AuthRequest.post("payment/cashier", {
                            paymentMethod: "cash",
                            ...dataCustomer,
                          }).then(() => {
                            dispatch(handleGetCashiersCarts());
                            Toastify(1, "Đặt hàng thành công.");
                          });
                      }}
                      className="w-full h-10 border bg-red-500 flex justify-center items-center font-bold text-white rounded-lg cursor-pointer hover:bg-red-500/70"
                    >
                      THANH TOÁN: {formatCurrencyVND(cashiersCarts?.total ?? 0)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(CashierPage, [
  allowedRoles.CEO,
  allowedRoles.MANAGE,
  allowedRoles.STAFF,
]);
