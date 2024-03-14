"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataFormSchema } from "@/app/types/zod";
import { ItemProps } from "@/app/types/item";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Item = ({ data, onDelete, onEdit }:ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<dataFormSchema>(data);
  const [originalItem, setOriginalItem] = useState<dataFormSchema>(data);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<dataFormSchema>({
    defaultValues: data // Definindo os valores padrão
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedItem(data);
  };

  const handleSave = handleSubmit((editedData: dataFormSchema) => {
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

  const renderInput = (fieldName: keyof dataFormSchema, label: string, type: string = 'text') => (
    <td>
      {isEditing ? (
        <>
          <input
            defaultValue={editedItem[fieldName]}
            {...register(fieldName, {
              required: true
            })}
            type={type}
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors[fieldName] ? 'border-2 border-red-500' : ''}`}
          />
          {errors[fieldName] && (
            <span className="text-red-600 mt-1 flex font-medium">{label} field is required.</span>
          )}
        </>
      ) : (
        data[fieldName]
      )}
    </td>
  );

  return (
    <tr className={isEditing ? 'bg-gray-300 h-14' : ''}>
      {renderInput("title", "Title")}
      {renderInput("description", "Description", "textarea")}
      {renderInput("location", "Location")}
      {renderInput("startDate", "Start Date", "date")}
      {renderInput("endDate", "End Date", "date")}
      {renderInput("participants", "Participants")}
      <td>
        {isEditing ? (
          <>
            <button className="bg-green-500 w-full px-4 py-1 text-white rounded mr-1 hover:bg-green-600" onClick={handleSave}>Save</button>
            <button className="bg-red-500 w-full px-4 py-1 text-white rounded hover:bg-red-600" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="bg-yellow-500 w-full px-4 py-1 text-white rounded mr-1 hover:bg-yellow-600 mb-1 xl:w-auto xl:mb-0" onClick={handleEdit}>Edit</button>
            <button className="bg-red-500 w-full px-4 py-1 text-white rounded mr-1 hover:bg-red-600 mb-1 xl:w-auto xl:mb-0" onClick={onDelete}>Delete</button>
            <button className="bg-blue-500 w-full px-4 py-1 text-white rounded hover:bg-blue-600 mb-1 xl:w-auto xl:mb-0" onClick={() => handleGeneratePDF()}>PDF</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Item;
