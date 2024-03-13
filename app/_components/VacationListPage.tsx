// VacationListPage.tsx
import React, { useEffect, useState } from 'react';

const VacationListPage = () => {
  const [formData, setFormData] = useState<any[]>([]);

  useEffect(() => {
    // Recuperando os dados do localStorage
    const savedData = localStorage.getItem('plans');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Vacation List</h1>
      {formData.length > 0 ? (
    <table className="w-full border-collapse">
        <thead>
            <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Participants</th>
            </tr>
        </thead>
        <tbody>
            {formData.map((data, index) => (
                <tr key={index}>
                    <td className="border p-2">{data.title}</td>
                    <td className="border p-2">{data.description}</td>
                    <td className="border p-2">{data.startDate}</td>
                    <td className="border p-2">{data.endDate}</td>
                    <td className="border p-2">{data.location}</td>
                    <td className="border p-2">{Array.isArray(data.participants) ? data.participants.join(', ') : data.participants}</td>
                </tr>
            ))}
        </tbody>
    </table>
) : (
    <p>No data available. Please submit the form to add entries.</p>
)}

    </div>
  );
};

export default VacationListPage;
