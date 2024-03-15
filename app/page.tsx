"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataFormSchemaType, VacationSchema } from "@/app/types/zod";
import Item from './_components/Item';

export default function Home() {
  const [items, setItems] = useState<DataFormSchemaType[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataFormSchemaType>({
    resolver: zodResolver(VacationSchema)
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]') as DataFormSchemaType[];
    if (storedItems.length > 0) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const onSubmit = (data: DataFormSchemaType) => {
    const { id, date, ...restData } = data;

    const newItem = {
      id: crypto.randomUUID(),
      date: new Date(),
      ...restData,
    }
    setItems(prevItems => [...prevItems, newItem]);
    localStorage.setItem('items', JSON.stringify([...items, data]));
    reset();
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const editItem = (updatedItem: DataFormSchemaType, index: number) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center mt-7">
      <ul className="w-auto grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="h-fit max-w-full border w-96 p-4 rounded-md">
          <h3 className="mb-3 font-semibold text-2xl">Create your Holiday Plan</h3>
          <div className="mb-3">
            <input 
              {...register("title", { 
                  required: true,                               
              })}
              type="text" 
              placeholder="Title" 
              className={`w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors?.title && 'border-2 border-red-500' }`}
              />
              {errors.title && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
          </div>
          <div className="mb-4">
            <textarea 
              {...register("description", { required: true })}
              placeholder="Description"
              className={`resize-none w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.description ? 'border-2 border-red-500' : ''}`}/>
              {errors.description && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
          </div>
          <div className="mb-4 flex justify-between">
            <div className="flex flex-col w-3/5 mr-6">
              <label className="text-sm text-gray-500">Start Date</label>
              <input 
                {...register("startDate", { required: true })}
                type="date" 
                placeholder=""
                className={`w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.startDate ? 'border-2 border-red-500' : ''}`}/>
                {errors.startDate && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
            </div>
            <div className="flex flex-col w-3/5">
              <label className="text-sm text-gray-500">End Date</label>
              <input 
                {...register("endDate", { required: true })}
                type="date" 
                placeholder="endDate"
                className={`w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.endDate ? 'border-2 border-red-500' : ''}`}/>
                {errors.endDate && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
            </div>
          </div>
          <div className="mb-4">
            <input 
              {...register("location", { required: true })}
              type="text" 
              placeholder="location"
              className={`w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.location ? 'border-2 border-red-500' : ''}`}/>
              {errors.location && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
          </div>
          <div className="mb-4">
            <textarea 
              {...register("participants", { required: true })}
              placeholder="participants"
              className={`resize-none w-full h-9 rounded-sm font-nunito border px-2 text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.participants ? 'border-2 border-red-500' : ''}`}/>
              {errors.participants && <span className="text-red-600 mt-1 flex font-normal text-sm">The field is required.</span>}
          </div>
          <input
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700"
            value="Create"
          />
        </form>
      
        {items.map((item, index) => (
          <Item key={index} data={item} onDelete={() => deleteItem(index)} onEdit={(updatedItem) => editItem(updatedItem, index)} />
        ))}
      </ul>
    </div>
  );
}
