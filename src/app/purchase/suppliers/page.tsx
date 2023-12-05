"use client";
import DeleteButton from "@/app/components/DeleteButton";
import PurchaseTableData from "@/app/components/PurchaseTableData";
import { SupplierEnum, TraderRole } from "@/lib/models";
import { Trader } from "@prisma/client";
import React, { FormEvent, useState } from "react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Trader[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Styles for input
  const inputStyle =
    "input input-xs sm:input-sm input-bordered w-full text-xs mr-2 mt-2";
  const inputStyleError =
    "input input-xs input-error sm:input-sm input-bordered w-full text-xs mr-2 mt-2";

  /**
   * Add Supplier
   * @param {FormEvent} e onSubmit form event.
   */
  function handleAddSupplier(e: FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
    if (name !== "" && address !== "" && phoneNo !== "" && email !== "") {
      const newSupplier: Trader = {
        id: Math.floor(Math.random() * 100),
        fullName: name,
        email: email,
        address: address,
        phoneNo: phoneNo,
        amount: 0,
        role: TraderRole.SUPPLIER,
        userId: 0,
      };
      setSuppliers([newSupplier, ...suppliers]);
      setName("");
      setEmail("");
      setAddress("");
      setPhoneNo("");
      setIsSubmitted(false);
    }
  }

  /**
   * Delete Supplier
   * @param {number} id Supplier id to delete.
   */
  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers!.filter((supplier) => supplier.id !== id));
  };

  /**
   * Update Supplier
   * @param {number} id Supplier id to update.
   * @param {string} field Field from SupplierEnum to decide which field to update.
   * @param {string} data Data to update.
   */
  const handleUpdateSupplier = (id: number, field: string, data: string) => {
    switch (field) {
      case SupplierEnum.NAME:
        suppliers!.map((value) => (value.fullName = data));
        setSuppliers(suppliers);
        break;
      case SupplierEnum.EMAIL:
        suppliers!.map((value) => (value.email = data));
        setSuppliers(suppliers);
        break;
      case SupplierEnum.ADDRESS:
        suppliers!.map((value) => (value.address = data));
        setSuppliers(suppliers);
        break;
      case SupplierEnum.PHONENO:
        suppliers!.map((value) => (value.phoneNo = data));
        setSuppliers(suppliers);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full card">
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
            Submit
          </button>
        </form>
      </fieldset>
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
          {/* Form */}
          {suppliers?.map((supplier) => (
            <tr key={"tr-" + supplier.id}>
              <PurchaseTableData
                data={supplier.id.toString()}
                fieldToUpdate={SupplierEnum.ID}
                handleUpdateSupplier={handleUpdateSupplier}
                id={supplier.id}
                inputType={"number"}
                isInputRequired={false}
                isEditable={false}
              />
              <PurchaseTableData
                data={supplier.fullName}
                fieldToUpdate={SupplierEnum.NAME}
                handleUpdateSupplier={handleUpdateSupplier}
                id={supplier.id}
                inputType={"text"}
                isInputRequired={false}
                isEditable={false}
              />
              <PurchaseTableData
                data={supplier.email}
                fieldToUpdate={SupplierEnum.EMAIL}
                handleUpdateSupplier={handleUpdateSupplier}
                id={supplier.id}
                inputType={"email"}
                isInputRequired={false}
                isEditable={false}
              />
              <PurchaseTableData
                data={supplier.address}
                fieldToUpdate={SupplierEnum.ADDRESS}
                handleUpdateSupplier={handleUpdateSupplier}
                id={supplier.id}
                inputType={"text"}
                isInputRequired={false}
                isEditable={false}
              />
              <PurchaseTableData
                data={supplier.phoneNo}
                fieldToUpdate={SupplierEnum.PHONENO}
                handleUpdateSupplier={handleUpdateSupplier}
                id={supplier.id}
                inputType={"tel"}
                isInputRequired={false}
                isEditable={false}
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
  );
}

export default Suppliers;
