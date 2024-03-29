"use client";

import DeleteButton from "@/app/components/DeleteButton";
import Select from "@/app/components/Select";
import VoucherTableData from "@/app/components/VoucherTableData";
import { Product, Trader, Voucher, VoucherItem } from "@prisma/client";
import React, { useEffect, useState } from "react";

function CreateVoucher() {
  // States
  const [areSuppliersLoading, setAreSuppliersLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Trader[]>([]); // Needs Init
  const [supplier, setSupplier] = useState<Trader>(); // Will need to select by User
  const [voucher, setVoucher] = useState<Voucher>(); // Need Init
  const [voucherItems, setVoucherItems] = useState<VoucherItem[]>([]); // CRUD by User
  const [productList, setProductList] = useState<Product[]>([]);

  // Pagination Control
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState(0);

  /**
   * Fetch Traders - role: "SUPPLIER"
   */
  async function fetchTraders() {
    const res = await fetch(
      `/api/traders?role=SUPPLIER&page=${page}&cursor=${cursor}`,
      {
        method: "GET",
      }
    );
    const {
      traders,
      count,
      message,
    }: { traders: Trader[]; count: number; message: string } = await res.json();
    if (traders) {
      setSuppliers(traders);
      if (traders.length !== 0) {
        const [lastTrader] = traders.slice(-1);
        setCursor(lastTrader.id);
      }
    } else {
      alert(message);
    }
  }

  /**
   * Create Voucher
   */
  async function createVoucher() {
    const res = await fetch("/api/vouchers");

  }

  useEffect(() => {
    // Init
    setAreSuppliersLoading(true);
    fetchTraders().then(() => {
      setAreSuppliersLoading(false);
    });
  }, [page]);

  const handleOnSelect = (
    e: React.SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    const selectedTrader = suppliers?.filter(
      (value) => value.id.toString() === e.currentTarget.value
    )!;
    setSupplier(selectedTrader[0]);
  };

  return (
    <div className="flex flex-col w-full p-3 card bg-base-200">
      {/* Voucher Heading */}
      <div className="flex flex-row justify-start w-full">
        {/* Customer Info */}
        <ul className="w-full">
          <li>
            <span>Supplier ID#:</span>
            <span>{supplier?.id}</span>
          </li>
          <li>
            <span className="w-full">Supplier Name:</span>
            <Select traders={suppliers} handleOnSelect={handleOnSelect} />
          </li>
          <li>
            <span>Address:</span>
            <span>{supplier?.address}</span>
          </li>
          <li>
            <span>Ph No.</span>
            <span>
              <a
                href={`tel:${supplier?.phoneNo}`}
                className=" link link-primary"
              >
                {supplier?.phoneNo}
              </a>
            </span>
          </li>
        </ul>

        {/* Dummy Gap */}
        <div className="w-full"></div>

        {/* Invoice Info */}
        <ul className="w-full">
          <li>{voucher?.date.toDateString()}</li>
          <li>Invoice No#: {voucher?.id}</li>
          <li>Currency: $</li>
        </ul>
      </div>

      {/* Voucher Body (Table) */}
      <div className="text-left">
        <table className="table table-xs sm:table-sm table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>Code#</th>
              <th className="w-1/3">Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="hover">
            <tr></tr>
            {voucherItems?.map((value, index) => {
              const product = productList?.filter((v) => v.id === value.id)[0];
              return (
                <tr key={`tr-${value.id}`}>
                  <VoucherTableData
                    id={value.id}
                    data={index.toString()}
                    fieldToUpdate={"id"}
                    handleUpdateSupplier={() => {}}
                    inputType={"number"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={index.toString()}
                    fieldToUpdate={"codeNo"}
                    handleUpdateSupplier={() => {}}
                    inputType={"text"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={product?.name!}
                    fieldToUpdate={"productName"}
                    handleUpdateSupplier={() => {}}
                    inputType={"text"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={value.quantity.toString()}
                    fieldToUpdate={"qty"}
                    handleUpdateSupplier={() => {}}
                    inputType={"number"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={product?.purchasePrice?.toString()!}
                    fieldToUpdate={"price"}
                    handleUpdateSupplier={() => {}}
                    inputType={"number"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={(product?.purchasePrice! * value.quantity).toString()}
                    fieldToUpdate={"amount"}
                    handleUpdateSupplier={() => {}}
                    inputType={"number"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <VoucherTableData
                    id={value.id}
                    data={value.notes?.toString()!}
                    fieldToUpdate={"notes"}
                    handleUpdateSupplier={() => {}}
                    inputType={"text"}
                    isInputRequired={true}
                    isEditable={false}
                  />
                  <td>
                    <DeleteButton
                      id={1}
                      handleDeleteSupplier={function (
                        id: number
                      ): Promise<void> {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            {/* Form */}
            <tr>
              <td></td>
              <td>
                <input
                  className="input w-full h-full input-sm"
                  type="text"
                  name="codeNo"
                  id="codeNo"
                />
              </td>
              <td>
                <input
                  className="input w-full h-full input-sm"
                  type="text"
                  name="productName"
                  id="productName"
                />
              </td>
              <td>
                <input
                  className="input w-full h-full input-sm"
                  type="number"
                  name="quantity"
                  id="quantity"
                />
              </td>
              <td>
                <input
                  className="input w-full h-full input-sm"
                  type="number"
                  name="price"
                  id="price"
                  step={"0.01"}
                />
              </td>
              <td></td>
              <td>
                <input
                  className="input input-sm w-full h-full"
                  type="text"
                  name="notes"
                  id="notes"
                />
              </td>
            </tr>

            {/* Voucher Footer */}
            <tr>
              <td></td>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>50</b>
              </td>
              <td></td>
              <td>
                <b>250000</b>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Previous Bill: </b>
              </td>
              <td>
                <b>5000 Ks</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Subtotal</b>
              </td>
              <td>
                <b>255000 Ks</b>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateVoucher;
