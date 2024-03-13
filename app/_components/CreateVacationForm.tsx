'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" 
import { dataFormSchema, VacationSchema } from "@/app/types/zod";
import VacationListPage from "./VacationListPage";
import { useState } from "react";

  
const CreateVacationForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<dataFormSchema>({
        resolver: zodResolver(VacationSchema)
    })

    const onSubmit = (data: any) => {
        console.log(data)

        //const existingPlans = JSON.parse(localStorage.getItem('plans') || '[]');

        // Recupera os dados do localStorage
        const plansOnStorage = localStorage.getItem('plans');
        const existingPlans = plansOnStorage ? JSON.parse(plansOnStorage) : [];

        const newPlans = [data, ...existingPlans];
    
        localStorage.setItem('plans', JSON.stringify(newPlans));


        reset();    
    }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create a new holiday plan</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            value="Create"
        />
      </form>
      {isSubmitSuccessful && <VacationListPage />}
    </div>
  );
};

export default CreateVacationForm;
