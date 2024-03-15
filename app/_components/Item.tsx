"use client"
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useForm } from 'react-hook-form';
import { DataFormSchemaType } from "@/app/types/zod";
import { ItemProps } from "@/app/types/item";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RiEditBoxLine } from "react-icons/ri";
import { CiTrash } from "react-icons/ci";
import { ImFilePdf } from "react-icons/im";
import { CiSquareCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { MdOutlineHolidayVillage } from "react-icons/md";

const Item = ({ data, onDelete, onEdit }:ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<DataFormSchemaType>(data);
  const [originalItem, setOriginalItem] = useState<DataFormSchemaType>(data);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataFormSchemaType>({
    defaultValues: data 
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedItem(data);
  };

  const handleSave = handleSubmit((editedData: DataFormSchemaType) => {
    onEdit(editedData);
    setIsEditing(false);
  });

  const handleCancel = () => {
    setIsEditing(false);
    setEditedItem(originalItem);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16); 
    doc.setFont('helvetica', 'bold');
    doc.text('Welcome to Holiday Plan', 10, 10); 

    autoTable(doc, {
        head: [['Title', 'Description', 'Location', 'Start Date', 'End Date', 'Participants']],
        body: [[
          data.title,
          data.description,
          data.location,
          data.startDate,
          data.endDate,
          data.participants
        ]],
        startY: 20 
    });

    doc.save('holiday_plan.pdf');
  };

  const renderInput = (fieldName: keyof DataFormSchemaType, label: string, type: string = 'text') => (
    <>
      {isEditing ? (
        <>
          <input
            defaultValue={
              editedItem[fieldName] instanceof Date
                ? (editedItem[fieldName] as Date).toISOString().substr(0, 10)
                : String(editedItem[fieldName])
            }
            {...register(fieldName, {
              required: true
            })}
            type={type}
            className={`rounded-sm block bg-gray-100 px-2 w-full h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors[fieldName] ? 'border-2 border-red-500' : ''}`}
          />
          {errors[fieldName] && (
            <span className="text-red-600 mt-1 flex font-medium text-sm">{label} field is required.</span>
          )}
        </>
      ) : (
        data[fieldName]
      )}
    </>
  );

  return (
    <li className={isEditing ? 'border w-96 p-6' : 'h-fit max-w-full border w-96 p-6 rounded-md'}>
      <div>
        <h2 className="font-sans font-semibold text-2xl flex items-center"><MdOutlineHolidayVillage className="mr-2" /> Holiday Plan</h2>
        <span className="mb-3 italic font-semibold text-xs text-slate-400">Hash: {data.id}</span>
      </div>
      <span className="text-sm font-medium text-slate-300">{formatDistanceToNow(data.date, { locale: pt, addSuffix: true})}</span>
      <hr className="my-4" />
      <p className="mb-3"><h3 className="font-semibold text-lg">{renderInput("title", "Title")}</h3></p>
      <p className="mb-3">{renderInput("description", "Description", "textarea")}</p>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="w-full mb-3 flex items-center font-sans"><CiCalendarDate className="mr-2"/><div>{renderInput("startDate", "Start Date", "date")}</div></p> 
        <p className="w-full mb-3 flex items-center justify-end font-sans"><CiCalendarDate className="mr-2"/><div>{renderInput("endDate", "End Date", "date")}</div></p>
      </div>
      <div className="flex justify-between">
        <p className="w-full mb-3 flex items-center font-sans"><CiLocationOn className="mr-2"/><div>{renderInput("location", "Location")}</div></p> 
        <p className="w-full mb-3 flex items-center justify-end font-sans"><GoPeople className="mr-2" /><div>{renderInput("participants", "Participants")}</div></p>
      </div>
      <div className="mt-3 flex items-center">
        {isEditing ? (
          <>
            <button className="bg-green-500 w-full px-4 py-1 text-white rounded mr-1 flex items-center justify-center hover:bg-green-600" onClick={handleSave}><CiSquareCheck className="mr-2"/> Save</button>
            <button className="bg-red-500 w-full px-4 py-1 text-white rounded flex items-center justify-center hover:bg-red-600" onClick={handleCancel}><MdOutlineCancel className="mr-2"/> Cancel</button>
          </>
        ) : (
          <>
            <button className="bg-yellow-500 w-full px-4 py-1 text-white rounded mr-1 flex items-center justify-evenly hover:bg-yellow-600" onClick={handleEdit}><RiEditBoxLine /> Edit</button>
            <button className="bg-red-500 w-full px-4 py-1 text-white rounded mr-1 flex items-center justify-evenly hover:bg-red-600" onClick={onDelete}><CiTrash /> Delete</button>
            <button className="bg-blue-500 w-full px-4 py-1 text-white rounded flex items-center justify-evenly hover:bg-blue-600" onClick={() => handleGeneratePDF()}><ImFilePdf /> PDF</button>
          </>
        )}
      </div>
    </li>
  );
};

export default Item;
