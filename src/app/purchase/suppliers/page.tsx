"use client";
import DeleteButton from "@/app/components/DeleteButton";
import Loading from "@/app/components/Loading";
import Pagination from "@/app/components/Pagination";
import SupplierTableData from "@/app/components/PurchaseTableData";
import { TraderEnum, Trader, TraderRole } from "@/lib/models";
import React, { FormEvent, useEffect, useState } from "react";

function Suppliers() {
  // States
  const [areSuppliersLoading, setAreSuppliersLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Trader[]>([]);

  // Form controllers
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  // UI controls
  const [isSumbmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disabled, setDisable] = useState(false);

  // Pagination Control
  const [numberOfPages, setNumberPages] = useState(0);
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
      setNumberPages(count);
      if (traders.length !== 0) {
        const [lastTrader] = traders.slice(-1);
        setCursor(lastTrader.id);
      }
    } else {
      alert(message);
    }
  }

  useEffect(() => {
    setAreSuppliersLoading(true);
    fetchTraders().then(() => {
      setAreSuppliersLoading(false);
    });
  }, [page]);

  // Styles for input
  const inputStyle =
    "input input-xs sm:input-sm input-bordered w-full text-xs mr-2 mt-2";
  const inputStyleError =
    "input input-xs input-error sm:input-sm input-bordered w-full text-xs mr-2 mt-2";

  /**
   * Add Supplier
   * @param {FormEvent} e onSubmit form event.
   */
  async function handleAddSupplier(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(true);
    if (name !== "" && address !== "" && phoneNo !== "" && email !== "") {
      const newSupplier: Trader = {
        id: Math.floor(Math.random() * 100),
        fullName: name,
        email: email,
        address: address,
        phoneNo: phoneNo,
        role: TraderRole.SUPPLIER,
        amount: 0,
      };
      const res = await fetch("/api/traders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSupplier),
      });
      if (res.ok) {
        const { trader, message }: { trader: Trader; message: string } =
          await res.json();
        if (trader) {
          setSuppliers([trader, ...suppliers]);
        } else {
          alert(message);
        }
      }
      setName("");
      setEmail("");
      setAddress("");
      setPhoneNo("");
      setIsSubmitted(false);
    }
    setIsSubmitting(false);
  }

  /**
   * Delete Supplier
   * @param {number} id Supplier id to delete.
   */
  const handleDeleteSupplier = async (id: number) => {
    setDisable(true);
    const res = await fetch("/api/traders", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ traderId: id }),
    });
    if (res.ok) {
      const { trader, message }: { trader: Trader; message: string } =
        await res.json();
      if (trader) {
        setSuppliers(
          suppliers!.filter((supplier) => supplier.id !== trader.id)
        );
      } else {
        alert(message);
      }
    }
    setDisable(false);
  };

  /**
   * Update Supplier
   * @param {number} id Supplier id to update.
   * @param {string} field Field from SupplierEnum to decide which field to update.
   * @param {string} data Data to update.
   */
  const handleUpdateSupplier = async (
    id: number,
    field: TraderEnum,
    data: string
  ) => {
    // PUT data
    let isSuccess = false;
    const res = await fetch("/api/traders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, field: field, data: data }),
    });

    if (res.ok) {
      const { trader, message }: { trader: Trader; message: string } =
        await res.json();

      if (trader !== undefined) {
        isSuccess = true;
        const extractedSupplier = suppliers.filter((value) => value.id !== id);
        setSuppliers(
          [trader, ...extractedSupplier].sort((a, b) => (a.id > b.id ? -1 : 1))
        );
      } else {
        alert(message);
      }
    }
    return isSuccess;
  };

  return (
    <>
      <div className="w-full card h-full">
        <h1 className="text-lg mb-2">Suppliers</h1>
        <fieldset>
          <legend>Add Supplier</legend>
          <form
            id="addSupplierForm"
            className="flex flex-row"
            onSubmit={handleAddSupplier}
          >
            <input
              className={
                isSubmitted && name === "" ? inputStyleError : inputStyle
              }
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className={
                isSubmitted && email === "" ? inputStyleError : inputStyle
              }
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className={
                isSubmitted && address === "" ? inputStyleError : inputStyle
              }
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              className={
                isSubmitted && phoneNo === "" ? inputStyleError : inputStyle
              }
              type="tel"
              name="phoneNo"
              value={phoneNo}
              placeholder="Ph No."
              onChange={(e) => {
                const value = e.target.value;
                if (!Number.isNaN(Number(value)) || value === "+")
                  setPhoneNo(value.toString());
              }}
              required
            />

            <button
              className="btn btn-success btn-xs sm:btn-sm mr-2 mt-2"
              type="submit"
            >
              {isSumbmitting ? <Loading /> : "Submit"}
            </button>
          </form>
        </fieldset>
        <div className=" h-full overflow-x-auto">
          <table className="table table-xs sm:table-sm bg-base-200 mt-2">
            <thead>
              <tr>
                <th>Id</th>
                <th>Supplier Name</th>
                <th>Email</th>
                <th className=" w-1/3">Address</th>
                <th>Phone No.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {suppliers?.map((supplier) => (
                <tr key={"tr-" + supplier.id}>
                  <SupplierTableData
                    data={supplier.id.toString()}
                    handleUpdateSupplier={handleUpdateSupplier}
                    id={supplier.id}
                    inputType={"number"}
                    isInputRequired={false}
                    isEditable={false}
                    disabled={disabled}
                  />
                  <SupplierTableData
                    data={supplier.fullName}
                    fieldToUpdate={TraderEnum.fullName}
                    handleUpdateSupplier={handleUpdateSupplier}
                    id={supplier.id}
                    inputType={"text"}
                    isInputRequired={false}
                    isEditable={true}
                    disabled={disabled}
                  />
                  <SupplierTableData
                    data={supplier.email!}
                    fieldToUpdate={TraderEnum.email}
                    handleUpdateSupplier={handleUpdateSupplier}
                    id={supplier.id}
                    inputType={"email"}
                    isInputRequired={false}
                    isEditable={true}
                    disabled={disabled}
                  />
                  <SupplierTableData
                    data={supplier.address!}
                    fieldToUpdate={TraderEnum.address}
                    handleUpdateSupplier={handleUpdateSupplier}
                    id={supplier.id}
                    inputType={"text"}
                    isInputRequired={false}
                    isEditable={true}
                    disabled={disabled}
                  />
                  <SupplierTableData
                    data={supplier.phoneNo!}
                    fieldToUpdate={TraderEnum.phoneNo}
                    handleUpdateSupplier={handleUpdateSupplier}
                    id={supplier.id}
                    inputType={"tel"}
                    isInputRequired={false}
                    isEditable={true}
                    disabled={disabled}
                  />
                  <td>
                    <DeleteButton
                      handleDeleteSupplier={handleDeleteSupplier}
                      id={supplier.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" mt-6">{areSuppliersLoading ? <Loading /> : ""}</div>
      </div>
      <Pagination numberOfPages={numberOfPages} setPage={setPage} />
    </>
  );
}

export default Suppliers;
