"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dataFormSchema, VacationSchema } from "@/app/types/zod";
import Item from './_components/Item';

export default function Home() {
  const [items, setItems] = useState<dataFormSchema[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<dataFormSchema>({
    resolver: zodResolver(VacationSchema)
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]') as dataFormSchema[];
    if (storedItems.length > 0) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const onSubmit = (data: dataFormSchema) => {
    setItems(prevItems => [...prevItems, data]);
    localStorage.setItem('items', JSON.stringify([...items, data]));
    reset();
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const editItem = (updatedItem: dataFormSchema, index: number) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center mt-28">
      <h1 className="font-semibold text-2xl mb-7">Create your Holiday Plan</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 px-4 mb-8">
        <div className="mb-4">
          <input 
            {...register("title", { 
                required: true,                               
            })}
            type="text" 
            placeholder="Title" 
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors?.title && 'border-2 border-red-500' }`}
            />
            {errors.title && <span className="text-red-600 mt-1 flex font-medium">The title field is required.</span>}
        </div>
        <div className="mb-4">
          <textarea 
            {...register("description", { required: true })}
            placeholder="Description"
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.description ? 'border-2 border-red-500' : ''}`}/>
            {errors.description && <span className="text-red-600 mt-1 flex font-medium">The description field is required.</span>}
        </div>
        <div className="mb-4">
          <input 
            {...register("startDate", { required: true })}
            type="date" 
            placeholder="startDate"
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.startDate ? 'border-2 border-red-500' : ''}`}/>
            {errors.startDate && <span className="text-red-600 mt-1 flex font-medium">The startDate field is required.</span>}
        </div>
        <div className="mb-4">
          <input 
            {...register("endDate", { required: true })}
            type="date" 
            placeholder="endDate"
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.endDate ? 'border-2 border-red-500' : ''}`}/>
            {errors.endDate && <span className="text-red-600 mt-1 flex font-medium">The endDate field is required.</span>}
        </div>
        <div className="mb-4">
          <input 
            {...register("location", { required: true })}
            type="text" 
            placeholder="location"
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.location ? 'border-2 border-red-500' : ''}`}/>
            {errors.location && <span className="text-red-600 mt-1 flex font-medium">The location field is required.</span>}
        </div>
        <div className="mb-4">
          <textarea 
            {...register("participants", { required: true })}
            placeholder="participants"
            className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.participants ? 'border-2 border-red-500' : ''}`}/>
            {errors.participants && <span className="text-red-600 mt-1 flex font-medium">The participants field is required.</span>}
        </div>
        <input
          type="submit"
          className="xl:w-32 w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700"
          value="Create"
        />
      </form>
      <table className="w-fulls md:w-full lg:w-full xl:w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 bg-gray-200 border text-left">Title</th>
            <th className="py-2 bg-gray-200 border text-left">Description</th>
            <th className="py-2 bg-gray-200 border text-left">Location</th>
            <th className="py-2 bg-gray-200 border text-left">Start Date</th>
            <th className="py-2 bg-gray-200 border text-left">End Date</th>
            <th className="py-2 bg-gray-200 border text-left">Participants</th>
            <th className="py-2 bg-gray-200 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <Item key={index} data={item} onDelete={() => deleteItem(index)} onEdit={(updatedItem) => editItem(updatedItem, index)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
